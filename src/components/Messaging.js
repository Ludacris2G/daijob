import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getMessagesAPI, sendMessageAPI } from '../actions';
import { serverTimestamp } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { useRef } from 'react';
import moment from 'moment';

function Messaging(props) {
    const [messageText, setMessageText] = useState('');
    const messagesContainerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);


    const sendMessage = (text) => {
        const payload = {
            text: text,
            name: props.user.displayName,
            photo: props.user?.photoURL,
            userId: props.user.uid,
            time: serverTimestamp(),
        }
        props.sendMessage(payload);
        setMessageText('');
    }

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      };

    useEffect(() => {
        props.getMessages();
        scrollToBottom();
        if (props.messages) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500); // Delay of 500 milliseconds
        }
    }, []);

    useEffect(() => {
        if (props.messages.length > 0) {
          scrollToBottom(); // Scroll to the bottom when new messages are added
        }
      }, [props.messages]);

    const handleKeyDown = (event) => {
        if (!messageText) {
            return;
        }
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default behavior of Enter key
          sendMessage(messageText);
          setMessageText('');
        }
    };
    console.log(props.messages)
  return (
    <Container>
        { !props.user && <Navigate to='/'/> }
        { props.user &&
        <Chat>
            <ChatLog ref={messagesContainerRef}>
                { isLoading ? (
                          <img className='loading' src="/images/loading.gif" alt=""/>
                ) : (
                    <>
                    {props.messages.map((message, i) => (
                    <Message key={message.id}>
                        { props.user?.uid === message.userId  ? (
                            <img src={message?.photo}/>
                        ) : (
                            <img src={message.photo || '/images/nav-user.png'}/>
                        )}
                        <MessageBody>
                            <div>
                                {message.time && (
                                <span className='date'>{moment.unix(message.time.seconds).fromNow()}</span>
                                )}
                                <h2>{message.name === props.user.displayName ? 'Me' : message.name}</h2>
                                <p>{message.text}</p>
                            </div>
                        </MessageBody>
                    </Message>
                    ))}
                    </>
                )}
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
                    onKeyDown={handleKeyDown}
                />
                <button 
                    disabled={!messageText}
                    onClick={() => sendMessage(messageText)}
                >
                    Send
                </button>
            </MessageInput>
        </Chat>
        }
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
        grid-template-columns: 100%;
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
   padding: 11px 10px;
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
  display: flex;
  flex-direction: column-reverse;
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
        min-width: 150px;
        padding: 9px 12px;
        border-radius: 20px;
        background-color: white;
        color: white;
        font-size: 14px;
        position: relative;
        h2 {
            color: #000;
            margin-bottom: 5px;
        }
        .date {
            position: absolute;
            right: 10px;
            color: rgba(0, 0, 0, .7);
            font-size: 8px;
        }
    }
`;