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

		let month = tempMonth < 9 ? ("0" + (tempMonth + 1)) : (tempMonth + 1)
		let day = tempDay < 9 ? ("0" + (tempDay + 1)) : tempDay + 1
		let year = date.getFullYear()

		return year + "-" + month + "-" + day
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
	handleAddressOnChange = (value) => {
        this.setState({
            address: value
        })
	}
	
	componentDidMount() {
	  this.handleMinDate()
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
							[activeDay]: { dotColor: 'white', disabled: true, selected: true, marked: false, selectedColor: "#2ba97a", disableTouchEvent: true },
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
						<Image style={{ width: 25, height: 25 }} source={Icons.Drop} />
					</View>
					<View style={styles.FormView}>
						<View style={styles.InputContainerBox}>
							<Image style={styles.InputImage} source={Icons.Login.User} />
							<TextInput placeholderTextColor="#747374" style={styles.Input} placeholder="Full Name" onChangeText={(e, value) => this.handleFullNameOnChange(value)} />
						</View>
						<View style={styles.InputContainerBox}>
							<Image style={styles.InputImage} source={Icons.Login.Phone} />
							<TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" keyboardType="phone-pad" style={styles.Input} placeholder="Phone Number" onChangeText={(e, value) => this.handlePhoneNumberOnChange(value)} />
						</View>
						<View style={styles.InputContainerBox}>
							<Image style={styles.InputImage} source={Icons.Login.Address} />
							<TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" autoCorrect={false} style={styles.Input} placeholder="Full Address" onChangeText={(e, value) => this.handleAddressOnChange(value)} />
						</View>
						{/* <Text style={styles.FormText}>Details</Text> */}
						<Textarea
							containerStyle={styles.textareaContainer}
							style={styles.textarea}
							maxLength={120}
							placeholder={'Please provide details ...'}
							placeholderTextColor={"rgba(000,000,000,0.5)"}
							underlineColorAndroid={'transparent'}
							onChangeText={(value) => this.handleDetailsOnChange(value)}
						/>
						<Button style={styles.Button} onPress={this.handleMakeAppointment}>
							<Text style={{ color: "white", fontFamily: "Inter-Regular", fontSize: 20 }}>Make An Appointment</Text>
						</Button>
					</View>
				</KeyboardAwareScrollView>
				{/* <Address position={0}/> */}
			</View>
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
		// backgroundColor: "red",
		
		marginBottom: 20,
		paddingLeft: 5,

		borderRadius: 5,
		borderWidth: 1,
        borderColor: "rgba(000,000,000,0.1)",
		
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
	},
	Scroll: {
		paddingBottom: 10
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
		borderColor: "rgba(000,000,000,0.1)",
		borderRadius: 5,
	},
	textarea: {
		textAlignVertical: 'top',
		height: 170,
		fontSize: 15,
		paddingLeft: 5,
		paddingRight: 5,
		
		color: '#333',
		fontFamily: "Inter-Regular",
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
		backgroundColor: "rgba(000,000,000,0.1)",
		marginBottom: 10,
		borderColor: "rgba(000,000,000,0.5)",
	},
	Time: {
		width: 180,
		backgroundColor: "#2ba97a",
		marginLeft: 20,
		// paddingLeft: 30,
		borderRadius: 10,
		marginTop: 30,

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