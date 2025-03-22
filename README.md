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

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment on Render

This project is configured for deployment on Render. The `render.yaml` file includes all necessary configuration.

### Environment Variables

Make sure to set the following environment variables in your Render dashboard:

- `GEMINI_API_KEY` - Your Google Gemini API key
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Troubleshooting

If you encounter build issues:

1. Make sure all dependencies are installed properly:
   ```bash
   npm install --production=false
   ```

2. Check that the UI components are properly set up:
   ```bash
   node setup-ui.js
   ```

3. Verify that environment variables are correctly set in your Render dashboard.

## Development

- Run `npm run dev` to start the development server
- Visit `http://localhost:3000` to view the application

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

## License

This project is licensed under the MIT License.
