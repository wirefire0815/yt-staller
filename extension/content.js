function createDownloadButton() {
    // Avoid creating multiple buttons
    if (document.getElementById('yt-dlp-download-btn')) return;

    // Wait for YouTube's action buttons container to be ready
    const interval = setInterval(() => {
        const container = document.querySelector('#top-level-buttons-computed');

        if (container) {
            clearInterval(interval);

            const button = document.createElement('button');
            button.id = 'yt-dlp-download-btn';
            button.textContent = 'Download';
            button.style.marginLeft = '8px';
            button.style.padding = '8px 12px';
            button.style.backgroundColor = '#cc0000';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            button.style.fontSize = '14px';

            button.onclick = () => {
                const url = window.location.href;

                fetch('http://localhost:8080/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                })
                    .then(res => res.json())
                    .then(data => alert(data.status || data.error))
                    .catch(err => alert('Error: ' + err));
            };

            container.appendChild(button);
        }
    }, 500); // Check every 500ms until the DOM is ready
}

// Run on page load and after navigation
window.addEventListener('yt-navigate-finish', createDownloadButton);
window.addEventListener('load', createDownloadButton);
