import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Photo } from '../types/types'
import BaseImage from './ BaseImage'

const { width } = Dimensions.get('window')

type ImgComponentProps = {
    data: Photo;
    onPress: () => void;
}

const ImgComponent = ({ data, onPress }: ImgComponentProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <BaseImage
                containerStyle={styles.img}
                previewUri={data.urls.thumb}
                uri={data.urls.small}
                dimensions={{
                    height: 200,
                    width: width / 3
                }}

            />
        </TouchableOpacity>
    )
}

export default ImgComponent

const styles = StyleSheet.create({
    container: {
        width: width / 3,
        backgroundColor: '#000',
        padding: 1
    },
    img: {
        width: '100%',
        height: 200
    }
})