import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterTabs = ({ categories, selectedFilter, setSelectedFilter }) => {
    return (
        <View style={styles.filterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScrollContainer}
            >
                <TouchableOpacity
                    style={[
                        styles.filterTab,
                        selectedFilter === 'All' && styles.selectedFilterTab,
                    ]}
                    onPress={() => setSelectedFilter('All')}
                >
                    <Text style={[
                        styles.filterTabText,
                        selectedFilter === 'All' && styles.selectedFilterTabText,
                    ]}>
                        All
                    </Text>
                </TouchableOpacity>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.filterTab,
                            selectedFilter === cat && styles.selectedFilterTab,
                        ]}
                        onPress={() => setSelectedFilter(cat)}
                    >
                        <Text style={[
                            styles.filterTabText,
                            selectedFilter === cat && styles.selectedFilterTabText,
                        ]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        height: 60,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#D6E3F8',
    },
    filterScrollContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    filterTab: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 24,
        marginRight: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedFilterTab: {
        backgroundColor: '#8CC8B2',
    },
    filterTabText: {
        fontSize: 14,
        color: '#4A4A4A',
    },
    selectedFilterTabText: {
        color: '#FFF',
    },
});

export default FilterTabs;