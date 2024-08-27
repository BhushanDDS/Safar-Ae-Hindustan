function combineParameters(Uid, Pid, Eid, Date, RandomNumber) {
    const specialChars = ['#', '@', '$', '%', '*', '^', '\\', '/'];

    function getRandomChar() {
        return specialChars[Math.floor(Math.random() * specialChars.length)];
    }

    const combinedString = `${Uid}${getRandomChar()}${Pid}${getRandomChar()}${Eid}${getRandomChar()}${Date.replace(/-/g, '')}${getRandomChar()}${RandomNumber}`;

    return combinedString;
}

const result = combineParameters(257, '012', 347, '28-08-2024', 7598);
console.log(result);

function generateQRCode(data) {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Failed to generate QR code');
            }
        })
        .then(blob => {
            const qrCodeUrl = URL.createObjectURL(blob);
            // Display the QR code in an img element
            const imgElement = document.createElement('img');
            imgElement.src = qrCodeUrl;
            document.body.appendChild(imgElement);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Generate and display the QR code
generateQRCode(result);
