import styled from 'styled-components'
import PostModal from './PostModal'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { deletePostAPI, getArticlesAPI, likePostAPI } from '../actions';
import ReactPlayer from 'react-player';
import CommentModal from './CommentModal';
import Comment from './Comment';
import moment from 'moment';
import EventModal from './EventModal';

function Main(props) {
  const [showModal, setModal] = useState('close');
  const [showEventModal, setEventModal] = useState('close');
  const [showPictureUpload, setShowPictureUpload] = useState('');
  const [showVideoUpload, setShowVideoUpload] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showArticleSettings, setShowArticleSettings] = useState(Array(props.articles.length).fill(false));
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [articleDeletionId, setArticleDeletionId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.getArticles();

    const modalOpen = deleteWarning || showModal === 'open' || showEventModal === 'open';
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    setInterval(() => {
      if (props.articles) {
        setIsLoading(false);
      }      
    }, 2000);
  }, [deleteWarning, showModal, showEventModal]);

  const handleClick = (e) => {
    e.preventDefault();
    // cause this const is called in 2 places
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setModal("close");
        break;
      case "close":
        setModal("open");
        break;
      default:
        setModal("close");
        break;
    }
  }

  const handlePhotoClick = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    switch(showModal) {
      case "open":
        setModal("close");
        break;
      case "close":
        setModal("open");
        break;
      default:
        setModal("close");
        break;
    }

    setShowPictureUpload('image');
  }

  const handleVideoClick = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    switch(showModal) {
      case "open":
        setModal("close");
        break;
      case "close":
        setModal("open");
        break;
      default:
        setModal("close");
        break;
    }

    setShowVideoUpload('video');
  }

  const handleEventClick = () => {
    switch(showEventModal) {
      case 'open':
        setEventModal('close');
        break;
      case 'close':
        setEventModal('open');
        break;
      default:
        setEventModal('close');
        break;
    }
  }

  const handleClosePhotoClick = () => {
    setShowPictureUpload('');
  }

  const handleCloseVideoClick = () => {
    setShowVideoUpload('');
  }

  const likePost = (e, id) => {
    e.preventDefault();
    if (e.target != e.currentTarget) {
      return;
    }

    const payload = {
      id: id,
      userId: props.user?.email,
    }

    props.likePost(payload)
  }

  const openCommentModal = (e) => {
    if (e.target !== e.currentTarget) {
      setShowArticleSettings(false);
      return;
    }

    switch(showCommentModal) {
      case false:
        setShowCommentModal(true);
        break;
      case true:
        setShowCommentModal(false);
        break;
      default:
        setShowCommentModal(false);
    }
  }

  const openArticleSettings = (i, e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    
    setShowArticleSettings((prevState) => {
      const updatedSettings = [...prevState];
      updatedSettings[i] = !updatedSettings[i];
      return updatedSettings;
    });
  }

  const handleDelete = (id, i) => {
    setShowArticleSettings((prevState) => {
      const updatedSettings = [...prevState];
      updatedSettings[i] = false;
      return updatedSettings;
    });

    if (deleteWarning) {
      document.body.classList.remove('modal-open');
      setDeleteWarning(false);
      setArticleDeletionId('');
    } else {
      document.body.classList.add('modal-open');
      setDeleteWarning(true);
      setArticleDeletionId(id);
    }
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('#delete-warning')) {
      setDeleteWarning(false);
    }
  }

  const deletePost = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }
    
    setDeleteWarning(false);
    setArticleDeletionId('');
    document.body.classList.remove('modal-open');
    props.deletePost(articleDeletionId);
  }
  return (
    <div>
      <Container>
        <ShareBox>
          <div>
            {props?.user && props.user?.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/nav-user.png" alt="" />
            )}
            <button disabled={props.loading} onClick={handleClick}>Start a post</button>
          </div>
          <div>
            <button disabled={props.loading} onClick={handlePhotoClick}>
              <img src="/images/photo-icon.png" alt="" />
              <span>Photo</span>
            </button>
            <button disabled={props.loading} onClick={handleVideoClick}>
              <img src="/images/video-icon.png" alt="" />
              <span>Video</span>
            </button>
            <button disabled={props.loading} onClick={handleEventClick}>
              <img src="/images/event.png" alt="" />
              <span>Event</span>
            </button>
            <button>
              <img src="/images/アーティクル.png" alt="" />
              <span>Article</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img className='loading' src="/images/loading.gif" alt="" />}
          {props.articles.length > 0 && 
          props.articles.map((article, index) => (
              <Article key={article.id}>
                { isLoading ? (
                  <img className='loading' src="/images/loading.gif" alt="" />
                ) : (
                  <>
                <SharedActor onBlur={() => setShowArticleSettings(showArticleSettings.map((value, i) => i === index ? false : value))}>
                  <a>
                    { article.actor.image ? (
                      <img src={ article.actor.image } alt="" />
                    ) : (
                      <img src={ '/images/nav-user.png' } alt="" />
                    )}
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      {article && article.actor && article.actor.date && (
                        <span>{ moment.unix(article.actor.date.seconds).fromNow()}</span>
                      )}
                    </div>
                  </a>
                  { props.user?.email === article.actor?.description &&
                  <button 
                    onClick={(e) => openArticleSettings(index, e)}
                  >
                    {showArticleSettings[index] && <DeleteButton onClick={() => handleDelete(article.id, index)} 
                    />}
                    <img className='three-dots' src="/images/three-dots.svg" alt="" />
                  </button>
                  }
                </SharedActor>
                <Description>
                  {article.description}
                </Description>
                <SharedImg>
                  <a>
                      {
                         article.video ? (
                          <ReactPlayer width={'100%'} url={article.video} controls/>
                        ) : (
                          <img src={article.sharedImg} alt="" />
                        )
                      }
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    <button>
                      <img src="/images/親指.png" alt="" />
                      <img src="/images/washing-hands.png" alt="" />
                      <span>{article.likes}</span>
                    </button>
                  </li>
                  <li>
                    <a>
                      {article.comments} comments
                    </a>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button 
                    style={{backgroundColor: article.likeUsers.includes(props?.user?.email) ? 'rgba(0, 0, 0, 0.2) ' : '#f0f0f0'}} 
                    onClick={(e) => likePost(e, article.id)}
                  >
                    <img src="/images/親指.png" alt="" />
                    <span 
                      style={{fontWeight: article.likeUsers.includes(props?.user?.email) ? '700' : '400'}}
                    >
                      Like
                    </span>
                  </button>
                  <button 
                    onClick={openCommentModal}
                    style={{backgroundColor: showCommentModal ? 'rgba(0, 0, 0, .2)' : '#f0f0f0'}}
                  >
                    <img src="/images/megaphone.png" alt="" />
                    <span style={{fontWeight: showCommentModal ? '700' : '400'}}>Comment</span>
                  </button>
                  <button>
                    <img src="/images/share.png" alt="" />
                    <span>Share</span>
                  </button>
                  <button>
                    <img src="/images/紙飛行機.png" alt="" />
                    <span>Send</span>
                  </button>
                </SocialActions>
                { showCommentModal && (<CommentModal id={article.id}/>)}
                { article.comments > 0 && article.commentsUsers.map((comment, i) => (
                  <Comment key={i} comment={comment} email={props.user?.email} article={article}/>
                ))}
                {deleteWarning && 
                <DeleteWarning>
                  <div id='delete-warning' onClick={handleOutsideClick}>
                  <Card>
                      <p>Are you sure you want to delete this post?</p>
                      <div>
                        <button onClick={(e) => deletePost(e)}>Yes</button>
                        <button onClick={(e) => handleDelete(e)}>No</button>
                      </div>
                  </Card>
                  </div>
                </DeleteWarning>
                }
                  </>
                  )}
              </Article>
        ))}
        </Content>
        <PostModal 
          showModal={showModal} 
          handleClick={handleClick} 
          setShowPictureUpload={setShowPictureUpload} showPictureUpload={showPictureUpload} handleClosePhotoClick={handleClosePhotoClick} 
          setShowVideoUpload={setShowVideoUpload}
          showVideoUpload={showVideoUpload}
          handleCloseVideoClick={handleCloseVideoClick}
        />
        <EventModal 
          showModal={showEventModal} 
          handleClick={handleEventClick} 
        />
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
  likePost: (payload) => dispatch(likePostAPI(payload)),
  deletePost: (payload) => dispatch(deletePostAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const Container = styled.div`
    grid-area: Main;
    img {
    width: 30px;
    }
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%, 0 0 0 rgb(0 0 0 / 20%));
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  /* div:last-child {
    display: flex;
    justify-content: start;
  } */
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        span {
          color: #70b5f9b0 !important;
        }
      }
      img {
          margin: 0 4px 0 -2px;
          pointer-events: none;
        }
        span {
          color: #70b5f9;
          pointer-events: none;
        }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        cursor: pointer;
        &:hover {
          color: rgba(0, 0, 0, 1);
          border: 1px solid rgba(0, 0, 0, 1)
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  padding-bottom: 1px;
  .loading {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    .loading {
      height: 500px;
      object-fit: cover;
    }
  }
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n+1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    img {
      cursor: pointer;
      pointer-events: none;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    display: flex;
    margin-right: 5px;
    font-size: 12px;
    button {
      border: none;
      display: flex;
      align-items: center;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0 , .15);
      }
    }
  }
  @media (max-width:768px) {
    li {
      button {
        img {
          width: 20px;
        }
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: black;
    height: 40px;
    margin-right: 5px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15) !important;
    }
    img {
      pointer-events: none;
    }
    span {
      pointer-events: none;
    }
    @media (max-width: 768px) {
      margin-right: 7px;
      padding: 0 5px;
      font-size: 12px;
      height: 25px;
      img {
        width: 20px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    background-color: rgba(0, 0, 0, .8);
    color: white;
    padding: 5px 20px;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: opacity .3s ease;
    &:hover {
        background-color: rgba(0, 0, 0, .6);
    }
    &:after {
      content: 'Delete Post';
    }
    @media (max-width:768px) {
      width: 80px;
    }
`;

const DeleteWarning = styled.div`
  background-color: rgba(0, 0, 0, .7);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 1rem;
  }
`;

const Card = styled.div`
  background-color: #e3e3e3e8;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    button {
      padding: 5px 12px;
      background-color: #0a66c2;
      border: none;
      border-radius: 5px;
      width: 60px;
      height: 30px;
      margin: 0 5px;
      color: white;
      &:first-child {
        background-color: #4f4949b3;
      }
    }
  }
`;