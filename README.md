# Full-Stack Article Management System

This is a full-stack web application that allows users to register, log in, and perform various actions such as posting articles, viewing articles, deleting their own articles, updating their profiles, and viewing other user profiles. The backend is built using Django and Django REST Framework, while the frontend can be developed using React.js.

---

## Features

### User Features
- **Register**: Create a new account.
- **Login/Logout**: Secure authentication using Django's user model.
- **Update Profile**: Update user information such as bio, occupation, and profile image.
- **View Profile**: View your own or other users' profiles.
- **Search Profiles**: Search for other user profiles by username.

### Article Features
- **Post Article**: Create a new article with a title, description, and optional image.
- **Read Articles**: View a list of articles posted by all users.
- **Delete Article**: Delete your own articles.
- **Update Article**: Update your own articles.
- **Check Article Author Profile**: View the author's profile directly from the article.


---

## Technologies Used

### Backend
- Django
- Django REST Framework
- SQLite (default, replaceable with PostgreSQL/MySQL)
- Django Media Files for handling image uploads

### Frontend
- React.js with Tailwind CSS (or any preferred CSS framework)

---

## API Endpoints

### User Authentication
- `POST /api/register/` - Register a new user.
- `POST /api/token/` - Login to get a token.

### Profile Management
- `GET /user/profile/` - View your profile.
- `PUT /user/profile/<str:username>/` - Update your profile.

### Articles
- `GET /api/allarticle/` - Get a list of all articles.
- `POST /api/allarticle/` - Create a new article.
- `GET /api/allarticle/<id>/` - View a single article.
- `DELETE /api/allarticle/<id>/` - Delete your own article.

### Profile Search
- `GET /user/profile/` - Search All profiles.
- `GET /user/profile/<str:username>/` - Search for profiles by username.

---

## Installation and Setup

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rajivkr8207/Article-Management-System.git
   cd Article-Management-System
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
4. Run the migrations:
    ```bash
    python manage.py migrate
5. Start the development server:
    ```bash
    python manage.py runserver
---

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
2. Install the dependencies:
    ```bash
    npm install
3. Start the development server:
    ```bash
    npm run dev

---
## Usage
1. Register a new user or log in using an existing account.
2. Post articles with a title, description, and optional image.
3. Browse and read articles.
4. Update your profile with bio, occupation, and a profile picture.
5. Search for other user profiles and view their articles.

---
## Project Structure

### Backend
- `backend/`: The main directory for the backend project.
- `users`: Handles user authentication and profile management.
- `Article`: Manages article creation, reading, and updating.
- `media`: Stores uploaded profile pictures and article images.

### Frontend
- `src/components/`: Contains reusable React components.
- `src/pages/`: Contains page-level components such as Login, Register, Profile, etc.
- `src/context/`: Context API for global state management.