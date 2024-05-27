import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View, Image } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
	{
		id: 'UberX',
		title: 'UberX',
		image: 'https://links.papareact.com/3pn',
		 multiplier: 1,
	},
	{
		id: 'UberXL',
		title: 'UberXL',
		image: 'https://links.papareact.com/5w8',
		multiplier: 1.2,
	},
	{
		id: 'UberLUX',
		title: 'UberLUX',
		image: 'https://links.papareact.com/7pf',
		multiplier: 1.75,
	},
]

const SURGE_CHARGES = 1.5;

export default function RideOptionsCard() {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<View>
				<TouchableOpacity style={tw`absolute top-3 left-5 z-50 rounded-full p-3`} onPress={() => navigation.navigate("NavigateCard")}>
					<Icon name="arrow-left" type="font-awesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance?.text}</Text>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { id, title, image, multiplier }, item }) => (
					<TouchableOpacity
						style={tw`flex-row items-center justify-between px-10 ${id === selected?.id ? "bg-gray-200" : "bg-white"}`}
						onPress={() => setSelected(item)}
					>
						<Image
							style={{
								width: 100,
								height: 100,
								resizeMode: "contain",
							}}
							source={{ uri: image }}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{title}</Text>
							<Text>{travelTimeInformation?.duration?.text}</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat("en-gb", {
								style: "currency",
								currency: "GBP",
								//maximumFractionDigits: 0,
								minimumFractionDigits: 0,
							}).format(
								(travelTimeInformation?.duration.value *
									SURGE_CHARGES *
									multiplier
								) / 100
							)
							}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} disabled={!selected}>
					<Text style={tw`text-center py-5 text-xl text-white`}>Choose {selected?.title}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}