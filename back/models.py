from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Todos(models.Model):
    id = fields.UUIDField(pk=True)
    content = fields.CharField(max_length=254)
    status = fields.IntField(max_length=1,default=0)


Todos_Pydantic = pydantic_model_creator(Todos, name="Todos")
TodosIn_Pydantic = pydantic_model_creator(Todos, name="TodosIn", exclude_readonly=True)
