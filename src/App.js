import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={[<Login key='login'/>]}/>
        <Route path='/home' element={[<Header key='header'/>, <Home key='home'/>]}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;

// npm i react-router-dom
// npm i styled-componenst
//npm install --save-dev google-fonts-loader
