use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug,Clone)]
pub struct Config {
    pub port: u16,
    pub address: String,
    pub data_dir: String,
    pub data_path: String,
    pub backup_dir: String,
    pub timestamp_format: String,
    pub backup_prefix: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            port: 8080,
            address: "127.0.0.1".to_owned(),
            data_dir: "./data".to_owned(),
            data_path: "./data/users.json".to_owned(),
            backup_dir: "./data/backups".to_owned(),
            timestamp_format: "%Y_%m_%d_%H_%M_%S".to_owned(),
            backup_prefix: "backup:".to_owned(),
        }
    }
}
