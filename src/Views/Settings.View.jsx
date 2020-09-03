import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, ScrollView, Dimensions } from 'react-native'
import { Icons, Img } from '../constants/Image'

// redux
import { connect } from "react-redux"

import Settings from "../components/Settings"

const { width, height } = Dimensions.get("screen")

class SettingsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["First Name", "Last Name", "Age"],
            isFirstName: false,
            isLastName: false,
            isAge: false,
            inputValue: "First Name"
        }
    }

    handleTitleOnPress = async (e, view) => {
        if (view == "isFirstName") {
            this.setState({
                isFistName: !this.state.isFistName,
            })
            alert(!this.state.isFirstName)
        }
    }

    handleInputOnChange = (values) => {
        this.setState({
            inputValue: values
        })
    }

    handleUpdateOnPress = () => {
        alert("Pressed")
    }
    render() {
       

        return (height < 670 ?
            <ScrollView contentContainerStyle={styles.Scroll} >
                <Settings />
            </ScrollView> :
            <Settings />
        )
    }
}

const styles = StyleSheet.create({
    Scroll: {
        paddingBottom: 120
    }
})

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(SettingsView)