import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { CookiesProvider } from 'react-cookie';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import {createUploadLink } from 'apollo-upload-client';
import { setContext } from "@apollo/client/link/context";


axios.defaults.baseURL = 'http://localhost:8000';

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

const mediaUrl = 'http://localhost:8000/media/'

export const mediaProvider = React.createContext(null)

ReactDOM.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <mediaProvider.Provider value={mediaUrl} >
      <App mediaUrl={mediaUrl}/>
      </mediaProvider.Provider>
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
