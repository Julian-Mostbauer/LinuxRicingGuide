use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use crate::models::{Comment, Distro, User};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Db {
    /// Key is the distro name and the value is the Distro object.
    distros: HashMap<String, Distro>,
}

impl Db {
    pub fn new(distros: HashMap<String, Distro>) -> Self {
        Self { distros }
    }

    pub fn post_comment(&mut self, distro_name: String, comment: Comment) -> Result<(), String> {
        if let Some(distro) = self.distros.get_mut(&distro_name) {
            distro.comments.insert(comment.id, comment);
            Ok(())
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }

    fn vote_comment(
        &mut self,
        distro_name: &str,
        comment_id: u32,
        user: User,
        is_upvote: bool,
    ) -> Result<bool, String> {
        if let Some(distro) = self.distros.get_mut(distro_name) {
            if let Some(comment) = distro.comments.get_mut(&comment_id) {
                let used_vote_storage = if is_upvote {
                    &mut comment.upvotes
                } else {
                    &mut comment.downvotes
                };

                // If the user has already downvoted, remove the downvote
                let has_voted = used_vote_storage.contains(&user);
                if has_voted {
                    used_vote_storage.remove(&user);
                } else {
                    used_vote_storage.insert(user.clone());
                }

                // Remove the opposite vote
                if is_upvote {
                    comment.downvotes.remove(&user);
                } else {
                    comment.upvotes.remove(&user);
                }

                Ok(has_voted)
            } else {
                Err(format!("Comment {} not found", comment_id))
            }
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }

    pub fn upvote_comment(
        &mut self,
        distro_name: &str,
        comment_id: u32,
        user: User,
    ) -> Result<bool, String> {
        Self::vote_comment(self, distro_name, comment_id, user, true)
    }
    pub fn downvote_comment(
        &mut self,
        distro_name: &str,
        comment_id: u32,
        user: User,
    ) -> Result<bool, String> {
        Self::vote_comment(self, distro_name, comment_id, user, false)
    }

    fn vote_distro(
        &mut self,
        distro_name: &str,
        user: User,
        is_upvote: bool,
    ) -> Result<bool, String> {
        if let Some(distro) = self.distros.get_mut(distro_name) {
            let used_vote_storage = if is_upvote {
                &mut distro.upvotes
            } else {
                &mut distro.downvotes
            };

            // If the user has already voted, remove the vote
            let has_voted = used_vote_storage.contains(&user);
            if has_voted {
                used_vote_storage.remove(&user);
            } else {
                // If the user has not voted, add the vote
                used_vote_storage.insert(user.clone());
            }

            // Remove the opposite vote
            if is_upvote {
                distro.downvotes.remove(&user);
            } else {
                distro.upvotes.remove(&user);
            }

            Ok(has_voted)
        } else {
            Err(format!("Distro {} not found", distro_name))
        }
    }

    pub fn upvote_distro(&mut self, distro_name: &str, user: User) -> Result<bool, String> {
        Self::vote_distro(self, distro_name, user, true)
    }

    pub fn downvote_distro(&mut self, distro_name: &str, user: User) -> Result<bool, String> {
        Self::vote_distro(self, distro_name, user, false)
    }

    pub fn get_distro(&self, distro_name: &str) -> Option<&Distro> {
        self.distros.get(distro_name)
    }

    pub fn get_all_distros(&self) -> Vec<&Distro> {
        self.distros.values().collect()
    }
}

/// Type alias for a shared database.
/// This is a thread-safe reference-counted pointer to a Mutex that wraps a Db.
pub type SharedDb = Arc<Mutex<Db>>;

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::{HashMap, HashSet};

    // DISTRO TESTS
    #[test]
    fn test_upvote_distro_once_adds_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.upvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    #[test]
    fn test_upvote_distro_twice_removes_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.upvote_distro("Ubuntu", user.clone()).unwrap();
        db.upvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    #[test]
    fn test_downvote_distro_once_adds_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.downvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
    }

    #[test]
    fn test_downvote_distro_twice_removes_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.downvote_distro("Ubuntu", user.clone()).unwrap();
        db.downvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    #[test]
    fn test_upvote_distro_removes_downvote() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.downvote_distro("Ubuntu", user.clone()).unwrap();
        db.upvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(!db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }
    #[test]
    fn test_downvote_distro_removes_upvote() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();

