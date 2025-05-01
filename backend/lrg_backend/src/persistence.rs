use crate::config::DATA_PATH;
use crate::db::{Db, SharedDb};
use crate::models::Distro;
use std::collections::HashMap;
use std::fs;
use std::sync::{Arc, Mutex};

pub fn load_db() -> Result<Db, String> {
    let data = fs::read_to_string(DATA_PATH).map_err(|_| "Failed to read file".to_string())?;
    let mut db = serde_json::from_str::<Db>(&data).map_err(|e| format!("Failed to parse database: {}", e))?;

    db.update_factory();

    Ok(db)
}

pub fn store_db(db: &Db) -> Result<(), String> {
    let data = serde_json::to_string_pretty(db)
        .map_err(|e| format!("Failed to serialize database: {}", e))?;

    fs::write(DATA_PATH, data).map_err(|e| format!("Failed to write to file: {}", e))
}

pub fn init_db() -> SharedDb {
    match load_db() {
        Ok(db) => Arc::new(Mutex::new(db)),
        Err(e) => {
            crate::important_warn!("Creating a new database with default values because the old one could not be loaded. {}", e);
            Arc::new(Mutex::new(Db::new(default_distros(), HashMap::new())))
        }
    }
}

fn default_distros() -> HashMap<String, Distro> {
    HashMap::from([
        ("ubuntu".to_owned(), Distro::new("ubuntu".to_owned())),
        ("debian".to_string(), Distro::new("debian".to_string())),
        ("arch".to_string(), Distro::new("arch".to_string())),
        ("manjaro".to_string(), Distro::new("manjaro".to_string())),
        ("pop-os".to_string(), Distro::new("pop-os".to_string())),
        ("mint".to_string(), Distro::new("mint".to_string())),
        (
            "elementary-os".to_string(),
            Distro::new("elementary-os".to_string()),
        ),
        ("cent-os".to_string(), Distro::new("cent-os".to_string())),
        ("fedora".to_string(), Distro::new("fedora".to_string())),
        (
            "void-linux".to_string(),
            Distro::new("void-linux".to_string()),
        ),
        ("openSUSE".to_string(), Distro::new("openSUSE".to_string())),
        ("qubes-os".to_string(), Distro::new("qubes-os".to_string())),
        (
            "slackware".to_string(),
            Distro::new("slackware".to_string()),
        ),
        ("gentoo".to_string(), Distro::new("gentoo".to_string())),
        (
            "alpine-linux".to_string(),
            Distro::new("alpine-linux".to_string()),
        ),
        ("mx-linux".to_string(), Distro::new("mx-linux".to_string())),
        (
            "ubuntu-studio".to_string(),
            Distro::new("ubuntu-studio".to_string()),
        ),
        (
            "parrot-security-os".to_string(),
            Distro::new("parrot-security-os".to_string()),
        ),
        (
            "kali-linux".to_string(),
            Distro::new("kali-linux".to_string()),
        ),
        (
            "black-arch-linux".to_string(),
            Distro::new("black-arch-linux".to_string()),
        ),
        (
            "artix-linux".to_string(),
            Distro::new("artix-linux".to_string()),
        ),
        (
            "endeavour-os".to_string(),
            Distro::new("endeavour-os".to_string()),
        ),
        (
            "garuda-linux".to_string(),
            Distro::new("garuda-linux".to_string()),
        ),
        ("trisquel".to_string(), Distro::new("trisquel".to_string())),
    ])
}
