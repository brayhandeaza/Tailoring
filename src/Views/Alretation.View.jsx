import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native'
import { Calendar } from "react-native-calendars"
import Textarea from 'react-native-textarea'
import { Button } from "native-base"

import { connect } from "react-redux"
import { color } from 'react-native-reanimated'

class Alretation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDay: this.handleMinDate()
		}
	}

	handleDayOnPress = (e) => {
		this.setState({
			activeDay: e.dateString
		})
	}

	handleMinDate = () => {
		let date = new Date()
		let tempMonth = date.getMonth()
		let tempDay = date.getDate()

		let month = tempMonth < 9 ? ("0" + (tempMonth + 1)) : tempMonth
		let day = tempDay < 9 ? ("0" + (tempDay + 1)) : tempDay + 1
		let year = date.getFullYear()

		return year + "-" + month + "-" + day
	}

	
	render() {
		const { activeDay } = this.state
		return (
			<View style={styles.Alretation}>
				<ScrollView contentContainerStyle={styles.Scroll}>
					<Calendar
						minDate={this.handleMinDate()}
						onDayPress={this.handleDayOnPress}
						markedDates={{
							[activeDay]: { dotColor: 'white', disabled: false, selected: true, marked: true, selectedColor: '#b2897b', disableTouchEvent: false },
							"2020-08-19": { dotColor: 'white', disabled: true, selected: false, marked: false, selectedColor: '#b2897b', disableTouchEvent: true },
						}}
						theme={{
							arrowColor: '#b2897b',
							dotColor: "white",
							calendarBackground: "white",
							textSectionTitleColor: "black",
						}}
						disableAllTouchEventsForDisabledDays={true}
						current={null}
					/>
					<View style={styles.FormView}>
						<Text style={styles.FormText}>Full Name</Text>
						<TextInput style={styles.FormInput} placeholder="Full Name" />
						<Text style={styles.FormText}>Phone Number</Text>
						<TextInput style={styles.FormInput} placeholder="Phone Number" />
						<Text style={styles.FormText}>Full Address</Text>
						<TextInput style={styles.FormInput} placeholder="Full Address" />
						<Text style={styles.FormText}>Detals</Text>
						<Textarea
							containerStyle={styles.textareaContainer}
							style={styles.textarea}
							maxLength={120}
							placeholder={'Details of what will be altered...'}
							placeholderTextColor={'#c7c7c7'}
							underlineColorAndroid={'transparent'}
						/>
						<Button style={styles.Button}>
							<Text style={{color: "white", fontSize: 20}}>Make An Appointment</Text>
						</Button>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Alretation: {
		flex: 1,
		backgroundColor: "white",

	},
	TitleView: {
		width: "100%",
		height: 60,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	Title: {
		fontSize: 25,
		color: "#636363"
	},
	Scroll: {
		paddingTop: 20,
		paddingBottom: 360
	},
	FormView: {
		width: "100%",
		height: "100%",
		marginTop: 30,
		paddingTop: 20,
		paddingLeft: 25,
		paddingRight: 25,
	},
	FormText: {
		fontSize: 20,
		paddingBottom: 10
	},
	FormInput: {
		width: "100%",
		height: 50,
		paddingLeft: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(000,000,000,0.2)",
		marginBottom: 10
	},
	textareaContainer: {
		height: 180,
		padding: 5,
		borderWidth: 1,
		borderColor: "rgba(000,000,000,0.2)"
	},
	textarea: {
		textAlignVertical: 'top', 
		height: 170,
		fontSize: 14,
		color: '#333',
	},
	Button: {
		width: "100%",
		height: 50,
		backgroundColor: "#b2897b",
		marginTop: 20,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
})

const mapStateToProps = (state) => {
	return {
		state
	}
}
export default connect(mapStateToProps)(Alretation)