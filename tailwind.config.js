module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/components/*.jsx', './src/pages/*'],
  },
  theme: {
    extend: {
      width: {
        100: '36rem',
      },
      borderColor: {
        'admin-blue': '#017383',
        'front-blue': '#1EA7C6',
      },
      textColor: {
        blue: '#017383',
        'lite-blue': 'rgba(1, 115, 131, 0.5)',
        'lite-white': 'rgba(255, 255, 255, 0.8)',
        'admin-blue': '#017383',
        'front-blue': '#1EA7C6',
        success: '#105821',
        error: '#731B22',
      },
      backgroundColor: {
        sky: '#DFFFFD',
        'admin-blue': '#017383',
        'admin-blue-lite': '#F6FFFE',
        'front-blue': '#1EA7C6',
        success: '#D3EDD9',
        error: '#F9D7DA',
      },
      gradientColorStops: {
        sky: '#DFFFFD',
      },
    },
  },
  variants: {},
  plugins: [],
}
