import React, { Component, lazy, Suspense } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { connect } from "react-redux"
import { Actions } from 'react-native-router-flux'
import io from "socket.io-client"
import AsyncStorage from "@react-native-community/async-storage"

// compoents
import Footer from "../components/Footer"
import { log, or } from 'react-native-reanimated'

const { width } = Dimensions.get("screen")

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            items: ["All", "Completed", "Requested", "Canceled"],
            Filter: {
                isAll: true,
                isCompleted: false,
                isRequested: false,
                isCanceled: false,
                bgColor: ""
            },
            filterTitle: "requested"
        }
        this.socket = io("https://alteration-database.herokuapp.com/")
    }

    formatDate = (date) => {
        let dateArray = date.split("-")
        let monthsArray = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
        let monthIndex = dateArray[1] > 9 ? dateArray[1] : dateArray[1][1]

        let month = monthsArray[(parseInt(monthIndex)) - 1]
        let day = dateArray[2]
        let year = dateArray[0]

        let result = `${month} ${day} ${year}`
        return result
    }

    fetchAppointment = async () => {
       const userId = await AsyncStorage.getItem("userId")
        this.socket.emit("userId", userId)
        this.socket.on("appointment", (res) => {
           let date = []

            res.forEach(item => {
                date.push(this.formatDate(item.date))
            })

            this.setState({
                appointments: res,
            })
        })
    }

    handleOnPress = (id) => {
        Actions.reset("_Summery")
        this.props.dispatch({ type: "summey", payload: Object.assign({}, id) })
        
    }

    handleOnPressEmpty = () => {
        Actions.reset("_Alteration")
        this.props.dispatch({ type: "isAlteration" })
    }

    componentDidMount() {
        this.fetchAppointment()
        this.props.dispatch({ type: "isOrders" })
        this.formatDate("2020-11-11")
    }

    render() {
        return (
            <View style={styles.Appointments}>
                <View style={styles.TitleBox}>
                    <Text style={{ fontSize: 30, color: "#000000", fontWeight: "bold", fontFamily: "Inter-Regular" }}>My Orders</Text>
                </View>
                { !this.state.appointments.length == 0 ?
                    <ScrollView contentContainerStyle={styles.Scroll}>
                        {this.state.appointments.map((appointment, i) => (
                            <TouchableHighlight underlayColor="white" key={i} style={styles.Orders} onPress={() => this.handleOnPress(appointment)}>
                                <View style={styles.DetailsBox}>
                                    <View style={styles.Top}>
                                        <Text style={{ fontSize: 20, color: "#000000", fontWeight: "bold", fontFamily: "Inter-Regular", textTransform: "capitalize" }}>{appointment.fullName}</Text>
                                        <Text style={{ paddingRight: 10, fontFamily: "Inter-Regular" }}>{`#${appointment.appointmentId.slice(0, 10)}`}</Text>
                                    </View>
                                    <View style={styles.Bottom}>
                                        <View style={styles.BottomLeft}>
                                            <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)" }}>Tailor</Text>
                                            <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.7)", paddingTop: 5, fontFamily: "Inter-Regular", textTransform: "capitalize", fontWeight: "bold" }}>{appointment.tailor}</Text>
                                        </View>
                                        <View style={styles.BottomRight}>
                                            <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)", fontFamily: "Inter-Regular", }}>Schedule</Text>
                                            <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.8)", fontFamily: "Inter-Regular", paddingTop: 5 }}>{`${this.formatDate(appointment.date)} ${appointment.time}`}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </ScrollView> :
                    <View style={styles.Empty}>
                        <Text style={{ fontSize: 18, color: "rgba(000,000,000,0.8)", fontFamily: "Inter-Regular", paddingTop: 5 }}>You do not have order yet</Text>
                        <Text style={{ fontSize: 18, color: "rgba(000,000,000,0.8)", fontFamily: "Inter-Regular", paddingTop: 5, color: "rgba(43, 169, 123, 1)", textDecorationLine: "underline" }}>Would you like to play a new order?</Text>
                        <TouchableHighlight style={styles.TouchableTailor} underlayColor="#f6f6f6" onPress={() => this.handleOnPressEmpty()}>
                            <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 20, textTransform: "uppercase" }]}>{"Get a Tailors"}</Text>
                        </TouchableHighlight>
                    </View>
                }
                <Footer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Appointments: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    TitleBox: {
        width: "100%",
        height: 100,
        paddingTop: 60,
        paddingLeft: 25,

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
        width: 80,
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
        width: width - 30,
        height: 125,
        paddingLeft: 15,
        marginTop: 20,
        paddingTop: 15,


        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.3)",

        shadowColor: "#000",
        elevation: 3,
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
    },
    Empty: {
        width: "100%",
        height: "60%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    TouchableTailor: {
        width: 300,
        height: 60,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: "white",
        borderWidth: Platform.OS == "android" ? 0.6 : 0.2,
        borderColor: "rgba(000,000,000,0.2)",



        shadowColor: "#000",
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Orders)

