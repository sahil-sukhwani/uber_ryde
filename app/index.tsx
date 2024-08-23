import { Redirect } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const Home = () => {
  return (
    <Redirect href="/(auth)/welcome" />
  )
}

export default Home

const styles = StyleSheet.create({})