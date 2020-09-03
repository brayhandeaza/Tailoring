import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { connect } from "react-redux"
import { Item, Icons } from "../constants/Image"

const { width } = Dimensions.get("screen")

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["Completed", "Requested", "Canceled"],
            Filter: {
                isCompleted: true,
                isRequested: false,
                isCanceled: false,
                bgColor: ""
            }
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
        return filter ? isTrue : { borderWidth: 0.5, borderColor: "rgba(000,000,000,0.3)" }
    }
    isFilterText = (filter) => {
        const isTrue = {
            color: "white",

        }
        return filter ? isTrue : { color: "rgba(000,000,000,0.3)" }
    }
    render() {
        const { isCompleted, isRequested, isCanceled } = this.props.state
        return (
            <View style={styles.Appointments}>
                <View style={styles.TitleBox}>
                    <Text style={{ fontSize: 30, color: "#000000", fontWeight: "bold" }}>My Orders</Text>
                </View>
                <View style={styles.Filter}>
                    <TouchableHighlight underlayColor="#5e4941" style={[styles.FilterButtoms, this.isFilter(isRequested)]} onPress={(e) => this.handleFilter(e, "isRequested")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isRequested)]}>{"Requested"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#5e4941" style={[styles.FilterButtoms, this.isFilter(isCompleted)]} onPress={(e) => this.handleFilter(e, "isCompleted")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isCompleted)]}>{"Completed"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#5e4941" style={[styles.FilterButtoms, this.isFilter(isCanceled)]} onPress={(e) => this.handleFilter(e, "isCanceled")}>
                        <Text style={[styles.FilterButtomsText, this.isFilterText(isCanceled)]}>{"Canceled"}</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    {this.state.items.map((items, i) => (
                        <View key={i} style={styles.Orders}>
                            <View style={styles.DetailsBox}>
                                <View style={styles.Top}>
                                    <Text style={{ fontSize: 20, color: "#000000", fontWeight: "bold" }}>Brayhan De Aza</Text>
                                    <Text style={{}}>#39798787</Text>
                                </View>
                                <View style={styles.Bottom}>
                                    <View style={styles.BottomLeft}>
                                        <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)" }}>Tailor</Text>
                                        <Text style={{ fontSize: 18, color: "rgba(000,000,000,0.8)", paddingTop: 5 }}>Rosa Polanco</Text>
                                    </View>
                                    <View style={styles.BottomRight}>
                                        <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)" }}>Schedule</Text>
                                        <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.8)", paddingTop: 5 }}>July 26, 2020 | 11 am</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Appointments: {
        flex: 1,
        backgroundColor: "white",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    TitleBox: {
        width: "100%",
        height: 100,
        paddingTop: 60,
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    Filter: {
        width: "100%",
        height: 50,
        padding: 20,
        marginTop: 20,
        marginBottom: 5,



        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    FilterButtoms: {
        width: 115,
        height: 40,
        borderRadius: 18,
        margin: 5,


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
        justifyContent: "center",
        alignItems: "center"
    },
    Orders: {
        width: width - 50,
        height: 125,
        paddingLeft: 15,
        marginTop: 20,
        paddingTop: 15,


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
    },
    DetailsBox: {
        width: "100%",
        height: 80,

    },
    Top: {
        paddingRight: 15,
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    Bottom: {
        width: "100%",
        marginTop: 25,

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    BottomLeft: {
        padding: 0,
        margin: 0,
        paddingRight: 20,

        borderRightWidth: 2,
        borderColor: "rgba(112,112,112,0.3)",

        display: "flex",
        justifyContent: "center",

    },
    BottomRight: {
        height: 40,
        paddingLeft: 20,

    },
    Status: {
        width: "100%",
        height: 50,

    },
    Touchable: {
        width: 100,
        height: 40,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.4)",

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

export default connect(mapStateToProps)(Orders)

