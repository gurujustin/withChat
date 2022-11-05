import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import { useFetchTokenFromApi, useClient } from '../../hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React';




const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };

const ChatComponent = () => {
  const { account, isConnected } = useWeb3React()
  const theme = useTheme()
  const chatTheme = theme.isDark ? "str-chat__theme-dark" : "str-chat__theme-light"
  const username = isConnected ? account : "old-voice-2"
  const user = {
    id: username,
    name: username,
    image: `https://getstream.io/random_png/?id=${username}&name=${username}`,
  };

  const userToken = useFetchTokenFromApi(username)
  const chatClient = useClient({ apiKey: 'sy67pe8nsjze', userData: user, tokenOrProvider: userToken });
  if (!chatClient) {
    return <LoadingIndicator />;
  }


  return (
    <Chat client={chatClient} theme={chatTheme}>
      <ChannelList filters={filters} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          {account && <MessageInput />}
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
