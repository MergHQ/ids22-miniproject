FROM nikolaik/python-nodejs:python3.9-nodejs16

WORKDIR /app
COPY ./backend ./backend/
COPY ./frontend ./frontend/
COPY ./model_and_predictions ./model_and_predictions/
COPY  README.md poetry.lock pyproject.toml .

RUN cd frontend && npm i && npx parcel build ./public/index.html && NODE_ENV=production npm prune
RUN poetry install

CMD ["poetry", "run", "start"]
