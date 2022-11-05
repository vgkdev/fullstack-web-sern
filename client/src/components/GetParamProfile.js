import React from "react";
import { useParams } from "react-router-dom";
import Profile from "../views/Profile";

const GetParamProfile = () => {
  let { userID } = useParams();

  return <Profile userID={userID} />;
};

export default GetParamProfile;
