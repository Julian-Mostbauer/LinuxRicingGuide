use crate::config::DATA_PATH;
use crate::db::{Db, SharedDb};
use crate::models::Distro;
use std::collections::HashMap;
use std::fs;
use std::sync::{Arc, Mutex};

pub fn load_db() -> Result<Db, String> {
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

fn default_distros() -> HashMap<String, Distro> {
    HashMap::from([
        ("ubuntu".to_owned(), Distro::new("ubuntu".to_owned())),
        ("debian".to_string(), Distro::new("debian".to_string())),
        ("arch".to_string(), Distro::new("arch".to_string())),
        ("manjaro".to_string(), Distro::new("manjaro".to_string())),
        ("pop".to_string(), Distro::new("pop".to_string())),
        ("mint".to_string(), Distro::new("mint".to_string())),
        (
            "elementary".to_string(),
            Distro::new("elementary".to_string()),
        ),
        ("cent".to_string(), Distro::new("cent".to_string())),
        ("fedora".to_string(), Distro::new("fedora".to_string())),
        ("void".to_string(), Distro::new("void".to_string())),
        ("opensuse".to_string(), Distro::new("opensuse".to_string())),
        ("qubes".to_string(), Distro::new("qubes".to_string())),
        (
            "slackware".to_string(),
            Distro::new("slackware".to_string()),
        ),
        ("gentoo".to_string(), Distro::new("gentoo".to_string())),
        ("alpine".to_string(), Distro::new("alpine".to_string())),
        ("mx".to_string(), Distro::new("mx".to_string())),
        (
            "ubuntu-studio".to_string(),
            Distro::new("ubuntu-studio".to_string()),
        ),
        (
            "parrot-security".to_string(),
            Distro::new("parrot-security".to_string()),
        ),
        ("kali".to_string(), Distro::new("kali".to_string())),
        (
            "black-arch".to_string(),
            Distro::new("black-arch".to_string()),
        ),
        ("artix".to_string(), Distro::new("artix".to_string())),
        (
            "endeavour".to_string(),
            Distro::new("endeavour".to_string()),
        ),
        ("garuda".to_string(), Distro::new("garuda".to_string())),
        ("trisquel".to_string(), Distro::new("trisquel".to_string())),
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
}
