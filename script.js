const form = document.getElementById('coverLetterForm');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const candidateName = document.getElementById('candidateName').value;
  const jobRole = document.getElementById('jobRole').value;
  const targetCompany = document.getElementById('targetCompany').value;
  const keySkills = document.getElementById('keySkills').value;

  // UI Loading State
  submitBtn.disabled = true;
  submitBtn.innerText = 'Generating...';
  output.value = 'Generating your cover letter, please wait...';

  try {
    const response = await fetch('/api/generate-cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: candidateName,
        jobRole: jobRole,
        targetCompany: targetCompany,
        keySkills: keySkills
      }),
    });

    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }

    const data = await response.json();
    output.value = data.coverLetter || 'No cover letter generated.';
  } catch (error) {
    console.error('Error:', error);
    output.value = 'Failed to generate cover letter. Please make sure you run the app using "vercel dev" in terminal.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Generate Cover Letter';
  }
});

// Copy to Clipboard Utility
copyBtn.addEventListener('click', () => {
  if (!output.value) return;
  navigator.clipboard.writeText(output.value).then(() => {
    const originalText = copyBtn.innerText;
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyBtn.innerText = originalText;
    }, 2000);
  });
});