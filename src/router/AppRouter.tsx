import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, NavigationContainer, NavigationProp, ParamListBase, createNavigationContainerRef } from '@react-navigation/native';
import ROUTERS from './routers';
import Home from '../screens/home/Home';
import Detail from '../screens/detail/Detail';
import { StyleSheet, View } from 'react-native';
import Empty from '../screens/empty/Empty';
import useRootStore from '../hooks/useRootStore';
import { useNetInfoInstance } from "@react-native-community/netinfo";

export type ScreenNames = keyof typeof ROUTERS;
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef();

export const rootNavigate = <RouteName extends keyof ParamListBase>(name: RouteName, params?: ParamListBase[RouteName]) => {
    if (navigationRef.current) {
        navigationRef.current.dispatch(CommonActions.navigate({ name, params }));
    }
}

const AppRouter = () => {
    const { netInfo: { isConnected }, refresh } = useNetInfoInstance();
    const { show, hide } = useRootStore().emptyStore;

    useEffect(() => {
        if (isConnected === null) return;
        if (!isConnected)
            return show({
                text: 'No internet connection. Please check your connection and try again.',
                buttonText: 'Refresh',
                onButtonPress: () => refresh()
            })
        else
            hide()
    }, [isConnected])

    return (
        <View style={styles.container}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name={ROUTERS.HOME} component={Home} />
                    <Stack.Screen name={ROUTERS.DETAIL} component={Detail} options={{
                        presentation: 'transparentModal',
                        animation: 'fade'
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
            <Empty />
        </View>
    )
}

export default AppRouter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
})