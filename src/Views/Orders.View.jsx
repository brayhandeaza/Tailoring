import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { connect } from "react-redux"
import { Item, Icons } from "../constants/Image"
import axios from "axios"

// compoents
import Footer from "../components/Footer"

const { width } = Dimensions.get("screen")

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            items: ["All","Completed", "Requested", "Canceled"],
            Filter: {
                isAll: true,
                isCompleted: false,
                isRequested: false,
                isCanceled: false,
                bgColor: ""
            },
            filterTitle: "requested"
        }
    }

    fetchAppointments = async () => {
        await axios.get(`https://alteration-database.herokuapp.com/appointments/users/${1}`).then((res) => {
            console.log(res.data.Appointments);
            this.setState({
                appointments: res.data.Appointments.filter(appointment => appointment.status == this.state.filterTitle)
            })
        })
    }

    componentDidMount() {
        this.fetchAppointments()
    }

    render() {
        const { isCompleted, isRequested, isCanceled, } = this.props.state.Filters
        return (
            <View style={styles.Appointments}>
                <View style={styles.TitleBox}>
                    <Text style={{ fontSize: 30, color: "#000000", fontWeight: "bold" }}>My Orders</Text>
                </View>
                <ScrollView contentContainerStyle={styles.Scroll}>
                    {this.state.appointments.map((appointment, i) => (
                        <TouchableHighlight underlayColor="white" key={i} style={styles.Orders} onPress={() => alert(appointment.fullName)} >
                            <View style={styles.DetailsBox}>
                                <View style={styles.Top}>
                                    <Text style={{ fontSize: 20, color: "#000000", fontWeight: "bold", textTransform: "capitalize" }}>{appointment.fullName}</Text>
                                    <Text style={{ paddingRight: 10 }}>{`#${appointment.appointmentId.slice(0, 10)}`}</Text>
                                </View>
                                <View style={styles.Bottom}>
                                    <View style={styles.BottomLeft}>
                                        <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)" }}>Tailor</Text>
                                        <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.7)", paddingTop: 5, textTransform: "capitalize", fontWeight: "bold" }}>Brayhan de Aza</Text>
                                    </View>
                                    <View style={styles.BottomRight}>
                                        <Text style={{ fontSize: 15, color: "rgba(112,112,112,1)" }}>Schedule</Text>
                                        <Text style={{ fontSize: 15, color: "rgba(000,000,000,0.8)", paddingTop: 5 }}>{`${appointment.date} ${appointment.time}`}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
                </ScrollView>
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

