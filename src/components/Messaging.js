import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

function Messaging(props) {
    const [messageText, setMessageText] = useState('');

  return (
    <Container>
        <Chat>
            <ChatLog>
                    <Message>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>Liviu</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum ducimus id officiis ex, consequatur doloremque quae exercitationem corporis iure natus cum a ad saepe vitae, et quas! Culpa, assumenda!123</p>
                            </div>
                        </MessageBody>
                    </Message>
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
    display: grid;
    grid-template-columns: 80%;
    height: 98vh -5px;
    width: 100vw;
    justify-content: center;
`;

const Chat = styled.div`
    padding-top: 62px;
    display: flex;
    flex-direction: column;
`;

const MessageInput = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-top: 5px;
    background-color: #f4f4f4;
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
   resize: none;
   width: 100%;
   border-radius: 50px;
   line-height: 2.5;
`;

const ChatLog = styled.div`
  flex-direction: column-reverse;
  background-image: url("/images/背景2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: calc(100vh - 130px);
  background-color: black;
  border: 1px solid white;
  overflow-y: scroll;
  border-radius: 15px;
`;

const Message = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
    img {
        width: 50px;
        border-radius: 50%;
        margin-right: 5px;
    }
`;

const MessageBody = styled.div`
    div {  
        padding: 5px 10px;
        border-radius: 20px;
        background-color: white;
        color: rgba(0, 0, 0, .7);
        font-size: 14px;
        h2 {
            color: #000;
        }
    }
`;