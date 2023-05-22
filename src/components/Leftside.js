import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { deleteEventAPI, getEventsAPI } from '../actions';
import moment from 'moment';
import { useState } from 'react';

function Leftside(props) {
  const [showSettings, setSettings] = useState(Array(props.events.length).fill(false));
  console.log(showSettings)
  
  useEffect(() => {
    props.getEvents();
  },[]);

  function calculateRemainingDays(targetDate) {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate).getTime();
    const remainingTime = targetDateTime - currentDate.getTime();

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    if (days >= 0) {
      return `Days remaining: ${days}`;
    }
    else {
      return `This event has ended`;
    }
  }

  const openSettings = (i) => {
    setSettings((prevState) => {
      const updatedSettings = [...prevState];
      updatedSettings[i] = !updatedSettings[i];
      return updatedSettings;
    })
  };

  const deleteEvent = (i) => {
    if (props.user.uid !== props.events[i].actor.uid) {
      return;
    }
    
    props.deleteEvent(props.events[i].id);
  }

  return (
    <div>
      <Container>
        <ArtCard>
          <UserInfo>
            <CardBackground />
            <a>
                {props.user?.photoURL ? (
                <img src={props.user?.photoURL} alt="" />
                ) : (
                  <img src="images/nav-user.png" alt="" />
                )}
              <Link> Welcome, 
              {props.user ? ' ' + props.user?.displayName + '!' : 'there!'}</Link>
            </a>
            {/* <a>
              <AddPhotoText>Add a photo</AddPhotoText>
            </a> */}
          </UserInfo>
          {/* <Widget>
            <a>
              <div>
                <span>Connections</span>
                <span>Grow your network</span>
              </div>
              <img src="/images/add-people.png" alt="" />
            </a>
          </Widget>
          <Item>
            <span>
              <img src="/images/bookmark.png" alt="" />
              My Items
            </span>
          </Item> */}
        </ArtCard>
          { props.events.length > 0 && 
        <CommunityCard>
          
          <span>Upcoming Events</span>
          { props.events.length > 0 &&
          props.events.map((event, i ) => (
          <Event key={event.id} onBlur={() => setSettings(showSettings.map((value, i) => i === i ? false : value))}>
            <div className="actor">
              { event.actor.image ? (
                <img src={event.actor?.image} alt="" />
              ) : (
                <img src="/images/nav-user.png" alt="" />
              ) }
              <h2>{event.actor?.title}</h2>
              <small>{moment.unix(event.actor?.timestamp?.seconds).fromNow()}</small>
              <button onClick={() => openSettings(i)} className='dots'>
                <img src="/images/three-dots.svg" alt="" />
                { showSettings[i] && 
                <span onClick={() => deleteEvent(i)} className='deletion-button'>Delete</span>}
              </button>
            </div>
            <h2>{event.name}</h2>
            <p>{event.date} {calculateRemainingDays(event.date)}</p>
            <p>{event.description}</p>
            <p>{event.eventType}</p>
          </Event>
          ))
          }
        </CommunityCard>
          }
        {/* <CommunityCard>
          <a>
            <span>Groups</span>
          </a>
          <a>
            <span>Events
            <img src="/images/プラス.png" alt="" />
            </span>
          </a>
          <a>
            <span>Follow Hashtags</span>
          </a>
          <a>
            <span>Discover more</span>
          </a>
        </CommunityCard> */}
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    events: state.eventState.events,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEvents: () => dispatch(getEventsAPI()),
  deleteEvent: (payload) => dispatch(deleteEventAPI(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Leftside);

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
  img {
    box-shadow: none;
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
    object-fit: contain;
  }
`;

const CardBackground = styled.div`
  background: url('/images/背景2.jpg');
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
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
  }
  div {
    display: flex;
    flex-direction: column;
    text-align: left;

    span {
      font-size: 12px;
      line-height: 1.333;
      &:first-child {
        color: rgba(0, 0, 0, 0.6);
      }
      &:nth-child(2) {
        color: rgba(0, 0, 0, 1);
      }
    }
  }

  &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

  img {
    width: 25px;
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  padding: 12px;
  font-size: 12px;
  display: block;
  text-align: left;

  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
  }

  img {
    width: 25px;
    transform: rotate(-37deg);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  background-color: #f5f5f5f5;
  padding: 8px 2px;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:last-child {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
    border-top: 1px solid #d6cec2;
    padding: 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
  span {
    text-align: center;
    font-weight: 600;
  }
  img {
    width: 17px;
  }
`;

const Event = styled.div`
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  .actor {
    padding-top: 8px;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 12px;
    small {
      margin-left: auto;
      margin-right: 10px;
      font-size: 10px;
    }
    button {
      background-color: inherit;
      border: none;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      img {
        width: 13px;
      }
      .deletion-button {
        position: absolute;
        right: 20px;
        top: 10px;
        background-color: rgba(0, 0, 0, .8);
        border-radius: 10px;
        padding: 10px;
        color: white;
      }
    }
  }
  img {
    border-radius: 50%;
    width: 30px;
    margin-right: 4px;
  }
  h2 {
    margin: 5px 0;
  }
  p {
    margin: 5px 0;
    text-transform: capitalize;
    font-size: 12px;
  }
`;