// define and export `useClient` hook somewhere in your codebase
// or keep it in the `src/App.js`, up to you

import { useEffect, useState } from "react";
import useInterval from "./useInterval";

// we'll use src/hooks/useClient.js path for this example
export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  return chatClient;
};

export const useFetchTokenFromApi = (name) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://stream-server1.herokuapp.com/token",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: name
          })
        })

      res.json().then((data) => {
        setToken(data);
      })
    }
    api();
  }, [name])
  return token;
};

export const useFetchTokens = () => {
  const [tokenInfo, setTokenInfo] = useState([{logoUrl: '', tokenTicker: '', tokenPrice: '', percentChange: '', contractAddress: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://ape-swap-api.herokuapp.com/tokens/trending",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      res.json().then((data) => {
        setTokenInfo(data);
      })
    }
    api();
  }, [])
  return tokenInfo;
};

