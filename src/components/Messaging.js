import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

function Messaging(props) {
    console.log(props)
  return (
    <Container>
        <Chat>
            <p>Join the discussion!</p>
            <ChatLog>
                Messages
            </ChatLog>
            <MessageInput>
                { props.user ? (
                    <img src={props.user?.photoURL}/>
                ) : (
                    <img src='/images/nav-user.png'/>
                )}
                <Textarea placeholder='Start a conversation..'/>
                <button>Send</button>
            </MessageInput>
        </Chat>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) =>({

});

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);

const Container = styled.div`
    flex-direction: column;
    justify-content: space-between;
    font-size: 18px;
    margin-top: 70px;
`;

const Chat = styled.div`
    display: flex;
    flex-direction: column;
    background-color: slateblue;
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 70%;
    justify-content: flex-end;
`;

const MessageInput = styled.div`
    /* background-color: blue;
    height: 35px;
    position: absolute;
    bottom: 78px;
    display: flex;
    width: 100%;
    align-items: center; */
    display: flex;
    justify-content: space-between;
    height: 40px;
    img {
        border-radius: 50%;
    }
    button {
        border: none;
        border-radius: 50px;
        cursor: pointer;
        height: 100%;
        align-self: stretch;
        &:hover {
            background-color: rgba(0, 0, 0, .15);
        }
    }
`;

const Textarea = styled.textarea`
    /* align-items: center;
    font-size: 16px;
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 50px;
    outline: none;
    margin: 0 3px;
   line-height: 2; */
   resize: none;
   width: 100%;
   border-radius: 50px;
`;

const ChatLog = styled.div`
    background-color: steelblue;
    height: 100%;
    border-radius: 20px;
`;