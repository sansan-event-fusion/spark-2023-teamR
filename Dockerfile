FROM python:3.10.12-alpine

WORKDIR /app
ADD ./backend/ /app
ADD requirements.txt /app

RUN pip install -r requirements.txt

RUN python manage.py migrate

EXPOSE 8080

CMD python manage.py runserver 0.0.0.0:8080