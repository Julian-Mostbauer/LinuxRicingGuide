pub const PORT: u16 = 8080;
pub const DATA_PATH: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/data/users.json");
pub const SOCKET_ADDRESS: (&str, u16) = ("127.0.0.1", PORT);
