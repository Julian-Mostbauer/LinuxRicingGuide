use crate::{models::UserDb, persistence::save_users_to_file};
use std::io::{self, Write};

fn tui_main(user_db: UserDb) {
    println!("Terminal User Interface started. Type 'help' for available commands.");

    loop {
        print!("|Server-Interface|> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let input = input.trim().to_lowercase();

        match input.as_str() {
            "exit" => {
                println!("Saving users and exiting...");
                let db = user_db.lock().unwrap();
                match save_users_to_file(&db) {
                    Ok(_) => println!("Users saved successfully"),
                    Err(e) => eprintln!("Failed to save users: {}", e),
                }
                std::process::exit(0);
            }
            "list" => {
                println!("Loaded users:");
                let db = user_db.lock().unwrap();
                if db.is_empty() {
                    println!("No users loaded");
                } else {
                    for (id, user) in db.iter() {
                        println!("ID: {}, Name: {}", id, user.name);
                    }
                }
            }
            "help" => {
                println!("Available commands:");
                println!("  help  - Show this help message");
                println!("  list  - List all loaded users");
                println!("  exit  - Save users and exit the program");
            }
            "" => continue,
            _ => println!("Unknown command. Type 'help' for available commands."),
        }
    }
}

pub fn spawn_tui(user_db: UserDb) {
    std::thread::spawn(move || {
        tui_main(user_db);
    });
}
