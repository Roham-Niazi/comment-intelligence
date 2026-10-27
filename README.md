# Comment Intelligence

**Comment Intelligence** is a Persian-language comment analysis project that combines machine learning with a Django web application.

It analyzes comments along two dimensions: how likely a comment is to be recommended and how likely it is to contain offensive content. The application also provides user accounts, comment storage, an API endpoint, and a dashboard for exploring monthly comment statistics.

> **Project status:** Initial version. Model evaluation, security hardening, testing, and deployment preparation are ongoing improvements.

## Features

### Machine Learning and NLP
- Analyzes Persian comments using machine learning models.
- Predicts the likelihood that a comment will be recommended.
- Predicts the likelihood that a comment contains offensive content.
- Uses Persian text preprocessing with Hazm.
- Loads trained models through saved Scikit-learn pipelines.

### Web Application
- User registration and authentication.
- Custom user model with phone-number-based accounts.
- API key generation for authenticated API usage.
- Comment storage with analysis scores and optional tags.
- Dashboard for viewing comment statistics.
- Monthly statistics for recommended, not recommended, offensive, and non-offensive comments.

### API
- Accepts comments for analysis and storage.
- Supports optional tags and dates.
- Associates submitted comments with the corresponding user account through an API key.

## How It Works

The analysis pipeline follows these general steps:

1. **Input:** A Persian comment is submitted for analysis.
2. **Preprocessing:** The text is normalized and processed using Hazm and other text-processing utilities.
3. **Prediction:** Two trained machine learning pipelines estimate the recommendation and offensiveness probabilities.
4. **Storage:** Through the web application, the comment and its associated scores can be saved to the database.
5. **Dashboard:** Stored comments can be explored through monthly statistics.

## Technology Stack

| Category | Technologies |
|---|---|
| Language | Python |
| Data Processing | Pandas, NumPy |
| Machine Learning | Scikit-learn |
| Persian NLP | Hazm |
| Text Processing | Emoji |
| Visualization | Matplotlib |
| Web Framework | Django |
| API | Django REST Framework |
| Database | SQLite |
| Configuration | python-dotenv |

## Project Structure

```text
comment-intelligence/
├── data/
├── notebooks/
├── web/
│   ├── accounts/
│   ├── config/
│   ├── core/
│   ├── services/
│   │   └── models/
│   └── manage.py
├── .gitignore
├── LICENSE
└── requirements.txt
```

## API Usage

### Analyze a Comment

**Endpoint:** `POST /analyze_comment/`

The endpoint accepts the following fields:

| Field | Required | Description |
|---|---|---|
| `api_key` | Yes | API key associated with the user account |
| `text` | Yes | Persian comment to analyze |
| `tag` | No | Optional tag for categorizing the comment |
| `date` | No | Optional date associated with the comment |

Example request body:

```json
{
  "api_key": "YOUR_API_KEY",
  "text": "کیفیت این محصول واقعاً عالی بود.",
  "tag": "product-feedback",
  "date": "2026-10-27"
}
```

A successful request returns a confirmation message indicating that the comment has been saved.

**Note:** The current endpoint does not return the prediction scores directly in its response. The scores are stored with the comment.

## Limitations

- **Persian only:** The project is designed for Persian-language comments and is not a bilingual system.
- **Model evaluation:** Comprehensive evaluation metrics and a reproducible evaluation methodology are not yet documented.
- **Prediction reliability:** Model outputs are estimates and should not be treated as perfectly reliable classifications.
- **Input validation:** Error handling and validation need further improvement.
- **Security:** The current development configuration requires security hardening before public deployment.
- **Testing and documentation:** Automated test coverage and API documentation can be expanded.

The project is an initial implementation intended to demonstrate the integration of Persian NLP, machine learning, and a Django-based web application. It is not currently presented as production-ready software.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
