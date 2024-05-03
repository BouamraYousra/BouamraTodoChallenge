from http.client import HTTPException
from models import TodosIn_Pydantic,Todos,Todos_Pydantic
import logging
async def add_todo_controller(todo_info: Todos_Pydantic):
    await Todos.create(**todo_info.dict(exclude_unset=True))
    return await get_all_todos_controller()

async def get_all_todos_controller():
    return await Todos_Pydantic.from_queryset(Todos.all())


async def get_specific_todo_controller(todo_id: int):
    todo = await TodosIn_Pydantic.from_queryset_single(Todos.get(id=todo_id))
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

async def delete_todo_controller(todo_id: str):
    deleted_count = await Todos.filter(id=todo_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail="Todo not found")
    return await get_all_todos_controller()

async def delete_all_todos_controller():
    await Todos.all().delete()
    return []

async def update_todo_content_controller(todo_id: int, update_info: TodosIn_Pydantic):
    todoup = await Todos.get(id=todo_id)
    if not todoup:
        raise HTTPException(status_code=404, detail="Todo not found")
    await todoup.update_from_dict({"content": update_info.dict()['content']})
    await todoup.save()  # Save the changes to the database
    return await Todos_Pydantic.from_tortoise_orm(todoup)

async def update_todo_status_controller(todo_id: int, update_info: TodosIn_Pydantic):
    todoup = await Todos.get(id=todo_id)
    if not todoup:
        raise HTTPException(status_code=404, detail="Todo not found")
    await todoup.update_from_dict({"status": update_info.dict()['status']})
    await todoup.save()  # Save the changes to the database
    return await Todos_Pydantic.from_tortoise_orm(todoup)