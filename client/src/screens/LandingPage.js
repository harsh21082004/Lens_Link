import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import OrangeButton from '../assets/buttons/OrangeButton'
import OutlineButton from '../assets/buttons/OutlineButton'
import { useNavigation } from '@react-navigation/native'

const LandingPage = () => {

    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/signup-bg.png')} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={styles.content}>
                <Text style={styles.text}>Welcome to LensLink 📸
                </Text>
                <Text style={styles.text2}>
                    A creative space where photographers unite.
                    Login to start your visual journey.
                </Text>
                <View style={styles.buttons}>
                    <OutlineButton
                        text="Sign Up"
                        size={18}
                        borderRadius={12}
                        onPress={() => navigation.navigate('SignUp')}
                    />
                    <OrangeButton
                        text="Log In"
                        size={18}
                        borderRadius={12}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    text: {
        color: 'white',
        fontSize: 24,
        paddingHorizontal: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'WorkSans-Regular',
    },
    text2: {
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'WorkSans-Regular',
    },
    buttons: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    content:{
        width: '100%',
        paddingBottom: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    }
})

export default LandingPage