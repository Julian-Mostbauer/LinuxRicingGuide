pub const PORT: u16 = 8080;
pub const DATA_PATH: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/data/users.json");
pub const BACKUP_DIR: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/data/backups");
pub const SOCKET_ADDRESS: (&str, u16) = ("127.0.0.1", PORT);
pub const TIMESTAMP_FORMAT: &str = "%Y_%m_%d_%H_%M_%S";
pub const BACKUP_PREFIX: &str = "backup:";
