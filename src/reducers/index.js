import {combineReducers } from "redux"

// reducers
const Footer = require("./Footer")
const Header = require("./Header")
const Filters = require("./Filters")
const Orders = require("./Orders")
const Login = require("./Login")

export default combineReducers({
    Footer,
    Header,
    Filters,
    Orders,
    Login
})
