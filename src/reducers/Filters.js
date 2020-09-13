const { modulo } = require("react-native-reanimated")

let initalState = {
    isRequested: false,
    isCompleted: false,
    isCanceled: false,
    isJacket: true, 
    isPants: false
}

module.exports = (state = initalState, actions) => {
    switch (actions.type) {
        case "isRequested":
            return Object.assign({}, state, {isCompleted: false, isRequested: true, isCanceled: false, })
        case "isCompleted":
			return Object.assign({}, state, {isCompleted: true, isRequested: false, isCanceled: false, })
        case "isCanceled":
			return Object.assign({}, state, {isCompleted: false, isRequested: false, isCanceled: true, })
        case "isJacket":
			return Object.assign({}, state, {isCompleted: false, isRequested: false, isCanceled: true, isJacket: true, isPants: false })
        case "isPants":
			return Object.assign({}, state, {isCompleted: false, isRequested: false, isCanceled: true, isJacket: false, isPants: true})
        default:
            return state
    }
}


