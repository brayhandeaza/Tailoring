import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Icons } from "../constants/Image"
import axios from "axios"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux"

// Components
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
            isPhoneOn: false,
            isEmailOn: false,
            isFullNameOn: false,
            isPasswordComfirmOn: false,
            isPasswordOn: false
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
                    fullName: "",
                    email: "",
                    password: "",
                    phone: ""
                })
            }
        }).catch(err => console.log(err))
    }

    handleFullNameOnChange = (value) => {
        this.setState({
            isFullNameOn: value.length > 1 ? true : false,
            textFieldValues: {
                fullName: value
            }
        })
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleEmailOnChange = (value) => {
        this.setState({
            isEmailOn: this.validateEmail(value) ? true : false,
            textFieldValues: {
                email: value
            }
        })
    }

    handlePhoneOnChange = (value) => {
        this.setState({
            isPhoneOn: value.length > 13 ? true : false,
            phone: value,
        })
    }

    handlePasswordOnChange = (value) => {
        this.setState({
            isPasswordOn: value.length > 5 ? true : false,
            password: value
        })
    }

    handlePasswordComfirmOnChange = (value) => {
        this.setState({
            isPasswordComfirmOn: this.state.isPasswordComfirmOn === value ? true : false,
            password: value
        })
    }

    toLogin = () => {
        this.props.dispatch({ type: "isLogIn" })
    }

    render() {
        const { isPhoneOn, isEmailOn, isFullNameOn, isPasswordOn, isPasswordComfirmOn } = this.state
        return (
            <KeyboardAwareScrollView style={styles.Scroll} showsVerticalScrollIndicator={false}>
                <Header isHidden={true} />
                <View style={styles.Register}>
                    <View style={styles.FormTitle}>
                        <Text style={[styles.IconsOptionText, { color: "black", fontFamily: "Inter-Regular", fontSize: 28, fontWeight: "bold" }]}>Create Account</Text>
                        <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontFamily: "Inter-Regular", textAlign: "center" }]}>Create a new account</Text>
                    </View>
                    <View style={styles.Form}>
                        <View style={styles.InputContainer}>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isFullNameOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.User} />
                                <TextInput placeholderTextColor="#747374" style={styles.Input} placeholder="Full Name" onChangeText={(value) => this.handleFullNameOnChange(value)} />
                            </View>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isEmailOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.Email} />
                                <TextInput placeholderTextColor="#747374" style={styles.Input} keyboardType="email-address" placeholder="Email" onChangeText={(value) => this.handleEmailOnChange(value)} />
                            </View>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isPhoneOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.Phone} />
                                <TextInput placeholderTextColor="#747374" style={styles.Input} keyboardType="number-pad" maxLength={14} placeholder="Phone" value={this.state.phone.replace(/^(\d{3})(\d{3})(\d)+$/, "($1) $2-$3")} onChangeText={(value) => this.handlePhoneOnChange(value)} />
                            </View>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isPasswordOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.Password} />
                                <TextInput placeholderTextColor="#747374" secureTextEntry style={styles.Input} placeholder="Password" onChangeText={(value) => this.handlePasswordOnChange(value)} />
                            </View>
                            <View style={[styles.InputContainerBox, { borderWidth: 1, borderColor: isPasswordComfirmOn ? "#54b77c" : "white" }]}>
                                <Image style={styles.InputImage} source={Icons.Login.Password} />
                                <TextInput placeholderTextColor="#747374" secureTextEntry style={styles.Input} placeholder="Confirm Password" onChangeText={(value) => this.handlePasswordComfirmOnChange(value)} />
                            </View>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.Touchable} underlayColor="#2ba97a" onPress={this.createUsers}>
                        <Text style={[styles.IconsOptionText, { color: "white", fontFamily: "Inter-Regular", fontSize: 20, fontWeight: "600" }]}>Create An Account</Text>
                    </TouchableHighlight>
                    <View style={styles.toLogin}>
                        <View style={{}}>
                            <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 16 }]}>Already register?</Text>
                        </View>
                        <TouchableHighlight underlayColor="white" style={styles.Links} onPress={this.toLogin}>
                            <Text style={[styles.IconsOptionText, { color: "#2ba97a", fontFamily: "Inter-Regular", fontSize: 16, paddingLeft: 5 }]}>Log In</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Scroll: {
        width: "100%",
        height: "100%"
    },
    Register: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    LogoContainer: {
        width: "100%",
        height: "40%",
        paddingBottom: 10,

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    Logo: {
        width: 160,
        height: 160,
    },
    FormTitle: {
        marginTop: 20,
        marginBottom: 40,
    },
    InputContainer: {
        width: "100%",


        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Form: {
        width: "100%",
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 20,
    },
    InputContainerBox: {
        width: "90%",
        height: 60,
        paddingLeft: 10,
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