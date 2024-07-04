import React from "react";
import App from "../App";
import { create, act } from "react-test-renderer";
import { Text } from "react-native-web";

let componentSnap;
describe("<App />", () => {
  beforeEach(() => {
    componentSnap = create(<App />);
  });

  it("create snapshoot", () => {
    expect(componentSnap).toMatchSnapshot();
  });

  it("has 2 child", () => {
    const tree = componentSnap.toJSON();
    expect(tree.children.length).toBe(4);
  });

  it("renders Hello World message on the home page", async () => {
    const componentRoot = componentSnap.root;
    const textElmById = componentRoot.findByProps({ id: "welcomeText:0" });
    expect(textElmById.children).toEqual(["Hello World!"]);

    const textElmByTestID = componentRoot.findByProps({
      testID: "welcomeText:0",
    }).props;
    expect(textElmByTestID.children).toEqual("Hello World!");
  });

  // it("Event Handlers button click me exam:1", () => {
  //   const componentRoot = componentSnap.root;
  //   componentRoot.findByType("button").props.onClick();
  // });

  it("Event Handlers button, triger by change title proops example", () => {
    const componentRoot = componentSnap.root;

    // press button event
    const buttonElmByTestID = componentRoot.findByProps({
      testID: "welcomeButton",
    });
    act(() => buttonElmByTestID.props.onPress());

    // then text in button change to Button clicked!
    expect(buttonElmByTestID.props.title).toEqual("Button clicked!");
  });

  it("sample get all <Text/> alement by contains testID with regex", async () => {
    const componentRoot = componentSnap.root;
    const items = componentRoot.findAllByType(Text);
    // const items = componentRoot.findAllByProps();
    // console.log("x", items);

    const filterByTestID = items.filter((el) =>
      new RegExp("\\b" + "welcomeText" + "\\b").test(el.props.testID)
    );
    // console.log("z", filterByTestID.length);
    expect(filterByTestID.length).toEqual(2);
  });

  it("sample get all <Text/> alement by contains nativeID with regex", async () => {
    const componentRoot = componentSnap.root;
    const items = componentRoot.findAllByType(Text);
    const filterById = items.filter((el) =>
      new RegExp("\\b" + "welcomeText" + "\\b").test(el.props.nativeID)
    );
    expect(filterById.length).toEqual(3);
  });
});
