# -*- coding: utf-8 -*-
"""
Created on Fri Sep 30 02:44:00 2022

@author: Emil
"""

import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
from datetime import datetime as dt
import ennemi as en
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import load_boston
from sklearn.datasets import make_regression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import scale
import matplotlib.pyplot as plt
from sklearn import set_config 
 

weather=pd.read_csv("weather.csv")
weather["datetime"]=[dt.strptime(x, "%Y-%m-%d %H:%M:%S") for x in weather["timestamp"]]
load=pd.read_csv("load.csv")
load["datetime"]=[dt.strptime(x, "%d.%m.%Y %H:%M") for x in [x[:16] for x in load["Time (CET/CEST)"]]]
load.rename(columns={"Actual Total Load [MW] - BZN|FI":"load"},inplace=True)
#CEST INSTEAD OF EST 
#gen=pd.read_csv("generation.csv")
#gen["datetime"]=[dt.strptime(x, "%d.%m.%Y %H:%M") for x in [x[:16] for x in gen["MTU"]]]
price=pd.read_csv("price.csv")
price["datetime"]=[dt.strptime(x, "%d.%m.%Y %H:%M") for x in [x[:16] for x in price["MTU (CET/CEST)"]]]
price.rename(columns={"Day-ahead Price [EUR/MWh]":"price"},inplace=True)

#data=weather.merge(gen,on=["datetime"]).merge(load,on="datetime").merge(price,on="datetime")
#data.drop(columns=["timestamp","Unnamed: 0_x","Area","MTU","Unnamed: 0_y","Time (CET/CEST)","Unnamed: 0","MTU (CET/CEST)","Currency","BZN|FI"],inplace=True)
data=weather.merge(load,on="datetime").merge(price,on="datetime")
data.drop(columns=["timestamp","Unnamed: 0_x","Unnamed: 0_y","Time (CET/CEST)","MTU (CET/CEST)","Currency","BZN|FI"],inplace=True)
for c in data.columns:
    if c!="datetime":
        data[c]=np.float_(data[c])
#mi=en.pairwise_mi(data.drop(columns="datetime"),drop_nan=True,normalize=True,cond=data["air_temperature"])

linear=LinearRegression()
#data.fillna(data.mean(), inplace=True)
data=data.dropna()
x=data[["load","air_temperature"]]
#x=data.drop(columns=["datetime","price"])
y=data["price"]
xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=.15)

linear.fit(xtrain,ytrain)
print("linear regression R-squared:",linear.score(xtrain,ytrain))

#x = scale(x)
#y = scale(y)
rfr = RandomForestRegressor()
rfr.fit(xtrain, ytrain)
score = rfr.score(xtrain, ytrain)
print("random forest R-squared:", score)
ypred = rfr.predict(xtest)
















