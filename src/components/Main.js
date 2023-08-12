import styled from "styled-components";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState(false);
  let articles = props.articles;

  useEffect(() => {
    props.getArticles();
  }, []);

  //Handle click open anqd close post modal
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <>
      {props.articles.length === 0 ? (
        "There are no articles"
      ) : (
        <Container>
          <ShareBox>
            <div>
              <img
                src={
                  props?.user?.photoURL
                    ? props.user.photoURL
                    : "/images/user.svg"
                }
                alt="user icon"
              />
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/photo-icon.svg" alt="photo icon" />
                <span>Photo</span>
              </button>
              <button>
                <img src="/images/video-icon.svg" alt="video icon" />
                <span>Video</span>
              </button>
              <button>
                <img src="/images/event-icon.svg" alt="event icon" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/article-icon.svg" alt="article icon" />
                <span>write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src="images/spin-loader.gif" alt="loader" />}
            {articles.length > 0 &&
              articles.map((article, key) => (
                <ArticleCard key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="user image" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="images/ellipses.svg" alt="ellipses image" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImage && article.video ? (
                        <ReactPlayer width="100%" url={article.video} />
                      ) : (
                        <img src={article.sharedImage} alt="shared image"></img>
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="/images/like-blue.svg" alt="like blue" />
                        <img src="/images/clap-green.svg" alt="Green clap" />
                        <img src="/images/red-heart.svg" alt="Red heart" />
                        <span>112</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} Comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src="images/like-icon.svg" alt="like icon" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="images/comment-icon.svg" alt="comment icon" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src="images/share-icon.svg" alt="repost icon" />
                      <span>Repost</span>
                    </button>
                    <button>
                      <img src="images/send-icon.svg" alt="comment icon" />
                      <span>Share</span>
                    </button>
                  </SocialActions>
                </ArticleCard>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommomCard = styled.div`
  text-align: center;

  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommomCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
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
      border-radius: 5px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0px;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
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
      }
    }
  }
`;

const ArticleCard = styled(CommomCard)`
  padding: 0px;
  //margin: 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  display: flex;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    div {
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
        &:nth-child(n + 1) {
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
    width: 35px;
    height: 35px;
    border-radius: 50%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
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
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  justify-content: space-between;
  li {
    list-style: none;
    margin-right: 5px;
    font-size: 12px;
    color: #00000099;
    button {
      display: flex;
      background-color: white;
      border: none;
      align-items: center;
      span {
        font-size: 10px;
      }
      img {
        height: 15px;

        :not(:first-child) {
          margin-left: -5px;
        }
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: rgba(0 0 0 0.6);
    background-color: white;
    border: none;
    border-radius: 5px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state?.articleState?.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
