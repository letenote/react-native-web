import React from "react";
import { create, act } from "react-test-renderer";
import AsyncTaskComponent from "../../components/AsyncTaskComponent";

const tree = create(<AsyncTaskComponent />);
// jest.runAllTimers();

describe("<AsyncTaskComponent />", () => {
  it("create snapshoot", () => {
    expect(tree).toMatchSnapshot();
  });

  it("call timeout", () => {
    act(() => jest.runAllTimers());

    const textElmByTestID = tree.root.findByProps({
      testID: "myText",
    }).props;

    expect(textElmByTestID.children).toEqual("timeout is called");
  });
});
