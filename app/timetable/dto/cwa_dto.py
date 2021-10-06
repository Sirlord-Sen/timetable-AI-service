from flask_restx.fields import Float
from ..controllers.cwa_controllers import api

class ScoreDto:
    scoreDets = api.model('cwa_prediction', {
        'cwa': Float(required=True),
        "credit": Float(required=True),
        "difficulty": Float(required=True),
        "time": Float(required=True)
    })

class TimeDto:
    timeDets = api.model('cwa_prediction', {
        'cwa': Float(required=True),
        "credit": Float(required=True),
        "difficulty": Float(required=True),
        "score": Float(required=True)
    })