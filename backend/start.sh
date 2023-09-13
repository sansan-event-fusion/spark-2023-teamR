echo migrationStart
python manage.py migrate
echo migrationEnd
gunicorn gunicorn mysite.wsgi --bind 0.0.0.0:8000