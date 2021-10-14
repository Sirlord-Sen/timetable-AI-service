
class Handlers:
    def scalePredict(predict):
        if 'gpa' in predict.keys(): predict['gpa']   = predict["gpa"]/5
        if 'cwa' in predict.keys(): predict['cwa']   = predict["cwa"]/100
        predict['credit']       = predict["credit"]/6
        predict['difficulty']   = predict["difficulty"]/5
        if 'time' in predict.keys(): predict['time']   = predict["time"]/6
        if 'score' in predict.keys(): predict['score']   = predict["score"]/100
        if 'points' in predict.keys(): predict['points']   = predict["points"]/4

        return predict


    def upScale(predict):
        if 'cwa' in predict.keys(): predict['cwa']   = predict["cwa"] * 100
        if 'gpa' in predict.keys(): predict['gpa']   = predict["gpa"] * 5
        predict['credit']       = predict["credit"]*6
        predict['difficulty']   = predict["difficulty"]*5
        predict['time']         = predict["time"]*6
        if 'score' in predict.keys(): predict['score']   = predict["score"] * 100
        if 'points' in predict.keys(): predict['points']   = predict["points"] * 4

        return predict

    def buildResponse(data):
        pred_dict = Handlers.upScale(data)
        response = {
            'message': 'success',
            'data': {
                "user": pred_dict
            }
        }
        return response