# Introduction

Welcome to my testing project for Silesian University of Zabrze, for faculty management and organization. This project is simple todo-list with express for back-end and react for front-end

## Why?

The project for study purposes is going to be started for a day, and I need something that will remind me, how to code properly.

## How to start?

Project has been provided with ❤️ Docker configuration. This means that you can use Docker for this project, and run it as you want to. 
Later we have back-end for which documentation is going to be available soon. For front-end there's only react so, you can manage this as you need to.

Please, if you want to start you can download my image from docker hub

```sh
docker pull overblitz/silesian-project
```

then, do the following:

```sh
docker-compose up -d
```

go to **http://localhost:8081** to run phpmyadmin for better administration targets and **http://localhost:3500**. Port 3500 is default port for this project.
You can change it, with 

```sh
docker container run -p <your_desired_port>:3500 --name <your_app_name> -d
```

## Follow me

- [My github profile](https://github.com/BrittleHeart)
- [My gitlab profile](https://gitlab.com/BrittleHeart)