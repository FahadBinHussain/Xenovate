# Contributing to Xenovate

Thank you for your interest in contributing to Xenovate! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/xenovate.git
   cd xenovate
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

## Running Tests

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
cd backend
pytest
```

## Code Style

### Frontend

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for functions and components
- Keep components small and focused

### Backend

- Follow PEP 8 style guide
- Use type hints
- Add docstrings for functions and classes
- Keep functions small and focused

## Commit Messages

Follow these guidelines for commit messages:

1. Use the present tense ("Add feature" not "Added feature")
2. Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
3. Limit the first line to 72 characters or less
4. Reference issues and pull requests liberally after the first line

Example:
```
feat: Add code conversion feature

- Add support for converting code between languages
- Implement language detection
- Add tests for code conversion
- Update documentation

Closes #123
```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the API documentation if you've modified the API
3. Add tests for new features
4. Ensure all tests pass
5. Update the CHANGELOG.md with a note describing your changes
6. Submit a pull request

## Review Process

1. All pull requests require at least one review
2. Address review comments promptly
3. Keep the pull request focused and small
4. Squash commits if requested

## Documentation

- Update relevant documentation for any changes
- Add JSDoc comments for new functions
- Update API documentation for API changes
- Add examples where appropriate

## Release Process

1. Update version numbers in package.json and pyproject.toml
2. Update CHANGELOG.md
3. Create a new release on GitHub
4. Tag the release

## Questions?

If you have any questions, please open an issue or join our discussions.

Thank you for contributing to Xenovate! 