FROM python:3.8.5

WORKDIR /usr/src/app

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

COPY ./server ./server

ENV FLASK_ENV=production

EXPOSE 4000

CMD ["python", "-m", "server"]