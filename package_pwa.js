// const fetch = require('node-fetch'); // Using built-in fetch in Node 18+
const fs = require('fs');

async function packagePWA() {
    const url = 'https://pwabuilder-win-packaging.azurewebsites.net/package';
    const payload = {
        name: "Explyra.Explyra",
        publisher: "CN=45999156-0880-44AD-BB00-5BF06F06845F",
        publisherDisplayName: "Explyra",
        url: "https://explyra.me",
        version: "1.0.0",
        provider_id: "pwabuilder"
    };

    console.log('Sending request to PWABuilder Packaging API...');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Package generated successfully!');
        console.log('Download URL:', data.downloadUrl);
        
        fs.writeFileSync('package_info.json', JSON.stringify(data, null, 2));
        console.log('Saved package info to package_info.json');
    } catch (error) {
        console.error('Failed to package PWA:', error.message);
    }
}

packagePWA();
