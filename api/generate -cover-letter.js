export default function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    try {
        const { candidateName, jobRole, targetCompany, keySkills } = req.body || {};

        // Input validation
        if (!candidateName || !jobRole || !targetCompany) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: Name, Job Role, and Target Company are required.' 
            });
        }

        // Clean template string for cover letter
        const coverLetter = `Dear Hiring Manager at ${targetCompany},

I am writing to express my strong interest in the ${jobRole} position at ${targetCompany}. With a solid foundation in software development and a passion for building efficient web applications, I am eager to contribute to your team's success.

My key technical skills and expertise include:
${keySkills ? keySkills.split(',').map(skill => `- ${skill.trim()}`).join('\n') : '- Web Development & Problem Solving'}

I am confident that my skills and enthusiasm make me a strong candidate for this role. I look forward to the opportunity to discuss how my background aligns with ${targetCompany}'s goals.

Thank you for your time and consideration.

Sincerely,
${candidateName}`;

        return res.status(200).json({ 
            success: true, 
            coverLetter 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error', 
            details: error.message 
        });
    }
}