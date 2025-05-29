use std::collections::{HashMap, HashSet};

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

impl Distro  {
    pub fn new(name: impl Into<String>) -> Self {
        Self {
            name: name.into(),
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

macro_rules! make_distro_w_key {
    ($key:expr) => {
        ($key.to_owned(), Distro::new($key))
    };
}

macro_rules! make_distros {
    ( $( $key:expr ),* $(,)? ) => {
        [
            $(
                make_distro_w_key!($key),
            )*
        ]
    };
}

pub fn default_distros() -> HashMap<String, Distro> {
    HashMap::from(make_distros![
        "ubuntu",
        "debian",
        "arch",
        "manjaro",
        "pop",
        "mint",
        "elementary",
        "cent",
        "fedora",
        "void",
        "opensuse",
        "qubes",
        "slackware",
        "gentoo",
        "alpine",
        "mx",
        "ubuntu-studio",
        "parrot-security",
        "kali",
        "black-arch",
        "artix",
        "endeavour",
        "garuda",
        "trisquel"
    ])
}
