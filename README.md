# Xenovate - Code Analysis and Optimization Platform

Xenovate is a powerful platform that helps developers analyze, optimize, and convert code between different programming languages using advanced AI technology.

## Features

- **Code Analysis**: Get detailed complexity analysis and explanations of your code
- **Optimization Suggestions**: Receive AI-powered recommendations to improve your code
- **Language Conversion**: Convert code between multiple programming languages
- **Real-time Analysis**: Get instant feedback on your code
- **Modern UI**: Clean and intuitive interface built with Next.js and Tailwind CSS
- **User Authentication**: Secure login and signup with Supabase

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Markdown

### Backend
- FastAPI
- Python 3.11+
- Google AI (Gemini)
- Pydantic
- Supabase (Authentication & Database)

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Google AI API Key
- Docker (optional, for containerized deployment)

### Installation

#### Option 1: Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xenovate.git
cd xenovate
```

2. Install frontend dependencies:
```bash
cd xenovate
npm install
```

3. Install backend dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# backend/.env
GOOGLE_API_KEY=your_api_key_here
CORS_ORIGINS=["http://localhost:3000"]
DEBUG=True
PORT=8000
HOST=0.0.0.0
DATABASE_URL=postgresql://supabase:password@localhost:5432/optimizer
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
npm run dev
```

#### Option 2: Docker Deployment

1. Build and start the containers:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Troubleshooting

### Backend in Fallback Mode

If you see a warning that the backend is running in "Fallback Mode", it means the Google Gemini AI model is not properly initialized. This could be due to:

1. Missing or invalid `GOOGLE_API_KEY` in your `.env` file
2. Network connectivity issues
3. API rate limits or restrictions

To fix this:
1. Ensure you have a valid Google API key with access to the Gemini API
2. Check your internet connection
3. Verify that the API key has the necessary permissions
4. Restart the backend server after making changes

### API Connection Issues

If the frontend cannot connect to the backend:
1. Ensure the backend server is running on port 8000
2. Check that the API URL in the frontend is set to `http://127.0.0.1:8000`
3. Look for CORS issues in the browser console
4. Verify that the backend endpoints match what the frontend is expecting

## Project Structure

```
.
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and API
├── types/           # TypeScript types
├── hooks/           # Custom React hooks
├── constants/       # Application constants
├── styles/          # Component styles
├── services/        # API services
├── backend/         # FastAPI backend
│   ├── app/         # Backend application
│   ├── tests/       # Backend tests
│   ├── migrations/  # Database migrations
│   ├── scripts/     # Utility scripts
│   ├── config/      # Configuration files
│   ├── models/      # Database models
│   ├── schemas/     # Pydantic models
│   ├── routes/      # API routes
│   └── services/    # Business logic
├── .github/         # GitHub Actions workflows
├── docs/           # Project documentation
├── docker/         # Docker configuration
└── [config files]  # Various configuration files
```

## Documentation

- [API Documentation](docs/API.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Changelog](docs/CHANGELOG.md)

## Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Google AI](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
