
# Ecommerce Website

This is an ecommerce website built using modern web development technologies. The website allows users to browse products and services online.


## Table of content

* **Features**
* **Technologies**
* **Tools Required**
* **Installation**


## Features

* Browse through the available products
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

* Node.js -  `https://nodejs.org/en/`
* JDK - `https://www.oracle.com/in/java/technologies/downloads/#java17`
* MySQL Server - `https://dev.mysql.com/downloads/mysql/`
* Git - `https://git-scm.com/downloads`
## Installation

To run the project locally follow these steps:

* Clone the two backend projects in your local machine
```
git clone https://github.com/Rafael00X/Ecommerce-Backend-One.git
git clone https://github.com/Rafael00X/Ecommerce-Backend-Two.git
```

* Set the database details in application.properties files of both the backend projects
```
src/main/resources/application.properties
```

* Run the two projects using IntelliJ, Eclipse or any other IDE. To run them, you need to run the `main()` method in `BackendOneApplication.java` and `BackendTwoApplication.java` classes respectively.

* Type this link in browser to populate the database
```
http://localhost:8081/dev/resetdb
```

* Now clone the frontend project in your local machine
```
git clone https://github.com/Rafael00X/Ecommerce-Frontend.git
```

* Go to the frontend directory and install npm dependencies
```
cd Website-Client/
npm install
```

* Run the frontend project
```
npm start
```

* The webpage is now running on your local machine. You can visit it by going to the following link
```
http://localhost:3000
```