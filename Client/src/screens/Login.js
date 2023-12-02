import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

const Login = ({ navigation }) => {
    const [idCard, setIdCard] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userInfoPath = FileSystem.documentDirectory + 'userInfo.json';
            const fileExists = await FileSystem.getInfoAsync(userInfoPath);

            if (!fileExists.exists) {
                alert('User information not found. Please sign up.');
                return;
            }

            const contents = await FileSystem.readAsStringAsync(userInfoPath);
            const userInfo = JSON.parse(contents);

            // Check if user credentials are valid
            const isValidUser = userInfo.some((user) => user.idCard === idCard && user.password === password);

            if (isValidUser) {
                navigation.navigate('HomeLoged');
            } else {
                alert('Invalid ID Card or Password');
            }
        } catch (error) {
            console.error('Error reading userInfo:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="ID Card"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setIdCard(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(32, 32, 36)',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        color: 'rgb(138, 43, 226)',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 16,
        color: 'white',
    },
    button: {
        backgroundColor: 'rgb(138, 43, 226)',
        borderRadius: 8,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;



// const [idCard, setIdCard] = useState('');
//     const [password, setPassword] = useState('');
//     const serverIP = 'http://192.168.56.1:3000'; // Update this IP address
//     const handleLogin = async () => {
//     try {
//         const response = await fetch(`${serverIP}/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 idCard,
//                 password,
//             }),
//         });

//         const data = await response.json();
//         console.log('Login Response:', data);

//         // Handle success or show an error message to the user
//         if (data.success) {
//             navigation.navigate('HomeLoged', { user: data.user });
//         } else {
//             // Handle error
//             console.error(data.error);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };