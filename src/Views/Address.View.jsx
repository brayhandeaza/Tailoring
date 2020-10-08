import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView } from 'react-native'
import Svg, { Path } from "react-native-svg";

const { height, width } = Dimensions.get("screen")
export class Address extends Component {
    render() {
        return (
            <View style={styles.Address}>
                {/* <Text style={{ color: "black", fontSize: 25, fontFamily: "Inter-Regular", marginLeft: 20, marginBottom: 10 }}>Address</Text> */}
                <View style={styles.InputContainer}>
                    <TextInput style={styles.Input} placeholder="Search your address ..." />
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    <View style={styles.AddressRes}>
                        <Svg height={25} viewBox="0 0 512 512" width={25} fill="#2BA97A">
                            <Path d="M441.121 327.058c-38.1 0-69.096 30.997-69.096 69.097 0 19.865 10.387 41.542 30.871 64.427 14.319 15.996 28.556 26.863 29.154 27.318l9.07 6.886 9.07-6.886c.599-.455 14.835-11.321 29.154-27.318 20.485-22.885 30.872-44.562 30.872-64.427.002-38.1-30.995-69.097-69.095-69.097zm.001 129.339c-15.537-13.983-39.097-39.59-39.097-60.242 0-21.558 17.538-39.097 39.096-39.097s39.097 17.539 39.097 39.097c0 20.654-23.566 46.264-39.096 60.242z" />
                            <Path d="M426.122 383.182h30v30h-30zM265.562 372.846l23.083 23.083H101.071C61.882 395.929 30 364.046 30 324.858s31.882-71.071 71.071-71.071h71.072v68.856h167.714v-68.856h71.071c55.73 0 101.071-45.341 101.071-101.072 0-55.73-45.341-101.071-101.071-101.071H96.523c-6.366-19.944-25.068-34.43-47.094-34.43C22.174 17.214 0 39.388 0 66.643s22.174 49.429 49.429 49.429c22.027 0 40.728-14.486 47.095-34.429h314.405c39.188 0 71.071 31.883 71.071 71.072 0 39.188-31.883 71.071-71.071 71.071h-71.071v-68.857H172.143v68.857h-71.072C45.34 223.787 0 269.127 0 324.858s45.34 101.071 101.071 101.071h187.573l-23.083 23.083 21.213 21.213 59.296-59.296-59.296-59.296zM49.429 86.072C38.716 86.072 30 77.356 30 66.643s8.716-19.429 19.429-19.429 19.428 8.716 19.428 19.429-8.715 19.429-19.428 19.429zm152.714 98.857H241v29.144h30v-29.144h38.857v107.714H202.143z"/>
                        </Svg>
                            <Text style={{ color: "rgba(112,112,112, 1)", fontFamily: "Inter-Regular", paddingLeft: 10 }}>1623 Popham Ave Bronx NY 10453</Text>
                    </View>
                   
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    Address: {
        width: "100%",
        height: height,
        // paddingTop: 50,

       
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    InputContainer: {
        width: "100%",
        height: 50,
        marginTop: 5,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Input: {
        width: width - 20,
        height: "100%",
        paddingLeft: 10,
        borderWidth: 0.5,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.2)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
    },
    Scroll: {
    //    width: "195%",
      
    },
    AddressRes: {
        width: width - 20,
        height: 50,
        paddingLeft: 20,

        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: "rgba(112,112,112,0.2)",

        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center"
    }
})

export default Address
