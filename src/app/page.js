import DepthGalleryCanvas from '@/components/DepthGalleryCanvas'

export default function HomePage() {
  return (
    <main className="portfolio-layout">
      <aside className="portfolio-panel">
        <div className="portfolio-panel__inner">
          <p className="portfolio-panel__eyebrow">Our Portfolio</p>
          <h1 className="portfolio-panel__title">Cinematic project depth gallery</h1>
          <p className="portfolio-panel__summary">
            Scroll to fly through projects in 3D space. Hover on desktop or tap on mobile to
            reveal a focused project.
          </p>
          <div id="project-info-slot" className="portfolio-panel__project-slot" />
        </div>
      </aside>
      <section className="portfolio-stage" aria-label="Project gallery stage">
        <div className="portfolio-stage__veil" />
        <DepthGalleryCanvas />
      </section>
    </main>
  )
}
