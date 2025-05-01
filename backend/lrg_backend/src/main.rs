mod config;
mod db;
mod endpoints;
mod models;
mod persistence;
mod tui;
use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting server on port {}", config::PORT);
    println!("Data path: {}", config::DATA_PATH);

    let user_db = persistence::init_db();
    
    tui::spawn_tui(user_db.clone());
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(user_db.clone()))
            .configure(endpoints::config)
    })
    .bind(config::SOCKET_ADDRESS)?
    .run()
    .await
}
