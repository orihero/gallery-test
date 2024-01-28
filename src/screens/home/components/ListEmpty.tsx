import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListEmpty = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No data</Text>
            <Text style={styles.text}>Plase pull to refresh</Text>
        </View>
    )
}

export default ListEmpty

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        color: '#fff',
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 20,
    }
})