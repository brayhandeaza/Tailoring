import React, { Component } from 'react'
import { StyleSheet, Text,SafeAreaView, View, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Icons, Img } from '../constants/Image'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from "@react-native-community/async-storage"
import { Header, Left, Right } from "native-base";

// components
import Settings from "../components/Settings"

// redux
import { connect } from "react-redux"

const { height } = Dimensions.get("screen")

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["Notifications"],
            isNotificationOn: true
        }
    }

    handleNotificationstate = (e) => {
        e.stopPropagation()
        this.setState({
            isNotificationOn: !this.state.isNotificationOn,

        })
    }
    handleTitleOnPress = (e, view) => {
        if (view == `_${"LogOut"}`) {
            alert(view)
        } else {
            Actions.reset(view)
        }
    }

    handdleOnPressArrow = () => {
        const {isTextField} = this.props.state.Header
        const { pView } = this.props.state.Footer
        if (isTextField) {
            this.props.dispatch({type: "isTextField", payload: false})
        } else{
            switch (pView) {
                case "isHome":
                    Actions.Home()
                    break;
                case "isOrders":
                    Actions.Orders()
                    break;
                case "isPrices":
                    Actions.Prices()
                    break;
                case "isProfile":
                    Actions.Profile()
                    break;
            }
            this.props.dispatch({ type: pView })
        }
    }

    handleLogOut = async () => {
        await AsyncStorage.removeItem("userId")
        this.props.dispatch({ type: "isUserLogedIn", payloa: true })
        this.props.dispatch({ type: "isProfile" })
        Actions.reset("_Profile")
    }

    render() {
        const { isNotificationOn, title } = this.state
        const {isTextField} = this.props.state.Header
        return (
            <SafeAreaView style={styles.Profile}>
                <View style={styles.Header}>
                    <Left>
                        <TouchableHighlight underlayColor="white" style={styles.Touchable} onPress={this.handdleOnPressArrow}>
                            <Image style={styles.Arrow} source={Icons.Arrow} />
                        </TouchableHighlight>
                    </Left>
                    <Right>
                        <TouchableHighlight style={styles.Logout} underlayColor="white" onPress={this.handleLogOut}>
                            <Text style={[styles.ProfileHeaderText, { fontFamily: "Inter-Regular", color: "rgba(43, 169, 123, 1)" }]}>{"Log Out"}</Text>
                        </TouchableHighlight>
                    </Right>
                </View>
                <View style={styles.ProfileTitlesContainer}>
                    <View style={styles.ProfileTitlesBox}>
                        <TouchableHighlight underlayColor="white" onPress={title != "Notifications" ? (e) => this.handleTitleOnPress(e, `_${title.replace(" ", "")}`) : null}>
                            <Text style={[styles.ProfileHeaderText, { fontFamily: "Inter-Regular" }]}>Notifications</Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="rgba(000,000,000,0.1)" style={[styles.PushBotsContainer, { backgroundColor: isNotificationOn ? "rgba(43, 169, 123, 0.14)" : "rgba(000,000,000,0.1)", alignItems: isNotificationOn ? "flex-end" : "flex-start" }]} onPress={this.handleNotificationstate}>
                            <View style={[styles.PushBotsButton, { backgroundColor: isNotificationOn ? "rgba(43, 169, 123, 1)" : "white" }]}></View>
                        </TouchableHighlight>
                    </View>
                    <Settings />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    PushBotsContainer: {
        width: 60,
        height: 35,
        borderRadius: 20,
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: "#e4d9d5",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    Header: {
        width: "100%",
        height: 60,
        backgroundColor: "white",
        borderBottomColor: "white",

        paddingRight: 10,
        paddingLeft: 10,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    Touchable: {
        paddingLeft: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    Arrow: {
        width: 25,
        height: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    PushBotsButton: {
        width: 30,
        height: 30,
        borderRadius: 100

    },
    Profile: {
        width: "100%",
        height: "100%",
    },
    ProfileHeaderContainer: {
        width: "100%",
        height: 110,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ProfileHeaderContainerImgBox: {
        width: 40,
        height: 40,
        borderRadius: 50,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    ProfileHeaderContainerGift: {
        width: 20,
        height: 20,
    },
    ProfileHeaderText: {
        fontSize: 24,
        fontWeight: "600",

    },
    SloganContainer: {
        width: "100%",
        height: 85,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    ProfilePictureContainer: {
        width: "100%",
        height: 170,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ProfilePicture: {
        width: 135,
        height: 135,
        borderRadius: 100,


    },
    ProfilePictureImgBox: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: "rgba(43, 169, 123, 0.14)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ProfileTitlesContainer: {
        width: "100%",
        height: height - (160 + 110),
        paddingTop: 50,

        paddingRight: 35,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    ProfileHeaderText: {
        fontSize: 16,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600"
    },
    ProfileTitlesBox: {
        width: "100%",
        height: 50,
        paddingLeft: 25,

        // borderBottomWidth: 0.6,
        // borderColor: "rgba(000,000,000, 0.2)",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        // backgroundColor: "red"
    },
    Logout: {
        paddingRight: 10,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }


})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Profile)