# AI-Powered Chatbot with Suggestions

A simple and interactive AI-powered chatbot application built using **Next.js** with **TypeScript**. This chatbot provides users with suggested questions, and when a user picks one, the bot responds with pre-configured answers. If a question is not in the suggestions, the app uses the **GIMINI** to generate an answer.

## Features

- **AI-powered responses**: Uses GIMINI API to provide answers when user input is not in the suggestions.
- **Suggested Questions**: Provides pre-configured questions for users to click and get immediate responses.
- **Typing indicator**: Animates a "typing..." indicator to simulate a human response.
- **Responsive chat UI**: The chat window opens in the bottom-right corner of the screen, ensuring a smooth user experience on all devices.
- **Close chat**: Users can easily close the chat window by clicking the close button.
- **TypeScript & Next.js**: The app is built with **Next.js** (latest version, App Router) and **TypeScript** to ensure type safety and scalability.
  
## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- GIMINI API key (or replace with your own chatbot service)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/ai-chatbot-app.git
    cd ai-chatbot-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your GIMINI API key:
    ```
    AI_API_KEY=your-ai-api-key
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Visit `http://localhost:3000` to see the app in action!

## Usage

- The app features a chatbot interface with suggested questions like:
  - "What are your business hours?"
  - "How can I track my order?"
  - "What is your refund policy?"

- Users can either select a suggestion or type their own message. If a user selects a suggestion, the corresponding response will be shown. Otherwise, the app will query the OpenAI API for a response.

## Architecture

- **Frontend**: Built with **Next.js (App Router)** and **React**.
- **API**: Utilizes **GIMINI API** to generate responses to user queries when they are not in the predefined suggestions.
- **Styling**: Styled using **CSS Modules** for scoped and modular styles.

## SEO Optimized Description

This project is a **Next.js chatbot application** that integrates **AI-powered support** using the **OpenAI GPT API**. The bot is equipped with dynamic suggestion options and an intuitive chat interface. It is ideal for providing users with quick support, information, and assistance. Whether you need a basic FAQ system or an advanced conversational agent, this chatbot app serves as a solid starting point.

The application is **responsive**, ensuring a seamless user experience on desktop and mobile. Users can chat with the bot, select from suggested questions, and even close the chat window whenever they need. This app demonstrates the power of integrating AI into modern web applications with ease.

## Technologies Used

- **Next.js** (v14+)
- **React**
- **TypeScript**
- **GIMINI  API** for AI-powered responses
- **CSS Modules** for styling
- **Vercel** (for deployment, optional)

## Contributions

Feel free to fork this project, make improvements, and send pull requests! Contributions are always welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to GIMINI for providing the powerful GPT API.
- Thanks to the Next.js community for building an amazing framework!
