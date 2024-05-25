import {usePostAiTextMutation} from '@/state/api';
import React, {useState} from 'react';
import MessageFormUI from './MessageFormUI';

const Ai = ({props, activeChat}) => {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState('');
    const [trigger] = usePostAiTextMutation();

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
        trigger(form);
        setMessage('');
        setAttachment('');
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <MessageFormUI
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleKeyDown={handleKeyDown}
        />
    );
};

export default Ai;
