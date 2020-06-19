import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './pages/NavBar';
import AppRouter from './configs/AppRouter'
function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
