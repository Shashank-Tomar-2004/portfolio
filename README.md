# Zorin OS - Interactive Portfolio

Welcome to my interactive portfolio. This project showcases my skills not just through a list of projects, but through a dynamic, hands-on experience. On a desktop, it's a faithful re-creation of the Zorin OS environment. On a mobile device, it intelligently transforms into a sleek, native-feeling mobile UI.

**[➡️ View the Live Demo Here](https://shashank-tomar.vercel.app/)**

### Desktop Experience
<img width="1366" height="639" alt="Desktop View" src="https://github.com/user-attachments/assets/8708cb5a-4258-49c1-aed7-8c207de32325" />

### Mobile Experience
<p align="center">
  <img width="270" alt="Mobile UI" src="https://github.com/user-attachments/assets/00b4fadb-7f6b-4f16-9576-6da9896075d5">
</p>

## ✨ Core Features

This portfolio is built to be a dynamic and engaging experience. Here are some of the key features:

*   **True Responsive Design: Dual-Interface Experience**
    *   **Desktop UI:** A fully interactive desktop environment with a taskbar, draggable windows, and multi-tasking capabilities.
    *   **Mobile UI:** A clean, native-feeling interface with a top status bar, a home screen app grid, and full-screen app views.

*   **Working Applications:**
    *   **About Me:** A comprehensive hub detailing my education, skills, professional experience, and achievements.
    *   **VS Code:** A realistic mock-up of the Visual Studio Code editor, showcasing the project's own source code.
    *   **Terminal:** An interactive terminal where you can run mock commands like `ls`, `help`, and even `meme` to fetch a random meme.
    *   **And more:** A functional Calculator, a Spotify music player, and a Settings app to toggle between light and dark modes.

*   **AI-Powered Features:**
    *   **AI Counselor:** A chatbot powered by the **Google Gemini API** that can answer questions about my resume and career path.
    *   **Project Analyzer:** Another Gemini-powered feature within the "About Me" app that can generate AI summaries of my projects.

*   **Secure API Integration:** All calls to the Gemini API are handled securely through a backend serverless function, ensuring that no secret keys are exposed on the client-side.

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
    git clone https://github.com/shashank-tomar-2004/portfolio.git
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
        GEMINI_API_KEY=your_gemini_api_key
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
