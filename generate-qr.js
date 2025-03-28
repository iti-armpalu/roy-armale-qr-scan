const QRCode = require('qrcode')

const url = 'https://roy-armale-qr-scan.vercel.app/scan';

QRCode.toFile('qr-code.png', url, {
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
}, function (err) {
  if (err) throw err
  console.log('✅ QR code saved as qr-code.png')
})

// If url changes, regenerate the QR code with node generate-qr.js