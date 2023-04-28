import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getUserAuth } from './actions'
import { connect } from 'react-redux'

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

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

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

// npm i react-router-dom
// npm i styled-componenst
//npm install --save-dev google-fonts-loader
// npm i redux
// npm i react-redux
// npm i firebase
// npm i firebase-tools
// npm i redux-thunk
