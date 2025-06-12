use crate::{
    config::Config,
    db::{Db, SharedDb},
    models::distro::default_distros,
};
use chrono::Utc;
use std::{
    collections::HashMap,
    fs,
    path::Path,
    sync::{Arc, Mutex},
};

pub const CONFIG_PATH: &str = "./data/lrg_conf.json";

#[derive(Clone)]
pub struct PersistenceManager(Config);

impl PersistenceManager {
    pub fn new(c: Config) -> PersistenceManager {
        PersistenceManager(c)
    }

    pub fn available_backups(&self) -> Vec<fs::DirEntry> {
        fs::read_dir(Path::new(&self.0.backup_dir))
            .into_iter()
            .flatten()
            .filter_map(|entry| match entry {
                Ok(f)
                    if f.file_name()
                        .to_string_lossy()
                        .starts_with(&self.0.backup_prefix) =>
                {
                    Some(f)
                }
                _ => None,
            })
            .collect::<Vec<_>>()
    }

    fn back_up_to_file(&self) -> Result<(), String> {
        let backup_dir = Path::new(&self.0.backup_dir);
        let timestamp = Utc::now().format(&self.0.timestamp_format);
        let backup_file = backup_dir.join(format!("{}{}.json", &self.0.backup_prefix, timestamp));

        fs::copy(&self.0.data_path, &backup_file)
            .map_err(|e| format!("Failed to copy file for backup: {}", e))?;

        Ok(())
    }

    pub fn load_db_from_file<P: std::convert::AsRef<std::path::Path>>(
        path: P,
    ) -> Result<Db, String> {
        let data = fs::read_to_string::<P>(path).map_err(|_| "Failed to read file".to_string())?;
        let mut db = serde_json::from_str::<Db>(&data)
            .map_err(|e| format!("Failed to parse database: {}", e))?;

        db.update_factory();
        Ok(db)
    }

    pub fn load_db(&self) -> Result<Db, String> {
        Self::load_db_from_file(&self.0.data_path)
    }

    fn handle_missing_files(&self) -> Result<(), String> {
        if !Path::new(&self.0.data_dir).exists() {
            fs::create_dir_all(&self.0.data_dir)
                .map_err(|e| format!("Failed to create data directory: {}", e))?;
        }
        if !Path::new(&self.0.data_path).exists() {
            fs::write(&self.0.data_path, "{}")
                .map_err(|e| format!("Failed to create file: {}", e))?;
        }

        if !Path::new(&self.0.backup_dir).exists() {
            fs::create_dir_all(&self.0.backup_dir)
                .map_err(|e| format!("Failed to create backup directory: {}", e))?;
        }

        Ok(())
    }

    pub fn store_db(&self, db: &Db) -> Result<(), String> {
        self.handle_missing_files()?;

        fs::write(
            &self.0.data_path,
            serde_json::to_string(db)
                .map_err(|e| format!("Failed to serialize database: {}", e))?,
        )
        .map_err(|e| format!("Failed to write to file: {}", e))?;

        if self.0.do_backup {
            self.back_up_to_file()
                .map_err(|e| format!("Failed to back up file: {}", e))?;
        };
        
        Ok(())
    }

    pub fn init_db(&self) -> SharedDb {
        match self.load_db() {
            Ok(db) => Arc::new(Mutex::new(db)),
            Err(e) => {
                crate::important_warn!("Creating a new database with default values because the old one could not be loaded. {}", e);
                Arc::new(Mutex::new(Db::new(default_distros(), HashMap::new())))
            }
        }
    }

    fn load_config() -> Result<Config, String> {
        let data =
            fs::read_to_string(CONFIG_PATH).map_err(|_| "Failed to read file".to_string())?;
        let conf = serde_json::from_str::<Config>(&data)
            .map_err(|e| format!("Failed to parse database: {}", e))?;

        Ok(conf)
    }

    fn store_config(c: &Config) -> Result<(), String> {
        fs::write(
            CONFIG_PATH,
            serde_json::to_string(c).map_err(|e| format!("Failed to serialize database: {}", e))?,
        )
        .map_err(|e| format!("Failed to write to file: {}", e))
    }

    pub fn init_config() -> Config {
        match Self::load_config() {
            Ok(c) => c,
            Err(e) => {
                crate::important_warn!("Creating a new config file with default values because no existing one could be loaded. {}", e);
                let c = Config::default();
                match Self::store_config(&c) {
                    Ok(()) => println!("Created config file at {}", CONFIG_PATH),
                    Err(e) => crate::important_warn!("Could not create config file: {}", e),
                }
                c
            }
        }
    }
}
