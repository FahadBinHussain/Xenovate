# Xenovate

Xenovate is a code analysis platform that helps developers analyze, optimize, convert, and explain code using AI.

## Features

- Code Analysis: Get time and space complexity analysis
- Code Optimization: Improve your algorithm's performance
- Code Conversion: Convert code between programming languages
- Code Explanation: Get simple explanations of complex code

## Tech Stack

- Next.js for frontend and API routes
- Supabase for user authentication and database
- Google Gemini AI for code analysis

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xenovate.git
cd xenovate
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_API_URL=/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project can be deployed on Render with a single command:

1. Connect your GitHub repository to Render
2. Use the provided `render.yaml` for automatic deployment
3. Set up the required environment variables in Render dashboard

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `GEMINI_API_KEY`: Your Google Gemini API key
- `NEXT_PUBLIC_API_URL`: API URL (set to '/api' for development and production)

## License

This project is licensed under the MIT License.
