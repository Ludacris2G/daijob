import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserAuth, passwordSignInAPI } from '../actions';
import { connect } from 'react-redux';

function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target !== e.currentTarget) {
            return;
        }
        
        const payload = {
            email: email,
            password: password,
        }

        props.signIn(payload);
    }

  return (
    <div>
    <Container>
        { props.user && <Navigate to='/home'/>}
        <Link href='/'>
            <img src="/images/logo.png" alt="" />
        </Link>
        <Form>
            <img src="/images/login.png" alt="" />
            <h2>Sign In</h2>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' />
            <button onClick={(e) => handleSubmit(e)} disabled={ !email || !password || password.length < 6 } >Sign In</button>
        </Form>
    </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    };
}

const mapDispatchToProps = (dispatch) => ({
    signIn: (payload) => dispatch(passwordSignInAPI(payload)),
    getUserAuth: () => dispatch(getUserAuth()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const Container = styled.div`
    background-color: #fafafafa;
    margin: 100px auto;
    width: 300px;
    border-radius: 12px;
    border: 1px solid black;
    -webkit-box-shadow: 1px 1px 20px 1px rgba(0,0,0,.7);
    -moz-box-shadow: 1px 1px 20px 1px rgba(0,0,0,.7);
    box-shadow: 1px 1px 20px 1px rgba(0,0,0,.7);
`;

const Link = styled.a`
    display: flex;
    justify-content: center;
    padding-top: 16px;
    img {
        width: 90%;
        border-radius: 5px;
        &:hover {
            background-color: rgba(0, 0, 0, 0.15);
        }
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 12px 18px;
    img {
        width: 130px;
        margin: 0 auto;
    }
    h2 {
        font-size: 20px;
    }
    input {
        margin: 10px 0;
        border: 0;
        border-bottom: 1px solid black;
        padding: 8px ;
    }
    button {
        background: transparent;
        padding: 8px 14px;
        border-radius: 12px;
        margin-top: 10px;
        cursor: pointer;
        font-size: 18px;
        background-color: #00b894;
        color: white;
        &:hover {
            background-color: #00b894c0;
        }
    }
    button[disabled] {
        background-color: lightgray;
    }
`;
