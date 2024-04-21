import { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const DATA = [
  {
    chat_id: 12312312,
    userIds: [1, 2],
    Net_amount: 1000,
  },
  {
    chat_id: 12312314,
    userIds: [1, 3],
    Net_amount: 1000,
  },
  {
    chat_id: 12312313,
    userIds: [4, 1],
    Net_amount: -1000,
  },
  {
    chat_id: 12312310,
    userIds: [5, 1],
    Net_amount: -700,
  },
  {
    chat_id: 12312316,
    userIds: [5, 1],
    Net_amount: -700,
  },
  {
    chat_id: 12312317,
    userIds: [5, 1],
    Net_amount: -700,
  },
  {
    chat_id: 12312318,
    userIds: [5, 1],
    Net_amount: -700,
  },
];

const UserList = [
  {
    userId: 1,
    userName: "Anukul",
  },
  {
    userId: 2,
    userName: "Adbul",
  },
  {
    userId: 3,
    userName: "Anil",
  },
  {
    userId: 4,
    userName: "Kumar",
  },
  {
    userId: 5,
    userName: "Subham",
  },
  {
    userId: 6,
    userName: "Anil",
  },
  {
    userId: 7,
    userName: "Kumar",
  },
  {
    userId: 8,
    userName: "Subham",
  },
];

const myUserId = 1;

const searchIcon = <Icon name="search" size={20} color="black" />;
const rupeeIcon = <Icon name="rupee" size={15} color="black" />;

function giveUserName(userIds) {
  for (let index = 0; index < 2; index++) {
    const element = userIds[index];
    if (element != myUserId) {
      const name = UserList.map((item) => {
        if (item.userId == element) {
          return item.userName;
        }
      });
      return name;
    }
  }
}

var getAmount = 0;
var giveAmount = 0;
DATA.forEach((item) => {
  if (item.Net_amount > 0) {
    getAmount += item.Net_amount;
  } else {
    giveAmount += item.Net_amount;
  }
});
export const HomeScreen = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const Item = ({ userIds, amount }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("chat")}
    >
      <Text style={styles.title}>{giveUserName(userIds)}</Text>
      <View style={{ marginRight: 7 }}>
        <Text style={{}}>You will {amount > 0 ? "get" : "give"}</Text>
        <Text
          style={
            amount < 0
              ? { color: "red", textAlign: "center", fontWeight: "bold" }
              : { color: "green", textAlign: "center", fontWeight: "bold" }
          }
        >
          {rupeeIcon}
          {Math.abs(amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={[
        styles.homePageScreen,
        {
          height: keyboardVisible ? Dimensions.get("window").height : "100%",
        },
      ]}
    >
      <View style={styles.bigContainer}>
        {/* <View style={styles.top_header}>
          <Text style={{ color: 'white',fontSize:20 }}>ANUKUL</Text>
        </View> */}
        <View style={styles.container}>
          <View style={{ borderRightWidth: 1, width: "45%", padding: 2 }}>
            <Text style={{ fontSize: 20 }}>You will give</Text>
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
              {rupeeIcon} {Math.abs(giveAmount)}
            </Text>
          </View>
          <View style={{ width: "40%", padding: 2 }}>
            <Text style={{ fontSize: 20 }}>You will get</Text>
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>
              {" "}
              {rupeeIcon} {Math.abs(getAmount)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Text>{searchIcon}</Text>
        <TextInput
          style={{ height: 25, width: "90%", fontSize: 16, padding: 3 }}
          placeholder="Search your customer"
        ></TextInput>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item userIds={item.userIds} amount={item.Net_amount} />
        )}
        keyExtractor={(item) => item.chat_id}
        style={{ height: "50%" }}
      />

      <View
        style={{
          width: "100%",
          //flex: 1,
          height: "9%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          // backgroundColor: "red",
          // borderWidth: 2,
        }}
      >
        <TouchableOpacity
          style={{
            width: "40%",
            backgroundColor: "#398EEA",
            height: "70%",
            borderRadius: 10,
            padding: 5,
          }}
        >
          <Text
            style={{ padding: 5, textAlign: "center", color: "black" }}
            onPress={() => navigation.navigate("settleTransaction")}
          >
            Settle Transactions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "40%",
            backgroundColor: "green",
            height: "70%",
            borderRadius: 10,
            padding: 5,
          }}
          onPress={() => navigation.navigate("addperson")}
        >
          <Text style={{ padding: 5, textAlign: "center", color: "black" }}>
            Add Person
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  homePageScreen: {
    width: "100%",
    // backgroundColor: "red",
    justifyContent: "space-between",
    // height: Dimensions.get("window").height + 35,
    // height: "100%",
  },
  bigContainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "#398EEA",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 20,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  searchBox: {
    width: "95%",
    marginHorizontal: "2.5%",
    backgroundColor: "white",
    height: "6%",
    padding: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  item: {
    backgroundColor: "white",
    width: "95%",
    height: 80,
    padding: 2,
    marginHorizontal: "2.5%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    marginLeft: 7,
    fontSize: 20,
    color: "black",
  },
});
