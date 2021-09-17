import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './Home'
import ReportDetail from './ReportDetail'

const Stack = createStackNavigator()

export default function HomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Halaman Beranda" component={Home} />
            <Stack.Screen name="Detail Laporan" component={ReportDetail} />
        </Stack.Navigator>
    )
}
