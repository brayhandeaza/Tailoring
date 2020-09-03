import React, { Component } from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { connect } from "react-redux"

// Components
import Items from "../components/CartItems"
class Bag extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <View style={styles.Gallery}>
                <View style={styles.CartTitleBox} >
                    <Text style={styles.CartTitle}>Cart</Text>
                    <Text style={styles.CartTitle}>$20.00</Text>
                </View>
                <Items/>
            </View>
         )
    }
}
 
const styles = StyleSheet.create({
    Gallery: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
    },
    CartTitleBox: {
        width: "100%",
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    CartTitle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "rgba(00,00,00,0.8)"
    }
})

const mapStateToProps = (state) => {
    return {
        state
    }
}
export default connect(mapStateToProps)(Bag)