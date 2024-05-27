import React from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Map from "../components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <TouchableOpacity style={tw`absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg bg-gray-100`} onPress={() => navigation.navigate("HomeScreen")}>
                    <Icon name="home" size={24} color="black" />
                </TouchableOpacity>
                <View style={tw`h-1/2`}>
                    <Map />
                </View>
                <View style={tw`h-1/2`}>
                    <Stack.Navigator>
                        <Stack.Screen name="NavigateCard" component={NavigateCard} options={{ headerShown: false }} />
                        <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </View>
            </View>
        </SafeAreaView>
    );
}