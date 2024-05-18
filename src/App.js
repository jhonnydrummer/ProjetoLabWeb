import React from 'react';
import RouterComponent from './routes/Route';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './routes/AuthContext'; 
import './App.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterComponent />
    </AuthProvider>
    </div>
  );
}

export default App;
