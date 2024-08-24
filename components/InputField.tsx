import {
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
    labelStyle,
    label,
    icon,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
}: InputFieldProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <Text className={`text-lg mb-3 font-JakartaSemiBold ${labelStyle}`}>
                        {label}
                    </Text>
                    <View
                        className={`
                        flex flex-row justify-start items-center
                        bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500
                        ${containerStyle}
                    `}
                    >
                        {icon && (
                            <Image source={icon} className={`w-5 h-5 ml-4 ${iconStyle}`} />
                        )}
                        <TextInput
                            secureTextEntry={secureTextEntry}
                            className={`justify-center rounded-full font-JakartaSemiBold p-3 mb-1 text-[15px]
                                flex-1 text-left ${inputStyle}`}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;

const styles = StyleSheet.create({});
