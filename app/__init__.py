from flask import Flask
from flask_restx import Api

from config.config import config_by_name
from .routes import timetable_routes

def create_app(config_name):
    app = Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False
    app.config.from_object(config_by_name[config_name])
    api = Api(app, title="Timetable Prediction API", version="1.0")

    from app.timetable.controllers.cwa_controllers import api as cwa_api 
    from app.timetable.middlewares import after_request_middleware, before_request_middleware
    from app.timetable.middlewares import response_middlewares as response

    before_request_middleware(app=app)
    after_request_middleware(app=app)
    
    # register custom error handler
    response.json_error_handler(app=app)
    
    # Using routes
    timetable_routes(api, app) 

    return app




