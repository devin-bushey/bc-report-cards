# Report Card Comment Generator

An AI-powered application that helps teachers generate personalized, professional report card comments based on student data. Built with FastAPI (Python) backend and React frontend.

## Features

- 🤖 **AI-Powered Comments**: Uses OpenAI GPT models to generate contextual, personalized comments
- 📝 **Customizable Parameters**: Choose tone, length, and whether to include future goals
- 🎯 **Subject-Specific**: Tailored templates for different subjects and grade levels
- ✏️ **Editable Output**: Modify generated comments to match your teaching style
- 📋 **Copy to Clipboard**: Easy one-click copying for pasting into report cards
- 💡 **Teaching Suggestions**: Get actionable strategies to help students improve
- 🔒 **Secure**: Environment-based configuration for API keys

## Project Structure

```
bc-report-cards/
├── backend/                 # FastAPI Python backend
│   ├── src/
│   │   └── report_card_generator/
│   │       ├── main.py      # FastAPI application
│   │       ├── models.py    # Pydantic data models
│   │       ├── config.py    # Configuration management
│   │       ├── comment_generator.py  # OpenAI integration
│   │       └── templates.py # Comment templates
│   ├── pyproject.toml       # uv dependency management
│   └── .env.example         # Environment configuration template
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx         # Main application
│   │   └── index.css       # Tailwind CSS styles
│   ├── package.json        # npm dependencies
│   └── .env.example        # Frontend environment template
└── README.md               # This file
```

## Prerequisites

- **Python 3.11+**: Required for the backend
- **uv**: Fast Python package manager and project manager
- **Node.js 18+**: Required for the frontend
- **OpenAI API Key**: For AI comment generation

### Installing uv

```bash
# On macOS and Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or with pip
pip install uv
```

## Setup Instructions

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd bc-report-cards
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment with uv
uv sync

# Copy environment template and configure
cp .env.example .env
# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Copy environment template (optional - uses defaults)
cp .env.example .env
```

### 4. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `backend/.env` file

## Running the Application

### Start the Backend (Terminal 1)

```bash
cd backend
uv run uvicorn src.report_card_generator.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will be available at: http://localhost:5173

## Usage

1. **Fill Student Information**: Enter the student's name, subject, grade level, strengths, and areas for improvement
2. **Add Optional Details**: Include behavior notes, participation observations, or additional context
3. **Choose Comment Options**: Select tone (professional, encouraging, formal, warm), length (short, medium, long), and whether to include future goals
4. **Generate Comment**: Click "Generate Report Card Comment" to create an AI-powered comment
5. **Review and Edit**: The generated comment appears in an editable text area where you can make adjustments
6. **Copy to Use**: Use the "Copy to Clipboard" button to easily paste into your report card system

## API Endpoints

### Backend API

- `GET /api/health` - Health check endpoint
- `POST /api/generate-comment` - Generate a report card comment
- `GET /api/subjects` - Get available subjects
- `GET /api/grade-levels` - Get available grade levels
- `GET /docs` - Interactive API documentation

### Example API Request

```json
POST /api/generate-comment
{
  "student_data": {
    "name": "Sarah Johnson",
    "subject": "math",
    "grade": "5th Grade",
    "grade_level": "elementary",
    "strengths": "Excellent problem-solving skills and works well in groups",
    "areas_for_improvement": "Needs to double-check work for calculation errors",
    "behavior": "Always respectful and helpful to classmates",
    "participation": "Actively participates in class discussions"
  },
  "tone": "professional",
  "length": "medium",
  "include_goals": true
}
```

## Development Commands

### Backend Development

```bash
# Run with hot reload
uv run uvicorn src.report_card_generator.main:app --reload

# Install new dependencies
uv add package-name

# Install development dependencies
uv add --dev package-name

# Run Python scripts
uv run python script.py

# Show dependencies
uv pip list
```

### Frontend Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Configuration

### Backend Environment Variables

Create `backend/.env` with:

```env
OPENAI_API_KEY=your-openai-api-key-here
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
MAX_COMMENT_LENGTH=1000
MIN_COMMENT_LENGTH=100
```

### Frontend Environment Variables

Create `frontend/.env` with:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Report Card Comment Generator
VITE_APP_VERSION=1.0.0
```

## Supported Subjects

- Mathematics
- English Language Arts
- Science
- Social Studies
- Art
- Music
- Physical Education
- Other (custom)

## Comment Customization

### Tone Options
- **Professional**: Standard, formal language
- **Encouraging**: Positive, motivational language
- **Formal**: Very structured, traditional
- **Warm**: Friendly, approachable language

### Length Options
- **Short**: 50-80 words (2-3 sentences)
- **Medium**: 80-150 words (1 paragraph)
- **Long**: 150-250 words (2 paragraphs)

## Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check that you have Python 3.11+ installed
   - Ensure uv is installed and up to date
   - Verify your OpenAI API key is set in `.env`

2. **Frontend won't connect to backend**
   - Ensure backend is running on port 8000
   - Check that CORS origins include your frontend URL
   - Verify frontend is using correct API URL

3. **Comment generation fails**
   - Check your OpenAI API key is valid
   - Ensure you have sufficient OpenAI credits
   - Check the browser console for error messages

### Getting Help

- Check the FastAPI interactive docs at http://localhost:8000/docs
- Review the browser console for frontend errors
- Check the backend logs in your terminal

## Dependencies

### Backend (Python)
- **FastAPI**: Modern, fast web framework
- **uvicorn**: ASGI server
- **openai**: OpenAI API client
- **pydantic**: Data validation
- **pydantic-settings**: Settings management
- **python-dotenv**: Environment variable loading

### Frontend (React)
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support or questions, please open an issue in the repository.