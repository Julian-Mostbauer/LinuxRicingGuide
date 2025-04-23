use crate::models::{UserDb, User, UserInputData};
use actix_web::{get, post, web, Error, HttpResponse, Responder};

#[get("/")]
async fn index() -> impl Responder {
    "Hello, world!"
}

#[post("/users")]
async fn create_user(
    user_data: web::Json<UserInputData>,
    user_db: web::Data<UserDb>,
) -> impl Responder {
    let mut db = user_db.lock().unwrap();

    let id = db.len() as u32 + 1;
    let name = user_data.into_inner().name;

    let created_user = User { id, name };

    db.insert(id, created_user.clone());
    HttpResponse::Created().json(created_user)
}

#[get("/users/{id}")]
async fn get_user(id: web::Path<u32>, db: web::Data<UserDb>) -> Result<impl Responder, Error> {
    let db = db.lock().unwrap();

    match db.get(&id.into_inner()) {
        Some(user) => Ok(HttpResponse::Ok().json(user)),
        None => Err(actix_web::error::ErrorNotFound("User not found")),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(index).service(create_user).service(get_user);
}
