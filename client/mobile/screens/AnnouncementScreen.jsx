import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Announcement from './Announcement'
import AnnouncementDetail from './AnnouncementDetail'

const Stack = createStackNavigator()

export default function AnnouncementScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Halaman Pengumuman"
                component={Announcement}
                options={{
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Detail Pengumuman"
                component={AnnouncementDetail}
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
