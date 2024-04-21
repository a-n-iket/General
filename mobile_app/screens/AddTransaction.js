import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Button,
  Alert,
  BackHandler,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const createStyles = (colors, isDisabled) => {
  return (styles = StyleSheet.create({
    main: {
      flex: 1,
    },
    addAmountContainer: {
      flexDirection: "row",
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      borderWidth: 2,
    },
    addAmountText: {
      fontSize: 30,
      padding: 10,
      color: colors.dark,
    },
    addAmountTextInput: {
      width: "90%",
      fontSize: 25,
      color: colors.dark,
    },
    addDescContainer: {
      margin: 20,
      borderRadius: 10,
      borderWidth: 2,
      flexDirection: "row",
    },
    penIcon: {
      paddingTop: 13,
      paddingLeft: 8,
      color: colors.dark,
    },
    addDescTextInput: {
      padding: 10,
      width: "91%",
    },
    dateContainer: {
      flexDirection: "row",
      margin: 20,
      width: "47%",
      borderRadius: 10,
      borderWidth: 2,
    },
    calendarIcon: {
      padding: 10,
      color: colors.dark,
    },
    dateButton: {
      width: "75%",
    },
    dateText: {
      paddingTop: 10,
    },
    saveContainer: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: isDisabled ? colors.dark : colors.light,
    },
    saveButton: {
      width: "100%",
    },
    saveText: {
      textAlign: "center",
      fontSize: 20,
      padding: 10,
      color: "white",
    },
  }));
};

export const AddTransaction = ({ route, navigation }) => {
  const { yougave, isEdit, amt, des } = route.params;

  const colors = yougave
    ? { dark: "red", light: "#FA8072" }
    : { dark: "green", light: "#50C878" };

  const [isAmountEntered, setAmountEntered] = useState(false);
  const styles = createStyles(colors, isAmountEntered);
  const [amount, setAmount] = useState(amt ? amt : "");
  const [desc, setDesc] = useState(des ? des : "");
  const [ispressed, setPressed] = useState(false);
  const [currdate, setCurrDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const transaction = {
    date: currdate.toDateString(),
    Amount: amount,
    Description: desc,
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setCurrDate(date);
    hideDatePicker();
  };

  const navigateback = () => {
    navigation.navigate("chat", { details: transaction });
    setAmount("");
    setDesc("");
  };

  useEffect(() => {
    if (desc === "" && (amount === "" || Number(amount) <= 0))
      setAmountEntered(false);
    if (Number(amount) > 0) setAmountEntered(true);
    navigation.setOptions({
      headerTitle: `${yougave ? "You Gave" : "You Got"} ${"\u20B9"} ${
        amount === "" || Number(amount) <= 0 ? "0" : amount
      } ${yougave ? "to" : "from"}`,
      headerTitleStyle: {
        color: colors.dark,
      },
    });
  }, [amount, desc]);

  const backAlert = () => {
    Alert.alert("Exit without saving?", "Changes will not be saved", [
      {
        text: "NO",
      },
      {
        text: "YES",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Ionicon
            name="arrow-back"
            size={25}
            style={{ marginRight: 10, width: 40 }}
            onPress={backAlert}
          />
        );
      },
    });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAlert
    );

    return () => backHandler.remove();
  }, []);

  return (
    //start
    <KeyboardAvoidingView style={styles.main}>
      {/* ADD AMOUNT */}

      <View style={styles.addAmountContainer}>
        <Text style={styles.addAmountText}>{"\u20B9"}</Text>
        <TextInput
          style={styles.addAmountTextInput}
          placeholder="Add Amount"
          onChangeText={(amnt) => setAmount(amnt)}
          value={amount}
          inputMode="numeric"
          autoFocus={isEdit}
        ></TextInput>
      </View>

      {isAmountEntered && (
        <>
          {/* ADD DESCRIPTION */}

          <View style={styles.addDescContainer}>
            <Icon name="pencil" size={20} style={styles.penIcon} />
            <TextInput
              style={styles.addDescTextInput}
              placeholder="Add Description"
              onChangeText={(Desc) => setDesc(Desc)}
              value={desc}
            ></TextInput>
          </View>

          {/* ADD DATE */}

          <View style={styles.dateContainer}>
            <Icon name="calendar" size={20} style={styles.calendarIcon} />
            <Pressable style={styles.dateButton} onPress={showDatePicker}>
              <Text style={styles.dateText}>{currdate.toDateString()}</Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={currdate}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            ></DateTimePickerModal>
          </View>
        </>
      )}

      {/* SAVE BUTTON */}

      <View style={styles.saveContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={navigateback}
          disabled={!isAmountEntered}
        >
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
