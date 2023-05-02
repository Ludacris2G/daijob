import styled from 'styled-components'
import { signOutAPI } from '../actions';
import { connect } from 'react-redux';

function Header(props) {
  return (
    <Container>
        <Content>
            <Logo>
                <a href='/home'>
                    <img src="/images/logo.png" alt="" />
                </a>
            </Logo>
            <Search>
                <div>
                    <input type="text" placeholder='Search' />
                </div>
                <SearchIcon>
                    <img src="/images/search.png" alt="" />
                </SearchIcon>
            </Search>
            <Nav>
                <NavListWrap>
                    <NavList className='active'>
                        <a href="/home">
                            <img src="/images/nav-home.png" alt="" />
                            <span>Home</span>
                        </a>
                    </NavList>
                    <NavList>
                        <a href="/home">
                            <img src="/images/nav-network.png" alt="" />
                            <span>My Network</span>
                        </a>
                    </NavList>
                    <NavList>
                        <a href="/home">
                            <img src="/images/nav-jobs.png" alt="" />
                            <span>Jobs</span>
                        </a>
                    </NavList>
                    <NavList>
                        <a href="/home">
                            <img src="/images/nav-messaging.png" alt="" />
                            <span>Messaging</span>
                        </a>
                    </NavList>
                    <NavList>
                        <a href="/home">
                            <img src="/images/nav-notifications.png" alt="" />
                            <span>Notifications</span>
                        </a>
                    </NavList>

                    <User>
                        <a>
                            {props?.user && props?.user.photoURL ? (
                            <img src={props.user.photoURL} />
                            ) : (
                            <img src="/images/nav-user.png" alt="" />
                            )}
                            <span>
                                Me
                            <img className='dropdown-img' src="/images/down-arrow.svg" alt="" />
                            </span>
                        </a>

                        <SignOut onClick={() => props.signOut()}>
                            <a>Sign Out</a>
                        </SignOut>
                    </User>

                    <Work>
                        <a>
                            <img src="/images/nav-work.png" alt="" />
                            <span>Work
                                <img className='dropdown-img' src="/images/down-arrow.svg" alt="" />
                            </span>
                        </a>
                    </Work>
                </NavListWrap>
            </Nav>
        </Content>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// STYLES
const Container = styled.div`
    background-color: white;
    border-bottom: 1px solit rgba(0, 0, 0, 0.08);
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 24px;
    z-index: 100;
    width: 100vw;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;
`;

const Logo = styled.span`
margin-right: 8px;
font-size: 0;
    img {
        width: initial;
        height: 30px;
    }
`;

const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
    & > div {
        max-width: 280px;
        input {
            border: none;
            box-shadow: none;
            background-color: #eef3f8;
            border-radius: 2px;
            color: rgba(0, 0, 0, 0.9);
            width: 218px;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 40px;
            border-color: #dce6f1;
            vertical-align: text-top;
        }
    }

`;

const SearchIcon = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 2px;
    margin: 2px;
    pointer-events: none;
    transform: rotate(-60deg);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
    width: 30px;
    }
`;

const Nav = styled.nav`
    margin-left: auto;
    display: block;
    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        bottom: 0;
        background: white;
        width: 100%;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;

    .active {
        span:after {
            content: '';
            transform: scaleX(1);
            border-bottom: 2px solid var(--white, #fff);
            bottom: 0;
            left: 0;
            position: absolute;
            transition: transform .2s ease-in-out;
            width: 100%;
            border-color: rgba(0, 0, 0, 0.9);
        }
    }

    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
    }
`;

const NavList = styled.li`
    display: flex;
    align-items: center;
    margin-right: 20px;
    a {
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 42px;
        min-width: 40px;
        position: relative;
        text-decoration: none;
        span {
            color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
        }
    }
    img {
        height: 40px;
    }
    @media (max-width: 768px) {
        margin-right: 6px;
        span {
            font-size: 10px;
        }
    }

    &:hover, 
    &:active {
        a {
            span {
                color: rgba(0, 0, 0, 0.9);
            }
        }
    }
`;

const SignOut = styled.div`
    position: absolute;
    top: 45px;
    background: white;
    border-radius: 0 0 5px 5px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    transition-duration: 167ms;
    text-align: center;
    display: none;
`;

const User = styled(NavList)`
    a > img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
    }

    span {
        display: flex;
        align-items: center;
    }
    .dropdown-img {
        width: 24px;
    }

    &:hover {
        ${SignOut} {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 19px;
            margin-left: -27px;
            cursor: pointer;
        }
    }
`;

const Work = styled(User)`
    padding-left: 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    @media (max-width: 768px) {
        padding-left: 4px;
    }
`;