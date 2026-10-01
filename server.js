const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 1. Root route to serve index.html on Vercel
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Cover letter generation endpoint
app.post('/generate-cover-letter', (req, res) => {
    const { candidateName, jobRole, targetCompany, keySkills } = req.body;

    const coverLetter = `Dear Hiring Manager at ${targetCompany},\n\nI am writing to express my strong interest in the ${jobRole} position at ${targetCompany}.\n\nMy key skills include ${keySkills}, and I am eager to contribute to ${targetCompany}.\n\nSincerely,\n${candidateName}`;

    res.json({ success: true, coverLetter });
});

// 3. Export for Vercel serverless function execution
module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
