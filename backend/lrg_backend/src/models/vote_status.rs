use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug, Default)]
pub enum VoteStatus {
    Upvoted,
    Downvoted,
    #[default]
    None,
}
