# -*- coding: utf-8 -*-
"""
Created on Thu Oct 27 20:02:49 2022

@author: Emil
"""
import pandas as pd
import numpy as np
from datetime import datetime as dt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

data=pd.read_csv("estimation_data.csv")
grouped=data.groupby(["day","month","hour"]).mean().reset_index()
grouped=grouped.sort_values(["month","day","hour"])

np.random.seed(1)
x=data[["hour","gas_price","oil_price","load","doy"]]
y=data["price"]
xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=.15)

rfr = RandomForestRegressor()
rfr.fit(xtrain, ytrain)
score = rfr.score(xtest, ytest)
print("random forest R-squared:", score)

def predictfromtime(time):
    #returns estimated electricity price in EUR/MWh
    #gas price and oil price set as their respective averages for 2022
    #load is calculated as average from the data
    #doy = day of year (1-366)
    d=dt.strptime(time,"%d.%m.%Y %H")
    hour=d.hour
    doy=d.timetuple().tm_yday
    day=d.day
    month=d.month
    load=grouped[(grouped["hour"]==hour) & (grouped["day"]==day) & (grouped["month"]==month)]["load"].item()
    inputs=np.array([hour,6.7,105,load,doy]).reshape(-1,5)
    df=pd.DataFrame(inputs,columns=["hour","gas_price","oil_price","load","doy"])
    return rfr.predict(df)[0]

print(predictfromtime("21.11.2022 08"))
