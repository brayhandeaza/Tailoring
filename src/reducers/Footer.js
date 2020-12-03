const { modulo } = require("react-native-reanimated")
const axios = require('axios')

const Orders = async () => {
      await fetch("https://alteration-database.herokuapp.com/appointments/").then((res) => {
            return res.json()
      })
}


let initalState = {
      isHome: true,
      isOrders: false,
      isPrices: false,
      isProfile: false,
      isFooter: true,
      pView: "isHome",
      orders: Orders()
}

module.exports = (state = initalState, actions) => {
      switch (actions.type) {
            case "isHome":
                  return Object.assign({}, state, { isHome: true, isOrders: false, isPrices: false, isProfile: false, isFooter: true, pView: "isHome" })
            case "isOrders":
                  return Object.assign({}, state, { isHome: false, isOrders: true, isPrices: false, isProfile: false, isFooter: true, pView: "isOrders" })
            case "isPrices":
                  return Object.assign({}, state, { isHome: false, isOrders: false, isPrices: true, isProfile: false, isFooter: true, pView: "isPrices" })
            case "isProfile":
                  return Object.assign({}, state, { isHome: false, isOrders: false, isPrices: false, isProfile: true, isFooter: false, })
            case "isPolicy":
                  return Object.assign({}, state, { isHome: false, isOrders: false, isPrices: false, isProfile: false, isFooter: true, })
            case "isFooter":
                  return Object.assign({}, state, { isHome: false, isOrders: false, isPrices: false, isProfile: true, isFooter: true, pView: "isFooter" })
            default:
                  return state
      }
}


