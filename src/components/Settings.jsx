import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, ScrollView, Dimensions } from 'react-native'
import { Icons, Img } from '../constants/Image'

// redux
import { connect } from "react-redux"


class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["First Name", "Last Name", "Age"],
            isFirstName: false,
            isLastName: false,
            isAge: false,
            inputValue: {
                fName: "First Name",
                lName: "Last Name",
                age: "Age",
            },
            isUpdate: false,
            InputEditable: {
                fName: false,
                lName: false,
                age: false
            },
            inputColor: "rgba(000,000,000,0.3)",
        }
    }

    handleTitleOnPress = async (e, view) => {
        const { fName, lName, age } = this.state.InputEditable
        switch (view) {
            case "isFirstName":
                this.setState({
                    InputEditable: {
                        fName: true,
                        lName,
                        age
                    },
                    inputColor: "rgba(0, 128, 0, 0.637)",
                })
                break;
            case "isLastName":
                this.setState({
                    InputEditable: {
                        fName,
                        lName: true,
                        age
                    },
                    inputColor: "rgba(0, 128, 0, 0.637)"
                })

                break;
            case "isAge":
                this.setState({
                    InputEditable: {
                        fName,
                        lName,
                        age: true
                    },
                    inputColor: "rgba(0, 128, 0, 0.637)"
                })
                break;
        }
    }

    handleFistNameOnChange = (values) => {
        const { fName } = this.state.InputEditable
        this.setState({
            isUpdate: false,
            inputValue: {
                fName: values,
                lName: this.state.inputValue.lName,
                age: this.state.inputValue.age
            },
            inputColor: values == "" ? "rgba(255, 0, 0, 0.671)" : fName ? "rgba(0, 128, 0, 0.637)" : "rgba(000,000,000,0.3)"
        })
    }
    handleLastNameOnChange = (values) => {
        const { lName } = this.state.InputEditable
        this.setState({
            isUpdate: false,
            inputValue: {
                fName: this.state.inputValue.fName,
                lName: values,
                age: this.state.inputValue.age
            },
            inputColor: values == "" ? "rgba(255, 0, 0, 0.671)" : lName ? "rgba(0, 128, 0, 0.637)" : "rgba(000,000,000,0.3)"
        })
    }
    handleAgeNameOnChange = (values) => {
        const { age } = this.state.InputEditable
        this.setState({
            isUpdate: false,
            inputValue: {
                fName: this.state.inputValue.fName,
                lName: this.state.inputValue.lName,
                age: values
            },
            inputColor: values == "" ? "rgba(255, 0, 0, 0.671)" : age ? "rgba(0, 128, 0, 0.637)" : "rgba(000,000,000,0.3)"
        })
    }

    handleUpdateOnPress = () => {
        this.setState({
            isUpdate: true,
            isInputEditable: true,
            InputEditable: {
                fName: false,
                lName: false,
                age: false
            }
        })
    }

    render() {

        return (
            <View style={styles.Settings}>
                <View style={styles.SettingsHeaderContainer}>
                    <View style={[styles.SettingsHeaderContainerImgBox]}>
                        <Image style={[styles.SettingsHeaderContainerGift]} source={Icons.Gift} />
                    </View>
                    <View style={[styles.SettingsHeaderContainerImgBox, { width: 200, backgroundColor: "white" }]}>
                        <Text style={styles.SettingsHeaderText}>Hello, Brayhan</Text>
                    </View>
                    <View style={[styles.SettingsHeaderContainerImgBox, { backgroundColor: "white" }]}></View>
                </View>
                <View style={styles.SettingsPictureContainer}>
                    <View style={styles.SettingsPictureImgBox}>
                        <Image style={styles.SettingsPicture} source={Img.Avatar} />
                    </View>
                </View>
                <View style={styles.Form}>
                    <View style={[styles.ProfileTitlesBox, { borderColor: this.state.inputColor }]}>
                        <TouchableHighlight style={styles.InputBox} onPress={() => true}>
                            <TextInput editable={this.state.InputEditable.fName} style={[styles.Input, { color: this.state.InputEditable.fName ? "rgba(0, 128, 0, 0.637)" : "rgba(000,000,000, 0.6)" }]} value={this.state.inputValue.fName} onChangeText={(value) => this.handleFistNameOnChange(value)} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="white" onPress={(e) => this.handleTitleOnPress(e, "isFirstName")}>
                            <Image style={{ width: 30, height: 30 }} source={Icons.Edit} />
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.ProfileTitlesBox, { borderColor: this.state.InputEditable.lName ? "green" : "rgba(000,000,000,0.3)" }]}>
                        <TouchableHighlight style={styles.InputBox}>
                            <TextInput editable={this.state.InputEditable.fName} style={[styles.Input, { color: this.state.InputEditable.lName ? "rgba(0, 128, 0, 0.637)" : "rgba(000,000,000, 0.6)" }]} value={this.state.inputValue.lName} onChangeText={(value) => this.handleLastNameOnChange(value)} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="white" onPress={(e) => this.handleTitleOnPress(e, "isLastName")}>
                            <Image style={{ width: 30, height: 30 }} source={Icons.Edit} />
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.ProfileTitlesBox, { borderColor: this.state.InputEditable.age ? "green" : "rgba(000,000,000,0.3)" }]}>
                        <TouchableHighlight style={styles.InputBox} onPress={() => true}>
                            <TextInput editable={this.state.InputEditable.fName} style={[styles.Input, { color: this.state.InputEditable.age ? "rgba(0, 128, 0, 0.637)" : "rgba(000,000,000, 0.6)" }]} value={this.state.inputValue.age} onChangeText={(value) => this.handleAgeNameOnChange(value)} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="white" onPress={(e) => this.handleTitleOnPress(e, "isAge")}>
                            <Image style={{ width: 30, height: 30 }} source={Icons.Edit} />
                        </TouchableHighlight>
                    </View>
                </View>
                <TouchableHighlight style={styles.Touchable} underlayColor="#f6f6f6" onPress={(res) => this.handleUpdateOnPress("_Alretation", "isAlteration")}>
                    <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 25, fontWeight: "600" }]}>{"Update"}</Text>
                </TouchableHighlight>
                <Text style={{ color: "green", fontSize: 15 }}>{this.state.isUpdate ? "Succefully updated" : ''}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Settings: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    SettingsHeaderContainer: {
        width: "100%",
        height: 110,
        paddingBottom: 10,
        paddingLeft: 20,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    SettingsHeaderContainerImgBox: {
        width: 40,
        height: 40,
        backgroundColor: "#e4d9d5",
        borderRadius: 50,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    SettingsHeaderContainerGift: {
        width: 20,
        height: 20,
    },
    SettingsHeaderText: {
        fontSize: 24,
        fontWeight: "600"
    },
    SettingsPictureContainer: {
        width: "100%",
        height: 170,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    SettingsPicture: {
        width: 130,
        height: 130,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "rgba(000,000,000,0.3)"
    },
    SettingsHeaderText: {
        fontSize: 18,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600"
    },
    Form: {
        width: "90%",
        // height: 200,
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: "red",
    },
    Input: {
        width: "100%",
        height: 50,
        fontSize: 18,
        fontWeight: "600",


        marginBottom: 15
    },
    InputBox: {
        width: "90%",
        height: 75,
        paddingTop: 15,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    ProfileHeaderText: {
        fontSize: 18,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600"
    },
    ProfileTitlesBox: {
        width: "100%",
        height: 75,
        borderBottomWidth: 0.6,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    Touchable: {
        width: 300,
        height: 60,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.3)",

        shadowColor: "#000",
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
    ItemsImage: {
        width: 200,
        height: 200,
        marginBottom: 10,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

    },
    ItemsOption: {
        width: "100%",
        height: 70,

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    IconsOptionText: {
        paddingBottom: 5

    },
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Settings)