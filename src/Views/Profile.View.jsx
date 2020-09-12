import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'


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
		this.state = {}
	}
	render() {
		const { isLogedIn } = this.props.state
		return (height < 675 ?
			<ScrollView contentContainerStyle={styles.Scroll}>
				{isLogedIn ? <Account /> : <Register />}
				<Header/>
			</ScrollView> :
			<View style={styles.Aside}>
				<Header/>
				{isLogedIn ? <Account /> : <SignUp />}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Aside: {
		flex: 1,
		backgroundColor: "white",
		backgroundColor: "red",

		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	Scroll: {
		paddingBottom: 100,
		paddingTop: 50,

	}
})

const mapStateToProps = (state) => {
	return {
		state
	}
}

export default connect(mapStateToProps)(Profile)