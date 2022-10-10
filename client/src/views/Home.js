import React from "react";

import { connect } from "react-redux";

import "./Home.scss";

const Home = (props) => {
  return (
    <div className="home-container">
      <div>{JSON.stringify(props.dataRedux)}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataRedux: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserRedux: (userData) =>
      dispatch({ type: "SAVE_USER", payload: userData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
