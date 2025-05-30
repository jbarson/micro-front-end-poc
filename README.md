# Micro Frontend Proof of Concept

This repository demonstrates various micro-frontend (MFE) integration techniques using three distinct frontend applications:

1.  An **AngularJS (Angular 1) application** (`angular1-form`)
2.  A **Next.js (React) application** (`next-form`)
3.  A **Shared Vanilla JavaScript Form Component** (`shared-form-component`)

## Project Overview

The primary goal is to showcase how different frontend applications, potentially built with different technologies, can be composed into a larger application experience. We explore two main integration patterns:

*   **Iframe Embedding:** The AngularJS application is embedded within the Next.js application using an `<iframe>`.
*   **JavaScript Runtime Integration:** The Shared Form Component is loaded and rendered dynamically at runtime by both the AngularJS and Next.js applications.

## Directory Structure

```
micro-front-end-poc/
├── angular1-form/            # AngularJS (Angular 1) application
│   ├── src/
│   ├── package.json
│   └── ...
├── next-form/                # Next.js (React) application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── shared-form-component/    # Vanilla JS shared form micro frontend
│   ├── form.js
│   ├── index.html
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Setup

Clone the repository and install dependencies for each application:

1.  **AngularJS App (`angular1-form`):**
    ```bash
    cd angular1-form
    npm install
    cd ..
    ```

2.  **Next.js App (`next-form`):**
    ```bash
    cd next-form
    npm install
    cd ..
    ```

3.  **Shared Form Component (`shared-form-component`):**
    ```bash
    cd shared-form-component
    npm install
    cd ..
    ```

## Running the Applications

You'll need to run all three applications concurrently in separate terminal sessions to see the full integration.

1.  **Start the AngularJS App:**
    *   Navigate to the `angular1-form` directory.
    *   Command: `npm start`
    *   This will typically serve the application on `http://localhost:3001`.

2.  **Start the Next.js App:**
    *   Navigate to the `next-form` directory.
    *   Command: `npm run dev`
    *   This will typically serve the application on `http://localhost:3000`.

3.  **Start the Shared Form Component:**
    *   Navigate to the `shared-form-component` directory.
    *   Command: `npm start`
    *   This will typically serve the component on `http://localhost:3002`.

## Exploring the Integrations

*   **Next.js Application (`http://localhost:3000`):** This application acts as the main container.
    *   It displays its own native Next.js/React form.
    *   It embeds the AngularJS application (running on port 3001) in an `<iframe>`.
    *   It dynamically loads and renders the Shared Form Component (running on port 3002) using JavaScript runtime integration.
    *   Communication between the iframe (AngularJS app) and the Next.js parent is handled via `window.postMessage`.
    *   The Shared Form Component uses a callback mechanism when integrated via JavaScript.

*   **AngularJS Application (`http://localhost:3001`):**
    *   It displays its own native AngularJS form.
    *   It also dynamically loads and renders the Shared Form Component (running on port 3002) using JavaScript runtime integration.

## Key Concepts Demonstrated

*   **Independent Deployment:** Each application (`angular1-form`, `next-form`, `shared-form-component`) can be developed, deployed, and run independently.
*   **Technology Diversity:** Using AngularJS, Next.js (React), and Vanilla JavaScript in different parts of the overall system.
*   **Iframe Integration:** A simple way to embed entire applications, providing strong isolation.
*   **JavaScript Runtime Integration:** Dynamically loading and rendering components/applications from different sources into a host application.
*   **Cross-Origin Communication:** Using `window.postMessage` for safe communication between iframes and parent windows.
*   **Client-Side Composition:** Building a cohesive user experience from independently developed frontend modules.
