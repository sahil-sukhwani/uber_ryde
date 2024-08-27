import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { fetchAPI } from '@/lib/fetch';
import { PaymentProps } from '@/types/type';


const Payment = ({ fullName , email, amount, driverId, rideTime}: PaymentProps) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [success, setSuccess] = useState(false)

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: 1099,
                    currencyCode: 'USD',
                },
                confirmHandler: confirmHandler
            }
        });
        if (error) {
            // handle error
        }
    };

    // const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
    //     // Make a request to your own server.
    //     const { paymentIntent, customer } = await fetchAPI(`/(api)/(stripe)/create`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name:  fullName || email.split('@')[0],
    //             email: email,
    //             amount: amount,
    //             paymentMethodId: paymentMethod.id,
    //         }),
    //     })

    //     if(paymentIntent?.client_secret) {
            
    //     }

    //     // Call the `intentCreationCallback` with your server response's client secret or error
    //     const { clientSecret, error } = await response.json();
    //     if (clientSecret) {
    //         intentCreationCallback({ clientSecret })
    //     } else {
    //         intentCreationCallback({ error })
    //     }
    // }

    const confirmHandler =()=>{
        
    }



    const openPaymentSheet = async () => {
        await initializePaymentSheet();
        const { error } = await presentPaymentSheet();

        if (error) {
            if (error.code === PaymentSheetError.Canceled) {
                // Customer canceled - you should probably do nothing.
                Alert.alert('Error code: ' + error.code, error.message);
            } else {
                // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, etc.
                setSuccess(true)
            }
        }
    }
    return (
        <>
            <CustomButton
                title='Confirm Ride'
                className='my-10'
                onPress={openPaymentSheet}
            />
        </>
    )
}

export default Payment

const styles = StyleSheet.create({})