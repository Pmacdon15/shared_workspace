# Shared Workspaces

This app Shared Workspaces is made with My Sql and Node.js(Express). The back end talks to the Database and serve all the information to the client side. Currently there is no front end but that will be next. 
 

## Table of Contents

- [Installation](#Installation)
- [Requirements](#Requirements)
- [Database](#Database)
- [Startup](#Startup)

## Installation

> **Note**
> For easy cloning it is recommended you have git installed.

Navigate to a terminal and directory you want to clone the repository in and type:

 ```bash

git clone https://github.com/Pmacdonald15/shared_workspaces

```

## Requirements

Next we will need to install the Node Modules, I will list the commands here:

```bash

cd shared_workspaces

```

```bash

npm install

```

```bash

cd client

```

```bash

npm install

```

## Database

This project requires a My Sql database connection. After downloading and installing MySql, Configure your database and take note of the credentials. There is a file in the repository, in shared_workspaces/server, named schema.sql that has the configuration for the My Sql database. Simply copy and paste this code in to the My Sql terminal after logging on to the database.

This project Requires a .env file setup in the following manner to connect to the database(using the credentials that you set up the database with): 

 ```.env

MYSQL_HOST=' '
MYSQL_USER=' '
MYSQL_PASSWORD=' '
MYSQL_DATABASE='shared_workspaces'

```

> [!IMPORTANT]
>The .env file should be located inside of root directory of the project.

## Startup

If you are in the root directory of the project run:

```bash

npm start

```

The server is now running. You can contact the app at localhost:4455/ or using your public Ip address after applying the appropriate port forwarding to your router.(Depending on your system you can hold control on the keyboard and click on the link in the terminal, after starting the server)
