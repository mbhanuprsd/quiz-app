python -m venv env
env\Scripts\activate.bat
pip install -r requirements.txt

npm install
npm audit fix
npm run build

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic

python manage.py runserver
