const initialState = {
  username: "",
  password: "",
  isFetching: false,
  status: false,
};

export const types = {
  LONG_REQUEST: "LOGIN/LONG_REQUEST",
  LONG_SUCCESS: "LOGIN/LONG_SUCCESS",
  LONG_FAILURE: "LOGIN/LONG_FAILURE",
  LONGOUT: "LOGIN/LONGOUT",
  SET_USERNAME: "LOGIN/SET_USERNAME",
  SET_PASSWORD: "LOGIN/SET_PASSWORD",
};

export const actions = {
  login: () => {
    return (dispatch, getState) => {
      const { username, password } = getState().login;
      if (
        !(username && username.length > 0 && password && password.length > 0)
      ) {
        return dispatch(loginFailure(""));
      }

      dispatch(loginRequest());
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(loginSuccess());
          resolve();
        }, 3000);
      });
    };
  },
  logout: () => ({
    type: types.LOGOUT,
  }),
  setUsername: (username) => ({
    type: types.SET_USERNAME,
    username,
  }),
  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    password,
  }),
};

const loginSuccess = () => ({
  type: types.LONG_SUCCESS,
});

const loginRequest = () => ({
  type: types.LONG_REQUEST,
});

const loginFailure = (error) => ({
  type: types.LONG_FAILURE,
  error,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LONG_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.LONG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: true,
      };
    case types.LONG_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case types.LONGOUT:
      return {
        ...state,
        status: false,
        username: "",
        password: "",
      };
    case types.SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case type.SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

export default reducer;
