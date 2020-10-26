import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Icons } from "../constants/Image"
import axios from "axios"
import { connect } from "react-redux"

import Header from "./Header"


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            formatedPhone: '',
            isEmailOn: false,
            isPasswordOn: false,
        }
    }

    fetchUsers = async () => {
        await axios.get("https://alteration-database.herokuapp.com/users").then((users) => {
            this.setState({
                users: users.data
            })
        })
    }

    createUsers = async () => {
        const { fullName, email, password, phone } = this.state
        // await axios.post("http://localhost:3000/users", {
        await axios.post("https://alteration-database.herokuapp.com/users", {
            "fullName": fullName,
            "email": email,
            "password": password,
            "phone": phone

        }).then((User) => {
            if (!User.data.error) {
                this.setState({
                    email: "",
                    password: ""
                })

            }
        }).catch(err => console.log(err))

    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleEmailOnChange = (value) => {
        this.setState({
            isEmailOn: this.validateEmail(value) ? true : false,
            // isEmailOn: value.length > 5 ? true : false,
            textFieldValues: {
                email: value
            }
        })
    }

    handlePasswordOnChange = (value) => {
        this.setState({
            isPasswordOn: value.length > 5 ? true : false,
            password: value
        })
    }

    handleOnClick = () => {
        // console.log(this.state)
    }

    toRegister = () => {
        this.props.dispatch({ type: "isLogOut" })
    }

    componentDidMount = () => {
        this.fetchUsers()
    }

    render() {
        const { isEmailOn, isPasswordOn } = this.state
        return (
            <View style={styles.Login}>
                {/* <Header isHidden={true} /> */}
                <View style={styles.Register}>
                    <View style={styles.FormTitle}>
                        <Text style={[styles.IconsOptionText, { color: "black", fontFamily: "Inter-Regular", fontSize: 30, fontWeight: "bold" }]}>Login</Text>
                    </View>
                    <View style={styles.Form}>
                        <View style={[styles.InputContainer]}>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isEmailOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.Email} />
                                <TextInput placeholderTextColor="#747374" style={styles.Input} keyboardType="email-address" placeholder="Email" onChangeText={(value) => this.handleEmailOnChange(value)} />
                            </View>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isPasswordOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.Password} />
                                <TextInput placeholderTextColor="#747374" secureTextEntry style={styles.Input} placeholder="Password" onChangeText={(e, value) => this.handlePasswordOnChange(value)} />
                            </View>
                        </View>
                        <TouchableHighlight style={styles.Touchable} underlayColor="#2ba97a" onPress={this.createUsers}>
                            <Text style={[styles.IconsOptionText, { color: "white", fontFamily: "Inter-Regular", fontSize: 20, fontWeight: "600" }]}>Log In</Text>
                        </TouchableHighlight>
                        <View style={styles.toLogin}>
                            <View style={{}}>
                                <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 16 }]}>Do not have an account yet?</Text>
                            </View>
                            <TouchableHighlight underlayColor="white" style={styles.Links} onPress={this.toRegister}>
                                <Text style={[styles.IconsOptionText, { color: "#2ba97a", fontFamily: "Inter-Regular", fontSize: 16, paddingLeft: 5 }]}>Sign Up</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Login: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Register: {
        width: "100%",
        height: "100%",
        marginBottom: 100,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    FormTitle: {
        width: "100%",
        height: 100,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    InputContainer: {
        width: "100%",
    },
    Form: {
        width: "100%",
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 20,
        // backgroundColor: "pink",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    InputContainerBox: {
        height: 60,
        paddingLeft: 25,
        marginBottom: 20,
        borderRadius: 5,

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    InputImage: {
        width: 25,
        height: 25
    },
    Input: {
        width: "70%",
        height: 50,
        paddingLeft: 10,
        marginLeft: 5,
        borderRadius: 5,

        borderColor: "rgba(000,000,000,0.3)",
    },
    FotgotPass: {
        width: "90%",
        height: 50,
        paddingLeft: 10,
    },
    Touchable: {
        width: "90%",
        height: 60,
        borderRadius: 5,
        marginBottom: 30,
        marginTop: 15,
        backgroundColor: "#2ba97a",


        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    toLogin: {
        width: "90%",

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

export default connect(mapStateToProps)(Register)
