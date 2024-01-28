import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useRootStore from '../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const Empty = () => {
    const insets = useSafeAreaInsets();
    const { visible, hide, emptyData } = useRootStore().emptyStore;
    const { text, style, onButtonPress, buttonText } = emptyData;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => hide()}
            style={styles.modal}
        >
            <View style={[styles.container, style]}>
                <Text style={styles.text}>{text}</Text>
                {onButtonPress && buttonText ? (
                    <TouchableOpacity onPress={onButtonPress}>
                        <Text style={styles.text}>{buttonText}</Text>
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity style={styles.closeButton} onPress={() => hide()}>
                    <Text style={[styles.text, styles.closeButtonText, { top: insets.top }]}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default observer(Empty);

const styles = StyleSheet.create({
    modal: {
        width,
        height: height - 100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        gap: 20,
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        paddingTop: 0
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
