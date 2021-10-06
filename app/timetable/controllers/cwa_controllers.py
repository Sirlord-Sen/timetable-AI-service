import json
from  flask import request, jsonify
from flask_restx import Namespace, Resource


api = Namespace('cwa_prediction', description="cwa predictions")

from ..services import CWAService
from ..dto import ScoreDto, TimeDto
from ..handlers import CWAHandlers

score = ScoreDto.scoreDets
time = TimeDto.timeDets

@api.route('cwa/score')
class PredictScore(Resource):
    @api.doc('predict_the_score_of_student')
    @api.expect(score, validate=True)
    def post(self):
        data = request.json
        scaled_data = CWAHandlers.scalePredict(data)
        predict = CWAService.predictScore(scaled_data)
        response = CWAHandlers.buildResponse(predict)
        return jsonify(response)


@api.route('cwa/time')
class PredictScore(Resource):
    @api.doc('predict_the_score_of_student')
    @api.expect(time, validate=True)
    def post(self):
        data = request.json
        scaled_data = CWAHandlers.scalePredict(data)
        predict = CWAService.predictTime(scaled_data)
        response = CWAHandlers.buildResponse(predict)
        return jsonify(response)