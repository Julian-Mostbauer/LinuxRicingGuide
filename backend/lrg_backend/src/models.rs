use actix_web::HttpRequest;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::sync::{Arc, Mutex};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Db {
    /// Key is the distro name and the value is the Distro object.
    distros: HashMap<String, Distro>,
}

impl Db {
    pub fn new(distros: HashMap<String, Distro>) -> Self {
        Self { distros }
    }

    pub fn post_comment(&mut self, distro_name: String, comment: Comment) -> Result<(), String> {
        if let Some(distro) = self.distros.get_mut(&distro_name) {
            distro.comments.insert(comment.id, comment);
            Ok(())
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }

    pub fn upvote_comment(
        &mut self,
        distro_name: String,
        comment_id: u32,
        user: User,
    ) -> Result<(), String> {
        if let Some(distro) = self.distros.get_mut(&distro_name) {
            if let Some(comment) = distro.comments.get_mut(&comment_id) {
                comment.upvotes.insert(user);
                Ok(())
            } else {
                Err(format!("Comment {} not found", comment_id))
            }
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }
    pub fn downvote_comment(
        &mut self,
        distro_name: String,
        comment_id: u32,
        user: User,
    ) -> Result<(), String> {
        if let Some(distro) = self.distros.get_mut(&distro_name) {
            if let Some(comment) = distro.comments.get_mut(&comment_id) {
                comment.downvotes.insert(user);
                Ok(())
            } else {
                Err(format!("Comment {} not found", comment_id))
            }
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }

    fn vote_distro(
        &mut self,
        distro_name: &str,
        user: User,
        is_upvote: bool,
    ) -> Result<bool, String> {
        if let Some(distro) = self.distros.get_mut(distro_name) {
            let used_vote_storage = if is_upvote {
                &mut distro.upvotes
            } else {
                &mut distro.downvotes
            };

            // If the user has already voted, remove the vote
            let has_voted = used_vote_storage.contains(&user);
            if has_voted {
                used_vote_storage.remove(&user);
            } else {
                // If the user has not voted, add the vote
                used_vote_storage.insert(user.clone());
            }

            // Remove the opposite vote
            if is_upvote {
                distro.downvotes.remove(&user);
            } else {
                distro.upvotes.remove(&user);
            }

            Ok(has_voted)
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }

    pub fn upvote_distro(&mut self, distro_name: &str, user: User) -> Result<bool, String> {
        Self::vote_distro(self, distro_name, user, true)
    }
    
    pub fn downvote_distro(&mut self, distro_name: &str, user: User) -> Result<bool, String> {
        Self::vote_distro(self, distro_name, user, false)
    }

    pub fn get_distro(&self, distro_name: &str) -> Option<&Distro> {
        self.distros.get(distro_name)
    }

    pub fn get_all_distros(&self) -> Vec<&Distro> {
        self.distros.values().collect()
    }

    pub fn get_all_comments(&self, distro_name: &str) -> Option<Vec<&Comment>> {
        self.distros
            .get(distro_name)
            .map(|distro| distro.comments.values().collect())
    }
    pub fn get_comment(&self, distro_name: &str, comment_id: u32) -> Option<&Comment> {
        self.distros
            .get(distro_name)
            .and_then(|distro| distro.comments.get(&comment_id))
    }
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Distro {
    /// The unique identifier for the distro.
    /// <br>Primary Key of struct
    pub name: String,

    /// Upvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub upvotes: HashSet<User>,

    /// DOwnvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub downvotes: HashSet<User>,

    /// Comments are stored as a HashMap with the comment ID as the key and the Comment object as the value.
    pub comments: HashMap<u32, Comment>,
}

impl Distro {
    pub fn new(name: String) -> Self {
        Self {
            name,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
            comments: HashMap::new(),
        }
    }

    pub fn get_vote_status(&self, user: &User) -> VoteStatus {
        if self.upvotes.contains(user) {
            VoteStatus::Upvoted
        } else if self.downvotes.contains(user) {
            VoteStatus::Downvoted
        } else {
            VoteStatus::None
        }
    }
}

impl Into<WebFriendlyDistroData> for Distro {
    fn into(self) -> WebFriendlyDistroData {
        WebFriendlyDistroData::from(&self)
    }
}

/// The WebFriendlyDistroData struct is used to send data to the frontend.
/// Its purpose is to provide a simplified view of the Distro struct.
/// It contains no security-sensitive information and is safe to expose to the frontend.
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct WebFriendlyDistroData {
    pub name: String,
    pub upvote_count: u32,
    pub downvote_count: u32,
    pub comments: Vec<Comment>,
    pub your_vote: VoteStatus,
}

impl From<&Distro> for WebFriendlyDistroData {
    fn from(distro: &Distro) -> Self {
        WebFriendlyDistroData {
            name: distro.name.clone(),
            upvote_count: distro.upvotes.len() as u32,
            downvote_count: distro.downvotes.len() as u32,
            comments: distro.comments.values().cloned().collect(),
            your_vote: VoteStatus::None, // Default value, can be updated based on user context
        }
    }
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub enum VoteStatus {
    Upvoted,
    Downvoted,
    None,
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, Hash)]
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

    fn ne(&self, other: &Self) -> bool {
        !self.eq(other)
    }
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Comment {
    /// The unique identifier for the comment.
    /// <br>Primary Key of struct
    pub id: u32,

    /// Corresponding distro name.
    /// <br>Foreign Key of struct
    pub distro: String,

    /// The user who authored the comment.
    pub auther: User,

    /// The user submitted content of the comment.
    pub content: String,

    /// Creation timestamp of the comment.
    pub timestamp_epoch: u64,

    /// Upvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub upvotes: HashSet<User>,

    /// Downvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub downvotes: HashSet<User>,
}

/// Type alias for a shared database.
/// This is a thread-safe reference-counted pointer to a Mutex that wraps a Db.
pub type SharedDb = Arc<Mutex<Db>>;

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_upvote_distro_once_adds_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.upvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    #[test]
    fn test_upvote_distro_twice_removes_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.upvote_distro("Ubuntu", user.clone()).unwrap();
        db.upvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    #[test]
    fn test_downvote_distro_once_adds_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.downvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
    }

    #[test]
    fn test_downvote_distro_twice_removes_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.downvote_distro("Ubuntu", user.clone()).unwrap();
        db.downvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    #[test]
    fn test_upvote_distro_removes_downvote() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.downvote_distro("Ubuntu", user.clone()).unwrap();
        db.upvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }
    #[test]
    fn test_downvote_distro_removes_upvote() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.upvote_distro("Ubuntu", user.clone()).unwrap();
        db.downvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }
}
