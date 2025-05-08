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
    pub fn new(id: String) -> Self {
        Self { id }
    }
}

impl TryFrom<HttpRequest> for User {
    type Error = String;

    fn try_from(req: HttpRequest) -> Result<Self, Self::Error> {
        req.headers()
            .get("X-User-ID")
            .and_then(|value| value.to_str().ok())
            .map(|s| User::new(s.to_string()))
            .ok_or_else(|| "Missing X-User-ID header".to_string())
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
