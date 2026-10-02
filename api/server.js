const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main API Endpoint
app.post('/generate-cover-letter', (req, res) => {
    const { candidateName, jobRole, targetCompany, keySkills } = req.body;

    const coverLetter = `Dear Hiring Manager at ${targetCompany},\n\nI am writing to express my strong interest in the ${jobRole} position at ${targetCompany}.\n\nMy key skills include ${keySkills}, and I am eager to contribute to ${targetCompany}.\n\nSincerely,\n${candidateName}`;

    res.json({ success: true, coverLetter });
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}