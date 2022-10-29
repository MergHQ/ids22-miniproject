import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from backend.estimate import PriceEstimator

app = FastAPI()


class PriceEstimationParams(BaseModel):
    date: str
    approx_consumption: int

class Next10Days(BaseModel):
    price: int
    date: str

class PriceEstimationResult(BaseModel):
    date: str
    approx_consumption: int
    price: float
    next10days: list[Next10Days]

estimator = PriceEstimator()

@app.post('/api/price')
def price_calculation(price_calc_params: PriceEstimationParams) -> PriceEstimationResult:
    print(f"got price calc params {price_calc_params}")
    price24h = estimator.estimate_24h(price_calc_params.date)
    next10days = estimator.estimate_10days(price_calc_params.date)
    return {
        "date": price_calc_params.date,
        "approx_consumption": price_calc_params.approx_consumption,
        "price": price24h,
        "next10days": next10days,
    }


def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("backend.app:app", host="0.0.0.0", port=8000, reload=True)
