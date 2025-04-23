use crate::config::DATA_PATH;
use crate::models::User;
use crate::models::UserDb;
use std::collections::HashMap;
use std::fs;
use std::sync::{Arc, Mutex};

pub fn load_users_from_file() -> Result<HashMap<u32, User>, String> {
    match fs::read_to_string(DATA_PATH) {
        Ok(data) => {
            serde_json::from_str(&data).map_err(|e| format!("Failed to parse users: {}", e))
        }
        Err(_) => Ok(HashMap::new()), // Return empty HashMap if file doesn't exist
    }
}

pub fn save_users_to_file(users: &HashMap<u32, User>) -> Result<(), String> {
    let data = serde_json::to_string_pretty(users)
        .map_err(|e| format!("Failed to serialize users: {}", e))?;

    fs::write(DATA_PATH, data).map_err(|e| format!("Failed to write to file: {}", e))
}

pub fn init_user_db() -> UserDb {
    // Create directory if it doesn't exist
    if let Some(parent) = std::path::Path::new(DATA_PATH).parent() {
        let _ = std::fs::create_dir_all(parent);
    }

    match load_users_from_file() {
        Ok(users) => {
            println!("Loaded {} users", users.len());
            Arc::new(Mutex::new(users))
        }
        Err(e) => {
            eprintln!("Failed to load users: {}", e);
            println!("Starting with empty user database");
            Arc::new(Mutex::new(HashMap::new()))
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_serialization_roundtrip() {
        let mut users = HashMap::new();
        users.insert(
            1,
            User {
                id: 1,
                name: "Test".to_string(),
            },
        );

        let save_result = save_users_to_file(&users);
        assert!(save_result.is_ok(), "Saving failed");

        let load_result = load_users_from_file();
        assert!(load_result.is_ok(), "Loading failed");
        assert_eq!(load_result.unwrap().len(), 1);
    }
}
