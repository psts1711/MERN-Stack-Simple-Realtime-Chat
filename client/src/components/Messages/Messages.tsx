import React from 'react';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }:any) => (
  <ScrollToBottom className="messages">
    {messages.map((message:any, i:any) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;
