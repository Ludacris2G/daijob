import styled from 'styled-components'

import React from 'react'

function Leftside({ props }) {
  return (
    <div>
      <Container>
        <ArtCard>
          <UserInfo>
            <CardBackground />
            <a>
              <Photo />
              <Link> Welcome, there!</Link>
            </a>
            <a>
              <AddPhotoText>Add a photo</AddPhotoText>
            </a>
          </UserInfo>
          <Widget>
            <a>
              <div>
                <span>Connections</span>
                <span>Grow your network</span>
              </div>
              <img src="/images/add-people.png" alt="" />
            </a>
          </Widget>
          <Item>
            <span><img src="/images/bookmark.png" alt="" /></span>
          </Item>
        </ArtCard>
      </Container>
    </div>
  )
}

const Container = styled.div`
    grid-area: Leftside;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url('/images/背景2.jpg');
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  background-image: url('/images/camera.png');
  width: 72px;
  height: 72px;
  background-size: 60%;
  background-position: center;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  img {
    width: 25px;
  }
`;

const Item = styled.a``;

export default Leftside;
