import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.post["Accept"] = "application/JSON";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
