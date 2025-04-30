use serde::{Deserialize, Serialize};

use crate::models::{Distro, VoteStatus};

/// The WebFriendlyDistroData struct is used to send data to the frontend.
/// Its purpose is to provide a simplified view of the Distro struct.
/// It contains no security-sensitive information and is safe to expose to the frontend.
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct WfDistro {
    pub name: String,
    pub upvote_count: u32,
    pub downvote_count: u32,
    pub your_vote: VoteStatus,
}

impl From<&Distro> for WfDistro {
    fn from(distro: &Distro) -> Self {
        WfDistro {
            name: distro.name.clone(),
            upvote_count: distro.upvotes.len() as u32,
            downvote_count: distro.downvotes.len() as u32,
            your_vote: VoteStatus::default(),
        }
    }
}
