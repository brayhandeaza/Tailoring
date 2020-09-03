import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Icons, Img } from '../constants/Image'
import { Actions } from 'react-native-router-flux'

// redux
import { connect } from "react-redux"

const { width, height } = Dimensions.get("screen")

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["Notifications", "Settings", "Privacy Policy", "Log Out"],
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

    render() {
        const { isNotificationOn, title } = this.state
        return (
            <View style={styles.Profile}>
                <View style={styles.ProfileHeaderContainer}>
                    <View style={styles.ProfileHeaderContainerImgBox}>
                        <Image style={styles.ProfileHeaderContainerGift} source={Icons.Gift} />
                    </View>
                    <View style={[styles.ProfileHeaderContainerImgBox, { width: 200, backgroundColor: "white" }]}>
                        <Text style={styles.ProfileHeaderText}>Hello, Brayhan</Text>
                    </View>
                    <View style={[styles.ProfileHeaderContainerImgBox, { backgroundColor: "white" }]}></View>
                </View>
                <View style={styles.ProfilePictureContainer}>
                    <View style={styles.ProfilePictureImgBox}>
                        <Image style={styles.ProfilePicture} source={Img.Avatar} />
                    </View>
                </View>
                <View style={styles.ProfileTitlesContainer}>
                    {title.map((title, i) => (
                        <View key={i} style={styles.ProfileTitlesBox}>
                            <TouchableHighlight underlayColor="white" onPress={ title != "Notifications" ? (e) => this.handleTitleOnPress(e,`_${title.replace(" ","")}`) : null}>
                                <Text style={styles.ProfileHeaderText}>{title}</Text>
                            </TouchableHighlight>
                            {title == "Notifications" ?
                                <TouchableHighlight underlayColor="#e4d9d5" style={[styles.PushBotsContainer, { backgroundColor: "rgba(000,000,000,0.1)", alignItems: isNotificationOn ? "flex-end" : "flex-start" }]} onPress={this.handleNotificationstate}>
                                    <View style={[styles.PushBotsButton, { backgroundColor: isNotificationOn ? "#ac8a7d" : "white" }]}></View>
                                </TouchableHighlight>
                                : null}
                        </View>
                    ))}
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

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ProfileHeaderContainerImgBox: {
        width: 40,
        height: 40,
        backgroundColor: "#e4d9d5",
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
        fontWeight: "600"
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
        width: 130,
        height: 130,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "rgba(000,000,000,0.3)"
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
    }


})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Profile)