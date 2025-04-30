use crate::{db::SharedDb, persistence::store_db};
use std::io::{self, Write};

#[macro_export]
macro_rules! important_warn {
    ($msg:expr) => {{

        println!("\x1b[31m=========WARNING=========\x1b[0m");
        println!("\x1b[31m{}\x1b[0m", $msg);
    }
    };
    ($fmt:expr, $($arg:tt)*) => {{
        println!("\x1b[31m=========WARNING=========\x1b[0m");
        println!("\x1b[31m{}\x1b[0m", format!($fmt, $($arg)*));
    }
    };
}

pub fn spawn_tui(db: SharedDb) {
    std::thread::spawn(move || {
        tui_main(db);
    });
}

fn tui_main(db: SharedDb) {
    println!("Terminal User Interface started. Type 'help' for available commands.");

    loop {
        print!("[UNRESTRICTED ACCESS]-> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let input = input.trim().to_lowercase();

        match input.as_str() {
            "exit" => behavior_exit(&db),
            "save" => behavior_save(&db),
            "rollback" => behavior_rollback(&db),
            "discard" => {
                println!("Discarding users and exiting...");
                std::process::exit(0);
            }
            "help" => {
                println!("Available commands:");
                println!("  help     - Show this help message");
                println!("  save     - Save db state to disk");
                println!("  rollback - Load last saved db state from disk");
                println!("  exit     - Save db state and exit the program");
                println!("  discard  - Discard db state and exit the program. Data will be lost.");
            }
            "clear" => {
                print!("{esc}[2J{esc}[1;1H", esc = 27 as char);
                println!("Terminal User Interface started. Type 'help' for available commands.");
            }
            "" => continue,
            _ => println!("Unknown command. Type 'help' for available commands."),
        }
    }
}

fn behavior_save(db: &SharedDb) {
    println!("Saving users...");

    let db = db.lock().unwrap();

    match store_db(&db) {
        Ok(_) => println!("Users saved successfully"),
        Err(e) => important_warn!("Failed to save users: {}", e),
    }
}

fn behavior_rollback(db: &SharedDb) {
    println!("Rolling back to last saved state...");

    let mut db = db.lock().unwrap();

    match crate::persistence::load_db() {
        Ok(new_db) => {
            db.clone_from(&new_db);
            println!("Rolled back to last saved state successfully")
        }
        Err(e) => important_warn!("Failed to roll back: {}", e),
    }
}

fn behavior_exit(db: &SharedDb) {
    println!("Saving users and exiting...");

    let db = db.lock().unwrap();

    match store_db(&db) {
        Ok(_) => println!("Users saved successfully"),
        Err(e) => important_warn!("Failed to save users: {}", e),
    }

    std::process::exit(0);
}
