use std::collections::HashSet;

use serde::{Deserialize, Serialize};

use super::{User, VoteStatus};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Distro {
    /// The unique identifier for the distro.
    /// <br>Primary Key of struct
    pub name: String,

    /// Upvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub upvotes: HashSet<User>,

    /// Downvotes are stored as a HashSet of User objects to ensure uniqueness.
    pub downvotes: HashSet<User>,
}

impl Distro {
    pub fn new(name: String) -> Self {
        Self {
            name,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        }
    }

    pub fn get_vote_status(&self, user: &User) -> VoteStatus {
        if self.upvotes.contains(user) {
            VoteStatus::Up
        } else if self.downvotes.contains(user) {
            VoteStatus::Down
        } else {
            VoteStatus::None
        }
    }
}
