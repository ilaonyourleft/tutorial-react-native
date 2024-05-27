import React, { useEffect, useRef } from 'react';
import tw from 'tailwind-react-native-classnames';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';

export default function MapScreen() {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const originLatitude = origin?.location?.lat ?? 37.78825;
    const originLongitude = origin?.location?.lng ?? -122.4324;
    const destinatinoLatitude = destination?.location?.lat ?? 37.78825;
    const destinationLongitude = destination?.location?.lng ?? -122.4324;
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
            fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            })
            .catch((error) => {
                console.log(error);
            })
        }

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
        ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: originLatitude,
                longitude: originLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

            {
                origin && destination && (
                    <MapViewDirections
                        origin = {origin.description}
                        destination = {destination.description}
                        apikey = {GOOGLE_MAPS_APIKEY}
                        strokeWidth = {3}
                        strokeColor = "black"
                    />
                )
            }

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