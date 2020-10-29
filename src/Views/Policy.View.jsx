import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { log } from 'react-native-reanimated'
import { connect } from "react-redux"

// components
import Footer from "../components/Footer"


class Policy extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.dispatch({ type: "isPolicy" })
    }

    render() {
        return (
            <View style={styles.Policy}>
                <Footer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Policy: {
        flex: 1,
    }
})



const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Policy)