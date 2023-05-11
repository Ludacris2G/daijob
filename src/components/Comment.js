import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux';
import { useState } from 'react';
import { deleteCommentAPI } from '../actions';

function Comment(props) {
    const [settingsWindow, setSettingsWindow] = useState(false);
    // console.log(props.user.email, props.article.commentsUsers);
    // comment, name, email, photo, timestamp
    const deleteComment = (comment, article, email) => {

        const payload = {
            articleId: article.id,
            timestamp: comment.timestamp.seconds,
            email: email,
        }

        props.deleteComment(payload);
    }

  return (
    <Container>
        <CommentBody>
            <ImageContainer>
                { props.comment.photo ? (
                <img src={ props.comment.photo }/>) 
                : (
                <img src="/images/nav-user.png" alt="" />
                )}
            </ImageContainer>
            <TextBoxContainer>
                <h5>{ props.comment.name }</h5>
                <span>
                    <small>{ props.comment.email }</small>
                </span>
                <p>{ props.comment.comment }</p>
                <CommentOptions>
                    <p>{ moment.unix(props.comment.timestamp.seconds).fromNow() }</p>
                    <div>
                    {props.comment?.email === props?.email && 
                    // add on blur here ->>>>>>>>>>>
                    <button onClick={() => setSettingsWindow(!settingsWindow)}>
                        <img src="/images/three-dots.svg" alt="3 dots" />
                    </button>
                    }
                    </div>
                    {settingsWindow && <SettingsButton onClick={() => deleteComment(props.comment, props.article, props.user.email)}/>}
                </CommentOptions>
            </TextBoxContainer>
        </CommentBody>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    deleteComment: (payload) => dispatch(deleteCommentAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

const Container = styled.div`
    display: flex;
    margin: 5px 10px;
    flex-direction: column;
`;

const CommentBody = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: row;
`;

const ImageContainer = styled.div`
    align-items: flex-start;
    img {
        border-radius: 50%;
    }
`;

const TextBoxContainer = styled.div`
    position: relative;
    width: 100%;
    margin-left: 3px;
    border-radius: 0 20px 20px 20px;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, .07);
    h5 {
        text-align: left;
        font-size: 12px;
    }
    p {
        font-size: 14px;
        text-align: left;
        padding: 4px;
    }
    span {
        display: flex;
        font-size: 8px;
        margin-bottom: 2px;
    }
`;

const CommentOptions = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 2px;
    img {
        width: 12px !important;
        cursor: pointer;
    }
    p {
        font-size:8px;
    }
    div {
        button {
            right: 12px;
            top: 0;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            img {
            cursor: pointer;
            pointer-events: none;
            }
        }
    }
`;

const SettingsButton = styled.button`
    position: absolute;
    top: 15px;
    right: 0;
    background-color: rgba(0, 0, 0, .8);
    color: white;
    padding: 5px 20px;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .3s ease;
    &:hover {
        background-color: rgba(0, 0, 0, .6);
    }
    &:after {
      content: 'Delete comment';
    }
    @media (max-width:768px) {
      width: 80px;
    }
`;
