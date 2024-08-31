import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [showSuccessModal, setshowSuccessModal] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: Handle db user creation
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create your account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry
          />

          <CustomButton
            title="Sign Up"
            className="mt-6"
            onPress={onSignUpPress}
          />

          {/* OAuth */}
          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text className="text-center mt-5 text-black font-JakartaRegular">
              Already have an account?
            </Text>
            <Text className="text-primary-500"> Sign In</Text>
          </Link>

          {/* Verify otp */}
          <ReactNativeModal
            isVisible={
              verification.state == "pending" || verification.state == "failed"
            }
            onModalHide={() => {
              if (verification.state === "success") {
                setshowSuccessModal(true);
              }
            }}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-JakartaExtraBold mb-2 text-center">
                Verification
              </Text>
              <Text className="font-Jakarta mb-5 text-center text-base">
                We've sent a verification code to {form.email}
              </Text>
              <InputField
                label="Code"
                placeholder="12345"
                icon={icons.lock}
                value={verification.code}
                onChangeText={(text) =>
                  setVerification({ ...verification, code: text })
                }
                keyboardType="number-pad"
              />

              {verification.error ? (
                <Text className="text-red-500 text-sm text-center mt-1">
                  {verification.error}
                </Text>
              ) : null}

              <CustomButton
                title="Verify"
                className="mt-6 bg-success-500"
                onPress={onPressVerify}
              />
            </View>
          </ReactNativeModal>

          {/* Verification modal */}
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />
              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>
              <Text className="text-base text-center text-general-200 mt-2">
                Your accont has been verified successfully
              </Text>
              <CustomButton
                title="Continue"
                className="mt-6"
                onPress={() => {
                  setshowSuccessModal(false);
                  router.push("/(root)/(tabs)/home");
                }}
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
