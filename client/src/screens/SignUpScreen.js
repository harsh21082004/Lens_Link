import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import OrangeButton from '../assets/buttons/OrangeButton';
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

    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        dispatch(signUp({ firstName, lastName, email, password }));
    };


    const handleGoogleSignUp = () => {
        dispatch(loginWithGoogle());
    };

    return (
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
                            placeholderTextColor="#ffffff"
                        />
                        <TextInput
                            placeholder="Lastname"
                            onChangeText={setLastName}
                            style={[styles.input, styles.halfInput]}
                            placeholderTextColor="#ffffff"
                        />
                    </View>

                    {/* Email, Password */}
                    <TextInput
                        placeholder="Email"
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#ffffff"
                    />
                    <TextInput
                        placeholder="Password"
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#ffffff"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#ffffff"
                    />

                    <Text style={styles.forgot}>Forgot Password?</Text>

                    {error && <Text style={styles.error}>{error}</Text>}

                    <Text style={styles.text2}>
                        Already have an account?{' '}
                        <Text
                            style={{ fontWeight: 'bold' }}
                            onPress={() => navigation.navigate('Login')}
                        >
                            Login Here
                        </Text>
                    </Text>

                    {/* Register Button */}
                    <View style={styles.buttons}>
                        <OrangeButton
                            text={loading ? 'Registering...' : 'Register'}
                            size={18}
                            borderRadius={12}
                            disabled={loading}
                            onPress={handleRegister({
                                firstName,
                                lastName,
                                email,
                                password,
                                confirmPassword,
                            })}
                        />
                    </View>

                    <Text style={styles.text2}>Or Sign up with</Text>

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
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 28,
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'WorkSans-Regular',
    },
    text2: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'WorkSans-Regular',
        marginVertical: 15,
    },
    buttons: {
        marginTop: 10,
        width: '90%',
    },
    content: {
        width: '100%',
        paddingBottom: 50,
        paddingTop: 30,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 12,
        borderRadius: 12,
        borderColor: '#ffffff',
        width: '90%',
        backgroundColor: '#141311ff',
        color: 'white',
        fontFamily: 'WorkSans-Regular',
        fontSize: 18,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    halfInput: {
        flex: 1,
    },
    forgot: {
        color: '#ffffff',
        alignSelf: 'flex-end',
        marginRight: '5%',
        marginBottom: 10,
        fontSize: 14,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    socialButton: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        width: 50,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default SignUpScreen;
