import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  Provider,
  Client,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { SubscriptionClient } from "subscriptions-transport-ws";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { getToken } from "./utils/token";
import { updateCache } from "./utils/cache";
import "./styles/index.css";

const cache = cacheExchange({
  updates: {
    Mutation: {
      post: ({ post }, _args, cache) => updateCache(cache, post),
    },
    Subscription: {
      newLink: ({ newLink }, _args, cache) => updateCache(cache, newLink),
    },
  },
});

const subscriptionClient = new SubscriptionClient("ws://localhost:4000", {
  reconnect: true,
  connectionParams: {
    authToken: getToken(),
  },
});

const client = new Client({
  url: "http://localhost:4000",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
  exchanges: [
    dedupExchange,
    cache,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

ReactDOM.render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
