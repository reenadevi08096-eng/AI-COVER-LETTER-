document.getElementById('coverLetterForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const output = document.getElementById('output');

    const candidateName = document.getElementById('candidateName').value;
    const jobRole = document.getElementById('jobRole').value;
    const targetCompany = document.getElementById('targetCompany').value;
    const keySkills = document.getElementById('keySkills').value;

    submitBtn.innerText = 'Generating...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/generate-cover-letter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                candidateName,
                jobRole,
                targetCompany,
                keySkills
            })
        });

        const data = await response.json();

        if (data.success) {
            output.value = data.coverLetter;
        } else {
            output.value = 'Failed to generate cover letter. Please check input fields.';
        }
    } catch (error) {
        console.error('Error:', error);
        output.value = 'An error occurred while generating the cover letter.';
    } finally {
        submitBtn.innerText = 'Generate Cover Letter';
        submitBtn.disabled = false;
    }
});

// Copy to clipboard functionality
document.getElementById('copyBtn').addEventListener('click', function() {
    const output = document.getElementById('output');
    if (output.value) {
        navigator.clipboard.writeText(output.value);
        alert('Cover letter copied to clipboard!');
    }
});