TORTOISE_ORM = {
    "connections": {
         "default": "mysql://root:@localhost:3306/interviewsmart"
    },
    "apps": {
        "Todo": {
            "models": [
                 "models", "aerich.models"
            ],
            "default_connection": "default",
        },
    },
}