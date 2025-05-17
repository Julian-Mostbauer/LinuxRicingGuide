use crate::config::{BACKUP_DIR, BACKUP_PREFIX, DATA_DIR, DATA_PATH, TIMESTAMP_FORMAT};
use crate::db::{Db, SharedDb};
use crate::models::distro::default_distros;
use chrono::Utc;
use std::{collections::HashMap, fs, path::Path, sync::{Arc, Mutex}};

pub fn available_backups() -> Vec<fs::DirEntry> {
    fs::read_dir(Path::new(BACKUP_DIR))
        .into_iter()
        .flatten()
        .filter_map(|entry| match entry {
            Ok(f) if f.file_name().to_string_lossy().starts_with(BACKUP_PREFIX) => Some(f),
            _ => None,
        })
        .collect::<Vec<_>>()
}

fn back_up_to_file() -> Result<(), String> {
    let backup_dir = Path::new(BACKUP_DIR);
    let timestamp = Utc::now().format(TIMESTAMP_FORMAT);
    let backup_file = backup_dir.join(format!("{}{}.json", BACKUP_PREFIX, timestamp));

    fs::copy(DATA_PATH, &backup_file)
        .map_err(|e| format!("Failed to copy file for backup: {}", e))?;

    Ok(())
}

pub fn load_db_from_file<P: std::convert::AsRef<std::path::Path>>(path: P) -> Result<Db, String> {
    let data = fs::read_to_string::<P>(path).map_err(|_| "Failed to read file".to_string())?;
    let mut db = serde_json::from_str::<Db>(&data)
        .map_err(|e| format!("Failed to parse database: {}", e))?;

    db.update_factory();
    Ok(db)
}

pub fn load_db() -> Result<Db, String> {
    load_db_from_file(DATA_PATH)
}

fn handle_missing_files() -> Result<(), String> {
    if !Path::new(DATA_DIR).exists() {
        fs::create_dir_all(DATA_DIR)
            .map_err(|e| format!("Failed to create data directory: {}", e))?;
    }
    if !Path::new(DATA_PATH).exists() {
        fs::write(DATA_PATH, "[]").map_err(|e| format!("Failed to create file: {}", e))?;
    }

    if !Path::new(BACKUP_DIR).exists() {
        fs::create_dir_all(BACKUP_DIR)
            .map_err(|e| format!("Failed to create backup directory: {}", e))?;
    }

    Ok(())
}

pub fn store_db(db: &Db) -> Result<(), String> {
    handle_missing_files()?;

    fs::write(
        DATA_PATH,
        serde_json::to_string(db).map_err(|e| format!("Failed to serialize database: {}", e))?,
    )
    .map_err(|e| format!("Failed to write to file: {}", e))?;

    back_up_to_file().map_err(|e| format!("Failed to back up file: {}", e))
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
