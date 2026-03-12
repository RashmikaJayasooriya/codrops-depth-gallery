class Label {
  constructor(gallery) {
    this.gallery = gallery

    this.overlayElement = null
    this.indexElement = null
    this.titleElement = null
    this.descriptionElement = null
    this.visitSiteElement = null
    this.activePlaneIndex = -1
  }

  createElement() {
    const element = document.createElement('section')
    element.className = 'plane-label-overlay'
    element.innerHTML = `
      <article class="project-info-card">
        <p class="project-info-card__index"></p>
        <h2 class="project-info-card__title"></h2>
        <p class="project-info-card__description"></p>
        <a class="project-info-card__link" target="_blank" rel="noreferrer noopener">Visit Site</a>
      </article>
    `

    return {
      element,
      indexElement: element.querySelector('.project-info-card__index'),
      titleElement: element.querySelector('.project-info-card__title'),
      descriptionElement: element.querySelector('.project-info-card__description'),
      visitSiteElement: element.querySelector('.project-info-card__link'),
    }
  }

  init() {
    if (this.overlayElement) return

    const { element, indexElement, titleElement, descriptionElement, visitSiteElement } =
      this.createElement()

    this.overlayElement = element
    this.indexElement = indexElement
    this.titleElement = titleElement
    this.descriptionElement = descriptionElement
    this.visitSiteElement = visitSiteElement
    this.overlayElement.style.opacity = '0'
    this.overlayElement.classList.add('plane-label-overlay--sidebar')

    const projectInfoSlot = document.getElementById('project-info-slot')
    if (projectInfoSlot) {
      projectInfoSlot.append(this.overlayElement)
      return
    }

    document.body.append(this.overlayElement)
  }

  getTargetPlaneIndex(cameraZ) {
    const blendData = this.gallery.getPlaneBlendData(cameraZ)
    if (!blendData) return -1
    return blendData.blend >= 0.5 ? blendData.nextPlaneIndex : blendData.currentPlaneIndex
  }

  applyPlaneContent(planeIndex) {
    const plane = this.gallery.planes[planeIndex]
    if (!plane) return

    if (this.activePlaneIndex === planeIndex) return

    const labelData = plane.userData.label || {}
    const totalProjects = this.gallery.planes.length || 1
    this.indexElement.textContent = `Project ${planeIndex + 1}/${totalProjects}`
    this.titleElement.textContent = labelData.word || 'Untitled Project'
    this.descriptionElement.textContent = labelData.description || 'No description available.'
    this.visitSiteElement.href = labelData.url || '#'
    this.visitSiteElement.setAttribute('aria-disabled', labelData.url ? 'false' : 'true')
    this.visitSiteElement.tabIndex = labelData.url ? 0 : -1
    this.visitSiteElement.style.pointerEvents = labelData.url ? 'auto' : 'none'
    this.visitSiteElement.style.opacity = labelData.url ? '1' : '0.45'

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
    this.indexElement = null
    this.titleElement = null
    this.descriptionElement = null
    this.visitSiteElement = null
    this.activePlaneIndex = -1
  }
}

export { Label }
