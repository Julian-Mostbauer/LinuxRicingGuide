use serde::{Deserialize, Serialize};

use crate::models::{Comment, User, VoteStatus};

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

impl WfComment {
    pub fn try_from_user_specific<T>(comment: &Comment, user: &Result<User, T>) -> WfComment {
        let mut web_comment: WfComment = comment.into();
        web_comment.your_vote = match user {
            Ok(u) => comment.get_vote_status(u),
            Err(_) => VoteStatus::default(),
        };

        web_comment
    }

    pub fn from_user_specific(comment: &Comment, user: &User) -> WfComment {
        let mut web_comment: WfComment = comment.into();
        web_comment.your_vote = comment.get_vote_status(user);

        web_comment
    }
}
