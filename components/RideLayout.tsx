import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { icons } from '@/constants'
import Map from './Map'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const RideLayout = ({ children, title, snapPoints }:
    { children: ReactNode, title: string, snapPoints?: string[] }) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <GestureHandlerRootView>
            <View className='flex-1 bg-white'>
                <View className='flex flex-col h-full bg-blue-500'>
                    <View className='flex flex-row items-center justify-start absolute z-10 top-16 px-5'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className='flex flex-row items-center justify-center bg-white rounded-full p-2'>
                                <Image source={icons.backArrow} className='w-6 h-6' />
                            </View>
                        </TouchableOpacity>
                        <Text className='text-xl font-JakartaBold ml-5'>
                            {title || "Go back"}
                        </Text>
                    </View>
                    <Map />
                </View>

                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints || ['45%', '85%']}
                    index={0}
                >
                    <BottomSheetView style={{
                        flex: 1,
                        padding: 20,
                    }}>
                        {children}
                    </BottomSheetView>
                </BottomSheet>

            </View>
        </GestureHandlerRootView>
    )
}

export default RideLayout

const styles = StyleSheet.create({})