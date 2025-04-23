use std::sync::{Arc, Mutex};
use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct UserInputData {
    pub name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub id: u32,
    pub name: String,
}

pub type UserDb = Arc<Mutex<HashMap<u32, User>>>;