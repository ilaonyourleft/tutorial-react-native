import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeGeneration() {
    return (
        <SafeAreaView style={styles.container}>
            <QRCode
                value="https://4ce6b9-db.myshopify.com"
                size={200}
                color="black"
                backgroundColor="white"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});