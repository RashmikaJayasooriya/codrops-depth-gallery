import '@/css/base.css'
import '@/css/canvas.css'

export const metadata = {
  title: 'Atmospheric Depth Gallery | Codrops',
  description:
    'A Three.js depth gallery where images shape their own environment - mood-driven GLSL backgrounds, parallax motion, and velocity-reactive effects.',
  keywords: [
    'three.js',
    'webgl',
    'codrops',
    'scroll',
    '3d gallery',
    'depth',
    'z-axis',
    'mood',
    'motion',
  ],
  authors: [{ name: 'Codrops' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="js">
      <body className="demo-1">{children}</body>
    </html>
  )
}
