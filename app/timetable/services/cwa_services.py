from os import path, getcwd
import numpy as np
from keras.models import load_model

class CWAService:
    @staticmethod
    def predictScore(predict):
        current_dir = path.join(getcwd())
        filename = "app\prediction\cwa_prediction\score_prediction\score_prediction_1.h5"
        file = path.join(current_dir, filename)

        model = load_model(file)
        
        data_prepared = np.array([
            predict["cwa"], 
            predict["credit"],
            predict["time"],
            predict["difficulty"]            
            ]).reshape(-1,4)

        predict["score"] = float(model.predict(data_prepared, verbose=1).reshape(-1, 1)[0][0])

        return predict 