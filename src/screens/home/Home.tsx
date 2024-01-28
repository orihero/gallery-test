import { View, StyleSheet } from 'react-native'
import React from 'react'
import { statusBar } from '../../components/SafeAreaView'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ImgComponent from '../../components/ImgComponent'
import useRootStore from '../../hooks/useRootStore'
import { observer } from 'mobx-react-lite'
import { FlatList } from '../../components/FlatList'
import { Photo } from '../../types/types'
import ROUTERS from '../../router/routers'
import { StackNavigation } from '../../router/AppRouter'
import ListFooterLoad from './components/ListFooterLoad'
import ListEmpty from './components/ListEmpty'

const Home = () => {
    const { navigate } = useNavigation<StackNavigation>()
    const { allPhotos, loading, loadingMore, getMorePhotos, getPhotos, setCurrentPhoto } = useRootStore().photosStore

    useFocusEffect(() => {
        statusBar.current?.setBarStyle("light-content")
        statusBar.current?.setBackground('#000')
    })

    const handlePhotoPress = (photo: Photo) => {
        setCurrentPhoto(photo)
        navigate(ROUTERS.DETAIL)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={allPhotos}
                renderItem={({ item, index }) => <ImgComponent key={index} data={item} onPress={() => handlePhotoPress(item)} />}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                loading={loading}
                onRefresh={() => getPhotos()}
                onEndReached={getMorePhotos}
                onEndReachedThreshold={0.3}
                ListFooterComponent={<ListFooterLoad loading={loadingMore} />}
                ListEmptyComponent={<ListEmpty />}
            />
        </View>
    )
}

export default observer(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',

    }
})