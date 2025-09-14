import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    TextInput,
    SafeAreaView,
    StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginWithGoogle } from '../redux/services/authSlice';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    console.log(loading);

    const handleLogin = () => {
        if (email && password) {
            dispatch(login({ email, password }));
        } else {
            // You can show an alert or a message here
            console.log("Please enter email and password");
        }
    };

    const handleGoogleLogin = () => {
        dispatch(loginWithGoogle());
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#141311' }}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={require('../assets/signup-bg.png')} // Re-using the same background
                style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                imageStyle={{ opacity: 0.9 }}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Back!</Text>

                    {/* Email, Password */}
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {error && <Text style={styles.error}>{error}</Text>}

                    {/* Login Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                       {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log In</Text>}
                    </TouchableOpacity>

                    <Text style={styles.text2}>
                        Don't have an account?{' '}
                        <Text
                            style={{ fontWeight: 'bold', color: '#FFA500' }}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            Sign Up Here
                        </Text>
                    </Text>

                    <Text style={styles.text2}>Or log in with</Text>

                    {/* Social Buttons */}
                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                            <Image style={styles.socialImage} source={require('../assets/google.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image style={styles.socialImage} source={require('../assets/facebook.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image style={styles.socialImage} source={require('../assets/apple-logo.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
        </SafeAreaView>
    );
};

// Using similar styles from your SignUpScreen for consistency
const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    text2: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 15,
    },
    content: {
        width: '100%',
        backgroundColor: 'rgba(20, 19, 17, 0.8)',
        paddingBottom: 40,
        paddingTop: 40,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: 12,
        borderColor: '#555',
        width: '100%',
        backgroundColor: '#1C1C1E',
        color: 'white',
        fontSize: 16,
    },
    error: {
        color: '#ff3b30',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
        marginBottom: 10,
    },
    forgot: {
        color: '#FFA500',
        alignSelf: 'flex-end',
        marginBottom: 20,
        fontSize: 14,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    socialButton: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#2C2C2E',
        marginHorizontal: 10,
        width: 60,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialImage: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default LoginScreen;
