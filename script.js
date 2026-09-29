document.getElementById('coverLetterForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const jobTitle = document.getElementById('jobTitle').value;
  const companyName = document.getElementById('companyName').value;
  const keySkills = document.getElementById('keySkills').value;
  const submitBtn = document.getElementById('submitBtn');
  const output = document.getElementById('output');

  submitBtn.disabled = true;
  submitBtn.innerText = 'Generating...';
  output.value = 'Generating cover letter, please wait...';

  try {
    const response = await fetch('http://localhost:3000/generate-cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle, companyName, keySkills }),
    });

    const data = await response.json();

    if (response.ok) {
      output.value = data.coverLetter || data.result || 'Cover letter generated successfully!';
    } else {
      output.value = `Error: ${data.error || 'Failed to generate cover letter.'}`;
    }
  } catch (error) {
    output.value = 'Server connection failed. Make sure node server is running on port 3000.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Generate Cover Letter';
  }
});

// Copy to Clipboard Feature
document.getElementById('copyBtn').addEventListener('click', () => {
  const outputText = document.getElementById('output');
  if (outputText.value && !outputText.value.startsWith('Generating') && !outputText.value.startsWith('Server connection failed')) {
    navigator.clipboard.writeText(outputText.value);
    alert('Cover Letter copied to clipboard!');
  }
});