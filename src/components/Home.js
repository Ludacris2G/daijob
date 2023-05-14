import styled from 'styled-components'
import Leftside from './Leftside'
import Main from './Main'
import Rightside from './Rightside'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

function Home(props) {
    return (
        <Container>
                {!props?.user && <Navigate to='/'/>}
            <Layout>
                <Leftside />
                <Main />
                <Rightside />
            </Layout>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
`;

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    /* grid-template-rows: auto; */
    margin: 25px 0;
    transition: all .3s linear;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
`;

