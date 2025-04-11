# CIS4004Project

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Python (v.3.8)
- Django (v5.1+)

## Ports

* Front end: 3000
* Backend: 8000
* Database (Remote Server): 3306

## Frontend Setup

1. Clone the repository

   ```bash
   git clone https://github.com/Noiiir/CIS4004Project
   cd CIS4004Project
   ```
2. Start the React server

   ```bash
   npm start
   ```

   You can view the application at http://localhost:3000

## Backend Setup

1. Create python virtual environment
2. run `pip install -r requirements.txt` to download dependencies.
3. run `cd djangoApp/gameCatalog/`
4. run  `python manage.py runserver`

## Database

The database is hosted on a remote server using DigitalOcean. Access should be available to all IPs. Remote server IP: 138.197.100.112

## Running the Website

To run the website make sure to run the `npm start` and the `python manage.py runserver` commands on separate terminals. Also note that when running the runserver command you must be in the /CIS4004Project/djangoApp/gameCatalog/ directory.

## Features

- User authentication
- Complie your games and consoles
- Compile your peripherals and accessories
- View saved data unqiue to the user

## Citation

1. Front end

   # Claude.ai was used for the following to, and impacted files

   -Help convert the initial html / css files to React files
   Prompt: Help me convert the following html and css files to ract files
   changed the html files we had into a .js file


   - About.js, AddData.js, CreateConsole.js, DatabbaseDisplay.js, GameCopiesFront.js, HomePage.js, ProtectedRoute.js, SignUp.js, VideogameDatabase.js, Index.js

   -Setup Propper routing through pages
   Prompt: Help me set a proper url routing between the pages (****) in react
   Helped integrate the routing between page urls

   - About.js, AddData.js, CreateConsole.js, DatabbaseDisplay.js, GameCopiesFront.js, HomePage.js, ProtectedRoute.js, SignUp.js, VideogameDatabase.js, Navbar.js

   -Integrate and utilize the tokens provided for Auth0
   Prompt: Help me create an auth and token setup for a react application
   set up the auth pages and set the token generation

   - AuthProvider.js, AuthTokenService.js, App.js

   -Impove site style
   Prompt: Help me edit this sitestyle.css to make my webpage better looking
   Helped set a general guidline for sitestyle.css that we could modify as needed and desired

   -SiteStyles.js

   -Help create helper api functions to the backend
   Prompt: Help me set up api calls to the back end with the following url paths (****)
   Set up the api.js file to work with the paramaters needed and gave a baseline to modify and work with

   - Api.js, DatabaseDisplay.js, App.js

   -Asisisted in making front end code more organized for collaboration and less messy
   Prompt: Can you help clean up this code and organize it stylistically, also add comments where you can
   Asked for a general clean up with some of the messier looking coding to unify coding style and comments

   - About.js, AddData.js, CreateConsole.js, DatabbaseDisplay.js, GameCopiesFront.js, HomePage.js, ProtectedRoute.js, SignUp.js, VideogameDatabase.js, Index.js

   -Assisted in setting up the files for django, initial set up and basic file outlines generated
   Prompt: Help me set up a django app that will connect to a react application as the front end and an sql server on the back end
   Set up the general files for a django application and created a baseline of file to work with.

   - settings.py, urls.py, models.py, views.py
