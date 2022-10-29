import pandas as pd
import numpy as np
import joblib as jl

from datetime import datetime as dt
from datetime import timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

class PriceEstimator:
    def __init__(self):
        data = pd.read_csv("./model_and_predictions/estimation_data.csv")
        grouped = data.groupby(["day","month","hour"]).mean().reset_index()
        self.grouped = grouped.sort_values(["month","day","hour"])

        try:
            self.rfr = jl.load('model.joblib')
        except:
            self._train()

    def _train(self):
        np.random.seed(1)
        x = data[["hour","gas_price","oil_price","load","doy"]]
        y = data["price"]
        xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=.15)

        rfr = RandomForestRegressor()
        rfr.fit(xtrain, ytrain)
        score = rfr.score(xtest, ytest)
        print("random forest R-squared:", score)
        jl.dump(rfr, 'model.joblib')
        self.rfr = rfr

    def estimate_24h(self, time: str) -> float:
        d = dt.strptime(time,"%Y-%m-%d")
        doy = d.timetuple().tm_yday
        day = d.day
        month = d.month

        prices = []
        for hour in range(0, 24):
            load = self.grouped[
                (self.grouped["hour"] == hour) &
                (self.grouped["day"] == day) &
                (self.grouped["month"] == max(month, 11)) # Data in december returns invalid results for some reason
            ]["load"].item()
            inputs = np.array([hour,6.7,105,load,doy]).reshape(-1,5)
            df = pd.DataFrame(inputs,columns = ["hour","gas_price","oil_price","load","doy"])
            prices.append(self.rfr.predict(df)[0])
        return pd.DataFrame(prices).mean()[0]

    def estimate_10days(self, time: str) -> float:
        d = dt.strptime(time,"%Y-%m-%d")

        results = []

        for day in range(1, 11):
            new_d = d + timedelta(days = day)
            ts_str = new_d.strftime("%Y-%m-%d")
            results.append({
                "date": ts_str,
                "price": self.estimate_24h(ts_str)
            })

        return results

