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
- POST /request/ignore/:toUserId  // Ignore a user
- POST /request/interested/:toUserId  // Show interest in a user
- POST /request/accept/:userId // Accept a connection request
- POST /request/declined/:userId // Decline a connection request

## Connection Router
- GET /connection // View all connections
- GET /connection/received // View all received connection requests

## Feed Router
- GET /feed // View all users on the platform



- GET 
## additional Router
- GET /search?search={searchTerm} // Searches for users based on the provided search term
