import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

function Comment(props) {
    // comment, name, email, photo, timestamp
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
                    <img src="/images/three-dots.svg" alt="3 dots" />
                </CommentOptions>
            </TextBoxContainer>
        </CommentBody>
    </Container>
  )
}

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
`;

export default Comment
