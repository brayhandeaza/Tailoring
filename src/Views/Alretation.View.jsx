import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, Image } from 'react-native'
import { Calendar } from "react-native-calendars"
import Textarea from 'react-native-textarea'
import { Button } from "native-base"
import { Select, Option } from 'react-native-select-lists'
import { Icons } from '../constants/Image';
import { connect } from "react-redux"
import { Actions } from 'react-native-router-flux'
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'





// componets
import Header from "../components//Header"
import Address from '../Views/Address.View'

import { set } from 'react-native-reanimated'

class Alretation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDay: this.handleMinDate(),
			timeDate: ["8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm", "02:00 pm", "02:30 pm", "03:00 pm", "03:30 pm", "04:00 pm", "04:30 pm", "05:00 pm", "05:30 pm", "06:00 pm", "06:30 pm", "07:00 pm"],
			appointments: [],
			fullName: "",
			details: "",
			phone: "",
			address: "",
			date: this.handleMinDate(),
			time: "8:00 am"
		}
	}

	handleMakeAppointment = async () => {
		const { fullName, details, phone, address, date, time } = this.state
		await axios.post(`http://localhost:3000/appointments/${1}`, {
			// await axios.post(`https://alteration-database.herokuapp.com/appointments/${1}`, {
			fullName,
			details,
			phone,
			address,
			date,
			time
		}).then((res) => {
			console.log(res);
			this.props.dispatch({ type: "isOrders" })
			this.setState({
				fullName: "",
				details: "",
				phone: "",
				address: "",
				date: this.handleMinDate(),
				time: "8:00 am"
			})
			Actions.reset("_Orders")
		}).catch(err => console.log(err))
	}

	handleFullNameOnChange = (value) => {
		this.setState({
			fullName: value
		})
	}

	handlePhoneNumberOnChange = (value) => {
		this.setState({
			phone: value
		})
	}

	handleAddressrOnChange = (value) => {
		this.setState({
			address: value
		})
	}

	handleDetailsOnChange = (value) => {
		this.setState({
			details: value
		})
	}

	handleTime = (value) => {
		this.setState({
			time: value
		})
	}

	handleDayOnPress = (e) => {
		this.setState({
			activeDay: e.dateString,
			date: e.dateString
		})
		console.log(e.dateString);
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
				<Header />
				<KeyboardAwareScrollView contentContainerStyle={styles.Scroll}>
					<Calendar
						minDate={this.handleMinDate()}
						onDayPress={this.handleDayOnPress}
						markedDates={{
							[activeDay]: { dotColor: 'white', disabled: false, selected: true, marked: true, selectedColor: "#2ba97a", disableTouchEvent: false },
							"2020-08-19": { dotColor: 'white', disabled: true, selected: false, marked: false, selectedColor: "#2ba97a", disableTouchEvent: true },
						}}
						enableSwipeMonths={true}
						theme={{
							arrowColor: "#2ba97a",
							dotColor: "white",
							calendarBackground: "white",
							textSectionTitleColor: "black",
						}}
						disableAllTouchEventsForDisabledDays={true}
						current={null}
					/>
					<View style={styles.Time}>
						<Image style={{ width: 25, height: 25 }} source={Icons.Clock} />
						<Select onSelect={(value) => this.handleTime(value)} listStyle={styles.List} listHeight={350} selectStyle={styles.Select} selectTextStyle={styles.SelectText}>
							{this.state.timeDate.map((time, i) => (
								<Option key={i} optionTextStyle={styles.OptionText} optionStyle={styles.Option} value={time}>{time}</Option>
							))}
						</Select>
					</View>
					<View style={styles.FormView}>
						<Text style={styles.FormText}>Full Name</Text>
						<TextInput style={styles.FormInput} placeholder="Full Name" onChangeText={(value) => this.handleFullNameOnChange(value)} />
						<Text style={styles.FormText}>Phone Number</Text>
						<TextInput style={styles.FormInput} placeholder="Phone Number" onChangeText={(value) => this.handlePhoneNumberOnChange(value)} />
						<Text style={styles.FormText}>Full Address</Text>
						<TextInput style={styles.FormInput} placeholder="Full Address" onChangeText={(value) => this.handleAddressrOnChange(value)} />
						<Text style={styles.FormText}>Details</Text>
						<Textarea
							containerStyle={styles.textareaContainer}
							style={styles.textarea}
							maxLength={120}
							placeholder={'Please provide details ...'}
							placeholderTextColor={'#c7c7c7'}
							underlineColorAndroid={'transparent'}
							onChangeText={(value) => this.handleDetailsOnChange(value)}
						/>
						<Button style={styles.Button} onPress={this.handleMakeAppointment}>
							<Text style={{ color: "white", fontFamily: "Inter-Regular", fontSize: 20 }}>Make An Appointment</Text>
						</Button>
					</View>
				</KeyboardAwareScrollView>
				<Address position={0}/>
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
		paddingBottom: 55,
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
		fontSize: 18,
		paddingBottom: 10,
		fontFamily: "Inter-Regular"
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
		backgroundColor: "#2ba97a",
		marginTop: 20,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	Select: {
		width: 140,
		height: 50,
		backgroundColor: "#2ba97a",
		// marginLeft: 20,
		borderRadius: 10,


	},
	SelectText: {
		width: 150,
		fontSize: 20,
		fontWeight: "600",
		color: "white",
		// paddingLeft: 40,

	},
	Option: {
		width: 150,
		height: 50,
		marginTop: 5,
		borderRadius: 10,
		borderWidth: 0.5,
		borderColor: "rgba(000,000,000,0.2)",
		paddingLeft: 20
	},
	OptionText: {
		paddingLeft: 20,
		fontSize: 18,
		color: "rgba(000,000,000,0.5)",
		borderColor: "rgba(000,000,000,0.5)",

	},
	List: {
		borderWidth: 0,
		width: "90%",
		marginTop: 5,
		marginBottom: 10,
		borderColor: "rgba(000,000,000,0.5)",

	},
	Time: {
		width: 160,
		backgroundColor: "#2ba97a",
		marginLeft: 20,
		paddingLeft: 30,
		borderRadius: 10,
		marginTop: 10,

		display: "flex",
		flexDirection: "row",
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