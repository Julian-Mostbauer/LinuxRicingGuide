use actix_web::HttpRequest;
use serde::{Deserialize, Serialize};
use std::hash::{Hash, Hasher};

#[derive(Deserialize, Serialize, Clone, Debug, Eq)]
pub struct User {
    /// The auth0 sub field is used as a unique identifier for the user.
    /// <br>Primary Key of struct
    pub id: String,
}
impl User {
    pub fn new(id: String) -> Option<Self> {
        match Self::is_valid_id(&id) {
            true => Some(Self { id }),
            false => None,
        }
    }

    pub fn is_valid_id(id: &str) -> bool {
        let parts: Vec<&str> = id.split('|').collect();

        if parts.len() != 2 {
            return false;
        }

        match parts[0] {
            "windowslive" => {
                let s = parts[1];
                s.len() == 16 && s.chars().all(|c| c.is_ascii_hexdigit())
            }
            "google-oauth2" => {
                let s = parts[1];
                s.len() == 21 && s.chars().all(|c| c.is_ascii_digit())
            }
            "github" => {
                let s = parts[1];
                !s.is_empty() && s.chars().all(|c| c.is_ascii_digit())
            }
            _ => false,
        }
    }
}

impl TryFrom<HttpRequest> for User {
    type Error = String;

    fn try_from(req: HttpRequest) -> Result<Self, Self::Error> {
        req.headers()
            .get("X-User-ID")
            .and_then(|value| value.to_str().ok())
            .and_then(|s| User::new(s.to_string()))
            .ok_or_else(|| "Missing or invalid X-User-ID header".to_string())
    }
}

impl Default for User {
    fn default() -> Self {
        Self {
            id: "I_AM_I_DUMMY".to_string(),
        }
    }
}

impl PartialEq for User {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Hash for User {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
    }
}
