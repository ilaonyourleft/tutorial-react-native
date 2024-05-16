import React from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView, Text, View } from "react-native";
import Map from "../components/Map";
import MapView from "react-native-maps";

export default function MapScreen() {
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <View style={tw`h-1/2`}>
                    <Map />
                </View>
                <View style={tw`h-1/2`}></View>
            </View>
        </SafeAreaView>
    );
}