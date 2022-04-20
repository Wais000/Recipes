import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Routings from './router/Routings'
import App from './App.css'

const root = ReactDOMClient.createRoot(document.querySelector('#root'))

root.render(<Routings />);


