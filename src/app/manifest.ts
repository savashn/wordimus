export default function manifest() {
    return {
        name: 'Wordimus',
        short_name: 'Wordimus',
        description: 'Wordimus is just a blog app',
        start_url: '/',
        display: 'standalone',
        background_color: '#191919',
        theme_color: '#000000',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}