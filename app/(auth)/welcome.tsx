import CustomButton from '@/components/CustomButton'
import { onboarding } from '@/constants'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null)
  const [activetIndex, setActivetIndex] = useState(0)
  const isLastSlide = activetIndex === onboarding.length - 1


  return (
    <SafeAreaView className='flex h-full items-center justify-between'>
      <TouchableOpacity
        className='w-full flex items-end justify-end p-5'
        onPress={() => {
          router.replace("/(auth)/sign-up")
        }} >
        <Text className='text-black text-md font-JakartaBold'>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full' />}
        activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />}
        onIndexChanged={(index) => setActivetIndex(index)}
      >
        {
          onboarding.map((item, index) => (
            <View key={item.id} className='flex items-center justify-center p-5'>
              <Image source={item.image} className="w-full h-[300px]" resizeMode='contain' />
              <View className='flex flex-row w-full mt-10 items-center justify-center'>
                <Text className='text-black text-3xl font-bold mx-10 text-center'>{item.title}</Text>
              </View>
              <Text className='text-lg text-center font-JakartaSemiBold text-[#858585] mx-4 mt-3'>{item.description}</Text>
            </View>
          ))
        }
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={isLastSlide ? () => router.replace("/(auth)/sign-up") : () => swiperRef.current?.scrollBy(1)}
        className='w-11/12 my-10'
      />
    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({})