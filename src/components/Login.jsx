import React, { Component } from 'react'
import {StyleSheet, View, Text, Image , TouchableHighlight, } from 'react-native'
import { Icons } from "../constants/Image";


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() {
		return (
			<View style={styles.Login}>
				<View style={styles.LogoContainer}>
					<Image style={styles.Logo} source={Icons.Logo}/>
				</View>
				<View style={styles.LoginOrSignUpContainer}>
					<View style={styles.TextDetailsBox}>
						<Text style={styles.DetailsText}>Log in or create an account to manage your portfolio.</Text>
					</View>
					<View style={styles.ButtonContainer}>
						<TouchableHighlight underlayColor="#b2897b" style={styles.Button} onPress={(e) => {}}>
							<Text style={styles.ButtonText}>Sign Up</Text>
						</TouchableHighlight>
						<Text>Already have an account?</Text>
						<TouchableHighlight underlayColor="#f6f6f6" style={[styles.Button, {borderWidth: 0}]} onPress={(e) => {}}>
							<Text style={styles.ButtonText}>Log in</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Login: {
		flex: 1,
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
	LoginOrSignUpContainer: {
		width: "100%",
		
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	TextDetailsBox: {
		width: "100%",
        padding: 10,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	DetailsText: {
		textAlign: "center", 
		fontSize: 18, 
		color : "black"
	},
	ButtonContainer: {
		width: "100%",
		height: 200,
		// backgroundColor: "yellow",

		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	Button: {
		width: 200,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#5e4942",
		marginTop: 10,
		marginBottom: 10,
		// backgroundColor: "#b2897b",

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	ButtonText: {
		textTransform: "uppercase",
		color: "#5e4942"
	}
})

export default Login