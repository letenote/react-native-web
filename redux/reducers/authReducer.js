import * as AUTH_ACTION from "../actions/authAction";

const initialState = {
  loading: true,
  authed: false,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_ACTION.LOAD_AUTH_SUCCESS:
      return {
        ...state,
        authed: true,
      };
    default:
      return state;
  }
}
