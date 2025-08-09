# Zorin OS - Interactive Portfolio

Welcome to my interactive portfolio, designed to look and feel like the Zorin OS desktop environment. This project is more than just a list of my skills and experiences; it's a fully functional, web-based operating system that you can explore.

**[➡️ View the Live Demo Here](https://shashank-tomar.vercel.app/)** 
*(Replace this with your actual Vercel deployment URL)*

 
*(To add a screenshot: take a picture of your deployed portfolio, upload it to a site like Imgur, and replace the URL above with your new image link.)*

## ✨ Core Features

This portfolio is built from the ground up to be a dynamic and engaging experience. Here are some of the key features you can interact with:

*   **A Familiar Desktop Experience:** Navigate a realistic OS environment with a desktop, taskbar, and application grid.
*   **Window Management:** Open multiple applications at once. You can drag, resize, maximize, and minimize windows, just like in a real OS.
*   **Working Applications:**
    *   **About Me:** A comprehensive hub detailing my education, skills, professional experience, and achievements.
    *   **VS Code:** A realistic mock-up of the Visual Studio Code editor, showcasing the project's own source code.
    *   **Terminal:** An interactive terminal where you can run mock commands like `ls`, `help`, and even `meme` to fetch a random meme from the web.
    *   **AI Counselor:** A chatbot powered by the **Google Gemini API** that can answer questions about my resume and career path.
    *   **Project Analyzer:** Another Gemini-powered feature within the "About Me" app that can generate AI summaries of my projects.
    *   **And more:** Functional Calculator, Spotify music player, and a Settings app to toggle between light and dark themes.
*   **Secure API Integration:** All calls to the Gemini API are handled securely through a backend serverless function, ensuring that no secret keys are exposed on the frontend.

## 🚀 Tech Stack

This project was built using a modern and powerful set of technologies:

*   **Frontend:** React.js
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Backend & API:** Vercel Serverless Functions (Node.js)
*   **AI Services:** Google Gemini API

## 🛠️ Setting Up the Project Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have `npm` (which comes with Node.js) and `git` installed on your machine.

### Installation

1.  **Clone the repository:**
    ```
    git clone https://github.com/Shashank-Tomar-2004/portfolio.git
    ```

2.  **Navigate to the project directory:**
    ```
    cd portfolio
    ```

3.  **Install NPM packages:**
    ```
    npm install
    ```

4.  **Set up your environment variables:**
    To use the AI features, you'll need to create a local environment file to store your Gemini API key.
    *   Create a new file in the root of the project named `.env.local`.
    *   Inside this file, add the following line, replacing `your_gemini_api_key` with your actual key from Google AI Studio:
        ```
        REACT_APP_GEMINI_API_KEY=your_gemini_api_key
        ```

5.  **Start the development server:**
    ```
    npm start
    ```
    The application will now be running at `http://localhost:3000`.

## 🚢 Deployment

This project is configured for easy deployment on **Vercel**.

1.  Push your code to your GitHub repository.
2.  Import your repository into Vercel.
3.  In the Vercel project settings, add the following environment variable:
    *   **Name:** `GEMINI_API_KEY`
    *   **Value:** `your_gemini_api_key` (The same key you used in your `.env.local` file)
4.  Deploy! Vercel will automatically handle the rest, including the serverless function in the `api` directory.
