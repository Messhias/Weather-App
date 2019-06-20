# Backend

This is the backend of application and for running here I 
will guide you step by step, if you face any issues or problems
don't hesitate to open
an issue that will be my pleasure to help you out on that.

### Introduction

This application uses [Nodejs](https://nodejs.org/en/) for 
backend engine system, for database we're using [PostGres SQL](https://www.postgresql.org/) and finally
[Docker](http://docker.com) for containerization of the 
application (in that way you don't need to install the PostGres SQL locally).


### Installation

- Install [Docker](http://docker.com) first.
- Use some package system, [yarn](https://yarnpkg.com/) or 
[npm](https://www.npmjs.com/) (I'm using yarn).

After install those packages above you can just run the 
application using the following commands:

``docker // to check if your docker is running``

Go to the directory application

```
docker-compose up -d
```

Run the ***tables.sql***  in your database (you can do in a lot ways),
 but I suggest you use some database managers system.

```
<npm or yarn> install
<npm or yarn> start
```

It's done, your application is running.