use crate::{
    db::SharedDb,
    persistence::{available_backups, load_db_from_file, store_db},
};
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

fn read_valid_num(lower: usize, upper: usize) -> usize {
    loop {
        print!("Enter a number ({}-{}): ", lower, upper);
        io::stdout().flush().unwrap();

        let mut input = String::new();
        if io::stdin().read_line(&mut input).is_err() {
            println!("Failed to read input. Try again.");
            continue;
        }

        match input.trim().parse::<usize>() {
            Ok(num) if num >= lower && num <= upper => return num,
            _ => println!(
                "Invalid input. Please enter a number between {} and {}.",
                lower, upper
            ),
        }
    }
}

fn behavior_rollback(db: &SharedDb) {
    println!("Available states:");

    let available_backups = available_backups();
    let backup_names: Vec<String> = available_backups
        .iter()
        .filter_map(|e| e.file_name().into_string().ok())
        .collect();

    for (i, name) in backup_names.iter().enumerate() {
        println!("  {}: {}", i + 1, name);
    }

    let selected_idx = read_valid_num(1, backup_names.len()) - 1;
    let selected_path = available_backups.get(selected_idx).unwrap();

    match load_db_from_file(selected_path.path()) {
        Ok(new_db) => {
            let mut db = db.lock().unwrap();
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
