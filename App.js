import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
  }

  componentDidMount() {
    return fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        });
      })

      .catch(error => {
        console.log(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <ActivityIndicator />
        <Text>Loading..</Text>
        </View>
      )
    } else {

    let films = this.state.dataSource.map((val, key) => {
      return <View key={key} style={styles.item}>
      <Text>{val.name}</Text>
      </View>

    });

    return (
      <View style={styles.container}>
        {films}
      </View>
    );
  }
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    
  }
});
