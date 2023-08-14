import { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route exact path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
