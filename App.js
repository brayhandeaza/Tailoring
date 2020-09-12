import React, { Fragment } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// views
import Tailor from './src/Views/Tailor.View'
import Orders from './src/Views/Orders.View'
import Alretation from './src/Views/Alretation.View'
import Profile from './src/Views/Profile.View'
import Prices from './src/Views/Prices.View'
import Settings from './src/Views/Settings.View'

// cpmponents
import Footer from './src/components/Footer'
import Header from './src/components/Header'

// redux
import { createStore} from "redux"
import { Provider } from "react-redux"
import reducer from "./src/reducers/index"

const store = createStore(reducer)

export default function App() {
	console.log(store.getState());
	return (
		<Fragment>
			<Provider store={store}>
				<Router>
					<Scene tabs hideTabBar key="root">
						<Scene modal key="Home" component={Tailor} hideNavBar gestureEnable={false} initial/>
						<Scene modal key="Orders" component={Orders} hideNavBar gestureEnable={false}/>
						<Scene modal key="Profile" component={Profile} hideNavBar gestureEnable={false}/>
						<Scene modal key="Alretation" component={Alretation} hideNavBar gestureEnable={false}/>
						<Scene modal key="Prices" component={Prices} hideNavBar gestureEnable={false}/>
						<Scene modal key="Settings" component={Settings} hideNavBar gestureEnable={false}/>
						<Scene modal key="PrivacyPolicy" component={Settings} hideNavBar gestureEnable={false}/>
					</Scene>
				</Router>
			</Provider>
		</Fragment>
	)
}      

