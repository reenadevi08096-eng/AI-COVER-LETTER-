document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('coverLetterForm');
    const outputContainer = document.getElementById('outputContainer');
    const copyBtn = document.getElementById('copyBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const candidateName = document.getElementById('candidateName').value;
            const jobRole = document.getElementById('jobRole').value;
            const targetCompany = document.getElementById('targetCompany').value;
            const keySkills = document.getElementById('keySkills').value;

            // Reset copy button if previously copied
            if (copyBtn) {
                copyBtn.innerHTML = 'Copy to Clipboard';
                copyBtn.className = 'mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2';
            }

            outputContainer.innerHTML = '<span class="text-gray-500 italic">Generating cover letter... Please wait.</span>';

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

                if (response.ok) {
                    const resultText = data.coverLetter || data.result || "Cover letter generated successfully!";
                    outputContainer.innerHTML = `<div class="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">${resultText}</div>`;
                } else {
                    outputContainer.innerHTML = `<span class="text-red-500">Error: ${data.error || 'Failed to generate.'}</span>`;
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                outputContainer.innerHTML = '<span class="text-red-500">Server connection failed. Make sure node server is running on port 3000.</span>';
            }
        });
    }

    // Copy Button with Green Tick
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const textToCopy = outputContainer.innerText;
            if (textToCopy && !textToCopy.includes('Fill the details') && !textToCopy.includes('Generating')) {
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    
                    // Button UI update to Green Tick
                    copyBtn.innerHTML = '✓ Copied!';
                    copyBtn.className = 'mt-4 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200';

                    // Revert back after 3 seconds
                    setTimeout(() => {
                        copyBtn.innerHTML = 'Copy to Clipboard';
                        copyBtn.className = 'mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2';
                    }, 3000);
                } catch (err) {
                    console.error('Copy failed', err);
                }
            }
        });
    }
});