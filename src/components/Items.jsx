import React, { Component } from 'react'
import { StyleSheet, Dimensions ,View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import { Item, Icons } from "../constants/Image"

const {width, height} = Dimensions.get("screen")

class Items extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	
	render() {
		let key = 0
		let icons = [
			{
				id: 1,
				img: Icons.getit, 
				text: "Navy Plaidd"
			},
			{
				id: 2,
				img: Icons.getit, 
				text: "Navy Plaid"
			},
			{
				id: 3,
				img: Icons.getit, 
				text: "Navy Plaidd"
			},
			{
				id: 4,
				img: Icons.getit, 
				text: "Navy Plaid"
			},
			{
				id: 5,
				img: Icons.getit, 
				text: "Navy Plaidd"
			},
			{
				id: 6,
				img: Icons.getit, 
				text: "Navy Plaid"
			},
			{
				id: 7,
				img: Icons.getit, 
				text: "Navy Plaidd"
			},
			{
				id: 8,
				img: Icons.getit, 
				text: "Navy Plaid"
			},
		]
		let indexs = [Icons.getit, Icons.Customize]
		return (
			<View style={styles.Container}>
				<ScrollView contentContainerStyle={styles.ScrollView} showsVerticalScrollIndicator={false}>
					{icons.map((res) => (
						<TouchableHighlight key={res.id} style={styles.Touchable} underlayColor="white" onPress={(res) => alert("Pressed")}>
							<View style={styles.Items}>
								<View style={styles.ItemsOption}>
									<Image source={Item.item1} style={styles.ItemsImage}/>
								</View>
								<View style={styles.IconsOption}>
									<View style={styles.IconsOptionContainer}>
										<View style={styles.IconsOptionTextcontainer}>
											<Text style={[styles.IconsOptionText, {color: "#1C1B1B", fontSize: 15}]}>{res.text}</Text>
											<Text style={[styles.IconsOptionText, {color: "rgba(28,27,27,0.57)"}]}>{"$399.99"}</Text>
										</View>
										<View style={styles.IconsOptionImagecontainer}>
											{indexs.map((img,i) => (
												<Image key={i} source={img} style={styles.IconsOptionImage}/>
											))}
										</View>
									</View>
								</View>
							</View>
						</TouchableHighlight>
					))}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Container: {
		height, 
		width,
		backgroundColor: "white",
	},
	ScrollView: {
		paddingBottom: 200,

		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	ItemsContainer: {
		width: "100%",
		height: "100%",

		display: "flex",
		flexDirection: "column"

	},
	Touchable: {
		width: 165,
		height: 250,
		borderRadius: 30,
		marginBottom: 30,
		marginTop: 50,
		marginLeft: 10,

		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-end"

	},
	Items: {
		width: 165,
		height: 180,
		backgroundColor: "white",

		borderRadius: 30,
		shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
		shadowRadius: 3.84,

		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	ItemsImage: {
		width: 120,
		height: 150,
		position: "relative",
		bottom: 80
	},
	ItemsOption: {
		width: "100%",
		height: 70,

		display: "flex",
		alignItems: "center"
	},
	IconsOptionContainer: {
		width: "100%",

		display: "flex",
		justifyContent: 'center',
		alignItems: "center"

	},
	IconsOption: {
		width: "100%",
		height: 100,
		paddingRight: 10,
		paddingBottom: 5
	},
	IconsOptionTextcontainer: {
		width: "100%",

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	IconsOptionText: {
		paddingBottom: 5

	},
	IconsOptionImagecontainer: {
		width: "100%",
		height: 40,

		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
	IconsOptionImage: {
		width: 30, 
		height: 30,
		marginRight: 10,
	}
})
export default Items