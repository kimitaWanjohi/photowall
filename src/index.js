import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { CookiesProvider } from 'react-cookie';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {createUploadLink } from 'apollo-upload-client';
import { setContext } from "@apollo/client/link/context";


const httpLink = createUploadLink({ uri: "http://localhost:8000/graphql/"})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
  headers: {
  ...headers,
  authorization: token ? `JWT ${token} `: "",
  },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache : new InMemoryCache(),
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <App/>
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
