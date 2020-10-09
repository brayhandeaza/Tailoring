import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
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
			users: []
		}
	}
	
	render() {
		const { isLogedIn } = this.props.state
		return (
			
			<ScrollView contentContainerStyle={styles.Scroll}>
				{!isLogedIn ? <Account /> : <SignUp/>}
			</ScrollView> 
		)
	}
}

const styles = StyleSheet.create({
	Aside: {
		flex: 1,
		backgroundColor: "white",

		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
	}
})

const mapStateToProps = (state) => {
	return {
		state
	}
}

export default connect(mapStateToProps)(Profile)