from fastapi import APIRouter
from controllers.todo_controller import *
from models import TodosIn_Pydantic,Todos
from typing import List
from tortoise.query_utils import Prefetch

router = APIRouter()

@router.post('/todo', response_model=list[Todos_Pydantic])
async def add_todo(todo_info: TodosIn_Pydantic):
    return await add_todo_controller(todo_info)

@router.get('/todo', response_model=List[Todos_Pydantic])  # Use List type from typing module
async def get_all_todos():
    return await get_all_todos_controller()
     

@router.get('/todo/{todo_id}', response_model=Todos_Pydantic)
async def get_specific_todo(todo_id: str):
    return await get_specific_todo_controller(todo_id)

@router.delete('/todo/{todo_id}', response_model=list[Todos_Pydantic])
async def delete_todo(todo_id: str):
    return await delete_todo_controller(todo_id)

@router.delete('/todo')
async def delete_all_todos():
    return await delete_all_todos_controller()

@router.put('/todocontent/{todo_id}',response_model=Todos_Pydantic)
async def update_todo_content(todo_id: str, update_info: TodosIn_Pydantic):
        updated_todo = await update_todo_content_controller(todo_id, update_info)
        return updated_todo
"""async def update_todo_content(todo_id: str, update_info: TodosIn_Pydantic):
    return  update_todo_content_controller(todo_id, update_info)"""



@router.put('/todostatus/{todo_id}',response_model=Todos_Pydantic)
async def update_todo_status(todo_id: str, update_info: TodosIn_Pydantic):
        updated_todo = await update_todo_content_controller(todo_id, update_info)

        return updated_todo
