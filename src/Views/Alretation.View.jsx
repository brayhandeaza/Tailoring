import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, Image } from 'react-native'
import { Calendar } from "react-native-calendars"
import Textarea from 'react-native-textarea'
import { Button } from "native-base"
import { Select, Option } from 'react-native-select-lists'
import { Icons} from '../constants/Image';
import { connect } from "react-redux"
import { Actions } from 'react-native-router-flux'


// componets
import Header from "../components//Header"
import { set } from 'react-native-reanimated'

class Alretation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDay: this.handleMinDate(),
			timeDate: ["8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm", "02:00 pm", "02:30 pm", "03:00 pm", "03:30 pm", "04:00 pm", "04:30 pm", "05:00 pm", "05:30 pm", "06:00 pm", "06:30 pm", "07:00 pm"],
			appointments: []

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

	handleMakeAppointment = () => {
		Actions.Orders()
	}

	render() {
		const { activeDay } = this.state
		return (
			<View style={styles.Alretation}>
				<Header />
				<ScrollView contentContainerStyle={styles.Scroll}>
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
						<Image style={{width: 25, height: 25}} source={Icons.Clock} />
						<Select listStyle={styles.List} listHeight={350} selectStyle={styles.Select} selectTextStyle={styles.SelectText}>
							{this.state.timeDate.map((time) => (
								<Option optionTextStyle={styles.OptionText} optionStyle={styles.Option} value={time}>{time}</Option>
							))}
						</Select>
					</View>
					<View style={styles.FormView}>
						<Text style={styles.FormText}>Time</Text>
						<TextInput style={styles.FormInput} placeholder="Full Name" />
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
						<Button style={styles.Button} onPress={this.handleMakeAppointment}>
							<Text style={{ color: "white", fontSize: 20 }}>Make An Appointment</Text>
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
		paddingBottom: 355
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
		backgroundColor: "#2ba97a",
		marginTop: 20,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	Select: {
		width: 140,
		height: 50,
		backgroundColor:  "#2ba97a",
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
	OptionText:{
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
		backgroundColor:  "#2ba97a",
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