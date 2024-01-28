import React, { useState } from 'react'
import { FlexStyle, Platform } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'

export type BaseImageProps = {
    uri: string
    previewUri: string
    dimensions: { height: FlexStyle['height']; width: FlexStyle['width'] }
    containerStyle?: Omit<FastImageProps['style'], 'height' | 'width'>
    imageProps?: FastImageProps
}

const BaseImage = ({
    uri,
    previewUri,
    dimensions,
    containerStyle,
    imageProps,
}: BaseImageProps) => {
    const [isMainImageLoaded, setIsMainImageLoaded] = useState(false)
    const handlers = {
        onLoadEnd: () => {
            setIsMainImageLoaded(true)
        },
    }
    const isIos = Platform.OS === 'ios'
    const cache = isIos ? 'immutable' : 'cacheOnly'
    return (
        <>
            {!isMainImageLoaded && previewUri && (
                <FastImage
                    {...imageProps}
                    fallback={!isIos}
                    {...(isIos && { fadeDuration: 0 })}
                    source={{ uri: previewUri, cache }}
                    style={{
                        ...containerStyle,
                        position: 'absolute',
                        zIndex: 1,
                        height: dimensions.height,
                        width: dimensions.width,
                    }}
                />
            )}
            <FastImage
                {...imageProps}
                {...(isIos && { fadeDuration: 0 })}
                fallback={!isIos}
                source={{ uri }}
                style={{
                    ...containerStyle,
                    height: dimensions.height,
                    width: dimensions.width,
                    backgroundColor: 'black',
                }}
                resizeMode='cover'
                onLoadEnd={handlers.onLoadEnd}
            />
        </>
    )
}

export default BaseImage