use crate::models::{SharedDb, User, VoteStatus, WebFriendlyDistroData};
use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};

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

#[get("/distros/{name}")]
async fn get_distro(
    req: HttpRequest,
    name: web::Path<String>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let name = name.into_inner();
    let db = db.lock().unwrap();

    match db.get_distro(&name) {
        Some(distro) => {
            let mut web_distro: WebFriendlyDistroData = distro.into();

            let vote = match User::try_from(req) {
                Ok(user) => distro.get_vote_status(&user),
                Err(_) => VoteStatus::None,
            };
            
            web_distro.your_vote = vote;
            HttpResponse::Ok().json(web_distro)
        }
        None => HttpResponse::NotFound().finish(),
    }
}

#[post("/distros/{name}/upvote")]
async fn upvote_distro(
    req: HttpRequest,
    name: web::Path<String>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let mut db = db.lock().unwrap();
    let name = name.into_inner();
    let user = User::try_from(req);

    let user = match user {
        Ok(user) => user,
        Err(_) => return HttpResponse::BadRequest().body("Invalid user ID"),
    };

    match db.upvote_distro(&name, user) {
        Ok(new_vote) => HttpResponse::Ok().json(new_vote),
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}
#[post("/distros/{name}/downvote")]
async fn downvote_distro(
    req: HttpRequest,
    name: web::Path<String>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let mut db = db.lock().unwrap();
    let name = name.into_inner();
    let user = User::try_from(req);

    let user = match user {
        Ok(user) => user,
        Err(_) => return HttpResponse::BadRequest().body("Invalid user ID"),
    };

    match db.downvote_distro(&name, user) {
        Ok(new_vote) => HttpResponse::Ok().json(new_vote),
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(index)
        .service(get_distros)
        .service(get_distro)
        .service(upvote_distro)
        .service(downvote_distro);
}
