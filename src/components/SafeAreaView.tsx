import React, { ReactNode, forwardRef, useImperativeHandle, useRef, useState } from "react"
import {
    Platform,
    StatusBar,
    StatusBarStyle,
    StyleSheet,
    View,
    ViewProps
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StatusBarRef = {
    setBarStyle: (style: StatusBarStyle) => void;
    setBackground: (color: string) => void;
    setHidden: (hidden: boolean) => void;
};

const Area = forwardRef<StatusBarRef, React.PropsWithChildren<{ style?: ViewProps, children: ReactNode }>>((
    {
        style,
        children
    },
    ref
) => {
    const [backgroundColor, setBackground] = useState('#fff')
    const [edges, setEdges] = useState([''])
    const insets = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
        setBarStyle: (style: StatusBarStyle) => {
            StatusBar.setBarStyle(style)
        },
        setBackground: (color: string) => {
            if (Platform.OS === "android") {
                StatusBar.setBackgroundColor(color)
            } else {
                setBackground(color)
            }
        },
        setHidden: (hidden: boolean) => {
            if (hidden) {
                setEdges(['bottom'])
            } else {
                setEdges(['top', 'bottom'])
            }
        }
    }))

    return (
        <View style={[styles.container, style, { backgroundColor }, {
            paddingTop: edges.includes('top') ? insets.top : 0,
            paddingBottom: edges.includes('bottom') ? insets.bottom : 0
        }]} >
            <StatusBar
                barStyle={"dark-content"}
                translucent={Platform.OS === "ios"}
                backgroundColor='#fff'
            />
            {children}
        </View>
    )
})

type SafeAreaViewPropsType = React.PropsWithChildren<{
    style?: ViewProps
}>

export let statusBar: React.RefObject<StatusBarRef>

const SafeAreaView = ({
    style,
    children
}: SafeAreaViewPropsType): React.JSX.Element => {

    statusBar = useRef<StatusBarRef>(
        {
            setBarStyle: (style: StatusBarStyle) => {
                StatusBar.setBarStyle(style)
            },
            setBackground: (color: string) => {
                if (Platform.OS === "android") {
                    StatusBar.setBackgroundColor(color)
                }
            },
            setHidden: (hidden: boolean) => {
                StatusBar.setHidden(hidden)
            }
        }
    );

    return (
        <Area
            ref={statusBar}
            style={style}
        >
            {children}
        </Area>
    )
}

export default SafeAreaView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
})