import styled from 'styled-components'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { serverTimestamp } from '../firebase'
import { postArticleAPI } from '../actions'
import { useEffect } from 'react'

const PostModal = (props) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    useEffect(() => {
        if (props.showPictureUpload === 'image') {
            switchAssetArea('image');
        } else if (props.showVideoUpload === 'video') {
            switchAssetArea('media');
        }
    }, [props.showPictureUpload, props.showVideoUpload])

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image, the file is a ${typeof image}`)
            return;
        } 
        setShareImage(image);
    }

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClosePhotoClick();
        props.handleCloseVideoClick();
        props.handleClick(e);
    };

    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp(),
            type: 'article'
        };

        props.postArticle(payload);
        reset(e);
    }

    return (
        <>
        { props.showModal === "open" &&
            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
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
                        <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder='What do you want to talk about?' autoFocus={true}
                        />
                        { assetArea === "image" ? (
                            <UploadImage>
                                <label htmlFor="file">
                                Select an image to share
                                    <input 
                                        type="file" 
                                        accept='image/gif, image/jpeg, image/png' name='image' 
                                        id='file' 
                                        style={{display: 'none'}} 
                                        onChange={handleChange}
                                    />
                                </label>
                                {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                            </UploadImage>
                            ) : (
                            assetArea === "media" && (
                                <>
                                    <input 
                                        type="text" placeholder='Please input a video link'
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)} 
                                    />
                                    {videoLink && (<ReactPlayer width={'100%'} url={videoLink}/>)}
                                </>
                                )
                            )}                       
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton onClick={() => switchAssetArea("image")}>
                                <img src="/images/photo-icon.png" alt="" />
                            </AssetButton>
                            <AssetButton onClick={() => switchAssetArea("media")}>
                                <img src="/images/video-icon.png" alt="" />
                            </AssetButton>
                        </AttachAssets>
                        <PostButton disabled={!editorText} onClick={(e) => postArticle(e)}>
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
        }
        </>
    )
}

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
    justify-content: space-between;
    padding: 0px 24px 12px 16px;
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    border: none;
    background: transparent;
    margin-right: 20px;
    cursor: pointer;
    img {
        width: 40px;
    }
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    padding-left: 10px;
    ${AssetButton} {
        width: 40px;
    }
`;


// const ShareComment = styled.div`
//     padding-left: 8px;
//     margin-right: auto;
//     border-left: 1px solid rgba(0, 0, 0, 0.15);
//     ${AssetButton} {
//         margin-right: 5px;
//     }
// `;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.8)' : '#0a66c2')};
    color: ${(props) => (props.disabled ? 'rgba(1, 1, 1, 0.2)' : 'white')};
    cursor: pointer;
    &:hover {
        background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#004182')};
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
  background-color: #274f8fff;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  &:hover {
    background-color: #274f8fe0;
  }
  img {
    width: 100% !important;
  }
  label {
    cursor: pointer;
    width: 100%;
    padding: 12px 18px;
  }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const onProgress = (progress) => {
    console.log(`Upload is ${progress}% done`);
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload, onProgress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);