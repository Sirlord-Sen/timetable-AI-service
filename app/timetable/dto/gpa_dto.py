from flask_restx.fields import Float
from ..controllers.cwa_controllers import api

class GPAScoreDto:
    pointsDets = api.model('gpa_prediction', {
        'gpa': Float(required=True),
        "credit": Float(required=True),
        "difficulty": Float(required=True),
        "time": Float(required=True)
    })

class GPATimeDto:
    timeDets = api.model('gpa_prediction', {
        'gpa': Float(required=True),
        "credit": Float(required=True),
        "difficulty": Float(required=True),
        "points": Float(required=True)
    })