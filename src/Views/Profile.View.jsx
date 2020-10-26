import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native'
import axios from "axios"


// components
import Register from '../components/Register'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Account from '../components/Profile'
import Header from "../components/Header"

// redux
import { connect } from "react-redux"

const { width, height } = Dimensions.get("screen")

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoged: true
		}
	}


	render() {
		const { state } = this.props
		return (
			
			<ScrollView contentContainerStyle={styles.Scroll}>
				{this.state.isLoged ? <Account /> : state.Login.isLogedIn ? <Login/> : <SignUp/> }
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

export default connect(mapStateToProps)(Profile)