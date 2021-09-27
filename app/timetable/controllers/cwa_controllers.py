import json
from  flask import request, jsonify
from flask_restx import Namespace, Resource


api = Namespace('cwa_prediction', description="cwa predictions")

from ..services import CWAService
from ..dto import ScoreDto
from ..handlers import CWAHandlers

score = ScoreDto.scoreDets

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