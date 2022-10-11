const initState = {
  user: null,
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
