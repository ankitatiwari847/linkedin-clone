import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { postArticleApi } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [shareVideo, setShareVideo] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleImage = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Image of type ${typeof image} not allowed`);
      return;
    }
    setShareImage(image);
  };

  //Select what to upload? a video or an image?
  const switchAssetsArea = (area) => {
    setShareImage("");
    setShareVideo("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: shareVideo,
      description: editorText,
      user: props.user,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticleApi(payload);
    reset(e);
  };

  const reset = (e) => {
    e.preventDefault();
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={props.handleClick}>
                <img
                  src={process.env.PUBLIC_URL + "/images/close-icon.svg"}
                  alt="close icon"
                />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/images/user.svg"}
                    alt=""
                  />
                )}
                <span>
                  {props.user.displayName ? props.user.displayName : "Name"}
                </span>
              </UserInfo>
              <Editor>
                <textarea
                  autoFocus={true}
                  placeholder="What do you want to talk about?"
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                ></textarea>
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      id="sharedImage"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      style={{ display: "none" }}
                      onChange={handleImage}
                    />
                    <p>
                      <label htmlFor="sharedImage">
                        Select an image to share
                      </label>
                    </p>
                    {shareImage && URL.createObjectURL(shareImage) && (
                      <img
                        id="imageFile"
                        src={URL.createObjectURL(shareImage)}
                        alt="shared"
                      />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter video link"
                        value={shareVideo}
                        onChange={(event) => setShareVideo(event.target.value)}
                        id="videoFile"
                        name="video"
                        style={{
                          textAlign: "center",
                          alignItems: "center",
                          width: "80%",
                          padding: "5px",
                          border: "1px solid rgba(0,0,0,0.15)",
                        }}
                      />
                      {shareVideo && (
                        <ReactPlayer url={shareVideo} width={"100%"} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAsset>
                <AssetButton onClick={() => switchAssetsArea("image")}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/share-image.svg"}
                    alt=""
                  />
                </AssetButton>
                <AssetButton onClick={() => switchAssetsArea("media")}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/share-video.svg"}
                    alt=""
                  />
                </AssetButton>
              </AttachAsset>
              <ShareComment>
                <AssetButton>
                  <img
                    src={process.env.PUBLIC_URL + "/images/share-comment.svg"}
                    alt=""
                  />
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
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
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    border: none;
    background-color: transparent;
    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
    svg {
      pointer-events: none;
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
  font-weight: 600;
  font-weight: 16px;
  line-height: 1.5;
  //margin-left: 5px;
  svg,
  img {
    height: 48px;
    width: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttachAsset = styled.div`
  display: flex;
  align-items: center;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  width: 40px;
  min-width: auto;
  margin-right: 8px;
  border-radius: 50%;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  height: 40px;
  width: 40px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.15)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#white")};
  border: none;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    border: none;
    outline: none;
    overflow: auto;
    resize: none;
    min-height: 100px;
    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

const mapDispatchToProps = (dispatch) => ({
  postArticleApi: (payload) => dispatch(postArticleApi(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
