import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

const SignUp = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [idCard, setIdCard] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        try {
            // Ensure that all fields are filled
            if (!fullName || !idCard || !age || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Read existing user data
            const userInfoPath = FileSystem.documentDirectory + 'userInfo.json';
            const fileExists = await FileSystem.getInfoAsync(userInfoPath);

            let users = [];
            if (fileExists.exists) {
                const contents = await FileSystem.readAsStringAsync(userInfoPath);
                users = JSON.parse(contents);
            }
            console.log(users);
            await FileSystem.writeAsStringAsync(userInfoPath, JSON.stringify(users), { encoding: FileSystem.EncodingType.UTF8 });

            // Check if idCard and email already exist
            const idCardExists = users.some((user) => user.idCard === idCard);
            const emailExists = users.some((user) => user.email === email);

            if (idCardExists || emailExists) {
                alert('ID Card or Email already exists');
                return;
            }

            // Add new user to the array
            const newUser = {
                fullName,
                idCard,
                age,
                email,
                password,
            };

            users.push(newUser);

            // Write updated user data back to userInfo.json
            await FileSystem.writeAsStringAsync(userInfoPath, JSON.stringify(users), { encoding: FileSystem.EncodingType.UTF8 });
            console.log(users);
            alert('Sign Up Successful!');
            navigation.navigate('HomeLoged');
        } catch (error) {
            console.error('Error handling sign up:', error.message);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setFullName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="ID Number"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    keyboardType="numeric"
                    onChangeText={(text) => setIdCard(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    keyboardType="numeric"
                    onChangeText={(text) => setAge(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 32, 36)',
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 40,
        color: 'rgb(138, 43, 226)',
        marginBottom: 30,
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

export default SignUp;

// const serverIP = 'http://192.168.56.1:3000'; // Update this IP address

//     const handleSignUp = async ({navigation}) => {
//         try {
//             // Check if passwords match
//             if (password !== confirmPassword) {
//                 console.error('Passwords do not match');
//                 return;
//             }

//             const response = await fetch(`${serverIP}/signup`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     fullName,
//                     idCard,
//                     age,
//                     email,
//                     password,
//                     confirmPass: confirmPassword,
//                 }),
//             });

//             const data = await response.json();

//             // Handle success or show an error message to the user
//             if (data.success) {
//                 navigation.navigate('HomeLoged', { user: data.user });
//             } else {
//                 // Handle error
//                 console.error(data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };