const { modulo } = require("react-native-reanimated")

let initalState = {
	isHome: true,
	isOrders: false,
    isPrices: false,
    isProfile: false,
    isFooter: true,
    pView: "isHome"
}

module.exports = (state = initalState, actions) => {
    switch (actions.type) {
        case "isHome":
			return Object.assign({}, state, {isHome: true, isOrders: false, isPrices: false, isProfile: false, isFooter: true, pView: "isHome"})
		case "isOrders":
            return Object.assign({}, state, {isHome: false, isOrders: true, isPrices: false, isProfile: false, isFooter: true, pView: "isOrders"})
		case "isPrices":
            return Object.assign({}, state, {isHome: false, isOrders: false, isPrices: true, isProfile: false, isFooter: true, pView: "isPrices"})
		case "isProfile":
            return Object.assign({}, state, {isHome: false, isOrders: false, isPrices: false, isProfile: true, isFooter: false,})
		case "isFooter":
            return Object.assign({}, state, {isHome: false, isOrders: false, isPrices: false, isProfile: true, isFooter: true, pView: "isFooter"})
        default:
            return state
    }
}


