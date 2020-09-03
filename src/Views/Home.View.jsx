import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, Image } from 'react-native'
import { connect } from "react-redux"
import { Item, Icons } from "../constants/Image"
import { Actions } from "react-native-router-flux"

const { width, height } = Dimensions.get("screen")

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <View style={styles.Appointments}>
                <View style={styles.TouchableComponent}>
                    <TouchableHighlight style={styles.Touchable} underlayColor="#f6f6f6" onPress={(res) => alert("Pressed")}>
                        <View style={styles.ItemsOption}>
                            <Image source={Icons.Customize} style={styles.ItemsImage}/>
                            <Text style={[styles.IconsOptionText, {color: "rgb(112,112,112)", fontSize: 25}]}>{"Custom Shirt"}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Appointments: {
        width,
        height,
        backgroundColor: "white",
        paddingTop: 60,
    },
    TouchableComponent: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    Touchable: {
        width: 200,
        height: 200,
        borderRadius: 30,
        marginBottom: 30,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.3)",

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
		width: 80,
        height: 80,
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

export default connect(mapStateToProps)(Home)