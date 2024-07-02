import React from "react";
import App from "../App";
import { create, act } from "react-test-renderer";

let render;
describe("<App />", () => {
  beforeEach(() => {
    render = create(<App />);
  });

  it("create snapshoot", () => {
    expect(render).toMatchSnapshot();
  });

  it("has 2 child", () => {
    const tree = render.toJSON();
    expect(tree.children.length).toBe(2);
  });

  it("renders Hello World message on the home page", async () => {
    const testInstance = render.root;
    const textElmById = testInstance.findByProps({ id: "welcomeText" });
    expect(textElmById.children).toEqual(["Hello World!"]);

    const textElmByTestID = testInstance.findByProps({
      testID: "welcomeText",
    }).props;
    expect(textElmByTestID.children).toEqual("Hello World!");
  });

  // it("Event Handlers button click me exam:1", () => {
  //   const testInstance = render.root;
  //   testInstance.findByType("button").props.onClick();
  // });

  it("Event Handlers button, triger by change title proops example", () => {
    const testInstance = render.root;

    // press button event
    const buttonElmByTestID = testInstance.findByProps({
      testID: "welcomeButton",
    });
    act(() => buttonElmByTestID.props.onPress());

    // then text in button change to Button clicked!
    expect(buttonElmByTestID.props.title).toEqual("Button clicked!");
  });
});
