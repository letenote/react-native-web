import React from "react";
import { Button } from "react-native";

const MyButton = (props) => {
  return (
    <Button
      testID={"mybutton:component"}
      title="Click Meeee"
      onPress={props.onPress}
    />
  );
};

export default MyButton;
