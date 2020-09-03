import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

// components
import Items from '../components/Items'    

// redux
import { connect } from "react-redux"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        
    }
 
    render() {
        return (
            <View style={styles.Home}>
                <Items/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Home: {
        flex: 1,
        paddingBottom: 100,
        position: "relative",
        backgroundColor: "white",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    ButtomContainer: {
        width: 200,
        height: 200,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderWidth: 3,
        borderRadius: 100,
        shadowColor: "#eee",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    Icons: {
        width: 75,
        height: 75,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    GetTailor: {
        width: 300,
        height: 55,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },

})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Home)

