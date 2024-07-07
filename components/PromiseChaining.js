import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native-web";

class PromiseChaining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "loading",
    };
  }

  async componentDidMount() {
    const { hidden } = this.props;
    return hidden
      ? null
      : this.loadOne()
          .then(() => this.loadTwo())
          .then((val) => this.loadThree({ val }));
  }

  loadOne() {
    return new Promise((resolve) => {
      return resolve();
    });
  }

  loadTwo() {
    return new Promise((resolve) => {
      return resolve("loadedx");
    });
  }

  loadThree(param) {
    const { val = "" } = param;
    try {
      return this.setState({ loading: val });
    } catch (error) {}
  }

  render() {
    return (
      <View>
        <Text testID={"welcomeText:0"}>{this.state.loading}</Text>
      </View>
    );
  }
}

PromiseChaining.propTypes = {
  hidden: PropTypes.bool,
};

PromiseChaining.defaultProps = {
  hidden: true,
};

export default PromiseChaining;
