import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: '123',
        icon: "home",
        location: "Home",
        destination: "Code Street, London, UK",
    },
    {
        id: '456',
        icon: "briefcase",
        location: "Work",
        destination: "London Eye, London, UK",
    },
]

export default function NavFavourites() {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View
                    style={[tw`bg-gray-200`, { height: 0.5 }]}
                />
            )}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type='ionicon'
                        color='white'
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                    {/* <View style={tw`ml-auto flex-row items-center`}>
                        <Text style={tw`text-lg font-semibold`}>5-15 min</Text>
                        <Icon
                            style={tw`ml-2`}
                            name="arrow-right"
                            type='ionicon'
                            color='black'
                            size={16}
                        />
                    </View> */}
                </TouchableOpacity>
            )}
        />
    )
}