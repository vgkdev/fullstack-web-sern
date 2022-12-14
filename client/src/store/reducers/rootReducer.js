const initState = {
  user: {
    id: 7,
    firstName: "Khang Gia",
    lastName: "Vo",
    email: "khang4@gmail.com",
    password: "123456",
  },
  // user: null,
  posts: null,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SAVE_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "UPDATE_POSTS":
      return {
        ...state,
        posts: state.posts.unshift(action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
