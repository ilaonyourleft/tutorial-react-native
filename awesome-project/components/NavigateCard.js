import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'

export default function NavigateCard() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 text-xl`}>Ready for your ride?</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<GooglePlacesAutocomplete
					styles={{
						container: {
							backgroundColor: 'white',
							paddingTop: 20,
							flex: 0,
						},
						textInput: {
							backgroundColor: '#DDDDDF',
							borderRadius: 0,
							fontSize: 18,
						},
						textInputContainer: {
							paddingHorizontal: 20,
							paddingBottom: 0,
						},
					}}
					fetchDetails={true}
					returnKeyType={"search"}
					minLength={2}
					onPress={(data, details = null) => {
						dispatch(setDestination({
							location: details.geometry.location,
							description: data.description
						}))

						navigation.navigate('RideOptionsCard');
					}}
					enablePoweredByContainer={false}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
					placeholder='Where to?'
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
				/>
				<NavFavourites />
			</View>
			<View style={tw`flex-row bg-white justify-between py-2 mt-auto border-t border-gray-100`}>
				<TouchableOpacity style={tw`flex flex-row bg-black py-3 px-4 rounded-full`} onPress={() => navigation.navigate('RideOptionsCard')}>
					<Icon name='car' type='font-awesome' color='white' size={16} />
					<Text style={tw`text-center text-white ml-2`}>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity style={tw`flex flex-row bg-gray-300 py-3 px-4 rounded-full w-24 justify-between`}>
					<Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
					<Text style={tw`text-center text-black mr-2`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}