import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { signUpAPI } from '../actions';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Join(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(firstName, lastName, email, password)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        props.logIn(payload);
    }
    console.log(props.user)
  return (
    <Container>
        { props.user && <Navigate to='/home'/>}
        <Link href='/'>
            <img src="/images/logo.png" alt="" />
        </Link>
        <Form>
            <img src="/images/login.png" alt="" />
            <h2>Sign Up</h2>
            <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" placeholder='First Name' />
            <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder='Last Name' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' />
            <small>Already a member? <a href="/login">Log In</a></small>
            <button onClick={(e) => handleSubmit(e)}>Sign Up</button>
        </Form>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}

const mapDispatchToProps = (dispatch) => ({
    logIn: (payload) => dispatch(signUpAPI(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Join);

const Container = styled.div`
    margin: 100px auto;
    width: 300px;
    border-radius: 12px;
    border: 1px solid black;
`;

const Link = styled.a`
    display: flex;
    justify-content: center;
    padding-top: 16px;
    img {
        width: 90%;
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
        margin: 4px 0;
        border: 0;
        border-bottom: 1px solid black;
        padding: 8px ;
    }
    small {
        text-align: center;
        font-size: 12px;
        margin: 5px 0;
    }
    button {
        background: transparent;
        padding: 8px 14px;
    }
`;
