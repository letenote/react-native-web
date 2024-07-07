import React from "react";
import { create, act } from "react-test-renderer";
import PromiseChaining from "../../components/PromiseChaining";

let componentDidMountMock;
let loadOneMock;
let loadTwoMock;
let loadThreeMock;
describe("<PromiseChaining/>", () => {
  beforeEach(() => {
    componentDidMountMock = jest.spyOn(
      PromiseChaining.prototype,
      "componentDidMount"
    );
    loadOneMock = jest.spyOn(PromiseChaining.prototype, "loadOne");
    loadTwoMock = jest.spyOn(PromiseChaining.prototype, "loadTwo");
    // .mockImplementation(() => Promise.resolve("xxx"));
    loadThreeMock = jest.spyOn(PromiseChaining.prototype, "loadThree");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("not calls all load function if hidden true", () => {
    const render = create(<PromiseChaining hidden={true} />);
    act(() => jest.runAllTimers());
    expect(componentDidMountMock).toHaveBeenCalled();
    expect(loadOneMock).not.toHaveBeenCalled();
    expect(loadTwoMock).not.toHaveBeenCalled();
    expect(loadThreeMock).not.toHaveBeenCalled();

    const componentRoot = render.root;
    const textElmByTestID = componentRoot.findByProps({
      testID: "welcomeText:0",
    }).props;

    // console.log("textElmByTestID 1", textElmByTestID);
    expect(textElmByTestID.children).toEqual("loading");
  });

  it("calls all load function if hidden false", () => {
    const render = create(<PromiseChaining hidden={false} />);
    act(() => jest.runAllTimers());
    expect(componentDidMountMock).toHaveBeenCalled();
    expect(loadOneMock).toHaveBeenCalled();
    expect(loadTwoMock).toHaveBeenCalled();
    expect(loadThreeMock).toHaveBeenCalled();

    const componentRoot = render.root;
    const textElmByTestID = componentRoot.findByProps({
      testID: "welcomeText:0",
    }).props;

    console.log("textElmByTestID 2", textElmByTestID);
    expect(textElmByTestID.children).toEqual("loadedx");
  });

  it("change loading text in loadTwo method", () => {
    loadTwoMock = jest
      .spyOn(PromiseChaining.prototype, "loadTwo")
      .mockImplementation(() => Promise.resolve("xxx"));
    const render = create(<PromiseChaining hidden={false} />);
    act(() => jest.runAllTimers());
    expect(componentDidMountMock).toHaveBeenCalled();
    expect(loadOneMock).toHaveBeenCalled();
    expect(loadTwoMock).toHaveBeenCalled();
    expect(loadThreeMock).toHaveBeenCalled();

    const componentRoot = render.root;
    const textElmByTestID = componentRoot.findByProps({
      testID: "welcomeText:0",
    }).props;

    // console.log("textElmByTestID 2", textElmByTestID);
    expect(textElmByTestID.children).toEqual("xxx");
  });

  test("should have default props values", () => {
    expect(PromiseChaining.defaultProps.hidden).toBeDefined();
  });

  test("test default value in params loadThree method", () => {
    loadTwoMock = jest
      .spyOn(PromiseChaining.prototype, "loadTwo")
      .mockImplementation(() => Promise.resolve(undefined));
    const render = create(<PromiseChaining hidden={false} />);
    act(() => jest.runAllTimers());
    expect(componentDidMountMock).toHaveBeenCalled();
    expect(loadOneMock).toHaveBeenCalled();
    expect(loadTwoMock).toHaveBeenCalled();
    expect(loadThreeMock).toHaveBeenCalled();
    const componentRoot = render.toTree();

    // console.log("textElmByTestID x", componentRoot.instance);
    expect(componentRoot.instance.state.loading).toEqual("");
  });
});
