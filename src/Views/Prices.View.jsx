import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, ScrollView, Dimensions } from 'react-native'
import { connect } from "react-redux"

// compoents
import Footer from "../components//Footer"

const { width } = Dimensions.get("screen")

class Prices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["Jackets", "Pants", 0 ,0 ,0,0 ,0 ,0,0 ,0 ,0]
        }
    }
   
    handleFilter = (e, filter) => {
        e.stopPropagation()
        this.props.dispatch({ type: filter })
    }

    isFilter = (filter) => {
        const isTrue = {
            backgroundColor: "rgb(163, 119, 102)"
        }
        return filter ? isTrue : {borderWidth: 0.5, borderColor: "rgba(000,000,000,0.3)" }
    }
    
    isFilterText = (filter) => {
        const isTrue = {
            color: "white",

        }
        return filter ? isTrue : { color: "rgba(000,000,000,0.3)"}
    }

    render() {
        const { isJacket, isPants } = this.props.state
        return (
            <View style={styles.Appointments}>
                <View style={styles.PriceTitleContainer}>
                    <Text style={styles.PriceTitleText}>Prices</Text>
                </View>
                <View style={styles.Filter}>
                    <TouchableHighlight underlayColor="#ac8a7d"  style={[styles.FilterButtoms, this.isFilter(isJacket)]} onPress={(e) => this.handleFilter(e, "isJacket")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isJacket)]}>{"Jackets"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#ac8a7d"  style={[styles.FilterButtoms, this.isFilter(isPants)]} onPress={(e) => this.handleFilter(e, "isPants")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isPants)]}>{"Pants"}</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    {this.state.items.map((items, i) => (
                        <View key={i} style={styles.Orders}>
                            <View style={styles.DetailsBox}>
                                <Text style={{ fontSize: 20, color: "#000000", fontWeight: "bold" }}>Sleeves</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Footer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Appointments: {
        flex: 1,
        backgroundColor: "white",

    },
    PriceTitleContainer: {
        width: "100%",
        height: 100,
        paddingTop: 60,
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    PriceTitleText: {
        fontSize: 30,
        color: "#000000",
        fontWeight: "bold"
    },
    Filter: {
        width: "100%",
        height: 50,
        padding: 20,
        marginTop: 20,
        marginBottom: 5,
        // borderWidth: 0.5,


        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },
    FilterButtoms: {
        width: 120,
        height: 40,
        borderRadius: 18,
        marginRight: 20,


        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    FilterButtomsText: {
        width: 125,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 13

    },
    Scroll: {
        width,
        paddingBottom: 125,
        marginTop: 30,

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    Orders: {
        width: 180,
        height: 90,
        paddingLeft: 15,
        marginTop: 15,
        paddingTop: 10,


        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.3)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    DetailsBox: {
        width: "100%",
        height: 70,

    }
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Prices)