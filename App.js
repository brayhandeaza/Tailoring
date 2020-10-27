import React, { Fragment, useEffect } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { AppLoading } from "expo"
import { useFonts, Inter_400Regular, Inter_900Black } from "@expo-google-fonts/inter";

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
// import Login from './src/Views/Login.View'


// redux
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./src/reducers/index"

const store = createStore(reducer)

export default function App() {
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
						<Scene modal key="Home" component={Home} hideNavBar gestureEnable={false} initial/>
						<Scene modal key="Orders" component={Orders} hideNavBar gestureEnable={false}/>
						<Scene modal key="Profile" component={Profile} hideNavBar gestureEnable={false}/>
						<Scene modal key="Alteration" component={Alretation} hideNavBar gestureEnable={false}/>
						<Scene modal key="Prices" component={Prices} hideNavBar gestureEnable={false}/>
						<Scene modal key="Settings" component={Settings} hideNavBar gestureEnable={false}/>
						<Scene modal key="PrivacyPolicy" component={Settings} hideNavBar gestureEnable={false}/>
						<Scene modal key="Summery" component={Summery} hideNavBar gestureEnable={false}/>
						<Scene modal key="Tailor" component={Tailor} hideNavBar gestureEnable={false}/>
						<Scene modal key="Address" component={Address} hideNavBar gestureEnable={false}/>
					</Scene>
				</Router>
			</Provider>
		</Fragment>
	)
}

