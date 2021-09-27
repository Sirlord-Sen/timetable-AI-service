BASE_ROUTE = "v1/timetable_prediction"


def timetable_routes(api, app, root="api"):
    from .controllers.cwa_controllers import api as cwa_api

    api.add_namespace(cwa_api, path=f"/{root}/{BASE_ROUTE}/")
