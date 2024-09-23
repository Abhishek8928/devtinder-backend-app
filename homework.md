# Tasks :-

# day 1
- create a repository 
- initialize the project
- differnces between package.json , node_modules , package-lock.json
  - Whatever package we install, all its files are added to node_modules. This includes both direct dependencies (packages you install) and their sub-dependencies (dependencies of those packages).
  - This file holds the metadata of your project, such as the project name, version, scripts, and most importantly, the dependencies and devDependencies that your project needs to run and develop.
  - This file locks down the exact versions of dependencies your project is using. It ensures that every time the project is installed (e.g., on different machines), it uses the same version of every package, making the environment consistent. It also contains metadata about the dependency tree.

- install express command npm i express
- create a src folder and inside create index.js it can entry level code (starter for your project)

- create the server using express package and also app is listen to 7777 it will take all incoming request on port 7777

- making the request handler (writing the request handler)

- request handler for endpoints /test , /demo

- create a script for dev and prod to start the server

- version 4.20.4 first number denoted major , second minor , third patch
- ( ^ ) minor + patch upgrade of package automatically new feature + backward compactiable
- ( ~ ) patch upgrade of package automatically with new bugs fix and samll change in repo of express
- ( * ) minor + patch + major it can be a breaking change it can affect your exitising code (it is noyt safe to do)
- without any symbol that means we needed exact the same package 

- dependicies means our project is dependent (or) laying on express package  to work 

- (-g) flag are used inside the installtion of package because from any directory i can able to use use the nodemon command that is why we install some package as the global

- flag are used to modify the default behaviour of the command or else provide some extra option to the command

# day 2

- initialize the git in the project
- add the gitignore file 
- add the node_mouldes in it
- add all change and commit (using command line or gui)
- create a remote giuthub repository config with local machine and push the code on github
- played with multiple routes 
- order of the routes matters a lot 
- install the postman create a workspace with name devtinder , added collection 
- making different api call using postman
  - get 
  - post 
  - put
  - patch 
  - delete
- playing with routes pattern ? , + , *
- playing with regex as the route path
- use the query parameter and path prameter (dynamic routing) got to know about objects.key

# day 3

- work with route handler
- create multiple router handle for the single route
- playimg with route handler
- understand the req,res,next paramater
- what is middleware and why we needed them 
  - a middleware is also a function only before the request reached to main router handler the request has go throught through the middleware for authetication or adding some thing inside the req a middleware can so break the request and responses cycle also if needed because middleware also have access req, res object 
- how express js basically handles request behind the scenes
  - actualy when request reached to the server express go line by line check every routes which matches and then executed respective router handler and send back the responses if responses is sended still we are trying to send the responses we will get error becuase onces the responses is sended the connnection establish to server will be closed

- differences betweenn app.use and app.all
    - it is executed for any htpp method but if specified the path in app.use it work as app.all we specified the path then any request with match or having that path this function will be executed 
    - it is used to mount the middleware for all request
    - maximum both usecase are same itself 

- write dummy auth middleware for admin only
- write the dummy middleware for user but except /user/login