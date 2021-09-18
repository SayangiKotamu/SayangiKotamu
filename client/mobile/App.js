import React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import AppScreen from './screens/AppScreen'

import Toast from 'react-native-toast-message'

export default function App() {
    return (
        <Provider store={store}>
            <AppScreen />
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </Provider>
    )
}
