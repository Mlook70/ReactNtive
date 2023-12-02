const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle signup requests
app.post('/signup', (req, res) => {
    const { fullName, idCard, age, email, password, confirmPass } = req.body;

    
    // Validate input (you may want to add more validation)
    if (!fullName || !email || !password || !idCard || !age || !confirmPass) {
        // return res.status(400).json({ error: 'Missing required fields' });
        // console.log("Error");
    }

    // Read existing user data from the JSON file
    const userData = readUserData();

    // Check if the username or email already exists
    if (userData.some(user => user.idCard === idCard || user.email === email)) {
        return res.status(409).json({ error: 'ID Number or email already exists' });
    }

    // Add the new user to the user data
    userData.push({ fullName, idCard, age, email, password, confirmPass });

    // Write the updated user data back to the JSON file
    writeUserData(userData);

    res.json({ success: true, message: 'User registered successfully' });
});

// Endpoint to handle login requests
app.post('/login', (req, res) => {
    const { idCard, password } = req.body;

    // Read existing user data from the JSON file
    const userData = readUserData();

    // Check if the provided username and password match any user
    const user = userData.find(u => u.idCard === idCard && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Login successful', user });
    } else {
        res.status(401).json({ error: 'Invalid ID Number or password' });
    }
});

// Helper function to read user data from the JSON file
const readUserData = () => {
    try {
        const data = fs.readFileSync('userInfo.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If the file does not exist or is empty, return an empty array
        return [];
    }
};

// Helper function to write user data to the JSON file
const writeUserData = (data) => {
    fs.writeFileSync('userInfo.json', JSON.stringify(data, null, 2), 'utf-8');
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
