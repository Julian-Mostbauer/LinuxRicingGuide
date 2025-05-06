# API Documentation

## Auth

### In our environment
There is an additional layer of abstraction for all endpoints. There are vue endpoints that wrap the real endpoints. Please use the vue endpoints for all requests.

Example:

```ts
import { getUserPartOfUID } from '~/assets/utils/idUtils'; // <------ Utils to get the user id

const id = await getUserPartOfUID(auth0); // <--- Check if you need the whole id or just the user part or just the season part

const res = await $fetch(`/api/dbWrapper/distros/distroInfo`, {
    method: 'POST',
    body: {
      name: 'debian',
      id: id,
    },
}) as any;
```

### In our vue Endpoints

**ONLY WORK ON THEM IF YOU KNOW WHAT YOU ARE DOING**

Users are differentiated by their auth0 sub field, which is an unchanging id for each user

It should be provided in the `X-User-ID` header of any request.

In some it is not needed or optional, this will be specified in each endpoint.

This is how you can access the id:

```ts
await auth0.getAccessTokenSilently()
```

This is how you should use it:

```ts
fetch('/comments/1', {
  method: 'DELETE',
  headers: {
    'X-User-ID': '1', // <----------------------------- Required header
    'Content-Type': 'application/json'
  }
})
```

```bash
❯ curl -X DELETE .../comments/1 \
      -H "X-User-ID: 1" \ <---------------------------- Required header
      -H "Content-Type: application/json" \
```
## Endpoints

### Index
- **Path**: `/`
- **Method**: GET
- **Description**: Basic health check endpoint
- **Auth**: `None`
- **Response**: 
  ```plaintext
  Hello, world!
  ```

### Get All Distributions
- **Path**: `/distros`
- **Method**: GET
- **Description**: Returns a list of all Linux distributions
- **Auth**: `None`
- **Response**: 
  ```json
  ["Ubuntu", "Fedora", "Arch", ...]
  ```

### Get Distribution Details
- **Path**: `/distros/{name}`
- **Method**: GET
- **Description**: Returns details about a specific distribution including vote counts
- **Parameters**:
  - `name`: Name of the distribution (path parameter)
- **Auth**: `Optional` user authentication (for your_vote field). Will always return "None" if not authenticated.
- **Response**:
  ```json
  {
    "name": "Ubuntu",
    "upvote_count": 42,
    "downvote_count": 3,
    "your_vote": "Up" // or "Down" or "None"
  }
  ```
- **Errors**:
  - 404: Distribution not found

### Upvote Distribution
- **Path**: `/distros/{name}/upvote`
- **Method**: POST
- **Description**: Upvotes a distribution (requires valid user authentication)
- **Parameters**:
  - `name`: Name of the distribution (path parameter)
- **Auth**: `Required` user authentication
- **Response**: 
  - Same as the GET distribution details response, but with updated vote counts.
  ```json
  {
    "name": "Ubuntu",
    "upvote_count": 42,
    "downvote_count": 3,
    "your_vote": "Up" // or "Down" or "None"
  }
  ```
- **Details**:
  - If the user has already downvoted, this will change their vote to upvote.
  - If the user has already upvoted, this will remove their vote.
  - If the user has not voted yet, this will set their vote to upvote.
- **Errors**:
  - 400: Invalid user ID or voting error
  - 404: Distribution not found

### Downvote Distribution
- **Path**: `/distros/{name}/downvote`
- **Method**: POST
- **Description**: Downvotes a distribution (requires valid user authentication)
- **Parameters**:
  - `name`: Name of the distribution (path parameter)
- **Auth**: `Required` user authentication
- **Response**: 
  - Same as the GET distribution details response, but with updated vote counts.
  ```json
  {
    "name": "Ubuntu",
    "upvote_count": 42,
    "downvote_count": 3,
    "your_vote": "Down" // or "Down" or "None"
  }
  ```
- **Details**:
  - If the user has already upvoted, this will change their vote to downvote.
  - If the user has already downvoted, this will remove their vote.
  - If the user has not voted yet, this will set their vote to downvote.
- **Errors**:
  - 400: Invalid user ID or voting error
  - 404: Distribution not found

