use std::{
    collections::HashSet,
    time::SystemTime,
};

use serde::{Deserialize, Serialize};

use super::{User, VoteStatus};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Comment {
    /// The unique identifier for the comment.
    /// <br>Primary Key of struct
    pub id: u32,

    /// Corresponding distro name.
    /// <br>Foreign Key of struct
    pub distro: String,

    /// The user who authored the comment.
    pub author: User,

    /// The user submitted content of the comment.
    pub content: String,

    /// Creation timestamp of the comment.
    pub timestamp_epoch: u64,

    /// Upvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub upvotes: HashSet<User>,

    /// Downvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub downvotes: HashSet<User>,
}

impl Comment {
    pub fn new(author: User, distro: String, content: String) -> Result<Comment, String> {
        if content.trim().is_empty() {
            return Err("Content must not be empty".to_owned());
        }

        let timestamp_epoch = SystemTime::now()
            .elapsed()
            .map_err(|err| err.to_string())?
            .as_secs();

        Ok(Comment {
            id: 0,
            distro,
            author,
            content,
            timestamp_epoch,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        })
    }
}

impl Comment {
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

