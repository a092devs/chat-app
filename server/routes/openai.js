import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import {openai} from '../index.js';

dotenv.config();
const router = express.Router();

let initialGreetingSent = false;

router.post('/text', async (req, res) => {
    try {
        const {text, activeChatId} = req.body;

        const messages = [{role: 'user', content: text}];

        if (!initialGreetingSent) {
            messages.unshift({
                role: 'system',
                content: 'Hello! How can I assist you today?',
            });
            initialGreetingSent = true;
        }

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            {text: response.data.choices[0].message.content},
            {
                headers: {
                    'Project-ID': process.env.PROJECT_ID,
                    'User-Name': process.env.BOT_USER_NAME,
                    'User-Secret': process.env.BOT_USER_SECRET,
                },
            }
        );

        res.status(200).json({text: response.data.choices[0].message.content});
    } catch (error) {
        console.error('error', error.response.data.error);
        res.status(500).json({error: error.message});
    }
});

router.post('/code', async (req, res) => {
    try {
        const {text, activeChatId} = req.body;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an assistant coder who responds with only code and no explanations.',
                },
                {role: 'user', content: text},
            ],
        });

        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            {text: response.data.choices[0].message.content},
            {
                headers: {
                    'Project-ID': process.env.PROJECT_ID,
                    'User-Name': process.env.BOT_USER_NAME,
                    'User-Secret': process.env.BOT_USER_SECRET,
                },
            }
        );

        res.status(200).json({text: response.data.choices[0].message.content});
    } catch (error) {
        console.error('error', error.response.data.error);
        res.status(500).json({error: error.message});
    }
});

router.post('/assist', async (req, res) => {
    try {
        const {text} = req.body;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
                },
                {role: 'user', content: `Finish my thought:${text}`},
            ],
        });

        res.status(200).json({text: response.data.choices[0].message.content});
    } catch (error) {
        console.error('error', error);
        res.status(500).json({error: error.message});
    }
});

export default router;
