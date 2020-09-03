import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Icons } from '../constants/Image'
import { connect } from "react-redux";

class Navegation extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleOnPress = (e, view, action) => {
        e.stopPropagation()
        this.props.dispatch({ type: action })
        Actions.reset(view)
    }

    isViews = (view) => {
        const isTrue = {
            borderTopColor: "#9d7869",
        }
        return view ? isTrue : {}
    }

    render() {
        const { isHome, isProfile, isFooter, isOrders, isPrices } = this.props.state
        return (isFooter ?
            <View style={styles.FooterContainer}>
                <View style={styles.Footer}>
                    <TouchableHighlight style={[styles.Touchable, this.isViews(isHome)]} underlayColor="white" onPress={!isHome ? (e) => this.handleOnPress(e, "_Home", "isHome") : null}>
                        <View style={styles.Container}>
                            <View style={styles.isOn} ></View>
                            <Image style={styles.Icons} source={isHome ? Icons.HomeOn : Icons.Home} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.Touchable, this.isViews(isOrders)]} underlayColor="white" onPress={!isOrders ? (e) => this.handleOnPress(e, "_Orders", "isOrders") : null}>
                        <View style={styles.Container} >
                            <Image style={styles.Icons} source={isOrders ? Icons.AppointmentOn : Icons.Appointment}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.Touchable, this.isViews(isPrices)]} underlayColor="white" onPress={!isPrices ? (e) => this.handleOnPress(e, "_Prices", "isPrices") : null}>
                        <View style={styles.Container} >
                            <Image style={styles.Icons} source={isPrices ? Icons.price : Icons.priceOff} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.Touchable, this.isViews(isProfile)]} underlayColor="white" onPress={!isProfile ? (e) => this.handleOnPress(e, "_Profile", "isProfile") : null}>
                        <View style={styles.Container} >
                            <Image style={styles.Icons} source={isProfile ? Icons.ProfileOn : Icons.Profile} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View> : null
        )
    }
}

const styles = StyleSheet.create({
    FooterContainer: {
        width: "100%",
        height: 70,
        borderColor: "#ccc",
        borderTopWidth: 0,
        position: "absolute",
        bottom: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    Footer: {
        width: "90%",
        height: 55,
        borderRadius: 10,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.4)",
        paddingBottom: 5,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    Container: {
        width: 55,
        height: 55,
        borderRadius: 10,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Touchable: {
        width: 55,
        height: "100%",
        borderTopWidth: 7,
        borderTopColor: "white",


        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Icons: {
        width: 30,
        height: 30
    }
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Navegation)