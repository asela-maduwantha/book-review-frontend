# Book Review Frontend

This is a React single-page application (SPA) for managing book reviews. It communicates with a Spring Boot backend.

## Features

- View, create, update, and delete book reviews.
- Responsive design using Tailwind CSS.
- API requests handled with Axios.

## Requirements

- **Node.js** (v14 or higher)
- Backend server running at `http://localhost:8080`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-review-frontend.git
   cd book-review-frontend
   ```
2. Install dependencies:
    ```bash
    npm install
3. Start the development server:
    ```bash
    npm start
    ```
## Configuration
If the backend URL differs from the default, update the API base URL in `src/services/apiClient.js`
 ```bash
 const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/book-reviews',
});
```

