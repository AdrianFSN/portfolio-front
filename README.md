# React + TypeScript + Vite

This repository is a React project using TypeScript and Vite. It includes various features such as Redux slices, form handling, and localization.

## Key Features

- **Redux Slices**: State management using Redux Toolkit.
- **Form Handling**: Various forms for creating and editing jobs.
- **Localization**: Multi-language support using `react-i18next`.
- **Admin Pages**: Dedicated admin pages for managing application data.
- **Public Pages**: Publicly accessible pages including Home, Contact, and Job Examples.

## Connecting to the API

The project connects to the API through the client defined in the `src/api` directory. The client is responsible for making HTTP requests to the backend API and handling responses.

To configure the API client, update the base URL and any necessary headers in the client configuration file:

```typescript
// filepath: /src/api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Add any other necessary headers here
  },
});

export default apiClient;
```

Make sure to set the REACT_APP_API_BASE_URL environment variable in your .env files:

```markdown
// filepath: /.env.development
REACT_APP_API_BASE_URL=http://localhost:5000/api

// filepath: /.env.production
REACT_APP_API_BASE_URL=https://your-production-api-url.com/api
```

## Admin Pages

The project includes dedicated admin pages for managing application data. These pages are accessible only to users with admin privileges and provide interfaces for creating, updating, and deleting records.

To access the admin pages, navigate to the /admin route in your application. Ensure that you have the necessary authentication and authorization mechanisms in place to restrict access to these pages.

## Public Pages

The project includes several public pages that are accessible to all users:

- **Home Page**: The landing page of the application, providing an overview and introduction.
- **Contact Page**: A page where users can find contact information and a form to reach out to the team.
- **Job Examples Page**: A page showcasing various job examples, providing users with insights and inspiration.

These pages are implemented in the pages directory and are accessible through the main navigation of the application.

## Using Redux

The project uses Redux for some states management, leveraging the Redux Toolkit to simplify the setup and usage. The state is organized into slices, each responsible for a specific part of the application's state.

### Setting Up Redux

The Redux store is configured in the store directory. Each slice is defined in its own file and combined in the root reducer.

## Importance of the constants File

The constants file is crucial for the setup and configuration of the project. It centralizes all the constant values used throughout the application, making it easier to manage and update them. This file typically includes API endpoints, action types, and other configuration values that are used across multiple components and modules.

By defining constants in a single file, you ensure consistency and reduce the risk of errors caused by hardcoding values in multiple places. It also makes the codebase more maintainable and easier to understand.

Example of a constants file:

```typescript
// filepath: /src/constants/index.ts
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
export const ACTION_TYPES = {
  FETCH_DATA: "FETCH_DATA",
  UPDATE_DATA: "UPDATE_DATA",
  DELETE_DATA: "DELETE_DATA",
};
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace tseslint.configs.recommended with tseslint.configs.recommendedTypeChecked or tseslint.configs.strictTypeChecked.
- Optionally add ...tseslint.configs.stylisticTypeChecked.
- Install eslint-plugin-react and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // Add some react specific rules
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
});
```

# Running the Project

To run the project, use the following commands:

```sh
npm install
npm run dev
```

## Building the Project

To build the project for production, use the following command:

```sh
npm run build
```

## License

This project is licensed under the MIT License.
