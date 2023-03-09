
# Ecommerce Website

This is an e-commerce website built using full-stack web development technologies. The website allows users to browse products and services online.

## Watch this video demo here
[![Watch this demo here](https://img.youtube.com/vi/r7Tiu2uz9KU/0.jpg)](https://www.youtube.com/watch?v=r7Tiu2uz9KU)

## Table of content

* **Features**
* **Technologies**
* **Tools Required**
* **Installation Guide**
* **Links**
## Features

* Browse through and search among the available products
* View product details, images, and customer reviews
* Add products to your shopping cart
* Create an account to track your orders and save your favorite items
## Technologies

* **Frontend** - React, Redux, Bootstrap, HTML, CSS
* **Backend** - Spring Boot, RestAPI
* **Database** - MySQL
* **Testing** - Mockito, JUnit
## Tools Required

The following are the tools and dependencies needed to locally run this project:

* [Node.js](`https://nodejs.org/en/`)
* [Java IDE with JDK](`https://www.jetbrains.com/idea/download/`)
* [MySQL Database Server](`https://dev.mysql.com/downloads/mysql/`)
* [Git](`https://git-scm.com/downloads/`)
## Installation Guide

To run the project locally follow these steps:

* Clone the three repos in your local machine
    ```
    git clone https://github.com/Rafael00X/Ecommerce-Frontend.git
    git clone https://github.com/Rafael00X/Ecommerce-Backend-One.git
    git clone https://github.com/Rafael00X/Ecommerce-Backend-Two.git
    ```

* Open the backend spring boot projects in Java IDE and enter the database connection details in `application.properties` files of both the backend projects. The files are located in `src/main/resources/application.properties`.

* Run the backend projects. To run them, you need to run the `main()` method in `BackendOneApplication.java` and `BackendTwoApplication.java` classes respectively.

* After the backend servers start, type this link in browser to populate the database
    ```
    http://localhost:8081/dev/resetdb
    ```

* Go to the frontend project directory and install npm dependencies, then run the project
    ```
    npm install
    npm start
    ```

* The application is now running on your local machine. You can visit it by going to the following link
    ```
    http://localhost:3000
    ```

## Links

* [Ecommerce Backend One](https://github.com/Rafael00X/Ecommerce-Backend-One.git)
* [Ecommerce Backend Two](https://github.com/Rafael00X/Ecommerce-Backend-Two.git)