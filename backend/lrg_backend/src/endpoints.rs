use actix_web::{delete, get, post, web, HttpRequest, HttpResponse, Responder};

use crate::{
    db::SharedDb,
    models::{
        web_friendly::{WfComment, WfDistro},
        User, VoteStatus,
    },
};

#[derive(serde::Deserialize)]
struct OptionalRange<T> {
    start: Option<T>,
    amount: Option<T>,
}

#[derive(serde::Deserialize)]
struct CommentContent {
    content: String,
}

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
            let wf_distro = match User::try_from(req) {
                Ok(user) => WfDistro::from_distro_specific(&distro, &user),
                Err(_) => WfDistro::from(distro),
            };

            HttpResponse::Ok().json(wf_distro)
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

#[delete("/comments/{id}")]
async fn delete_comment(
    req: HttpRequest,
    id: web::Path<u32>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let mut db = db.lock().unwrap();
    let id = id.into_inner();
    let user = User::try_from(req);

    let user = match user {
        Ok(user) => user,
        Err(_) => return HttpResponse::BadRequest().body("Invalid user ID"),
    };

    match db.try_delete_comment(id, &user) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}

#[get("/comments/{comment_id}")]
async fn get_comment(
    req: HttpRequest,
    path: web::Path<u32>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let db = db.lock().unwrap();
    let comment_id = path.into_inner();
    let user = User::try_from(req);

    db.comments
        .get(&comment_id)
        .map(|comment| HttpResponse::Ok().json(WfComment::try_from_user_specific(comment, &user)))
        .unwrap_or_else(|| HttpResponse::NotFound().finish())
}

#[get("/distros/{distro_name}/comments")]
async fn get_comments(
    req: HttpRequest,
    path: web::Path<String>,
    range: web::Query<OptionalRange<usize>>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let db = db.lock().unwrap();
    let distro_name = path.into_inner();
    let user = User::try_from(req);
    let range = range.into_inner();

    match db.get_distro(&distro_name) {
        Some(_) => HttpResponse::Ok().json(
            db.get_comments_of_distro(&distro_name) // TODO Make more efficient
                .iter()
                .skip(range.start.unwrap_or(0))
                .take(range.amount.unwrap_or(usize::MAX))
                .map(|comment| WfComment::try_from_user_specific(comment, &user))
                .collect::<Vec<WfComment>>(),
        ),
        None => HttpResponse::NotFound().finish(),
    }
}

#[post("/comments/{id}/upvote")]
async fn upvote_comment(
    req: HttpRequest,
    id: web::Path<u32>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let mut db = db.lock().unwrap();
    let id = id.into_inner();
    let user = User::try_from(req);

    let user = match user {
        Ok(user) => user,
        Err(_) => return HttpResponse::BadRequest().body("Invalid user ID"),
    };

    match db.upvote_comment(id, user) {
        Ok(new_vote) => HttpResponse::Ok().json(new_vote),
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}

#[post("/comments/{id}/downvote")]
async fn downvote_comment(
    req: HttpRequest,
    id: web::Path<u32>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let mut db = db.lock().unwrap();
    let id = id.into_inner();
    let user = User::try_from(req);

    let user = match user {
        Ok(user) => user,
        Err(_) => return HttpResponse::BadRequest().body("Invalid user ID"),
    };

    match db.downvote_comment(id, user) {
        Ok(new_vote) => HttpResponse::Ok().json(new_vote),
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}

#[post("/comments/post/{distro_name}")]
async fn post_comment(
    req: HttpRequest,
    distro_name: web::Path<String>,
    content: web::Json<CommentContent>,
    db: web::Data<SharedDb>,
) -> impl Responder {
    let mut db = db.lock().unwrap();
    let user = User::try_from(req);
    let content = content.into_inner();
    let distro_name = distro_name.into_inner();

    if db.get_distro(&distro_name).is_none() {
        return HttpResponse::NotFound().body("Distro not found");
    }

    let user = match user {
        Ok(user) => user,
        Err(_) => return HttpResponse::BadRequest().body("Invalid user ID"),
    };

    let comment = match db
        .comment_factory
        .create(user, distro_name, content.content)
    {
        Ok(comment) => comment,
        Err(err) => return HttpResponse::BadRequest().body(err),
    };

    match db.post_comment(comment) {
        Ok(new_id) => HttpResponse::Ok().json(new_id),
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(index)
        .service(get_distros)
        .service(get_distro)
        .service(upvote_distro)
        .service(downvote_distro)
        .service(get_comments)
        .service(get_comment)
        .service(upvote_comment)
        .service(downvote_comment)
        .service(post_comment)
        .service(delete_comment);
}
