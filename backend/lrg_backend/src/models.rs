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
    pub fn upvote_distro(&mut self, distro_name: String, user: User) -> Result<(), String> {
        if let Some(distro) = self.distros.get_mut(&distro_name) {
            distro.upvotes.insert(user);
            Ok(())
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }
    pub fn downvote_distro(&mut self, distro_name: String, user: User) -> Result<(), String> {
        if let Some(distro) = self.distros.get_mut(&distro_name) {
            distro.downvotes.insert(user);
            Ok(())
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
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
}

#[derive(Deserialize, Serialize, Clone, Debug, Eq, Hash)]
pub struct User {
    /// The auth0 sub field is used as a unique identifier for the user.
    /// <br>Primary Key of struct
    pub id: String,

    /// Display name of the user.
    pub name: String,
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
