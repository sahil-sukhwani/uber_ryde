import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const OAuth = ({
    title = 'Sign up with Google'
}) => {
    const handleGoogleSignIn = () => {
        console.log('Google Sign In')
    }

    return (
        <View>
            <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-general-100' />
                <Text className='text-lg'>Or</Text>
                <View className='flex-1 h-[1px] bg-general-100' />
            </View>

            <CustomButton
                title={title}
                className='mt-6 w-full shadow-none'
                IconLeft={() => (
                    <Image source={icons.google} className='w-5 h-5 mx-4' resizeMode='contain' />
                )}
                bgVariant='outline'
                textVariant='primary'
                onPress={handleGoogleSignIn}
            />
        </View>
    )
}

export default OAuth

const styles = StyleSheet.create({})