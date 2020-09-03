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
        this.props.dispatch({ type: "isAside" })
        Actions.Aside()
    }
    render() {
        const {isHeader} = this.props.state
        return (isHeader ?
            <Header style={styles.Header}>
                <View style={styles.Touchable} >
                    <Image style={[styles.Icons, { width: 40, height: 40 }]} source={Icons.Logo} />
                </View>
            </Header> : null
        )
    }
}

const styles = StyleSheet.create({
    Header: {
        height: 60,
        backgroundColor: "white",
        borderBottomColor: "white",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    Touchable: {
        width: 50,
        height: 60,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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