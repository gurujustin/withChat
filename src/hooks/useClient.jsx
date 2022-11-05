// define and export `useClient` hook somewhere in your codebase
// or keep it in the `src/App.js`, up to you

import { useEffect, useState } from "react";
import { StreamChat, StreamType } from "stream-chat";

// we'll use src/hooks/useClient.js path for this example
export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  
  useEffect(() => {
    if(tokenOrProvider && userData) {
      let didUserConnectInterrupt = false;
      console.log("useClient", userData)
      const client = new StreamChat(apiKey);        
      // const token = server.createToken('john');
      // prevents application from setting stale client (user changed, for example)

      const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      });
      // return () => {
      //   didUserConnectInterrupt = true;
      //   setChatClient(null);
      //   // wait for connection to finish before initiating closing sequence
      //   connectionPromise
      //     .then(() => client.disconnectUser())
      //     .then(() => {
      //       console.log('connection closed');
      //     });
      // };
    }

  }, [apiKey, userData, tokenOrProvider]);

  return chatClient;
};

export const fetchTokenFromApi = (name) => {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const api = async() => {
      const res = await fetch("https://stream-server1.herokuapp.com/token", 
      {
        method: "post",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
          input: name
        })
      })

      res.json().then((data) => {
        setToken(data);
      })
    } 
    // .then(response => response.text())
    //   .then(result => {
    //     console.log('token', result)
    //     setToken(result)
    //     // return result;
    // })
    // .catch(error => console.warn(error));
    api();
  }, [name])
  return token;
};

