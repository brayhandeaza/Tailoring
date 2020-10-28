import React, { Fragment } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { AppLoading } from "expo"
import { useFonts, Inter_400Regular, Inter_900Black } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-community/async-storage"

// views
import Home from './src/Views/Home.View'
import Orders from './src/Views/Orders.View'
import Alretation from './src/Views/Alretation.View'
import Profile from './src/Views/Profile.View'
import Prices from './src/Views/Prices.View'
import Settings from './src/Views/Settings.View'
import Summery from './src/Views/OrdersSummery.View'
import Tailor from './src/Views/TailorProfile.View'
import Address from './src/Views/Address.View'

// redux
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./src/reducers/index"
const store = createStore(reducer)


// Initial Screen
let isHomeInitial
let isLoginInitial


const getUser = async () => {
	// await AsyncStorage.setItem("userId", "11")

	const storage = await AsyncStorage.getItem("userId")

	isHomeInitial = storage ? true : false
	isLoginInitial= !storage ? true : false
}


export default function App() {
	getUser()

	let [isFontLoaded, error] = useFonts({
		"Inter-Regular": Inter_400Regular,
		"Inter-Black": Inter_900Black
	})

	if (!isFontLoaded) {
		return <AppLoading />
	}
	return (
		<Fragment>
			<Provider store={store}>
				<Router>
					<Scene tabs hideTabBar key="root">
						<Scene modal key="Home" component={Home} hideNavBar gestureEnable={false} initial={isHomeInitial}/>
						<Scene modal key="Orders" component={Orders} hideNavBar gestureEnable={false} initial={false} />
						<Scene modal key="Profile" component={Profile} hideNavBar gestureEnable={false} initial={isLoginInitial}/>
						<Scene modal key="Alteration" component={Alretation} hideNavBar gestureEnable={false} initial={false}/>
						<Scene modal key="Prices" component={Prices} hideNavBar gestureEnable={false} initial={false}/>
						<Scene modal key="Settings" component={Settings} hideNavBar gestureEnable={false} initial={false}/>
						<Scene modal key="PrivacyPolicy" component={Settings} hideNavBar gestureEnable={false} initial={false}/>
						<Scene modal key="Summery" component={Summery} hideNavBar gestureEnable={false} initial={false}/>
						<Scene modal key="Tailor" component={Tailor} hideNavBar gestureEnable={false} initial={false}/>
						<Scene modal key="Address" component={Address} hideNavBar gestureEnable={false} initial={false}/>
					</Scene>
				</Router>
			</Provider>
		</Fragment>
	)
}

