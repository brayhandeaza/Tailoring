import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { Header} from "native-base"
import { connect } from "react-redux"
import { Icons } from '../constants/Image'

import { Actions } from "react-native-router-flux"


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleMenuOnPressed = (e) => {
        this.props.dispatch({ type: "isHome" })
        Actions.Home()
    }
    render() {
        const { isHeader, isArrow } = this.props.state.Header
        console.log(isHeader);
        return (
            <Header style={styles.Header}>
                <TouchableHighlight underlayColor="white" style={styles.Touchable} onPress={this.handleMenuOnPressed} >
                     <Image style={[styles.Icons, { width: 30, height: 30}]} source={Icons.Arrow} /> 
                </TouchableHighlight>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    Header: {
        width: "100%",
        height: 60,
        backgroundColor: "white",
        borderBottomColor: "white",
    },
    Touchable: {
        width: "100%",
        height: 60,
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    Icons: {
        width: 30,
        height: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    }
})
const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Nav)