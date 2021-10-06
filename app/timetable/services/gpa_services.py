from os import path, getcwd
import numpy as np
from keras.models import load_model

class GPAService:
    @staticmethod
    def predictScore(predict):
        current_dir = path.join(getcwd())
        filename = "app\prediction\gpa_prediction\score_prediction\score_prediction.h5"
        file = path.join(current_dir, filename)

        model = load_model(file)
        
        data_prepared = np.array([
            predict["gpa"], 
            predict["credit"],
            predict["time"],
            predict["difficulty"]            
            ]).reshape(-1,4)

        predict["score"] = float(model.predict(data_prepared, verbose=1).reshape(-1, 1)[0][0])

        return predict 


    @staticmethod
    def predictTime(predict):
        current_dir = path.join(getcwd())
        filename = "app\prediction\gpa_prediction\\time_prediction\\time_prediction.h5"
        file = path.join(current_dir, filename)

        model = load_model(file)
        
        data_prepared = np.array([
            predict["gpa"], 
            predict["credit"],
            predict["difficulty"],
            predict["score"],           
            ]).reshape(-1,4)

        predict["time"] = float(model.predict(data_prepared, verbose=1).reshape(-1, 1)[0][0])

        return predict 