import styled from 'styled-components'
import { connect } from 'react-redux'
import { signInAPI } from '../actions'
import { Navigate } from 'react-router-dom'

function Login(props)  {
  return (
    <Container>
      {/* the props.user comes from mapStateToProps */}
      {props?.user && <Navigate to='/home'/>}
      <Nav>
        <a href="/">
          <img src="/images/logo.png" alt="" />
        </a>
        <div>
          <Join href='/join'>
            Join Now
          </Join>
          <SignIn href='/signin'>
            Sign in
          </SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Your #1 app for job hunting.</h1>
          <img src='/images/company_roudou_kumiai.png' alt="Company employees greeting you!" />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" />
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// styling
const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.div`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    text-decoration: none;
    font-size: 2rem;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
  img {
    margin-top: 1rem;
    height: initial;
    width: 400px;
  }
  @media (max-width: 610px) {
    flex-direction: column;
    img {
      margin-top: initial;
      width: 100%;
      transform: scale(1.7);
    }
    a {
      margin: 12px 10px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
  @media (max-width: 363px) {
    font-size: 13px;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  text-decoration: none;
  &:hover {
    background-color: rgba(112, 141, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }

  @media (max-width: 363px) {
    font-size: 13px;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: flex-start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
  @media (max-width: 500px) {
    padding-top: 20px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 40px;
    margin-left: 1rem;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
      margin-left: initial;
    }
  }
  img {
    /* z-index: -1; */
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -100px;
    @media (max-width: 767px) {
      top: 230px;
      width: 100%;
      height: initial;
      position: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;

const Google = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  img {
    width: 25px;
  }
`;