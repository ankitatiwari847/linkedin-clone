import styled from "styled-components";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <div>
      <Header />
      <Container>
        {!props.user && <Navigate to="/" />}
        <Layout>
          <LeftSide user={props.user} />
          <Main />
          <RightSide />
        </Layout>
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 100%;
  padding-top: 52px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  grid-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

//const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps)(Home);
