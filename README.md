# Jagire Nepali

Jagire Nepali is a freelance work platform with local skill matching, designed to connect job seekers with job providers efficiently.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Django (Python)
- **Database:** PostgreSQL
- **Task Queue:** Celery with Redis

## Features

- User authentication (Sign up, Login, JWT-based authentication)
- Job posting and job application system
- User profiles (Job seekers & job providers)
- Search and filter functionality for jobs
- Review and rating system
- Email notifications for job updates

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js & npm (for frontend)
- Python 3 & pip (for backend)
- PostgreSQL database
- Redis (for Celery)

### Backend Setup (Django)

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/jagire-nepali.git
   cd jagire-nepali/backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows use: env\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Configure the `.env` file:
   ```sh
   cp .env.example .env  # Update the database settings in .env
   ```
5. Run migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the development server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup (React.js)

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

### Running Celery

Ensure Redis is running before starting Celery.

```sh
celery -A backend worker --loglevel=info
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

This project is open-source and available under the [MIT License](LICENSE).
