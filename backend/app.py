import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

demo_data = {
    "kwh": 285,
    "next10days": [{"price": 307, "date": "2022-10-22T23:20:08.772Z"}, {"price": 246, "date": "2022-10-23T23:20:08.772Z"}, {"price": 288, "date": "2022-10-24T23:20:08.772Z"}, {"price": 399, "date": "2022-10-25T23:20:08.772Z"}, {"price": 343, "date": "2022-10-26T23:20:08.772Z"}, {"price": 310, "date": "2022-10-27T23:20:08.772Z"}, {"price": 303, "date": "2022-10-28T23:20:08.772Z"}, {"price": 351, "date": "2022-10-29T23:20:08.772Z"}, {"price": 360, "date": "2022-10-30T23:20:08.772Z"}, {"price": 259, "date": "2022-10-31T23:20:08.772Z"}]
}

class PriceCalcParams(BaseModel):
    date: str
    approx_consuption: int


@app.post('/api/price-calculation')
def price_calculation(price_calc_params: PriceCalcParams):
    print(f"got price calc params {price_calc_params}")
    return demo_data


def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("backend.app:app", host="0.0.0.0", port=8000, reload=True)
