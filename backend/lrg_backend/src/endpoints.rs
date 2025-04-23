use crate::models::{Distro, SharedDb};
use actix_web::{get, post, web, Error, HttpResponse, Responder};

#[get("/")]
async fn index() -> impl Responder {
    "Hello, world!"
}

#[get("/distros")]
async fn get_distros(db: web::Data<SharedDb>) -> impl Responder {
    let db = db.lock().unwrap();
    let distros: Vec<String> = db
        .get_all_distros()
        .into_iter()
        .map(|d| d.name.to_owned())
        .collect();

    HttpResponse::Ok().json(distros)
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(index).service(get_distros);
}
