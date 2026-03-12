class Label {
  constructor(gallery) {
    this.gallery = gallery

    this.overlayElement = null
    this.ghostIndexElement = null
    this.indexElement = null
    this.titleElement = null
    this.descriptionElement = null
    this.domainElement = null
    this.ctaElement = null
    this.activePlaneIndex = -1
  }

  createElement() {
    const element = document.createElement('section')
    element.className = 'project-overlay'
    element.innerHTML = `
      <article class="project-panel">
        <p class="project-panel__ghost-index"></p>
        <div class="project-panel__lead">
          <p class="project-panel__domain"></p>
          <h2 class="project-panel__title"></h2>
          <p class="project-panel__description"></p>
        </div>
        <div class="project-panel__aside">
          <p class="project-panel__index"></p>
          <p class="project-panel__cta">Visit Website</p>
        </div>
      </article>
    `

    return {
      element,
      ghostIndexElement: element.querySelector('.project-panel__ghost-index'),
      indexElement: element.querySelector('.project-panel__index'),
      titleElement: element.querySelector('.project-panel__title'),
      descriptionElement: element.querySelector('.project-panel__description'),
      domainElement: element.querySelector('.project-panel__domain'),
      ctaElement: element.querySelector('.project-panel__cta'),
    }
  }

  init() {
    if (this.overlayElement) return

    const {
      element,
      ghostIndexElement,
      indexElement,
      titleElement,
      descriptionElement,
      domainElement,
      ctaElement,
    } = this.createElement()

    this.overlayElement = element
    this.ghostIndexElement = ghostIndexElement
    this.indexElement = indexElement
    this.titleElement = titleElement
    this.descriptionElement = descriptionElement
    this.domainElement = domainElement
    this.ctaElement = ctaElement
    this.overlayElement.style.opacity = '0'

    document.body.append(this.overlayElement)
  }

  getDomain(url) {
    if (typeof url !== 'string' || !url) return ''

    try {
      const hostname = new URL(url).hostname
      return hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }

  getTargetPlaneIndex(cameraZ) {
    const blendData = this.gallery.getPlaneBlendData(cameraZ)
    if (!blendData) return -1
    return blendData.blend >= 0.5 ? blendData.nextPlaneIndex : blendData.currentPlaneIndex
  }

  applyPlaneContent(planeIndex) {
    const plane = this.gallery.planes[planeIndex]
    if (!plane || this.activePlaneIndex === planeIndex) return

    const labelData = plane.userData.label || {}
    const title = labelData.title || `Project ${String(planeIndex + 1).padStart(2, '0')}`
    const description = labelData.description || ''
    const projectUrl = labelData.url || plane.userData.projectUrl || ''
    const compactIndex = String(planeIndex + 1).padStart(2, '0')

    this.ghostIndexElement.textContent = compactIndex
    this.indexElement.textContent = `${compactIndex} / ${String(this.gallery.planes.length).padStart(2, '0')}`
    this.titleElement.textContent = title
    this.descriptionElement.textContent = description
    this.domainElement.textContent = this.getDomain(projectUrl)
    this.ctaElement.textContent = labelData.cta || 'Visit Website'
    this.overlayElement.style.color = labelData.color || ''

    this.activePlaneIndex = planeIndex
  }

  resize() {}

  update(camera = null) {
    if (!camera || !this.overlayElement) return

    const targetPlaneIndex = this.getTargetPlaneIndex(camera.position.z)
    if (targetPlaneIndex < 0) {
      this.overlayElement.style.opacity = '0'
      return
    }

    this.applyPlaneContent(targetPlaneIndex)
    this.overlayElement.style.opacity = '1'
  }

  render() {}

  dispose() {
    this.overlayElement?.remove()
    this.overlayElement = null
    this.ghostIndexElement = null
    this.indexElement = null
    this.titleElement = null
    this.descriptionElement = null
    this.domainElement = null
    this.ctaElement = null
    this.activePlaneIndex = -1
  }
}

export { Label }
