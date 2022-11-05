import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import { fetchTokenFromApi, useClient } from '../../hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React';
import { useTheme } from 'styled-components';
import { _nameprepTableB2 } from '@ethersproject/strings/lib/idna';




const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };

const ChatComponent = () => {
  const { account } = useWeb3React()
  const theme = useTheme()
  const chatTheme = theme.isDark ? "str-chat__theme-dark" : "str-chat__theme-light"
  const name = account ? account : "old-voice-2"
  const user = {
    id: name,
    name: name,
    image: `https://getstream.io/random_png/?id=${name}&name=${name}`,
  };

  const userToken = fetchTokenFromApi(name)
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
