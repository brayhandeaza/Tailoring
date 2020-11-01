import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Linking, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux"
import { Icons } from "../constants/Image";
import axios from "axios"
import { Dialog, ConfirmDialog, } from 'react-native-simple-dialogs';

class Summery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: [],
            isOrderCompleted: false,
            tailor: '',
            date: '',
            details: '',
            time: '',
            orderId: null
        }
    }

    handleOrderStatus = async () => {
        const { id } = this.props.state.Orders.orderId
        await axios.get(`https://alteration-database.herokuapp.com/appointments/status/${id}`).then((res) => {
            let data = res.data.appointmentsStatus
            this.setState({
                status: data,
                isOrderCompleted: data[data.length -1].isCompleted ? true : false
            })
        })
    }

    handleDeleteCancelOrder = async (id) => {
        await axios.delete(`https://alteration-database.herokuapp.com/appointments/${id}`).then((res) => {
            this.setState({
                dialogVisible: false
            })
            this.handdleOnPressArrow()
        }).catch(() => {
            alert("Sorry something went wrong!!")
        })
    }

    formatDate = (date) => {
        let dateArray = date.split("-")
        let monthsArray = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "June", "July", "Aug.", "Sept.", "Oct.", "Nov", "Dec."]
        let monthIndex = dateArray[1] > 9 ? dateArray[1] : dateArray[1][1]

        let month = monthsArray[(parseInt(monthIndex)) - 1]
        let day = dateArray[2]
        let year = dateArray[0]

        let result = `${month} ${day} ${year}`

        return result
    }

    handdleOnPressArrow = () => {
        Actions.reset("_Orders")
        this.props.dispatch({ type: "isOrders", payload: null })
        this.props.dispatch({ type: "", payload: null })
    }

    handleAppoinments = () => {
        const { tailor, date, details, time, id } = this.props.state.Orders.orderId
        this.setState({
            tailor: tailor,
            date: this.formatDate(date),
            details: details,
            time: time,
            orderId: id,
            dialogVisible: false
        })
    }

    componentDidMount() {
        this.handleAppoinments()
        this.handleOrderStatus()
    }

    render() {
        const { tailor, date, details, time, orderId, status, isOrderCompleted } = this.state
        return (
            <View style={styles.Summery}>
                <View style={styles.Header}>
                    <TouchableHighlight underlayColor="white" style={styles.Touchable} onPress={this.handdleOnPressArrow}>
                        <Image style={styles.Arrow} source={Icons.Arrow} />
                    </TouchableHighlight>
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    <View style={styles.TitleConatiner}>
                        <Text style={[styles.Title, { fontFamily: "Inter-Regular" }]}>Order Summery</Text>
                    </View>
                    <View style={styles.Main}>
                        <View style={styles.StatusContainer}>
                            {/*  */}
                            <View style={styles.Status}>
                                <View style={styles.CircleShadow}>
                                    <View style={styles.Circle} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={[styles.StatusTitle, { fontFamily: "Inter-Regular" }]}>{"Order Placed on July 26"}</Text>
                                </View>
                            </View>
                            <View style={styles.Dash}>
                                <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>

                            </View>
                            {status.map((status, key) => (
                                <View key={key}>
                                    <View style={styles.Status}>
                                        <View style={[styles.CircleShadow]}>
                                            <View style={[styles.Circle]} />
                                        </View>
                                        <View style={styles.StatusTitleContainer}>
                                            <Text style={[styles.StatusTitle, { fontFamily: "Inter-Regular" }]}>{status.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.Dash}>
                                        <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                        <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                        <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                        <Text style={[styles.DashText, { fontFamily: "Inter-Regular" }]}>-</Text>
                                    </View>
                                </View>

                            ))}
                            <View style={styles.Status}>
                                <View style={[styles.CircleShadow, {  backgroundColor: isOrderCompleted ? "rgba(43, 169, 123, 0.1)" : "rgba(000, 000, 000, 0.04)" }]}>
                                    <View style={[styles.Circle, { backgroundColor: isOrderCompleted ? "rgba(43, 169, 123, 1)" : "rgba(000, 000, 000, 0.07)", }]} />
                                </View>
                                <View style={styles.StatusTitleContainer}>
                                    <Text style={[styles.StatusTitle, { color: isOrderCompleted ? "rgba(000,000,000,0.6)" : "rgba(000, 000, 000, 0.2)", fontFamily: "Inter-Regular" }]}>{isOrderCompleted ? "Order Completed" : "Order is not Completed"}</Text>
                                </View>
                            </View>
                            <View style={styles.OrderDetailsContainer}>
                                <View style={styles.OrderDetails}>
                                    <View style={styles.OrderDetailsTalorAndId} >
                                        <Text style={[styles.OrderDetailsTitle, { fontFamily: "Inter-Regular" }]}>Tailor</Text>
                                        <Text style={[styles.OrderDetailsTitle, { fontFamily: "Inter-Regular" }]}>#A:16003503</Text>
                                    </View>
                                    <TouchableHighlight style={styles.Tailor} underlayColor="white" onPress={() => alert()}>
                                        <Text style={[styles.OrderDetailsText, { fontFamily: "Inter-Regular" }]}>{tailor}</Text>
                                    </TouchableHighlight>
                                    <View style={styles.OrderDetailsDescription}>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, fontFamily: "Inter-Regular", color: "rgba(43, 169, 123, 1)" }]}>Schedele</Text>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, color: "rgba(000, 000, 000, 0.6)", fontFamily: "Inter-Regular" }]}>{`${date}, ${time}`}</Text>
                                    </View>
                                    <View style={[styles.OrderDetailsDescription, { borderColor: "white", marginTop: 0 }]}>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, fontWeight: "bold", fontFamily: "Inter-Regular", color: "rgba(43, 169, 123, 1)", }]}>Details</Text>
                                        <Text style={[styles.OrderDetailsTitle, { marginBottom: 5, color: "rgba(000, 000, 000, 0.6)", fontFamily: "Inter-Regular" }]}>{details}</Text>
                                    </View>
                                    <TouchableHighlight style={styles.OrderDetailsContacts} underlayColor="white" onPress={() => Linking.openURL("tel:6469827293")}>
                                        <Text style={[styles.OrderDetailsTitle, { color: "rgba(43, 169, 123, 1)", fontFamily: "Inter-Regular" }]}>Contact Us</Text>
                                    </TouchableHighlight>
                                </View>
                                <TouchableHighlight style={styles.OrderDetailsContacts} underlayColor="white" onPress={() => this.setState({ dialogVisible: true })}>
                                    <Text style={[styles.OrderDetailsTitle, { color: "red", fontFamily: "Inter-Regular" }]}>Cancel Order</Text>
                                </TouchableHighlight>
                                <ConfirmDialog title="Are you sure you want o cancel this order?" visible={this.state.dialogVisible} onTouchOutside={() => this.setState({ dialogVisible: false })}
                                    positiveButton={{ title: "Yes", onPress: () => this.handleDeleteCancelOrder(orderId) }} negativeButton={{ title: "No", onPress: () => this.setState({ dialogVisible: false }) }} >
                                </ConfirmDialog>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
// {fontSize: 30, color: "#000000", fontWeight: "bold", fontFamily: "Inter-Regular"}
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
        color: "rgba(000,000,000,0.6)",
        textTransform: "capitalize"
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
        height: 75,
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
        marginBottom: 10,

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
        paddingTop: 5,
        paddingBottom: 5,

    },
    OrderDetailsText: {
        fontSize: 18,
        color: "rgba(43, 169, 123, 1)",
        fontWeight: "600",
        textTransform: "capitalize",
        textDecorationLine: "underline"
    },
    OrderDetailsDescription: {
        width: "90%",
        marginTop: 50,
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 0.5,
        borderColor: "rgba(000,000,000,0.2)",
    },
    OrderDetailsContacts: {
        width: "100%",
        paddingTop: 20,
        paddingBottom: 30,

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