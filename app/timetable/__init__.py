BASE_ROUTE = "v1/timetable_prediction"


def timetable_routes(api, app, root="api"):
    from .controllers import cwa_api
    from .controllers import gpa_api

    api.add_namespace(cwa_api, path=f"/{root}/{BASE_ROUTE}/")
    api.add_namespace(gpa_api, path=f"/{root}/{BASE_ROUTE}/")
