import {usePostAiAssistMutation} from '@/state/api';
import React, {useEffect, useState} from 'react';
import MessageFormUI from './MessageFormUI';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const AiAssist = ({props, activeChat}) => {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState('');
    const [triggerAssist, resultAssist] = usePostAiAssistMutation();
    const [appendText, setAppendText] = useState('');

    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async () => {
        const date = new Date()
            .toISOString()
            .replace('T', ' ')
            .replace('Z', '+05:30');
        const at = attachment
            ? [{blob: attachment, file: attachment.name}]
            : [];
        const form = {
            attachments: at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id,
        };

        props.onSubmit(form);
        setMessage('');
        setAttachment('');
    };

    const debouncedValue = useDebounce(message, 1000);

    useEffect(() => {
        if (debouncedValue) {
            const form = {text: message};
            triggerAssist(form);
        }
    }, [debouncedValue, message, triggerAssist]);

    const handleKeyDown = (e) => {
        // handle enter and tab
        if (e.keyCode === 9) {
            e.preventDefault();
            setMessage(`${message} ${appendText}`);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit();
        }
        setAppendText('');
    };

    useEffect(() => {
        if (resultAssist.data?.text) {
            setAppendText(resultAssist.data?.text);
        }
    }, [resultAssist]);

    return (
        <MessageFormUI
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            appendText={appendText}
            handleKeyDown={handleKeyDown}
        />
    );
};

export default AiAssist;
