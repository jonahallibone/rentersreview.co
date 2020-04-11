import React, { useContext, useRef, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "./AppContext";
import App from "./App";

const httpLink = new HttpLink({
  uri: "/.netlify/functions/graphql"
});

const ApolloWrapper = () => {
  const { silentAuth } = useContext(AppContext);

  const tokenRef = useRef(null);
  const getAuth = useMemo(() => silentAuth(), [silentAuth])
  const authLink = useMemo(
    () =>
      setContext(async (_, { headers }) => {
        if(!tokenRef.current) {
          const { idToken } = await getAuth;
          tokenRef.current = idToken;
        }
        
        return {
          headers: {
            ...headers,
            authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : ""
          }
        };
      }),
    [getAuth]
  );

  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }, [authLink]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  );
};

export default ApolloWrapper;
