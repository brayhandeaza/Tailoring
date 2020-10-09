let initalState = {
    orderId: null
}

module.exports = (state = initalState, actions) => {
    switch (actions.type) {
        case "summey":
            return Object.assign({}, state, { orderId: actions.payload })
        case "preview":
            return Object.assign({}, state, null)
        default:
            return state
    }

}
