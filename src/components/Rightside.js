import styled from 'styled-components'

function Rightside({ props }) {
  return (
    <div>
      <Container>
        <FollowCard>
          <Title>
            <h2>Add to your feed</h2>
            <img src="/images/info.png" alt="" />
          </Title>
          <FeedList>
            <li>
              <a>
                <Avatar />
              </a>
              <div>
                <span>#Daijob</span>
                <button>Follow</button>
              </div>
            </li>
            <li>
              <a>
                <Avatar />
              </a>
              <div>
                <span>#Video</span>
                <button>Follow</button>
              </div>
            </li>
          </FeedList>
          <Recommendation>
            View all recommendations
          <img src="/images/arrow-right.png" alt="" />
          </Recommendation>
        </FollowCard>
        <BannerCard>
          <img src="/images/活動.png" alt="" />
        </BannerCard>
      </Container>
    </div>
  )
}

const Container = styled.div`
    grid-area: Rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 3rem;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  img {
    width: 30px;
  }
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url('images/hashtag.png');
  background-size: contain;
  background-position: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-clip: padding-box; 
  outline: 3px solid rgba(0, 0, 0, 0.3);
  margin-right: 10px;
`;

const Recommendation = styled.div`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
  img {
    width: 30px;
  }
`;

const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;

export default Rightside
