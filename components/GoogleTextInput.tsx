import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  containerStyle,
  initialLocation,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex mb-5 flex-row items-center justify-center relative rounded-xl z-50 ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        placeholder="Where you want to go?"
        debounce={400}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadow: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            height: 50,
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            borderRadius: 10,
            top: 0,
            width: "100%",
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry?.location?.lat!,
            longitude: details?.geometry?.location?.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="items-center justify-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation || "Where you want to go?",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
