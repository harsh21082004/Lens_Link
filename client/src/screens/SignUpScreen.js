import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView,
    StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, signUp } from '../redux/services/authSlice';

const SignUpScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleRegister = () => {
        setPasswordError('');
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        dispatch(signUp({ firstName, lastName, email, password }));
    };


    const handleGoogleSignUp = () => {
        dispatch(loginWithGoogle());
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#141311' }}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={require('../assets/signup-bg.png')}
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                    imageStyle={{ opacity: 0.9 }}
                >
                    <View style={styles.content}>
                        <Text style={styles.title}>Create Account</Text>

                        {/* First & Last Name */}
                        <View style={styles.row}>
                            <TextInput
                                placeholder="Firstname"
                                onChangeText={setFirstName}
                                style={[styles.input, styles.halfInput, { marginRight: 8 }]}
                                placeholderTextColor="#aaa"
                            />
                            <TextInput
                                placeholder="Lastname"
                                onChangeText={setLastName}
                                style={[styles.input, styles.halfInput]}
                                placeholderTextColor="#aaa"
                            />
                        </View>

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
                        <TextInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.input}
                            secureTextEntry
                            placeholderTextColor="#aaa"
                        />

                        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
                        {error && <Text style={styles.error}>{error}</Text>}

                        {/* Register Button */}
                        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
                        </TouchableOpacity>

                        <Text style={styles.text2}>
                            Already have an account?{' '}
                            <Text
                                style={{ fontWeight: 'bold', color: '#FFA500' }}
                                onPress={() => navigation.navigate('Login')}
                            >
                                Login Here
                            </Text>
                        </Text>

                        <Text style={styles.text2}>Or sign up with</Text>

                        {/* Social Buttons */}
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
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
        marginBottom: 12,
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
        textAlign: 'center',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    halfInput: {
        flex: 1,
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

export default SignUpScreen;
