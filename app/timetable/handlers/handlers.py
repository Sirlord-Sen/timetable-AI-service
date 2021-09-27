from app.timetable.services.cwa_services import CWAService
from ..dto import ScoreDto

class CWAHandlers:
    def scalePredict(predict):
        predict['cwa']          = predict["cwa"]/100
        predict['credit']       = predict["credit"]/10
        predict['difficulty']   = predict["difficulty"]/5
        if 'time' in predict.keys(): predict['time']   = predict["time"]/6
        if 'score' in predict.keys(): predict['score']   = predict["score"]/100

        return predict


    def upScale(predict):
        predict['cwa']          = predict["cwa"] * 100
        predict['credit']       = predict["credit"]*10
        predict['difficulty']   = predict["difficulty"]*5
        predict['time']         = predict["time"]*6
        predict['score']        = predict["score"]*100

        return predict

    def buildResponse(data):
        pred_dict = CWAHandlers.upScale(data)
        response = {
            'message': 'success',
            'data': {
                "user": pred_dict
            }
        }
        return response