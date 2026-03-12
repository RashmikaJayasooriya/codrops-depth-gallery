import DepthGalleryCanvas from '@/components/DepthGalleryCanvas'

export default function HomePage() {
  return (
    <main>
      <header className="frame">
        <h1 className="frame__title">
          Atmospheric Depth Gallery by{' '}
          <a href="https://houmahani.com" target="_blank" rel="noreferrer">
            Houmahani Kane
          </a>
        </h1>
        <a className="frame__back" href="https://tympanus.net/codrops/?p=111409">
          Article
        </a>
        <a className="frame__archive" href="https://tympanus.net/codrops/hub/">
          All demos
        </a>
        <a className="frame__github" href="https://github.com/houmahani/codrops-depth-gallery/">
          GitHub
        </a>
        <nav className="frame__tags">
          <a href="https://tympanus.net/codrops/hub/tag/scroll/">#scroll</a>
          <a href="https://tympanus.net/codrops/hub/tag/three-js/">#three.js</a>
          <a href="https://tympanus.net/codrops/hub/tag/webgl/">#webgl</a>
          <a href="https://tympanus.net/codrops/hub/tag/glsl/">#glsl</a>
        </nav>
        <nav className="frame__credit">
          <p>
            Color chip layout inspired by{' '}
            <a href="https://www.instagram.com/p/DU2JTU_AEwM/?img_index=3" target="_blank" rel="noreferrer">
              @thisislandscape
            </a>
          </p>
          <p>Press D to see the debug tools</p>
        </nav>
      </header>
      <div className="content">
        <DepthGalleryCanvas />
      </div>
    </main>
  )
}
