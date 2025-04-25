use serde::{Deserialize, Serialize};

use crate::models::{Comment, Distro, User, VoteStatus};

/// The WebFriendlyDistroData struct is used to send data to the frontend.
/// Its purpose is to provide a simplified view of the Distro struct.
/// It contains no security-sensitive information and is safe to expose to the frontend.
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct WfDistro {
    pub name: String,
    pub upvote_count: u32,
    pub downvote_count: u32,
    pub comments: Vec<WfComment>,
    pub your_vote: VoteStatus,
}

impl WfComment {
    pub fn from_user_specific<T>(comment: &Comment, user: &Result<User, T>) -> WfComment {
        let mut web_comment: WfComment = comment.into();
        web_comment.your_vote = match user {
            Ok(u) => comment.get_vote_status(u),
            Err(_) => VoteStatus::default(),
        };

        web_comment
    }
}

impl From<&Distro> for WfDistro {
    fn from(distro: &Distro) -> Self {
        WfDistro {
            name: distro.name.clone(),
            upvote_count: distro.upvotes.len() as u32,
            downvote_count: distro.downvotes.len() as u32,
            comments: distro
                .comments
                .values()
                .cloned()
                .map(|c| c.into())
                .collect(),
            your_vote: VoteStatus::default(),
        }
    }
}

/// The WebFriendlyDistroData struct is used to send data to the frontend.
/// Its purpose is to provide a simplified view of the Distro struct.
/// It contains no security-sensitive information and is safe to expose to the frontend.
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct WfComment {
    pub id: u32,
    pub content: String,
    pub timestamp_epoch: u64,
    pub upvote_count: u32,
    pub downvote_count: u32,
    pub your_vote: VoteStatus,
}

impl From<&Comment> for WfComment {
    fn from(comment: &Comment) -> Self {
        WfComment {
            id: comment.id,
            content: comment.content.clone(),
            timestamp_epoch: comment.timestamp_epoch,
            upvote_count: comment.upvotes.len() as u32,
            downvote_count: comment.downvotes.len() as u32,
            your_vote: VoteStatus::None, // Default value, can be updated based on user context
        }
    }
}
