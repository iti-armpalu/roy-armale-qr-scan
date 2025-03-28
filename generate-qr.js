const QRCode = require('qrcode')

const url = 'https://roy-armale-qr-scan.vercel.app'

QRCode.toFile('qr-code.png', url, {
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
}, function (err) {
  if (err) throw err
  console.log('✅ QR code saved as qr-code.png')
})
