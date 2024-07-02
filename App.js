import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [btntext, setBtntext] = useState("Click me");
  return (
    <View style={styles.container}>
      <Text testID={"welcomeText"} nativeID={"welcomeText"}>
        Hello World!
      </Text>
      <Button
        testID={"welcomeButton"}
        onPress={() => setBtntext("Button clicked!")}
        title={btntext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
