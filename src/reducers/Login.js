let initalState = {
	isLogedIn: true,
	isUserLogedIn: false,
	goToLogin: false
}

module.exports = (state = initalState, actions) => {
	switch (actions.type) {
		
		case "isLogIn":
			return Object.assign({}, state, { isLogedIn: true})
		case "isLogOut":
			return Object.assign({}, state, { isLogedIn: false})
		case "isUserLogedIn":
			return Object.assign({}, state, { isUserLogedIn: actions.payloa})
		case "goToLogin":
			return Object.assign({}, state, { goToLogin: actions.payloa})
		default:
			return state
	}
}
