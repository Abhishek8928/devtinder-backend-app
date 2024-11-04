# DevTinder API Endpoints

## Authentication Router
- POST  /auth/login // User login
- POST  /auth/signup // User signup

## User Profile Router
- GET /profile/:userId // View user profile
- GET /profile/view // View logged in user profile
- PATCH /profile/edit // Update user profile (excluding email)
- DELETE /profile/destroy // Delete user account
- PATCH /profile/updatePassword // Update the user password

## Connection Request Router
- POST /request/status/:toUserId
  - status -> ignored , interested
- POST /review/status/:requestId
  - status -> accepeted , rejected

## Connection Router
- GET /user/connection // view all connection request

## Feed Router
- GET /feed // View all users on the platform

# User Router

- GET /request/received // to viw all the incoming request 
- GET /view/connection // to see all the mutual connection

## additional Router
- GET /search?search={searchTerm} // Searches for users based on the provided search term
