use std::collections::{HashMap, HashSet};

use serde::{Deserialize, Serialize};

use super::{web_friendly::WfDistro, Comment, User, VoteStatus};

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

impl Into<WfDistro> for Distro {
    fn into(self) -> WfDistro {
        WfDistro::from(&self)
    }
}
