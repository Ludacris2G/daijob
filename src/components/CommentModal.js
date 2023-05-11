import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { postCommentAPI } from '../actions';
import { connect } from 'react-redux';
import { Timestamp } from '../firebase'

function CommentModal(props) {
    const [comment, setComment] = useState(''); 
    const handlePost = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        // be careful to add a default picture
        const payload = {
            comment: {
                comment: comment,
                photo: props.user.photoURL,
                name: props.user.displayName,
                email: props.user.email,
                timestamp: Timestamp.fromDate(new Date()),
            },
            articleId: props.id,
        }

        props.postComment(payload);
        setComment('');
    };
  return (
    <Container>
        { props.user?.photoURL ? (
        <img src={props.user?.photoURL}/>) : (
        <img src='/images/nav-user.png'/>
        )}
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='say something nice'/>
        <button onClick={(e) => handlePost(e)} disabled={!comment}>Post</button>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        articles: state.articleState.articles,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (payload) => dispatch(postCommentAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal);

const Container = styled.div`
    align-items: center;
    padding: 0 8px 4px 8px;
    display: flex;
    button {
        border: none;
        border-radius: 10px;
        margin-left: 5px;
        cursor: pointer;
        align-self: stretch;
        flex-grow: 1;
        &:hover {
            background-color: rgba(0, 0, 0, .15);
        }
    }
    img {
        object-fit: contain;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        margin-right: 3px;
    }
`;

const Textarea = styled.textarea`
    font-size: 14px;
    width: 100%;
    height: 20px;
    resize: none;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 20px;
    outline: none;
    padding: 8px 8px;
`;