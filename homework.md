# Tasks :-

day 
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
