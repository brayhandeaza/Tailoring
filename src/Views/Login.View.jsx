import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"


// components
import Register from '../components/Register'
import SignIn from '../components/Login'
import SignUp from '../components/SignUp'


// redux
import { connect } from "react-redux"

const { width, height } = Dimensions.get("screen")

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoged: true
		}
	}

	handleIsUserLogedIn = async () => {
		const userId = await AsyncStorage.getItem("userId")
		if (userId) {
			this.props.dispatch({ type: "isUserLogedIn", payloa: true })
		} else {
			this.props.dispatch({ type: "isUserLogedIn", payloa: false })
		}
	}

	componentDidMount() {
	  this.handleIsUserLogedIn()
	}
	
	render() {
		const { isUserLogedIn, isLogedIn } = this.props.state.Login
		return (
			<ScrollView contentContainerStyle={styles.Scroll}>
				{isLogedIn ? <SignIn /> : <SignUp />}
				<Text style={[styles.Slogan, { color: "rgb(112,112,112)", fontFamily: "Inter-Regular", textAlign: "center" }]}>By Miracle Fit</Text>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	Aside: {
		flex: 1,
		// height: "100%",
		backgroundColor: "pink",

		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	Scroll: {
		width: "100%",
		height: "100%",

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	Slogan: {
		position: "absolute",
		bottom: 50,
	}
})

const mapStateToProps = (state) => {
	return {
		state
	}
}

export default connect(mapStateToProps)(Login)