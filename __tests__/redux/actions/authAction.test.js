import configureStore from "../../../redux";
import { authSuccess } from "../../../redux/actions/authAction";
const store = configureStore();

describe("auth actions", () => {
  it("auth success", async () => {
    await store.dispatch(authSuccess());

    expect(await store.getState().auth.authed).toBe(true);
  });
});
