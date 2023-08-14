import styled from "styled-components";
import { ArtCard } from "./LeftSide";

const RightSide = (props) => {
  return (
    <Container>
      <NewsCard>
        <Title>
          <h2>LinkedIn News</h2>
          <img src={process.env.PUBLIC_URL + "/images/feed-icon.svg"} />
        </Title>
        <NewsList>
          <NewsItem>
            <a>
              <div>
                <span></span>This is first news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <div>
                <span></span>This is second news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <div>
                <span></span>This is Third news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <div>
                <span></span>This is Fourth news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <div>
                <span></span>This is Fifth news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <div>
                <span></span>This is Sixth news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <div>
                <span></span>This is Seventh news headline
              </div>
              <span>1 hour ago, 889 views</span>
            </a>
          </NewsItem>
        </NewsList>
      </NewsCard>
      <BannerCard>
        <img
          src={
            process.env.PUBLIC_URL +
            "/images/ca5f2cae7a2302176fe52c5fa6ac9783.png"
          }
          alt="ad"
        />
      </BannerCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const NewsCard = styled(ArtCard)`
  padding: 15px;
  text-align: left;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NewsList = styled.ul`
  padding: 0px;
`;

const NewsItem = styled.li`
  list-style-type: none;
  padding: 6px 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  div {
    font-size: 12px;
    line-height: 1.33;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    span {
      border-radius: 50%;
      display: inline-block;
      width: 3px;
      height: 3px;
      margin-right: 8px;
      border: 3px solid rgba(0, 0, 0, 1);
    }
  }

  & > a > span {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;
    margin-left: 6px;
    padding: 16px;
  }
`;

const BannerCard = styled(NewsCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;

export default RightSide;
