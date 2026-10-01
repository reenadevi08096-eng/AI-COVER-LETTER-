document.getElementById('coverLetterForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const outputArea = document.getElementById('output');

    // Input values fetch karna
    const candidateName = document.getElementById('candidateName').value;
    const jobRole = document.getElementById('jobRole').value;
    const targetCompany = document.getElementById('targetCompany').value;
    const keySkills = document.getElementById('keySkills').value;

    submitBtn.innerText = 'Generating...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/generate-cover-letter', {
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
            outputArea.value = data.coverLetter;
        } else {
            outputArea.value = 'Failed to generate cover letter. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        outputArea.value = 'An error occurred while connecting to the server.';
    } finally {
        submitBtn.innerText = 'Generate Cover Letter';
        submitBtn.disabled = false;
    }
});

// Copy to Clipboard logic
document.getElementById('copyBtn').addEventListener('click', function() {
    const outputText = document.getElementById('output');
    if (outputText.value) {
        outputText.select();
        navigator.clipboard.writeText(outputText.value);
        alert('Copied to clipboard!');
    }
});