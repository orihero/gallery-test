import React from 'react';
import {
    FlatList as List,
    StyleSheet,
    RefreshControl,
} from 'react-native';

type FlatListProps = {
    loading?: boolean;
    onRefresh?: () => void;
    ListEmptyComponent?: React.ReactNode;
}

export function FlatList<T>({
    data = [],
    loading = false,
    onRefresh = () => { },
    contentContainerStyle,
    ListEmptyComponent = null,
    ...props
}: FlatListProps & React.ComponentProps<typeof List<T>>) {
    return (
        <List
            data={data}
            contentContainerStyle={[
                data && data.length === 0 ? styles.emptyContainer : undefined,
                contentContainerStyle,
            ]}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor='#fff' />
            }
            ListEmptyComponent={!loading ? ListEmptyComponent : null}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
    },
});
