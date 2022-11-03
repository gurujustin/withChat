import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import { useClient } from '../../hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoib2xkLXZvaWNlLTIifQ.ZabDZuOVXi0EIKiwSTbJgBcvMzahocxU-Rw4ZCZ0RTo';



const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };

const ChatComponent = () => {
  const { account } = useWeb3React()
  const user = {
    id: 'old-voice-2',
    name: 'old-voice-2',
    image: 'https://getstream.io/random_png/?id=old-voice-2&name=old-voice-2',
  };
  const chatClient = useClient({ apiKey: 'b45d7ce7cxdr', userData: user, tokenOrProvider: userToken });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='str-chat__theme-light'>
      <ChannelList filters={filters} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
