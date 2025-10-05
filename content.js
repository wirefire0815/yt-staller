function createDownloadButton() {
    if (document.getElementById('yt-dlp-download-btn')) return;

    const button = document.createElement('button');
    button.id = 'yt-dlp-download-btn';
    button.textContent = 'Download';
    button.style.position = 'fixed';
    button.style.top = '100px';
    button.style.right = '20px';
    button.style.zIndex = 9999;
    button.style.padding = '10px';
    button.style.backgroundColor = '#ff0000';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

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

    document.body.appendChild(button);
}

window.addEventListener('yt-navigate-finish', createDownloadButton);
window.addEventListener('load', createDownloadButton);
