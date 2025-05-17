mod auth0_integration;
mod config;
mod db;
mod endpoints;
mod models;
mod persistence;
mod tui;

use actix_web::{web, App, HttpServer};
use persistence::PersistenceManager;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = PersistenceManager::init_config();
    
    let persistence_manager = PersistenceManager::new(config.clone());
    let tui_manager = tui::TuiManager::new(persistence_manager.clone());
    let user_db = persistence_manager.init_db();

    tui::spawn_tui(tui_manager, user_db.clone());
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(user_db.clone()))
            .configure(endpoints::config)
    })
    .bind((config.address, config.port))?
    .run()
    .await
}
