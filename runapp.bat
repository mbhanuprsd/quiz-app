:: Need python 3.9.1 and npm 6.14.10 installed on the Windows system
cd frontend
echo Quizapp ------- Installing the reactjs dependencies
call npm install
echo Quizapp ------- Creating the reactjs build and copying it into backend folder
call npm run build-win
echo Quizapp ------- Switching to backend folder
cd ..\backend
echo Quizapp ------- Creating python environment
call python -m venv env
echo Quizapp ------- Activating python environment
call env\Scripts\activate.bat
echo Quizapp ------- Installing python django dependencies
call pip install -r requirements.txt
echo Quizapp ------- Updating DB in django
call python manage.py makemigrations
call python manage.py migrate
cd ..
echo Quizapp ------- Running server on localhost:8000
call python backend\manage.py runserver
