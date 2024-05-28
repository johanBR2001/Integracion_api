document.getElementById('loginButton').addEventListener('click', function() {
    const clientId = 'YOUR_CLIENT_ID_HERE';
    const redirectUri = 'http://localhost:8080';
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.readonly';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
});

// Esta función manejará el callback de OAuth
window.onload = function() {
    if (window.location.search.includes('code=')) {
        const code = new URLSearchParams(window.location.search).get('code');
        const clientId = 'YOUR_CLIENT_ID_HERE';
        const clientSecret = 'YOUR_CLIENT_SECRET_HERE';
        const redirectUri = 'http://localhost:8080';

        fetch('https://accounts.google.com/o/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code: code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            })
        })
        .then(response => response.json())
        .then(data => {
            const token = data.access_token;
            fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(userData => {
                if (userData.email) {
                    window.location.href = `main.html?token=${token}`;
                }
            });
        })
        .catch(error => console.error('Error:', error));
    }
};
