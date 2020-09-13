import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, ScrollView } from 'react-native'
import { Icons } from "../constants/Image"
import axios from "axios"


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    }

    fetchUsers = async () => {
        await axios.get("http://localhost:3000/users").then((users) => {
            this.setState({
                users: users.data
            })
        })
        console.log(this.state.users)
    }

    createUsers = async () => {
        const {fullName, email, password, phone} = this.state
        await axios.post("http://localhost:3000/users", {
            fullName,
            email,
            password,
            phone
        }).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    handleFullNameOnChange = (value) => {
        this.setState({
            fullName: value
        })
    }
    handleEmailOnChange = (value) => {
        this.setState({
            email: value
        })
    }
    handlePhoneOnChange = (value) => {
        this.setState({
            phone: value
        })
    }
    handlePasswordOnChange = (value) => {
        this.setState({
            password: value
        })
    }
    handleConfirmPasswordOnChange = (value) => {
        this.setState({
            confirmPassword: value
        })
    }


    handleOnClick = () => {
        console.log(this.state)
    }
    componentDidMount() {
        this.fetchUsers()
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.Scroll}>
                <View style={styles.Register}>
                    <View style={styles.FormTitle}>
                        <Text style={[styles.IconsOptionText, { color: "black", fontSize: 28, fontWeight: "bold" }]}>Create Account</Text>
                        <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", textAlign: "center" }]}>Create a new account</Text>
                    </View>
                    <View style={styles.InputContainer}>
                        <View style={styles.InputContainerBox}>
                            <Image style={styles.InputImage} source={Icons.Login.User} />
                            <TextInput placeholderTextColor="#747374" style={styles.Input} placeholder="Full Name" onChangeText={(value) => this.handleFullNameOnChange(value)}/>
                        </View>
                        <View style={styles.InputContainerBox}>
                            <Image style={styles.InputImage} source={Icons.Login.Email} />
                            <TextInput placeholderTextColor="#747374" style={styles.Input} keyboardType="email-address" placeholder="Email" onChangeText={(value) => this.handleEmailOnChange(value)}/>
                        </View>
                        <View style={styles.InputContainerBox}>
                            <Image style={styles.InputImage} source={Icons.Login.Phone} />
                            <TextInput placeholderTextColor="#747374" style={styles.Input} keyboardType="phone-pad" placeholder="Phone" onChangeText={(value) => this.handlePhoneOnChange(value)}/>
                        </View>
                        <View style={styles.InputContainerBox}>
                            <Image style={styles.InputImage} source={Icons.Login.Password} />
                            <TextInput placeholderTextColor="#747374" secureTextEntry style={styles.Input} placeholder="Password" onChangeText={(value) => this.handlePasswordOnChange(value)}/>
                        </View>
                        <View style={styles.InputContainerBox}>
                            <Image style={styles.InputImage} source={Icons.Login.Password} />
                            <TextInput placeholderTextColor="#747374" secureTextEntry style={styles.Input} placeholder="Confirm Password"  onChangeText={(value) => this.handleConfirmPasswordOnChange(value)}/>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.Touchable} underlayColor="#2ba97a" onPress={this.createUsers}>
                        <Text style={[styles.IconsOptionText, { color: "white", fontSize: 20, fontWeight: "600" }]}>Create An Account</Text>
                    </TouchableHighlight>
                    <View style={styles.toLogin}>
                        <View style={{}}>
                            <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 16 }]}>Already register?</Text>
                        </View>
                        <TouchableHighlight underlayColor="white" style={styles.Links} onPress={() => alert()}>
                            <Text style={[styles.IconsOptionText, { color: "#2ba97a", fontSize: 16, paddingLeft: 5 }]}>Log In</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Scroll: {
        paddingBottom: 360
    },
    Register: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",

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
    InputContainerBox: {
        height: 60,

        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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

export default Register