import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Notification from './Notification'
import Rating from './RatingScreen'

const Stack = createStackNavigator()

export default function NotificationScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Halaman Notifikasi"
                component={Notification}
                options={{
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Nilai Kinerja"
                component={Rating}
                options={{
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    )
}
