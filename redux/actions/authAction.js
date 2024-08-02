export const LOAD_AUTH_SUCCESS = "LOAD_AUTH_SUCCESS";
export const authSuccess = () => (dispatch, getState) => {
  return dispatch({
    type: LOAD_AUTH_SUCCESS,
  });
};
