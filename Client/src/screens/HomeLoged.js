import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeLoged = () => {
// const { fullName } = route.params;
// { route }

return (
<View style={styles.container}>
    <Text style={styles.forText}>Dear, How Can We Help You </Text>
    <Text style={styles.forText}>Please Choose</Text>
    {/* Add other profile information here */}
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgb(32, 32, 36)', // Deep dark background with a touch of purple
paddingHorizontal: 20,
},
forText: {
fontSize: 20,
color: 'rgb(138, 43, 226)', // Purple text color
marginBottom: 10,
},
});

export default HomeLoged;
