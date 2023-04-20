import './App.css';
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={[<Login key='login'/>]}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;

// npm i react-router-dom
// npm i styled-componenst