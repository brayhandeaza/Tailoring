import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'

import { Item, Icons } from "../constants/Image";

class CartItems extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			items: [1,2,3,4,5,6,7,8,9,0]
		}
	}
	render() {
		const { items } = this.state
		return (
			<ScrollView style={{marginBottom: 90}}>
				{items.map((res) => (
					<View style={styles.Items} >
						<View style={styles.CartItemsBox}>
							<View style={styles.Left} >
								<Image style={styles.ItemsImage} source={Item.item1}/>
							</View>
							<View style={styles.Right} >
								<View style={{height: 60}}>
									<Text style={[styles.Title, {fontWeight: "bold"}]}>Anya Hinmarch</Text>
									<Text style={styles.Title}>Wool red jacket high quality</Text>
								</View>
								<View style={styles.Details} >
									<View style={[{marginRight: 10}]}>
										<Text style={styles.Title}>$399.99</Text>
									</View>
									<View style={styles.Pcs} >
										<Text style={{fontSize: 15, color: "rgb(112,112,112)"}}>1pc</Text>
									</View>
									<TouchableHighlight underlayColor="rgba(112,112,112, 0.2)" onPress={() => alert("Pressed")}>
										<View style={styles.DetailsImage}>
											<Image style={styles.Icons} source={Icons.Delete}/>
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>	
					</View>
				))}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	Items: {
		width: "100%",
	},
	CartItemsBox:  {
        width: "100%",
        height: 150,
		marginTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(112,112,112, 0.2)",

		display: "flex",
		flexDirection: "row"
	},
	Left: {
		width: 110,
		height: "100%",
		marginRight: 10,
		
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start"
	},
	Right: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	ItemsImage: {
		width: 100,
		height: 100,
	},
	Title: {
		fontSize: 15,
		color: "rgb(112,112,112)",
	}, 
	Details: {
		width: 250,
		height: 35,
		// backgroundColor: "red",

		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	DetailsBox: {
		height: "100%",
		// paddingRight: 20,
		// backgroundColor: "pink",

		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"

	},
	DetailsBoxImage: {
		// width: "100%",
		height: "100%",
		
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center"
	},
	Pcs: {
		width: 35,
		height: "100%",
		// backgroundColor: "red",

		display: "flex",
		justifyContent: "center",
		alignItems: "center"

	},
	DetailsImage: {
		width: 30,
		height: 30,
		backgroundColor: "rgba(112,112,112, 0.2)",
		borderRadius: 5,

		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	Icons: {
		width: 20,
		height: 20,
	}
})

export default CartItems;

