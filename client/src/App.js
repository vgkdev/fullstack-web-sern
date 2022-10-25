import "./App.css";
import Navigator from "./navigations/Navigator";

import React from "react";
import Login from "./views/Login";

import { connect } from "react-redux";

const App = (props) => {
  // const [isLogin, setIsLogin] = useState(false);

  // const setStateLogin = () => {
  //   setIsLogin(true);
  // };

  const user = props.userDataRedux;

  return (
    <div className="App">
      {user ? <Navigator /> : <Login />}
      {/* {user && <Navigator />}

      {!user && <Login />} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDataRedux: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserRedux: (userData) =>
      dispatch({ type: "SAVE_USER", payload: userData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
