import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, Platform } from 'react-native'
import { connect } from "react-redux"
import { Icons } from "../constants/Image"
import { Actions } from "react-native-router-flux"

// components
import Footer from "../components/Footer"

class Tailor extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleOnPress = (view, action) => {
        this.props.dispatch({ type: action })
        Actions.reset(view)
    }

    render() {
        return (
            <View style={styles.Appointments}>
                <View style={styles.ItemsOption}>
                    <Text style={[styles.IconsOptionText, { fontSize: 30, fontWeight: "600" }]}>{"Your tailor."}</Text>
                    <Text style={[styles.IconsOptionText, { color: "#2ba97a", fontSize: 30, fontWeight: "600" }]}>{" At Home"}</Text>
                </View>
                <View>
                    <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", position: "relative", bottom: 15 }]}>{"By. Miracle Fit"}</Text>
                </View>
                <View style={styles.TouchableComponent}>
                    <Image source={Icons.Customize} style={styles.ItemsImage} />
                </View>
                <TouchableHighlight style={styles.Touchable} underlayColor="#f6f6f6" onPress={(res) => this.handleOnPress("_Alretation", "isAlteration")}>
                    <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 25, fontWeight: "bold" }]}>{"Get a tailor"}</Text>
                </TouchableHighlight>
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Appointments: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 80,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    TouchableComponent: {
        width: "100%",
        height: "40%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"


    },
    Touchable: {
        width: 300,
        height: 60,
        borderRadius: 10,
        marginBottom: 30,
        backgroundColor: "white",
        borderWidth: Platform.OS == "android" ? 0.6 : 0.2,
        borderColor: "rgba(000,000,000,0.2)",



        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ItemsImage: {
        width: 200,
        height: 200,
        marginBottom: 10,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
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
        alignItems: "center"
    },
    IconsOptionText: {
        paddingBottom: 5

    },
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Tailor)