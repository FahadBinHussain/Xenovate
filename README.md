# Xenovate - Code Analysis and Optimization Platform

Xenovate is a powerful platform that helps developers analyze, optimize, and convert code between different programming languages using advanced AI technology.

## Features

- **Code Analysis**: Get detailed complexity analysis and explanations of your code
- **Optimization Suggestions**: Receive AI-powered recommendations to improve your code
- **Language Conversion**: Convert code between multiple programming languages
- **Real-time Analysis**: Get instant feedback on your code
- **Modern UI**: Clean and intuitive interface built with Next.js and Tailwind CSS

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

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Google AI API Key

### Installation

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
# xenovate/backend/.env
GOOGLE_API_KEY=your_api_key_here
CORS_ORIGINS=["http://localhost:3000"]
DEBUG=True

# xenovate/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

1. Start the backend server:
```bash
cd xenovate/backend
uvicorn main:app --reload
```

2. Start the frontend development server:
```bash
cd xenovate
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── xenovate/              # Main application directory
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions and API
│   ├── types/           # TypeScript types
│   ├── hooks/           # Custom React hooks
│   ├── constants/       # Application constants
│   ├── styles/          # Component styles
│   ├── services/        # API services
│   ├── backend/         # FastAPI backend
│   │   ├── app/         # Backend application
│   │   ├── tests/       # Backend tests
│   │   ├── migrations/  # Database migrations
│   │   ├── scripts/     # Utility scripts
│   │   ├── config/      # Configuration files
│   │   ├── models/      # Database models
│   │   ├── schemas/     # Pydantic models
│   │   ├── routes/      # API routes
│   │   └── services/    # Business logic
│   └── [config files]   # Various configuration files
├── .github/             # GitHub Actions workflows
├── docs/               # Project documentation
├── docker/            # Docker configuration
└── [config files]     # Root configuration files
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
