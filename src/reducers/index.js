let initalState = {
	isHome: true,
	isOrders: false,
	isPrices: false,
	isAside: false,
	isProfile: true,
	isBag: false,
	isSearch: true,
	isAlteration: false,
	isHeader: true,
	isFooter: true,
	isCompleted: false,
	isRequested: true,
	isCanceled: false,
	isJacket: true,
	isPants: false,
	isLogedIn: false
}

export default (state = initalState, actions) => {
	switch (actions.type) {
		case "isHome":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: true, isOrders: false, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: false, isHeader: true, isFooter: true, isAside: false })
		case "isProfile":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: false, isOrders: false, isPrices: false, isProfile: true, isBag: false, isSearch: false, isAlteration: false, isHeader: true, isFooter: true, isAside: false })
		case "isBag":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: false, isOrders: false, isPrices: false, isProfile: false, isBag: true, isSearch: false, isAlteration: false, isHeader: true, isFooter: true, isAside: false })
		case "isSearch":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: false, isOrders: false, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: false, isHeader: true, isFooter: true, isAside: false })
		case "isAlteration":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: false, isOrders: false, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: true, isFooter: true, isAside: false })
		case "isAside":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: false, isOrders: false, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: true })
		// Orders
		case "isOrders":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: true, isCanceled: false, isHome: false, isOrders: true, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: false, isHeader: false, isFooter: true, isAside: false })
		case "isCompleted":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: true, isRequested: false, isCanceled: false, isHome: false, isOrders: true, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: false })
		case "isRequested":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: true, isCanceled: false, isHome: false, isOrders: true, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: false })
		case "isCanceled":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: false, isCompleted: false, isRequested: false, isCanceled: true, isHome: false, isOrders: true, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: false })
		// Price
		case "isPrices":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: true, isPants: false, isCompleted: false, isRequested: false, isCanceled: false, isHome: false, isOrders: false, isPrices: true, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: false })
		case "isJacket":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: true, isPants: false, isCompleted: false, isRequested: false, isCanceled: true, isHome: false, isOrders: false, isPrices: true, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: false })
		case "isPants":
			return Object.assign({}, state, {isLogedIn: false ,isJacket: false, isPants: true, isCompleted: false, isRequested: false, isCanceled: true, isHome: false, isOrders: false, isPrices: true, isProfile: false, isBag: false, isSearch: false, isAlteration: true, isHeader: false, isFooter: true, isAside: false })
		default:
			return Object.assign({}, state, {isLogedIn: false ,isJacket: true, isPants: false, isCompleted: false, isRequested: true, isCanceled: false, isHome: true, isOrders: false, isPrices: false, isProfile: false, isBag: false, isSearch: false, isAlteration: false, isHeader: true, isFooter: true, isAside: false })
	}
}
