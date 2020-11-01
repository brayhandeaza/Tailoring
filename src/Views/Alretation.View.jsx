import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, Image, Platform, TouchableHighlight } from 'react-native'
import { Calendar } from "react-native-calendars"
import Textarea from 'react-native-textarea'
import { Button } from "native-base"
import { Select, Option } from 'react-native-select-lists'
import { Icons } from '../constants/Image';
import { connect } from "react-redux"
import { Actions } from 'react-native-router-flux'
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from "@react-native-community/async-storage"


// Test
import { DynamicSelect } from "react-native-nested-selects";

// componets
import Header from "../components//Header"

class Alretation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dates: [],
			errors: {
				fullName: "",
				phone: "",
				address: "",
				details: ""
			},
			activeDay: this.handleMinDate(),
			timeDate: ["8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm", "02:00 pm", "02:30 pm", "03:00 pm", "03:30 pm", "04:00 pm", "04:30 pm", "05:00 pm", "05:30 pm", "06:00 pm", "06:30 pm", "07:00 pm"],
			appointments: [],
			isFullNameOn: false,
			fullName: "",
			phone: "",
			isPhoneOn: false,
			details: "",
			isDetailsOn: false,
			address: "",
			isAddressOn: false,
			date: this.handleMinDate(),
			time: "8:00 am",
			datePickerVisibility: false,

		}
		this.select;
	}

	handleGroupDate = (arr) => {
		const grp = arr.reduce((r, c, i, a) => {
			r[c] = [...r[c] || [], c]
			r[c] = (a[i + 1] != c && r[c].length == 1) ? r[c][0] : r[c]
			return r
		}, {})
		return Object.values(grp)
	}

	handleFetcheAppointmentByDate = async (activeDay) => {
		let dates = []
		let res = {
			[activeDay]: { dotColor: 'white', disabled: true, selected: false, marked: false, selectedColor: "#2ba97a", disableTouchEvent: true },
		}
		await axios.get("https://alteration-database.herokuapp.com/appointments/").then((appointments) => {
			const appointmentsDate = appointments.data.Appointments
			for (let i = 0; i < appointmentsDate.length; i++) {
				dates.push(appointmentsDate[i].date)
			}
		})

		const dateGrouped = this.handleGroupDate(dates)

		dateGrouped.forEach(date => {
			res[date[0]] = { dotColor: 'white', disabled: true, selected: date[0].length > 4 ? false : true, marked: false, selectedColor: "#2ba97a", disableTouchEvent: true }
		})

		this.setState({
			dates: res
		})
	}

	handleMakeAppointment = async () => {
		const token = await AsyncStorage.getItem("userId")
		const { fullName, details, phone, address, date, time } = this.state
		await axios.post(`https://alteration-database.herokuapp.com/appointments/${token}`, {
			"fullName": fullName,
			"details": details,
			"phone": phone,
			"address": address,
			"date": date,
			"time": time
		}).then((res) => {
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


	handleTime = (value) => {
		this.setState({
			time: value,
		})
	}

	handleDayOnPress = (e) => {
		console.log(e.dateString);
		this.setState({
			activeDay: e.dateString,
			date: e.dateString
		})
	}

	handleMinDate = () => {
		let date = new Date()
		let tempMonth = date.getMonth()
		let tempDay = date.getDate()

		let month = tempMonth < 9 ? ("0" + (tempMonth + 1)) : (tempMonth + 1)
		let day = tempDay < 9 ? ("0" + (tempDay + 1)) : tempDay + 1
		let year = date.getFullYear()

		return year + "-" + month + "-" + day
	}

	handleFullNameOnChange = (value) => {
		this.setState({
			fullName: value,
			isFullNameOn: value.length > 1 ? true : false,
			errors: {
				fullName: value.length > 1 ? "Full Name is required" : '',
				phone: this.state.errors.phone,
				address: this.state.errors.address,
				details: this.state.errors.details,
			}
		})
	}

	handlePhoneNumberOnChange = (value) => {
		this.setState({
			phone: value,
			isPhoneOn: value.length == 14 ? true : false,
			errors: {
				fullName: this.state.errors.fullName,
				phone: value.length > 13 ? "Phone is required" : '',
				address: this.state.errors.address,
				details: this.state.errors.details,
			}
		})

	}

	handleAddressOnChange = (value) => {
		this.setState({
			address: value,
			isAddressOn: value.length > 10 ? true : false,
			errors: {
				fullName: this.state.errors.fullName,
				phone: this.state.errors.phone,
				address: value.length > 9 ? "Address is required" : '',
				details: this.state.errors.details,
			}
		})
	}

	handleDetailsOnChange = (value) => {
		this.setState({
			details: value,
			isDetailsOn: value.length > 29 ? true : false,
			errors: {
				fullName: this.state.errors.fullName,
				phone: this.state.errors.phone,
				address: this.state.errors.address,
				details: value.length > 30 ? "Details are required" : ''
			}
		})
	}

	handleErrors = () => {
		const { phone, fullName, address, details } = this.state.errors
		if (phone !== "" && fullName !== "" && address !== "" && details !== "") {
			return true
		} else {
			return false
		}
	}

	componentDidMount() {
		this.handleMinDate()
		this.handleErrors()
		this.handleFetcheAppointmentByDate(this.state.activeDay)
	}

	render() {
		const { activeDay, isFullNameOn, isDetailsOn, isAddressOn, isPhoneOn } = this.state
		return (
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.Scroll}>
				<View style={styles.Alretation}>
					<Header />
					<Calendar
						minDate={this.handleMinDate()}
						onDayPress={this.handleDayOnPress}
						// markedDates={this.state.dates}
						markedDates={Object.assign({}, this.state.dates, { [activeDay]: { dotColor: 'white', disabled: true, selected: true, marked: false, selectedColor: "#2ba97a", disableTouchEvent: true } })}
						enableSwipeMonths={true}
						theme={{
							arrowColor: "#2ba97a",
							dotColor: "white",
							calendarBackground: "white",
							textSectionTitleColor: "black",
						}}
						disableAllTouchEventsForDisabledDays={true}
						current={"2020-11-26"}
					/>
						<View style={styles.Time}>
							<Image style={{ width: 27, height: 27, marginTop: 12 }} source={Icons.Clock} />
							<Select onSelect={(value) => this.handleTime(value)} listStyle={styles.List} listHeight={350} selectStyle={styles.Select} selectTextStyle={styles.SelectText}>
								{this.state.timeDate.map((time, i) => (
									<Option key={i} optionTextStyle={styles.OptionText} optionStyle={styles.Option} value={time}>{time}</Option>
								))}
							</Select>
							<Image style={{ width: 27, height: 27, marginTop: 12 }} source={Icons.Drop} />
						</View>
					<View style={styles.FormView}>
						<View style={[styles.InputContainerBox, { borderColor: isFullNameOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}>
							<Image style={styles.InputImage} source={isFullNameOn ? Icons.Login.UserOn : Icons.Login.User} />
							<TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" style={styles.Input} placeholder="Full Name" onChangeText={(value) => this.handleFullNameOnChange(value)} />
						</View>
						<View style={[styles.InputContainerBox, { borderColor: isPhoneOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}>
							<Image style={styles.InputImage} source={isPhoneOn ? Icons.Login.PhoneOn : Icons.Login.Phone} />
							<TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" keyboardType="phone-pad" maxLength={14} style={styles.Input} placeholder="Phone Number" value={this.state.phone.replace(/^(\d{3})(\d{3})(\d)+$/, "($1) $2-$3")} onChangeText={(value) => this.handlePhoneNumberOnChange(value)} />
						</View>
						<View style={[styles.InputContainerBox, { borderColor: isAddressOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}>
							<Image style={styles.InputImage} source={isAddressOn ? Icons.Login.AddressOn : Icons.Login.Address} />
							<TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" style={styles.Input} placeholder="Full Address" onChangeText={(value) => this.handleAddressOnChange(value)} />
						</View>
						<Textarea
							containerStyle={[styles.textareaContainer, { borderColor: isDetailsOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}
							style={styles.textarea}
							maxLength={120}
							placeholder={'Please provide details ...'}
							placeholderTextColor={"rgba(000,000,000,0.5)"}
							underlineColorAndroid={'transparent'}
							onChangeText={(value) => this.handleDetailsOnChange(value)}

						/>
						{this, this.handleErrors() ?
							<Button style={[styles.Button, { backgroundColor: "#2ba97a" }]} onPress={this.handleMakeAppointment}>
								<Text style={{ color: "white", fontFamily: "Inter-Regular", fontSize: 20 }}>Make An Appointment</Text>
							</Button> :
							<View style={[styles.Button, { backgroundColor: "rgba(000,000,000,0.1)" }]}>
								<Text style={{ color: "white", fontFamily: "Inter-Regular", fontSize: 20 }}>Make An Appointment</Text>
							</View>
						}
					</View>
				</View>
			</KeyboardAwareScrollView>
		)
	}
}

const styles = StyleSheet.create({
	Alretation: {
		flex: 1,
		backgroundColor: "white",
	},
	InputContainerBox: {
		height: 60,
		marginBottom: 20,
		paddingLeft: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "rgba(000,000,000,0.1)",

		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	Scroll: {
		paddingBottom: 50
	},
	InputImage: {
		width: 25,
		height: 25
	},
	Input: {
		width: "70%",
		height: 50,
		paddingLeft: 10,
		marginLeft: 5,
		borderRadius: 5,

		borderColor: "rgba(000,000,000,0.3)",
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
		// borderColor: "rgba(000,000,000,0.1)",
		borderRadius: 5,
	},
	textarea: {
		textAlignVertical: 'top',
		height: 170,
		fontSize: 15,
		paddingLeft: 3,

		color: '#333',
		fontFamily: "Inter-Regular",
	},
	Button: {
		width: "100%",
		height: 50,
		backgroundColor: "#2ba97a",
		marginTop: 15,
		borderRadius: 5,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	Select: {
		width: 100,
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
		width: "90%",
		height: 50,
		marginTop: 5,
		borderRadius: 10,
		borderWidth: 0.5,
		
		backgroundColor: "white",
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
		width: "50%",
		marginTop: 5,
		
		backgroundColor: "rgba(000,000,000,0)",
		marginBottom: 10,
		borderColor: "rgba(000,000,000,0.5)",
	},
	Time: {
		width: 180,
		height: 50,
		backgroundColor: "#2ba97a",
		marginLeft: 20,
		borderRadius: 10,
		marginTop: 30,


		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-start"
	}
})

const mapStateToProps = (state) => {
	return {
		state
	}
}
export default connect(mapStateToProps)(Alretation)