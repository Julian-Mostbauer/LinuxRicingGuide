use crate::config::{BACKUP_DIR, DATA_PATH};
use crate::db::{Db, SharedDb};
use crate::models::Distro;
use chrono::Utc;
use std::collections::HashMap;
use std::fs;
use std::path::Path;
use std::sync::{Arc, Mutex};

fn back_up_file() -> Result<(), String> {
    let backup_dir = Path::new(BACKUP_DIR);
    let timestamp = Utc::now().format("%Y%m%d%H%M%S");
    let backup_file = backup_dir.join(format!("db_backup_{}.json", timestamp));

    fs::copy(DATA_PATH, &backup_file)
        .map_err(|e| format!("Failed to copy file for backup: {}", e))?;

    Ok(())
}

pub fn load_db() -> Result<Db, String> {
    back_up_file().map_err(|e| format!("Failed to back up file: {}", e))?;

    let data = fs::read_to_string(DATA_PATH).map_err(|_| "Failed to read file".to_string())?;
    let mut db = serde_json::from_str::<Db>(&data)
        .map_err(|e| format!("Failed to parse database: {}", e))?;

    db.update_factory();

    Ok(db)
}

pub fn store_db(db: &Db) -> Result<(), String> {
    let data = serde_json::to_string_pretty(db)
        .map_err(|e| format!("Failed to serialize database: {}", e))?;

    fs::write(DATA_PATH, data).map_err(|e| format!("Failed to write to file: {}", e))
}

pub fn init_db() -> SharedDb {
    match load_db() {
        Ok(db) => Arc::new(Mutex::new(db)),
        Err(e) => {
            crate::important_warn!("Creating a new database with default values because the old one could not be loaded. {}", e);
            Arc::new(Mutex::new(Db::new(default_distros(), HashMap::new())))
        }
    }
}

macro_rules! make_distro_w_key {
    ($key:expr) => {
        ($key.to_owned(), Distro::new($key.to_owned()))
    };
}

macro_rules! make_distros {
    ( $( $key:expr ),* $(,)? ) => {
        [
            $(
                make_distro_w_key!($key),
            )*
        ]
    };
}

fn default_distros() -> HashMap<String, Distro> {
    HashMap::from(make_distros![
        "ubuntu",
        "debian",
        "arch",
        "manjaro",
        "pop",
        "mint",
        "elementary",
        "cent",
        "fedora",
        "void",
        "opensuse",
        "qubes",
        "slackware",
        "gentoo",
        "alpine",
        "mx",
        "ubuntu-studio",
        "parrot-security",
        "kali",
        "black-arch",
        "artix",
        "endeavour",
        "garuda",
        "trisquel"
    ])
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_distros_correct_casing() {
        let distros = default_distros();
        distros.iter().for_each(|(key, _)| {
            assert!(key.chars().all(|c| c.is_ascii_alphanumeric() || c == '-'));
            assert!(key.chars().all(|c| c.is_lowercase() || c == '-'));
            assert!(!key.contains("-linux"));
            assert!(!key.contains("-os"));
        });
    }

    #[test]
    fn test_default_distros_share_name_with_key() {
        let distros = default_distros();
        distros.iter().for_each(|(key, distro)| {
            assert_eq!(key, &distro.name);
        });
    }

    #[test]
    fn test_default_distros_correct_amount() {
        let distros = default_distros();
        assert_eq!(distros.len(), 24);
    }
}
