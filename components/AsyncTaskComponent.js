import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const AsyncTaskComponent = () => {
  const [status, setStatus] = useState("default");

  useEffect(() => {
    // console.log("effect is callede");
    setTimeout(() => {
      setStatus("timeout is called");
    }, 1000);
  }, []);

  return (
    <View>
      <Text testID={"myText"}>{status}</Text>
    </View>
  );
};

export default AsyncTaskComponent;
