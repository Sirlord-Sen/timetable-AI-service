from  flask import request, jsonify
from flask_restx import Namespace, Resource


api = Namespace('gpa_prediction', description="gpa predictions")

from ..services import GPAService
from ..dto import GPAScoreDto, GPATimeDto
from ..handlers import Handlers

score = GPAScoreDto.scoreDets
time = GPATimeDto.timeDets

@api.route('gpa/score')
class PredictScore(Resource):
    @api.doc('predict_the_score_of_student')
    @api.expect(score, validate=True)
    def post(self):
        data = request.json
        scaled_data = Handlers.scalePredict(data)
        predict = GPAService.predictScore(scaled_data)
        response = Handlers.buildResponse(predict)
        return jsonify(response)


@api.route('gpa/time')
class PredictScore(Resource):
    @api.doc('predict_the_score_of_student')
    @api.expect(time, validate=True)
    def post(self):
        data = request.json
        scaled_data = Handlers.scalePredict(data)
        predict = GPAService.predictTime(scaled_data)
        response = Handlers.buildResponse(predict)
        return jsonify(response)