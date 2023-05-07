import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getUserAuth } from './actions'
import { connect } from 'react-redux'
import Join from './components/Join'
import SignIn from './components/SignIn'
import { auth } from './firebase'
import { useState } from 'react'

function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const refreshUser = auth.onAuthStateChanged(user => {
      props.getUserAuth();
      setIsLoading(false);
    });

    return refreshUser;
  }, []);

  if (isLoading) {
    return (
      <div style={{ position: 'relative' }}>
        <img className='loading' src="/images/loading.gif" alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 0%)', overflowY: 'hidden' }} />
      </div>
    );
    
  }
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={[<Login key='login'/>]}/>
        <Route path='/home' element={[<Header key='header'/>, <Home key='home'/>]}/>
        <Route path='/join' element={[<Join key='join'/>]}/>
        <Route path='/signin' element={[<SignIn key='signin'/>]}/>
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
// npm i react-player