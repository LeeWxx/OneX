import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

root.render(
	<BrowserRouter>
		  <App/>
	</BrowserRouter>
);