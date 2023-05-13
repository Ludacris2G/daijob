import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

function Messaging(props) {
  return (
    <Container>
        <Chat>
            <ChatLog>
                <img className='chat-background' src="/images/背景2.jpg" alt="" />
                    <Message>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>Liviu</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum ducimus id officiis ex, consequatur doloremque quae exercitationem corporis iure natus cum a ad saepe vitae, et quas! Culpa, assumenda!</p>
                            </div>
                        </MessageBody>
                    </Message>
                    <Message>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>Liviu</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum ducimus id officiis ex, consequatur doloremque quae exercitationem corporis iure natus cum a ad saepe vitae, et quas! Culpa, assumenda!</p>
                            </div>
                        </MessageBody>
                    </Message>
                    <Message>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>Liviu</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum ducimus id officiis ex, consequatur doloremque quae exercitationem corporis iure natus cum a ad saepe vitae, et quas! Culpa, assumenda!</p>
                            </div>
                        </MessageBody>
                    </Message>
                    <Message>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>Liviu</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum ducimus id officiis ex, consequatur doloremque quae exercitationem corporis iure natus cum a ad saepe vitae, et quas! Culpa, assumenda!</p>
                            </div>
                        </MessageBody>
                    </Message>
                    <Message>
                        { props.user?.photoURL ? (
                            <img src={props.user?.photoURL}/>
                        ) : (
                            <img src='/images/nav-user.png'/>
                        )}
                        <MessageBody>
                            <div>
                            <h2>Liviu</h2>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum ducimus id officiis ex, consequatur doloremque quae exercitationem corporis iure natus cum a ad saepe vitae, et quas! Culpa, assumenda!</p>
                            </div>
                        </MessageBody>
                    </Message>
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
    flex-direction: column;
    justify-content: space-between;
    font-size: 18px;
    margin-top: 70px;
`;

const Chat = styled.div`
`;

const MessageInput = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-top: 5px;
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
    position: relative;
    height: 400px;
    overflow: auto;
    .chat-background {
        position: fixed;
        object-fit: cover;
        bottom: 0;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
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
        background-color: #f4f4f4;
        border-radius: 20px;
        color: rgba(0, 0, 0, .7);
        font-size: 14px;
        h2 {
            color: #000;
        }
    }
`;