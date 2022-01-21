# English school API 

### Technologies used:
REST using Node.js, Mysql, Express, Sequelize and Redis.

### Architecture description:
To create the project, the MVC software architecture pattern with service layer was chosen. 

## Things to do before run the project:
1. Create database
2. Create .env file and in this set a secret password with the name CHAVE_JWT 
3. Set your database access data in /src/database/config.json 
4. Run migrations: npx sequelize-cli db:migrate
5. Run npm run start to start server

## Postman
[**Documentation in Postman**](https://documenter.getpostman.com/view/16658273/UVXoktPx#intro)

## Directory Structure:
```
├── /src
|   ├── /controllers
|   ├── /database
|   |   ├── /migrations
|   |   ├── /seeds
|   ├── /authentications
|   ├── /middlewares
|   ├── /models
|   ├── /routes
|   ├── /services
├── /redis
```