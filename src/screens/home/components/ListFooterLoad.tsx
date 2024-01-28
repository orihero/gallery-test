import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    loading: boolean
}

const ListFooterLoad = ({ loading }: Props) => {
    return (
        <View style={[styles.container, { display: loading ? 'flex' : 'none' }]}>
            <ActivityIndicator animating={loading} size="large" color="#fff" />
        </View>
    )
}

export default ListFooterLoad

const styles = StyleSheet.create({
    container: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
})