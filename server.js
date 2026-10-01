const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main directory se static files (script.js, style.css) serve karne ke liye
app.use(express.static(path.join(__dirname)));

// API Endpoint
app.post('/generate-cover-letter', (req, res) => {
    const { candidateName, jobRole, targetCompany, keySkills } = req.body;

    const coverLetter = `Dear Hiring Manager at ${targetCompany},\n\nI am writing to express my strong interest in the ${jobRole} position at ${targetCompany}.\n\nMy key skills include ${keySkills}, and I am eager to contribute to ${targetCompany}.\n\nSincerely,\n${candidateName}`;

    res.json({ success: true, coverLetter });
});

// Root URL par index.html serve karein
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}