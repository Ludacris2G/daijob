import React from 'react'
import styled from 'styled-components'

function Join() {
  return (
    <Container>
        <Link href='/'>
            <img src="/images/logo.png" alt="" />
        </Link>
        <Form>
            <img src="/images/login.png" alt="" />
            <h2>Sign Up</h2>
            <input type="text" placeholder='First Name' />
            <input type="text" placeholder='Last Name' />
            <input type="text" placeholder='email' />
            <input type="password" placeholder='password' />
            <small>Already a member? <a href="/login">Log In</a></small>
            <button>Sign Up</button>
        </Form>
    </Container>
  )
}

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
    button {
        
    }
`;

export default Join
