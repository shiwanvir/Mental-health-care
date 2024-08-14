// redux/reducers.js

const initialState = {
  goals: null,
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GOALS":
      return {
        ...state,
        goals: action.payload,
      };
    default:
      return state;
  }
};

export default goalsReducer;
