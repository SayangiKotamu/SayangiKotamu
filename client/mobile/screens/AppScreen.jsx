import React from 'react'

import { useSelector } from 'react-redux'

import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from '@expo/vector-icons/Ionicons'
import 'react-native-gesture-handler'

import HomeScreen from './HomeScreen'
import AnnouncementScreen from './AnnouncementScreen'
import Report from './Report'
import Aspiration from './Aspiration'
import Notification from './Notification'
import Login from './Login'
import Register from './Register'

const Tab = createBottomTabNavigator()

export default function App() {
    const { isLoggedIn } = useSelector((state) => state.auth)

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName

                            if (route.name === 'Beranda') {
                                iconName = focused ? 'home-sharp' : 'home-outline'
                            } else if (route.name === 'Pengumuman') {
                                iconName = focused
                                    ? 'information-circle-sharp'
                                    : 'information-circle-outline'
                            } else if (route.name === 'Lapor') {
                                iconName = focused ? 'checkbox-sharp' : 'checkbox-outline'
                            } else if (route.name === 'Aspirasi') {
                                iconName = focused ? 'book-sharp' : 'book-outline'
                            } else if (route.name === 'Notifikasi') {
                                iconName = focused
                                    ? 'notifications-circle-sharp'
                                    : 'notifications-circle-outline'
                            }

                            return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen
                        name="Beranda"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="Pengumuman"
                        component={AnnouncementScreen}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen name="Lapor" component={Report} />
                    <Tab.Screen name="Aspirasi" component={Aspiration} />
                    <Tab.Screen name="Notifikasi" component={Notification} />
                </Tab.Navigator>
            ) : (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName

                            if (route.name === 'Masuk') {
                                iconName = focused ? 'enter-sharp' : 'enter-outline'
                            } else if (route.name === 'Daftar') {
                                iconName = focused ? 'newspaper-sharp' : 'newspaper-outline'
                            }
                            return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: '#1A73E9',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="Masuk" component={Login} />
                    <Tab.Screen name="Daftar" component={Register} />
                </Tab.Navigator>
            )}

            <StatusBar style="auto" />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
