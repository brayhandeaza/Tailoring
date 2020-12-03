import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Icons, Img } from "../constants/Image";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

// redux
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      title: ["Full Name", "phone", "Age"],
      titleImg: [Icons.Login.UserOn, Icons.Login.Phone],
      errorMessage: "",
      emailErrorColor: "#54b77c",
      emailError: false,

      isAge: false,
      isUpdate: false,
      isTextField: true,
      isSuccefullyUpdated: false,

      inputColor: "rgba(000,000,000,0.3)",
      isFullNameOn: false,
      isPhoneOn: false,
      isEmailOn: false,

      textFieldValues: {
        fullName: "",
        phone: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      isTextField: false,
    };
  }

  handleCamelize = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  handleUpdateOnPress = async () => {
    const token = await AsyncStorage.getItem("userId");
    const {
      fullName,
      email,
      phone,
      newPassword,
      confirmPassword,
    } = this.state.textFieldValues;

    if (newPassword != "" && confirmPassword != "") {
      if (newPassword === confirmPassword) {
        await axios
          .put(`https://alteration-database.herokuapp.com/users/${token}`, {
            fullName: fullName,
            email: email,
            phone: phone,
            newPassword,
            confirmPassword,
          })
          .then((User) => {
            if (User.data.error) {
              this.setState({
                errorMessage: User.data.message,
                emailErrorColor: "red",
              });
            } else {
              this.setState({
                isTextField: false,
                isUpdate: true,
                isInputEditable: true,
                isSuccefullyUpdated: true,
                isTextField: false,
                errorMessage: User.data.message,
                emailErrorColor: "#54b77c",
			  });
			  this.handleFetchUser()
              this.props.dispatch({ type: "isTextField", payload: false });
            }
          })
          .catch((err) => {
          });
      } else {
        this.setState({
          errorMessage: "Passwords do not match",
        });
      }
	}
	

    setTimeout(() => {
      this.setState({
        isFullNameOn: false,
        isPhoneOn: false,
        isEmailOn: false,
        isSuccefullyUpdated: false,
      });
    }, 2000);
  };

  handdleOnPressArrow = () => {
    Actions.reset("_Profile");
  };

  handleFullNameOnChange = (value) => {
    this.setState({
      isFullNameOn: value.length > 1 ? true : false,
      textFieldValues: {
        fullName: value,
        email: this.state.textFieldValues.email,
        phone: this.state.textFieldValues.phone,
      },
    });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleEmailOnChange = (value) => {
    this.setState({
      isEmailOn: this.validateEmail(value) ? true : false,
      textFieldValues: {
        fullName: this.state.textFieldValues.fullName,
        email: value,
        phone: this.state.textFieldValues.phone,
      },
    });
  };

  handleNewPassOnChange = (value) => {
    this.setState({
      errorMessage: "",
      textFieldValues: {
        fullName: this.state.textFieldValues.fullName,
        email: this.state.textFieldValues.email,
        phone: this.state.textFieldValues.phone,
        currentPassword: this.state.textFieldValues.currentPassword,
        newPassword: value,
        confirmPassword: this.state.textFieldValues.confirmPassword,
      },
    });
  };

  handlePhoneOnChange = (value) => {
    this.setState({
      isPhoneOn: value.length > 13 ? true : false,
      textFieldValues: {
        fullName: this.state.textFieldValues.fullName,
        email: this.state.textFieldValues.email,
        phone: value,
      },
    });
  };
  handleConfPassOnChange = (value) => {
    this.setState({
      errorMessage: "",
      textFieldValues: {
        fullName: this.state.textFieldValues.fullName,
        email: this.state.textFieldValues.email,
        phone: this.state.textFieldValues.phone,
        currentPassword: this.state.textFieldValues.currentPassword,
        newPassword: this.state.textFieldValues.newPassword,
        confirmPassword: value,
      },
    });
  };

  handleEdit = () => {
    this.setState({
      isTextField: true,
      isTextField: true,
    });
    this.props.dispatch({ type: "isTextField", payload: true });
  };

  handleFetchUser = async () => {
    const token = await AsyncStorage.getItem("userId");
    await axios
      .get(`https://alteration-database.herokuapp.com/users/${token}`)
      .then((User) => {
        const user = User.data.User;
        this.setState({
          user,
          textFieldValues: {
            fullName: user.fullName
              .trim()
              .toLowerCase()
              .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              ),
            phone: user.phone,
            email: user.email,
          },
        });
      });
  };

  handleisTextField = () => {
    const { isTextField } = this.props.state.Header;
    this.setState({
      isTextField: isTextField ? true : false,
    });
  };

  componentDidMount() {
    this.handleFetchUser();
    this.handleisTextField();
  }

  render() {
    const {
      isFullNameOn,
      isPhoneOn,
      isEmailOn,
      isSuccefullyUpdated,
      errorMessage,
    } = this.state;
    const { email, phone, fullName } = this.state.textFieldValues;
    const { isTextField } = this.props.state.Header;

    return (
      <View style={styles.Settings}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", height: "100%" }}
          contentContainerStyle={styles.Scroll}
        >
          <View style={styles.Form}>
            <TouchableHighlight underlayColor="white">
              <View
                style={[
                  styles.InputContainerBox,
                  {
                    paddingLeft: isTextField ? 20 : 0,
                    borderWidth: isTextField ? 1 : 0,
                    borderColor: isFullNameOn
                      ? "#54b77c"
                      : "rgba(000,000,000,0.1)",
                  },
                ]}
              >
                <Image
                  style={styles.InputImage}
                  source={isFullNameOn ? Icons.Login.UserOn : Icons.Login.User}
                />
                {isTextField ? (
                  <TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" value={fullName} style={[styles.Input]} placeholder="Full Name" onChangeText={(value) => this.handleFullNameOnChange(value)}/>
                ) : (
                  <Text
                    style={{
                      color: "rgba(000,000,000,0.6)",
                      fontFamily: "Inter-Regular",
                      paddingLeft: 15,
                    }}
                  >
                    {fullName}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="white">
              <View
                style={[
                  styles.InputContainerBox,
                  {
                    paddingLeft: isTextField ? 20 : 0,
                    borderWidth: isTextField ? 1 : 0,
                    borderColor: isEmailOn
                      ? this.state.emailErrorColor
                      : "rgba(000,000,000,0.1)",
                  },
                ]}
              >
                <Image
                  style={styles.InputImage}
                  source={isEmailOn ? Icons.Login.EmailOn : Icons.Login.Email}
                />
                {isTextField ? (
                  <TextInput
                    placeholderTextColor="#747374"
                    textContentType="oneTimeCode"
                    value={email}
                    style={styles.Input}
                    placeholder="Email"
                    onChangeText={(value) => this.handleEmailOnChange(value)}
                  />
                ) : (
                  <Text
                    style={{
                      color: "rgba(000,000,000,0.6)",
                      fontFamily: "Inter-Regular",
                      paddingLeft: 15,
                    }}
                  >
                    {email}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="white">
              <View
                style={[
                  styles.InputContainerBox,
                  {
                    paddingLeft: isTextField ? 20 : 0,
                    borderWidth: isTextField ? 1 : 0,
                    borderColor: isPhoneOn
                      ? "#54b77c"
                      : "rgba(000,000,000,0.1)",
                  },
                ]}
              >
                <Image
                  style={styles.InputImage}
                  source={isPhoneOn ? Icons.Login.PhoneOn : Icons.Login.Phone}
                />
                {isTextField ? (
                  <TextInput
                    placeholderTextColor="#747374"
                    textContentType="oneTimeCode"
                    style={styles.Input}
                    keyboardType="number-pad"
                    maxLength={14}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={(value) => this.handlePhoneOnChange(value)}
                  />
                ) : (
                  <Text
                    style={{
                      color: "rgba(000,000,000,0.6)",
                      fontFamily: "Inter-Regular",
                      paddingLeft: 15,
                    }}
                  >
                    {phone}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
          </View>
          {isTextField ? (
            <TouchableHighlight
              style={styles.Touchable}
              underlayColor="#f6f6f6"
              onPress={(res) =>
                this.handleUpdateOnPress("_Alretation", "isAlteration")
              }
            >
              <Text
                style={[
                  styles.IconsOptionText,
                  {
                    color: "rgb(112,112,112)",
                    fontSize: 25,
                    fontWeight: "600",
                  },
                ]}
              >
                {"Update"}
              </Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight onPress={this.handleEdit}>
              <Text
                style={{
                  color: "rgba(43, 169, 123, 1)",
                  fontSize: 18,
                  textTransform: "capitalize",
                  textDecorationLine: "underline",
                }}
              >
                {!isSuccefullyUpdated ? "Update Value" : ""}
              </Text>
            </TouchableHighlight>
          )}
          <Text style={{ color: errorMessage ? "red" : "green", fontSize: 15 }}>
            {isSuccefullyUpdated ? "Succefully updated" : errorMessage}
          </Text>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Settings: {
    width: "100%",
    height: "100%",
    paddingLeft: 25,

    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  SettingsHeaderContainer: {
    width: "100%",
    height: 100,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SettingsHeaderContainerImgBox: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(84,183,124,0.15)",
    borderRadius: 50,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Scroll: {
    paddingBottom: 85,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  SettingsHeaderContainerGift: {
    width: 20,
    height: 20,
  },
  SettingsHeaderText: {
    fontSize: 24,
    fontWeight: "600",
  },
  SettingsPictureContainer: {
    width: "100%",
    height: 200,
    paddingTop: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  SettingsPicture: {
    width: 135,
    height: 135,
    borderRadius: 100,
  },
  SettingsPictureImgBox: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "rgba(43, 169, 123, 0.14)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  SettingsHeaderText: {
    fontSize: 18,
    color: "rgba(000,000,000, 0.6)",
    fontWeight: "600",
  },
  Form: {
    width: "100%",
    marginTop: 30,
    // paddingLeft: 10,
    // paddingRight: 20,
  },
  Input: {
    width: "100%",
    height: 50,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "red",
  },
  InputBox: {
    width: "100%",
    height: 75,
    paddingTop: 15,
    color: "red",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileHeaderText: {
    fontSize: 18,
    color: "rgba(000,000,000, 0.6)",
    fontWeight: "600",
  },
  ProfileTitlesBox: {
    width: "100%",
    height: 75,
    borderBottomWidth: 0.6,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Touchable: {
    width: 300,
    height: 60,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgba(112,112,112,0.3)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ItemsImage: {
    width: 40,
    height: 40,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  ItemsOption: {
    width: "100%",
    height: 70,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  IconsOptionText: {
    paddingBottom: 5,
  },
  TouchableArrow: {
    width: 75,
    height: 100,
    paddingBottom: 10,

    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Arrow: {
    width: 25,
    height: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  InputContainerBox: {
    height: 60,
    marginBottom: 15,
    borderRadius: 5,

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  InputImage: {
    width: 25,
    height: 25,
  },
  Input: {
    width: "70%",
    height: 50,
    paddingLeft: 10,
    marginLeft: 5,
    borderRadius: 5,

    borderColor: "rgba(000,000,000,0.3)",
  },
});

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(Settings);
