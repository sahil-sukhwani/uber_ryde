import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocationStore } from '@/store'
import RideLayout from '@/components/RideLayout'
import GoogleTextInput from '@/components/GoogleTextInput'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const FindRide = () => {
  const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore()

  return (
    <RideLayout title={'Ride'} snapPoints={['70%']}>
        <View className='my-1'>
            <Text className='text-lg font-JakartaBold mb-2'>
                 From
            </Text>
            <GoogleTextInput
                containerStyle='bg-neutral-100'
                initialLocation={userAddress!}
                icon={icons.target}
                textInputBackgroundColor='#f5f5f5'
                handlePress={(location)=>setUserLocation(location)}
            />
        </View>
        <View className='my-3'>
            <Text className='text-lg font-JakartaBold mb-2'>
                 To
            </Text>
            <GoogleTextInput
                containerStyle='bg-neutral-100'
                initialLocation={destinationAddress!}
                icon={icons.map}
                textInputBackgroundColor='transparent'
                handlePress={(location)=>setDestinationLocation(location)}
            />
        </View>

        <CustomButton
            title='Find Ride'
            onPress={()=>{
                router.push('/(root)/confirm-ride')
            }}
        />  
    </RideLayout>
  )
}

export default FindRide

const styles = StyleSheet.create({})