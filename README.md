# BouamraTodoChallenge
challenge of Smart Driling Company

# FastAPI and React Project

This project demonstrates how to build a web application using FastAPI for the backend and React for the frontend.

## Features
- RESTful API with FastAPI
- Integration of backend and frontend
-Create, read, update, and delete (CRUD) operations for Todo items
## Prerequisites

Make sure you have the following installed on your machine:

- Python 3.x
- Node.js
- npm or yarn

## Installation

### Backend (FastAPI)

1. Navigate to the `back` directory.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3.Activate the virtual environment:
    On Windows:
```bash
venv\Scripts\activate
```
4.Install the dependencies
```bash
pip install -r requirements.py
```
4.Run the folder
```bash
python main .py
```
The project would be running on
http://127.0.0.1:8000
### Backend (FastAPI)
You can find the API documentation by accessing the following URL after running the FastAPI server:

http://localhost:8000/docs

This will open the Swagger UI, where you can interact with the API endpoints and view the documentation.


### Frontend (React)
1.Navigate to the front directory.
2.Install the dependencies:
    ```bash
yarn install
```
3.Run using
   ```bash
yarn dev
```
The file should be running on :http://127.0.0.1:3030
### Database 
Please create the database as follow
DB_PROVIDER = mysql
DB_USERNAME = root
DB_PASSWORD = ""
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = interviewsmart
###creating a database
1.Get into phpmyadmin
2.Create a database called interviewsmart 

Database Migrations

This project uses Aerich for database migrations. You can run migrations using the following commands:
1.Initialize Aerich:
```bash
aerich init -t tortoise_config.TORTOISE_ORM
```
2.Modify your database structure  on models.py 

3.Generate a migration:
```bash
aerich migrate
```
4.Apply migrations:

```bash
aerich upgrade
```
### To run backend
Get to back folder
Run
```bash
python main .py
```
The project would be running on
http://127.0.0.1:8000
### To run frontend
Get to front folder
Run
```bash
yarn dev
```
The project would be running on
http://127.0.0.1:3030




