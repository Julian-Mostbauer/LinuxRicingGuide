use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug, Default)]
pub enum VoteStatus {
    Up,
    Down,
    #[default]
    None,
}
