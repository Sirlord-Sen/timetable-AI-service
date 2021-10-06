def timetable_routes(api, app, root="api"):
    from app.timetable import timetable_routes as timetable
  

    # Add routes
    timetable(api, app)