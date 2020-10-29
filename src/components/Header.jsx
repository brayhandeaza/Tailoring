import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { Header } from "native-base"
import { connect } from "react-redux"
import { Icons } from '../constants/Image'
import { Actions } from "react-native-router-flux"


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleMenuOnPressed = (e) => {
        const { pView } = this.props.state.Footer
        this.props.dispatch({ type: pView })
        Actions.reset(pView == "isHome" ? "_Home" : "_Orders")
    }

    render() {
        return (
            <Header style={styles.Header}>
                {this.props.isHidden ? null :
                    <TouchableHighlight underlayColor="white" style={styles.Touchable} onPress={this.handleMenuOnPressed} >
                        <Image style={[styles.Icons, { width: 25, height: 25 }]} source={Icons.Arrow} />
                    </TouchableHighlight>
                }
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    Header: {
        width: "100%",
        height: 60,
        borderWidth: 0,
        backgroundColor: "white",
        borderBottomColor: "white",
    },
    Touchable: {
        width: "100%",
        height: 60,
        paddingLeft: 10,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
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

export default connect(mapStateToProps)(Nav)