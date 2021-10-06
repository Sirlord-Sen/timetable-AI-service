from  flask import request, jsonify
from flask_restx import Namespace, Resource


api = Namespace('cwa_prediction', description="cwa predictions")

from ..services import CWAService
from ..dto import CWAScoreDto, CWATimeDto
from ..handlers import Handlers

score = CWAScoreDto.scoreDets
time = CWATimeDto.timeDets

@api.route('cwa/score')
class PredictScore(Resource):
    @api.doc('predict_the_score_of_student')
    @api.expect(score, validate=True)
    def post(self):
        data = request.json
        scaled_data = Handlers.scalePredict(data)
        predict = CWAService.predictScore(scaled_data)
        response = Handlers.buildResponse(predict)
        return jsonify(response)


@api.route('cwa/time')
class PredictScore(Resource):
    @api.doc('predict_the_score_of_student')
    @api.expect(time, validate=True)
    def post(self):
        data = request.json
        scaled_data = Handlers.scalePredict(data)
        predict = CWAService.predictTime(scaled_data)
        response = Handlers.buildResponse(predict)
        return jsonify(response)