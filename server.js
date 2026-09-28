 const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/generate-cover-letter', (req, res) => {
    const { candidateName, jobRole, targetCompany, keySkills } = req.body;

    const coverLetter = `Dear Hiring Manager at ${targetCompany},

I am writing to express my strong interest in the ${jobRole} position at ${targetCompany}.

My key skills include ${keySkills}, and I am eager to contribute to ${targetCompany}.

Sincerely,
${candidateName}`;

    res.json({ success: true, coverLetter });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});