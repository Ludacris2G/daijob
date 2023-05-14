import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getMessagesAPI, sendMessageAPI } from '../actions';
import { serverTimestamp } from 'firebase/firestore';

function Messaging(props) {
    const [messageText, setMessageText] = useState('');

    const sendMessage = (text) => {
        const payload = {
            text: text,
            name: props.user.displayName,
            photo: props.user.photoURL,
            time: serverTimestamp(),
        }
        props.sendMessage(payload);
    }

    useEffect(() => {
        props.getMessages();
    }, []);

    const handleKeyDown = (event) => {
        console.log(event)
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default behavior of Enter key
          sendMessage(messageText);
        }
    };

  return (
    <Container>
        <Chat>
            <ChatLog>
                    {props.messages.map((message) => (
                    <Message key={message.id}>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>{message.name}</h2>
                                <p>{message.text}</p>
                            </div>
                        </MessageBody>
                    </Message>
                    ))}
            </ChatLog>
            <MessageInput>
                { props.user ? (
                    <img src={props.user?.photoURL}/>
                ) : (
                    <img src='/images/nav-user.png'/>
                )}
                <Textarea 
                    value={messageText} 
                    placeholder='Start a conversation..'
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <button 
                    onClick={() => sendMessage(messageText)}
                    onKeyDown={handleKeyDown}
                >
                    Send
                </button>
            </MessageInput>
        </Chat>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        messages: state.messageState.messages,
    };
};

const mapDispatchToProps = (dispatch) =>({
    sendMessage: (payload) => dispatch(sendMessageAPI(payload)),
    getMessages: () => dispatch(getMessagesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);

const Container = styled.div`
    display: grid;
    grid-template-columns: 80%;
    height: 98vh -5px;
    width: 100vw;
    justify-content: center;
    @media (max-width: 768px) {
        grid-template-columns: auto;
        width: 100%;
    }
`;

const Chat = styled.div`
    padding-top: 62px;
    display: flex;
    flex-direction: column;
    @media (max-width:768px) {
        padding-top: 35px;
    }
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
   padding: 0 10px;
   margin: 0 6px;
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
  @media (max-width:768px) {
    height: calc(100vh - 165px);
  }
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