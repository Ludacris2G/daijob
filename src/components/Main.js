import styled from 'styled-components'

import React from 'react'

function Main({ props }) {
  return (
    <div>
      <Container>
        <ShareBox>
          Share
          <div>
            <img src="/images/nav-user.png" alt="" />
            <button>Start a post</button>
          </div>
          <div>
            <button>
              <img src="/images/photo-icon.png" alt="" />
              <span>Photo</span>
            </button>
            <button>
              <img src="/images/video-icon.png" alt="" />
              <span>Video</span>
            </button>
            <button>
              <img src="/images/event.png" alt="" />
              <span>Event</span>
            </button>
            <button>
              <img src="/images/アーティクル.png" alt="" />
              <span>Article</span>
            </button>
          </div>
        </ShareBox>
        <div>
          <Article>
            <SharedActor>
              <a>
                <img src="/images/nav-user.png" alt="" />
                <div>
                  <span>Title</span>
                  <span>Info</span>
                  <span>Date</span>
                </div>
              </a>
              <button>
                <img src="/images/three-dots.svg" alt="" />
              </button>
            </SharedActor>
          </Article>
        </div>
      </Container>
    </div>
  )
}

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
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
`;

export default Main
