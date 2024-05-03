from fastapi import FastAPI
from uvicorn import run
from tortoise.contrib.fastapi import register_tortoise
from contextlib import asynccontextmanager
import os

from routers import todo_routers 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


#cors urls
origins=[
    '*'
]
#middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



port = os.environ.get('PORT', 8000)
db_provider = os.environ.get('DB_PROVIDER', "mysql")
db_username = os.environ.get('DB_USERNAME', "root")
db_password = os.environ.get('DB_PASSWORD', "")
db_name = os.environ.get('DB_NAME', "interviewsmart")
db_host = os.environ.get('DB_HOST', "localhost")
db_port = os.environ.get('DB_PORT', "3306")

app.include_router(todo_routers.router)

register_tortoise(
    app=app,
    db_url=f"{db_provider}://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}", 
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
    

if __name__ == "__main__":
    run(app=app, port=port, host="0.0.0.0")