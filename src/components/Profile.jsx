import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Icons, Img } from '../constants/Image'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from "@react-native-community/async-storage"

// redux
import { connect } from "react-redux"
import { color, log } from 'react-native-reanimated'

const { width, height } = Dimensions.get("screen")

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["Notifications", "Settings"],
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

    handdleOnPressArrow = (view) => {
        const { pView } = this.props.state.Footer
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

    handleLogOut = async () => {
        await AsyncStorage.removeItem("userId")
        this.props.dispatch({ type: "isUserLogedIn", payloa: true })
        this.props.dispatch({type: "isProfile" })
        Actions.reset("_Profile")
    }

    render() {
        const { isNotificationOn, title } = this.state
        return (
            <View style={styles.Profile}>
                <View style={styles.Header}>
                    <TouchableHighlight underlayColor="white" style={styles.Touchable} onPress={this.handdleOnPressArrow}>
                        <Image style={styles.Arrow} source={Icons.Arrow} />
                    </TouchableHighlight>
                </View>
                <View style={styles.ProfilePictureContainer}>
                    <View style={styles.ProfilePictureImgBox}>
                        <Image style={styles.ProfilePicture} source={Img.Avatar} />
                    </View>
                </View>
                <View style={styles.ProfileTitlesContainer}>
                    {title.map((title, i) => (
                        <View key={i} style={styles.ProfileTitlesBox}>
                            <TouchableHighlight underlayColor="white" onPress={title != "Notifications" ? (e) => this.handleTitleOnPress(e, `_${title.replace(" ", "")}`) : null}>
                                <Text style={[styles.ProfileHeaderText, { fontFamily: "Inter-Regular" }]}>{title}</Text>
                            </TouchableHighlight>
                            {title == "Notifications" ?
                                <TouchableHighlight underlayColor="rgba(000,000,000,0.1)" style={[styles.PushBotsContainer, { backgroundColor: isNotificationOn ? "rgba(43, 169, 123, 0.14)" : "rgba(000,000,000,0.1)", alignItems: isNotificationOn ? "flex-end" : "flex-start" }]} onPress={this.handleNotificationstate}>
                                    <View style={[styles.PushBotsButton, { backgroundColor: isNotificationOn ? "rgba(43, 169, 123, 1)" : "white" }]}></View>
                                </TouchableHighlight>
                                : null}
                        </View>
                    ))}
                    <TouchableHighlight style={styles.Logout} underlayColor="white" onPress={this.handleLogOut}>
                        <Text style={[styles.ProfileHeaderText, { fontFamily: "Inter-Regular" , color: "rgba(43, 169, 123, 1)"}]}>{"Log Out"}</Text>
                    </TouchableHighlight>
                </View>
            </View>
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

    },
    Header: {
        width: "100%",
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.3)",

    },
    Touchable: {
        width: "100%",
        height: 100,
        paddingLeft: 25,
        paddingBottom: 10,

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start"
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
        // backgroundColor: "red",

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
        paddingLeft: 30,
        paddingRight: 35,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    ProfileHeaderText: {
        fontSize: 18,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600"
    },
    ProfileTitlesBox: {
        width: "100%",
        height: 75,

        borderBottomWidth: 0.6,
        borderColor: "rgba(000,000,000, 0.2)",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        // backgroundColor: "red"
    },
    Logout: {
        width: "100%",
        height: 75,

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