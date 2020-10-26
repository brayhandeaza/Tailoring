let initalState = {
	isLogedIn: true
}

module.exports = (state = initalState, actions) => {
	switch (actions.type) {
		
		case "isLogIn":
			return Object.assign({}, state, { isLogedIn: true})
		case "isLogOut":
			return Object.assign({}, state, { isLogedIn: false})
		default:
			return state
	}
}
