def timetable_routes(api, app, root="api"):
    from app.timetable import timetable_routes as attach_timetable
  

    # Add routes
    attach_timetable(api, app)