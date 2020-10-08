import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux"
import { Icons } from "../constants/Image";

class Summery extends Component {
    constructor(props) {
        super(props)

    }

    handdleOnPressArrow = () => {
        Actions.Orders()
        this.props.dispatch({ type: "isOrders" })
    }

    render() {
        return (
            <View style={styles.Summery}>
                <View style={styles.Header}>
                    <TouchableHighlight underlayColor="white" style={styles.Touchable} onPress={this.handdleOnPressArrow}>
                        <Image style={styles.Arrow} source={Icons.Arrow} />
                    </TouchableHighlight>
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    <View style={styles.TitleConatiner}>
                        <Text style={styles.Title}>Order Summery</Text>
                    </View>
                    <View style={styles.Main}>
                        <View style={styles.StatusContainer}>
                            <View style={styles.Status}>
                                <View style={styles.CircleShadow}>
                                    <View style={styles.Circle} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={styles.StatusTitle}>Order Placed on July 26</Text>
                                </View>
                            </View>
                            <View style={styles.Dash}>
                                <Text style={styles.DashText}>-</Text>
                                <Text style={styles.DashText}>-</Text>
                                <Text style={styles.DashText}>-</Text>
                                <Text style={styles.DashText}>-</Text>
                                <Text style={styles.DashText}>-</Text>
                                <Text style={styles.DashText}>-</Text>
                                <Text style={styles.DashText}>-</Text>
                            </View>
                            <View style={styles.Status}>
                                <View style={[styles.CircleShadow, { backgroundColor: "rgba(000, 000, 000, 0.04)" }]}>
                                    <View style={[styles.Circle, { backgroundColor: "rgba(000, 000, 000, 0.07)", }]} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={[styles.StatusTitle, { color: "rgba(000, 000, 000, 0.2)" }]}>Order Completed</Text>
                                </View>
                            </View>
                            <View style={styles.OrderDetailsContainer}>
                                <View style={styles.OrderDetails}>
                                    <View style={styles.OrderDetailsTalorAndId} >
                                        <Text style={styles.OrderDetailsTitle}>Tailor</Text>
                                        <Text style={styles.OrderDetailsTitle}>#A:16003503</Text>
                                    </View>
                                    <TouchableHighlight style={styles.Tailor} underlayColor="white" onPress={() => alert()}>
                                        <Text style={styles.OrderDetailsText}>Carlos Morales</Text>
                                    </TouchableHighlight>
                                    <View style={styles.OrderDetailsDescription}>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5 }]}>Schedele</Text>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, color: "rgba(000, 000, 000, 0.6)" }]} >July 26 2021 4:35 pm</Text>
                                    </View>
                                    <TouchableHighlight style={styles.OrderDetailsContacts} underlayColor="white" onPress={() => alert()}>
                                        <Text style={[styles.OrderDetailsTitle, { color: "rgba(43, 169, 123, 1)" }]}>Contact Us</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Summery: {
        flex: 1,
    },
    Header: {
        width: "100%",
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.3)",

    },
    Touchable: {
        width: "100%",
        height: 100,
        paddingLeft: 25,
        paddingBottom: 10,

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start"
    },
    Arrow: {
        width: 25,
        height: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    TitleConatiner: {
        width: "100%",
        height: 100,
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    Scroll: {
        paddingBottom: 100,

    },
    Main: {
        width: "100%",
        height: "100%",


        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    StatusContainer: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    Status: {
        width: "100%",
        height: 50,
        paddingLeft: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    StatusTitleContainer: {
        width: "100%",
        // height: "100%",
        paddingLeft: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    StatusTitle: {
        fontSize: 16,
        color: "rgba(000,000,000,0.6)"
    },
    CircleShadow: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: "rgba(43, 169, 123, 0.1)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Circle: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: "rgba(43, 169, 123, 1)"
    },
    Dash: {
        width: "100%",
        height: 120,
        paddingTop: 10,

        display: "flex",
        justifyContent: "flex-start",
    },
    DashText: {
        width: 75,
        height: 13,
        color: "rgba(000,000,000,0.6)",
        textAlign: "center",
        fontSize: 12,
    },
    OrderDetailsContainer: {
        width: "100%",
        paddingTop: 40,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    OrderDetails: {
        width: "90%",
        // height: 200,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        borderWidth: 0.5,
        borderColor: "rgba(000,000,000,0.2)",
        borderRadius: 10
    },
    OrderDetailsTalorAndId: {
        width: "100%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    OrderDetailsTitle: {
        fontSize: 15,
        color: "rgba(000,000,000,0.5)",
        fontWeight: "600",
    },
    Tailor: {
        width: 130,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: "rgba(43, 169, 123, 0.7)"
    },
    OrderDetailsText: {
        fontSize: 18,
        color: "rgba(43, 169, 123, 1)",
        fontWeight: "600",
    },
    OrderDetailsDescription: {
        width: "90%",
        marginTop: 50,
        // backgroundColor: "red",
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 0.5,
        borderColor: "rgba(000,000,000,0.2)",
    },
    OrderDetailsContacts: {
        width: "100%",
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,

        display: "flex",
        alignItems: "center"
    }
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Summery)