        db.upvote_distro("Ubuntu", user.clone()).unwrap();
        db.downvote_distro("Ubuntu", user.clone()).unwrap();

        assert!(!db.distros.get("Ubuntu").unwrap().upvotes.contains(&user));
        assert!(db.distros.get("Ubuntu").unwrap().downvotes.contains(&user));
    }

    // COMMENT TESTS
    #[test]
    fn test_upvote_comment_once_adds_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();
        let comment = Comment {
            id: 1,
            distro: "Ubuntu".to_string(),
            author: user.clone(),
            content: "Test comment".to_string(),
            timestamp_epoch: 0,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        };

        db.post_comment("Ubuntu".to_string(), comment).unwrap();
        db.upvote_comment("Ubuntu", 1, user.clone()).unwrap();

        assert!(db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .upvotes
            .contains(&user));
        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .downvotes
            .contains(&user));
    }

    #[test]
    fn test_upvote_comment_twice_removes_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();
        let comment = Comment {
            id: 1,
            distro: "Ubuntu".to_string(),
            author: user.clone(),
            content: "Test comment".to_string(),
            timestamp_epoch: 0,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        };

        db.post_comment("Ubuntu".to_string(), comment).unwrap();
        db.upvote_comment("Ubuntu", 1, user.clone()).unwrap();
        db.upvote_comment("Ubuntu", 1, user.clone()).unwrap();

        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .upvotes
            .contains(&user));
        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .downvotes
            .contains(&user));
    }

    #[test]
    fn test_downvote_comment_once_adds_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();
        let comment = Comment {
            id: 1,
            distro: "Ubuntu".to_string(),
            author: user.clone(),
            content: "Test comment".to_string(),
            timestamp_epoch: 0,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        };

        db.post_comment("Ubuntu".to_string(), comment).unwrap();
        db.downvote_comment("Ubuntu", 1, user.clone()).unwrap();

        assert!(db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .downvotes
            .contains(&user));
        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .upvotes
            .contains(&user));
    }

    #[test]
    fn test_downvote_comment_twice_removes_user() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();
        let comment = Comment {
            id: 1,
            distro: "Ubuntu".to_string(),
            author: user.clone(),
            content: "Test comment".to_string(),
            timestamp_epoch: 0,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        };

        db.post_comment("Ubuntu".to_string(), comment).unwrap();
        db.downvote_comment("Ubuntu", 1, user.clone()).unwrap();
        db.downvote_comment("Ubuntu", 1, user.clone()).unwrap();

        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .upvotes
            .contains(&user));
        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .downvotes
            .contains(&user));
    }

    #[test]
    fn test_upvote_comment_removes_downvote() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();
        let comment = Comment {
            id: 1,
            distro: "Ubuntu".to_string(),
            author: user.clone(),
            content: "Test comment".to_string(),
            timestamp_epoch: 0,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        };

        db.post_comment("Ubuntu".to_string(), comment).unwrap();
        db.downvote_comment("Ubuntu", 1, user.clone()).unwrap();
        db.upvote_comment("Ubuntu", 1, user.clone()).unwrap();

        assert!(db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .upvotes
            .contains(&user));
        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .downvotes
            .contains(&user));
    }

    #[test]
    fn test_downvote_comment_removes_upvote() {
        let mut db = Db::new(HashMap::from([(
            "Ubuntu".to_string(),
            Distro::new("Ubuntu".to_string()),
        )]));

        let user = User::default();
        let comment = Comment {
            id: 1,
            distro: "Ubuntu".to_string(),
            author: user.clone(),
            content: "Test comment".to_string(),
            timestamp_epoch: 0,
            upvotes: HashSet::new(),
            downvotes: HashSet::new(),
        };

        db.post_comment("Ubuntu".to_string(), comment).unwrap();
        db.upvote_comment("Ubuntu", 1, user.clone()).unwrap();
        db.downvote_comment("Ubuntu", 1, user.clone()).unwrap();

        assert!(!db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .upvotes
            .contains(&user));
        assert!(db
            .distros
            .get("Ubuntu")
            .unwrap()
            .comments
            .get(&1)
            .unwrap()
            .downvotes
            .contains(&user));
    }
}
