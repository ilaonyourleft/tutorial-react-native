import React from 'react';
import tw from 'tailwind-react-native-classnames';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';

export default function MapScreen() {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const originLatitude = origin?.location?.lat ?? 37.78825;
    const originLongitude = origin?.location?.lng ?? -122.4324;
    const destinatinoLatitude = destination?.location?.lat ?? 37.78825;
    const destinationLongitude = destination?.location?.lng ?? -122.4324;

    return (
        <MapView
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: originLatitude,
                longitude: originLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin?.location && (

                <Marker
                    coordinate={{ latitude: originLatitude, longitude: originLongitude }}
                    title="Origin"
                    description="5 stops away"
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{ latitude: destinatinoLatitude, longitude: destinationLongitude }}
                    title="Destination"
                    description="5 stops away"
                    identifier="destination"
                />
            )}
        </MapView>
    );
}