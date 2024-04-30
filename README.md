# Chat App

This is a simple chat app with AI integration. This is a final year project for the BTech Computer Science and Engineering of Group 1.

## Tech Stack

-   React
-   Node.js
-   Chat Engine
-   OpenAI

## Features

-   Chat with other users
-   Get responses from the AI
-   View chat history

## Installation

1. Clone the repository

```bash
git clone https://github.com/a092devs/chat-app.git
```

2. Move inside the project directory

```bash
cd chat-app
```

3. Open the project in your code editor, preferably Visual Studio Code

```bash
code .
```

4. Open two terminals, one for the client and one for the server (press "Ctrl + `" to open a new terminal)

5. Move inside the client directory in one terminal

```bash
cd client
```

6. Install the client dependencies

```bash
npm install
```

7. Move inside the server directory in the other terminal

```bash
cd server
```

8. Install the server dependencies

```bash
npm install
```

9. Create a `.env` file in the server directory and add the following environment variables

```
PORT=1337
PRIVATE_KEY="chat engine private key"
PROJECT_ID="chat engine project id"
BOT_USER_NAME="bot's username"
BOT_USER_SECRET="bot's secret"
OPENAI_API_KEY="openai api key"
```

10. Create a `.env.local` file in the client directory and add the following environment variables

```
VITE_BASE_URL=http://localhost:1337
VITE_PROJECT_ID=
```

11. Start the server

```bash
npm run dev
```

12. Start the client

```bash
npm run dev
```

13. Open the app in your browser at `http://localhost:5173`

## Credits

[Vishal Kumar](https://github.com/itzzmevishal), [Manisha Verma](https://github.com/manishaaverma), [Wahida Tabassum](https://github.com/aarzoonaaz) and [Arsalan Akhtar](https://github.com/a092devs).
