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
        const { pView } = this.props.state.Footer
        this.props.dispatch({ type: action, payload: action === "isProfile" ? pView : action })

        if (action === "isOrders") {
            this.props.dispatch({ type: "isHeaderHidden" })
        } else {
            this.props.dispatch({ type: "isHeaderNotHidden" })
        }


        // console.log(pView)
        if (view == "_Orders") {
            Actions.Orders()
        } else if (view == "_Prices") {
            Actions.Prices()
        } else {
            Actions.reset(view)
        }
    }
 
    isViews = (view) => {
        const isTrue = {
            // borderTopColor: "#9d7869",
            // borderTopColor: "#2ba97a",
        }
        return view ? isTrue : {}
    }

    render() {
        const { isHome, isProfile, isOrders, isPrices, isFooter } = this.props.state.Footer
        return (
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
                            <Image style={styles.Icons} source={isOrders ? Icons.AppointmentOn : Icons.Appointment} />
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
            </View>
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
        paddingBottom: 10,


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
