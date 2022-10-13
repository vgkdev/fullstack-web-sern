const initState = {
  user: {
    firstName: "Khang",
    lastName: "Vo",
    email: "khang@gmail.com",
    password: "123456",
  },
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      // console.log("check data redux: ", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
