import React, { Component } from 'react'
import {StyleSheet, View, Text, Image , TouchableHighlight, TextInput } from 'react-native'
import { Icons } from "../constants/Image";


class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() {
		return (
			<View style={styles.Register}>
				<View style={styles.FormTitle}>
					<Text style={[styles.IconsOptionText, {color: "rgb(112,112,112)", fontSize: 25, fontWeight: "bold" }]}>Alteration</Text>
				</View>
				<View style={styles.TextInputContainer}>
					<TextInput style={styles.Input} placeholder="Email"/>
					<TextInput style={styles.Input} placeholder="Password"/>
				</View>
                <View style={styles.FotgotPass} >
                    <Text style={[styles.IconsOptionText, {color: "rgb(112,112,112)", fontSize: 16, textDecorationLine: "underline", textAlign: "left"}]}>Forgot your password?</Text>
                </View>
				<TouchableHighlight style={styles.Touchable} underlayColor="#f6f6f6" onPress={(res) => true}>
                    <Text style={[styles.IconsOptionText, {color: "rgb(112,112,112)", fontSize: 25, fontWeight: "600" }]}>{"Log In"}</Text>
                </TouchableHighlight>
                <View style={styles.Links} >
					<Text style={[styles.IconsOptionText, {color: "rgb(112,112,112)", fontSize: 16, textDecorationLine: "underline"}]}>Create an account</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Register: {
        width: "100%",
        height: "100%",
        paddingTop: 50,
		backgroundColor: "white",

		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	LogoContainer: {
		width: "100%",
		height: "40%",
		paddingBottom: 10,

		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center"
		
	},
	Logo: {
		width: 160,
		height: 160,

    },
    FormTitle: {
        marginTop: 20,
        marginBottom: 20

    },
	TextInputContainer: {
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
		
    },
    Input: {
        width: "90%",
        height: 50,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "rgba(000,000,000,0.3)"
    },
    FotgotPass: {
        width: "90%",
        height: 50,
        paddingLeft: 10,
    },
    Touchable: {
        width: "90%",
        height: 60,
        borderRadius: 10,
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
    Links: {
        width: "90%",
        // backgroundColor: "red",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Register