import React, { Component } from 'react'
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native'


// components
import Login from '../components/Login'
import ProfileView from '../components/Profile'

// redux
import { connect } from "react-redux"

const { width, height } = Dimensions.get("screen")

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() {
        const {isLogedIn} = this.props.state
		return ( height < 675 ?
			<ScrollView contentContainerStyle={styles.Scroll}>
                {isLogedIn ? <ProfileView/> : <Login/>}
			</ScrollView> :
			<View style={styles.Aside}>
                {isLogedIn ? <ProfileView/> : <Login/>}
			</View> 
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
	}, 
	Scroll: {
		paddingBottom: 100
	}
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Profile)