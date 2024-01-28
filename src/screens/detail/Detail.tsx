import { observer } from 'mobx-react-lite'
import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import useRootStore from '../../hooks/useRootStore'
import DetailHeader from './components/DetailHeader'
import BaseImage from '../../components/ BaseImage'

const { width, height } = Dimensions.get('window')

const Detail = () => {
    const { currentPhoto } = useRootStore().photosStore

    return (
        <View>
            <BaseImage
                uri={currentPhoto?.urls.raw || ''}
                previewUri={currentPhoto?.urls.small || ''}
                dimensions={{
                    height,
                    width
                }}
            />
            <DetailHeader />
        </View>
    )
}

export default observer(Detail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        display: 'flex',
    },
})