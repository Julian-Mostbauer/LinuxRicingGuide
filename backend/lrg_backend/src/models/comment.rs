use std::collections::HashSet;

use serde::{Deserialize, Serialize};

use super::{web_friendly::WfComment, User, VoteStatus};

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

impl Into<WfComment> for Comment {
    fn into(self) -> WfComment {
        WfComment::from(&self)
    }
}