### Get Comments for Distribution
- **Path**: `/distros/{distro_name}/comments`
- **Method**: GET
- **Description**: Returns comments for a distribution with optional pagination
- **Parameters**:
  - `distro_name`: Name of the distribution (path parameter)
  - `start`: Optional param for how many should be skipped at begining [!NOT ID] (query parameter)
  - `amount`: Optional param for how many should be taken from bunch [!NOT ID] (query parameter)
- **Example**: `/distros/Ubuntu/comments?start=0&amount=10`
- **Auth**: `Optional` user authentication (for your_vote field). Will always return "None" if not authenticated.
- **Response**: 
  ```json
  [
    {"id":0,"content":"hi there","timestamp_epoch":100,"upvote_count":3,"downvote_count":0,"your_vote":"None"},
    {"id":1,"content":"test","timestamp_epoch":120,"upvote_count":0,"downvote_count":3,"your_vote":"Down"},
    ...
  ]
  ```
- **Errors**:
  - 404: Distribution not found

### Get Comment Details
- **Path**: `/comments/{comment_id}`
- **Method**: GET
- **Description**: Returns details about a specific comment
- **Parameters**:
  - `comment_id`: ID of the comment (path parameter)
- **Auth**: `Optional` user authentication (for your_vote field). Will always return "None" if not authenticated.
- **Response**: 
  ```json
  {
    "id": 1,
    "content": "Great distro!",
    "timestamp_epoch": 1672531200,
    "upvote_count": 5,
    "downvote_count": 0,
    "your_vote": "None"
  }
  ```
- **Errors**:
  - 404: Comment not found

### Upvote Comment
- **Path**: `/comments/{id}/upvote`
- **Method**: POST
- **Description**: Upvotes a comment (requires valid user authentication)
- **Parameters**:
  - `id`: ID of the comment (path parameter)
- **Auth**: `Required` user authentication
- **Response**: 
  - Same as the GET comment details response, but with updated vote counts.
  ```json
  {
    "id": 1,
    "content": "Great distro!",
    "timestamp_epoch": 1672531200,
    "upvote_count": 6,
    "downvote_count": 0,
    "your_vote": "Up" // or "Down" or "None"
  }
  ```
- **Details**: Same as the upvote distribution endpoint.
- **Errors**:
  - 400: Invalid user ID or voting error
  - 404: Comment not found

### Downvote Comment
- **Path**: `/comments/{id}/downvote`
- **Method**: POST
- **Description**: Downvotes a comment (requires valid user authentication)
- **Parameters**:
  - `id`: ID of the comment (path parameter)
- **Response**: 
  - Same as the GET comment details response, but with updated vote counts.
  ```json
  {
    "id": 1,
    "content": "Great distro!",
    "timestamp_epoch": 1672531200,
    "upvote_count": 5,
    "downvote_count": 1,
    "your_vote": "Down" // or "Down" or "None"
  }
  ```
- **Details**: Same as the downvote distribution endpoint.
- **Errors**:
  - 400: Invalid user ID or voting error
  - 404: Comment not found

### Post Comment
- **Path**: `/comments/post/{distro_name}`
- **Method**: POST
- **Description**: Posts a new comment for a distribution (requires valid user authentication)
- **Parameters**:
  - `distro_name`: Name of the distribution (path parameter)
- **Auth**: `Required` user authentication
- **Body**:
  ```json
  {
    "content": "My comment text"
  }
  ```
- **Response**: 
  ```json
  42 // ID of the new comment
  ```
- **Errors**:
  - 400: Invalid user ID or comment creation error
  - 404: Distribution not found

### Delete Comment
- **Path**: `/comments/{id}`
- **Method**: DELETE
- **Description**: Deletes a comment (requires valid user authentication and ownership)
- **Parameters**:
  - `id`: ID of the comment (path parameter)
- **Auth**: `Required` user authentication
- **Response**: 200 OK on success
- **Errors**:
  - 400: Invalid user ID or deletion not authorized
  - 404: Comment not found

## Data Structures

### WfDistro
```json
{
  "name": "string",
  "upvote_count": 0,
  "downvote_count": 0,
  "your_vote": "None|Up|Down" // VoteStatus
}
```

### WfComment
```json
{
  "id": 0,
  "content": "string",
  "timestamp_epoch": 0,
  "upvote_count": 0,
  "downvote_count": 0,
  "your_vote": "None|Up|Down" // VoteStatus
}
```

### VoteStatus
Possible values:
- `"None"`
- `"Up"`
- `"Down"`