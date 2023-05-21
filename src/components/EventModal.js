import styled from 'styled-components'
import { useState } from 'react'
import { connect } from 'react-redux'
import { serverTimestamp } from '../firebase'
import { postArticleAPI, postEventAPI } from '../actions'

const EventModal = (props) => {
    const [eventName, setEventName] = useState('');
    const [radioValue, setRadioValue] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleEventInput = (e) => {
        setEventName(e);
    }

    const reset = (e) => {
        setEventName('');
        setRadioValue('');
        setDate('');
        setDescription('');
        props.handleClick(e);
    };

    const postEvent = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            user: props.user,
            name: eventName,
            eventType: radioValue,
            date: date,
            type: 'event',
            description: description,
            timestamp: serverTimestamp()
        };

        props.postEvent(payload);
        reset(e);
    }
    return (
        <>
        { props.showModal === "open" &&
            <Container>
                <Content>
                    <Header>
                        <h2>Create an event</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src="/images/プラス.png" alt="" />
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {props?.user.photoURL ? (
                                <img src={props?.user.photoURL}/>
                            ) : (
                                <img src="/images/nav-user.png" alt="" />
                            )}
                            <span>{props?.user.displayName}</span>
                        </UserInfo>
                        <Editor>
                            <img src="/images/イベント.png" alt="" />
                            <InputSubsection>
                                <p>Event name</p>
                                <input 
                                    className='input-box'
                                    value={eventName} 
                                    type="text" 
                                    onChange={(e) => handleEventInput(e.currentTarget.value)}
                                    placeholder='Choose an event name...'
                                />
                            </InputSubsection>
                            <InputSubsection>
                                <p>Event type</p>
                                <div className='event-type'>
                                    <div className="radio">
                                        <input 
                                            type="radio" id='online'
                                            value='online'
                                            name='radio'
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        />
                                        <label htmlFor="online">
                                            Online
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <input 
                                            type="radio" 
                                            id='in-person'
                                            value='in-person'
                                            name='radio'
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        />
                                        <label htmlFor="in-person">
                                            In person
                                        </label>
                                    </div>
                                </div>
                            </InputSubsection>
                            <InputSubsection>
                                <p>Date</p>
                                <input 
                                    className='input-box'
                                    type="date" 
                                    onChange={(e) => setDate(e.currentTarget.value)}
                                />
                            </InputSubsection>
                            <InputSubsection>
                                <p>Description</p>
                                <textarea 
                                    className='input-box' 
                                    name="" 
                                    id="" 
                                    cols="30" 
                                    rows="5"
                                    value={description}
                                    onChange={(e) => setDescription(e.currentTarget.value)}
                                >
                                </textarea>
                            </InputSubsection>
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <PostButton 
                            onClick={(e) => postEvent(e)}
                            disabled={!eventName || !radioValue || !date || !description}
                        >
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const onProgress = (progress) => {
    console.log(`Upload is ${progress}% done`);
};

const mapDispatchToProps = (dispatch) => ({
    postEvent: (payload) => dispatch(postEventAPI(payload, onProgress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventModal);

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn .3s;
    padding: 0 20px;
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 50px;
        width: 50px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.15);
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: all .3s ease-in-out;
        &:hover {
            transform: rotate(180deg);
        }
        img {
            transform: rotate(45deg);
            pointer-events: none;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    img {
        width: 48px !important;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0px 24px 12px 16px;
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : '#0a66c2')};
    color: ${(props) => (props.disabled ? 'rgba(1, 1, 1, 0.2)' : 'white')};
    cursor: pointer;
    &:hover {
        background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#004182')};
    }
`;

const Editor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        display: block;
        width: 100px !important;
    }
    .event-type {
        display: flex;
        .radio {
            display: flex;
            margin: 0 5px;
        }
    }
`;

const InputSubsection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
    width: 200px;
    p {
        text-align: left;
        font-size: 14px;
        padding-bottom: 5px;
    }
    textarea {
        resize: none;
    }
    .input-box {
        width: 200px;
        padding: 4px;
    }
`;