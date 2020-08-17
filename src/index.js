import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

//apollo client setup
const client = new ApolloClient({
    uri: `${process.env.REACT_APP_ENDPOINT_URL}/graphql`,
    cache: new InMemoryCache(),
})

console.log(process.env.REACT_APP_ENDPOINT_URL)
console.log('update')
ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);