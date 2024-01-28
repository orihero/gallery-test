import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ArrowLeftIcon } from '../../../components/icons'

const { width } = Dimensions.get('window')

const DetailHeader = () => {
    const insets = useSafeAreaInsets();
    const { goBack } = useNavigation()
    return (
        <View style={{
            width,
            height: insets.top + 40,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
        }}>
            <Svg height='100%' width='100%'>
                <Defs>
                    <LinearGradient id="grad" x1="0.5" y1="1" x2="0.5" y2="0">
                        <Stop offset="0" stopColor="rgb(0, 0, 0)" stopOpacity='0' />
                        <Stop offset="0.8" stopColor="rgb(0,0,0)" stopOpacity='1' />
                    </LinearGradient>
                </Defs>
                <Rect width='100%' height="100%" fill="url(#grad)" />
            </Svg>
            <View style={[styles.header, { top: insets.top - 10 }]}>
                <TouchableOpacity onPress={() => goBack()}>
                    <ArrowLeftIcon fill='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DetailHeader

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
})