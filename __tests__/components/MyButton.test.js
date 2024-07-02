import React from "react";
import { create, act } from "react-test-renderer";
import MyButton from "../../components/MyButton";

describe("<MyButton/>", () => {
  it("calls onPress function when the button is pressed", () => {
    const mockOnPress = jest.fn();
    const render = create(<MyButton onPress={mockOnPress} />).root;

    // press button event
    const buttonElmByTestID = render.findByProps({
      testID: "mybutton:component",
    });
    act(() => buttonElmByTestID.props.onPress());

    expect(mockOnPress).toHaveBeenCalled();
    expect(buttonElmByTestID.props.title).toEqual("Click Meeee");
  });
});
