const portfolioProjects = [
  {
    id: 'ma-production-group',
    title: 'MA Production Group',
    description:
      'Professional red iron and cold form steel structures for residential, commercial, and agricultural use.',
    image: '/maproduction-mockup.webp',
    url: 'https://maproduction.biz/',
    bgColor: '#171b2e',
  },
  {
    id: 'ppfg',
    title: 'Primary Physicians Florida Group',
    description:
      'Healthcare service site architecture centered on trust, clarity, and patient-first conversion flow.',
    image: '/ppfg-mockup.png',
    url: 'https://ppfgchiropractor.com/',
    bgColor: '#16333a',
  },
  {
    id: 'uncle-joes-new-york-diner',
    title: "Uncle Joe's New York Diner",
    description:
      'Restaurant digital presence capturing classic New York diner character and menu-led discovery.',
    image: '/new-york-diner-mockup.png',
    url: 'https://unclejoesnewyorkdiner.makeitviralmedia.com/',
    bgColor: '#3a231b',
  },
  {
    id: 'sultanraha-bespoke',
    title: 'SultanRaha Bespoke',
    description:
      'Bespoke tailoring showcase with elevated visuals and conversion-driven luxury positioning.',
    image: '/sultan-raha-mockup.png',
    url: 'https://sultanraha.com',
    bgColor: '#2e1f1f',
  },
  {
    id: 'qi-foot-massage',
    title: 'Qi Foot Massage',
    description:
      'Wellness brand experience focused on calm presentation, service clarity, and appointment intent.',
    image: '/qi-foot-massage-mockup.png',
    url: 'https://qifootmassage.com',
    bgColor: '#2d2338',
  },
  {
    id: 'interactive-tutors',
    title: 'Interactive Tutors',
    description:
      'Personalized education platform with approachable information design for students and families.',
    image: '/interactive-tutors-mockup.png',
    url: 'https://www.interactivetutors.org',
    bgColor: '#1d2b3c',
  },
  {
    id: 'a-plus-quick-locksmith',
    title: 'A Plus Quick Locksmith',
    description:
      'Fast-response locksmith service site structured for urgent intent and high trust conversion paths.',
    image: '/locksmith-mockup.png',
    url: 'https://aplusquicklocksmith.com',
    bgColor: '#262e38',
  },
  {
    id: 'joes-new-york-diner',
    title: "Joe's New York Diner",
    description:
      'Classic diner storytelling online with modern UX patterns for discovery and repeat customer action.',
    image: '/joes-new-york-dinner-mockup.png',
    url: 'https://joesnewyorkdiner.com/',
    bgColor: '#40251f',
  },
  {
    id: 'viraj-amarasinghe',
    title: 'Viraj Amarasinghe',
    description:
      'Personal brand website balancing authority, credibility, and a clean service-first narrative.',
    image: '/viraj-amarasinghe-mockup.png',
    url: 'https://virajamarasinghe.com',
    bgColor: '#1f2633',
  },
  {
    id: 'heritage-education-center',
    title: 'Heritage Educational Center',
    description:
      'Education-focused web platform supporting tutoring, test preparation, and student success services.',
    image: '/heritage-education-center-mockup.png',
    url: 'https://heritageeducationcenter.com/',
    bgColor: '#1b2f40',
  },
  {
    id: 'grand-limo-dc',
    title: 'GrandLimoDC',
    description:
      'Premium transportation website experience with strong service clarity and booking-oriented messaging.',
    image: '/grand-limo-dc-mockup.png',
    url: 'https://grandlimodc.com/',
    bgColor: '#1f1f24',
  },
  {
    id: 'lakmal-realtor',
    title: 'Lakmal Realtor',
    description:
      'Real estate, property management, and accounting workflows delivered through one trusted platform.',
    image: '/lakmal-realtor-mockup.png',
    url: 'https://lakmalrealtor.com/',
    bgColor: '#1f2435',
  },
  {
    id: 'caviar-dreams',
    title: 'Caviar Dreams',
    description:
      'Luxury travel experiences with bespoke itineraries, premium bookings, and curated concierge service.',
    image: '/caviar-dreams-mockup.png',
    url: 'https://dreamtravelthings.com/',
    bgColor: '#2c1f2a',
  },
  {
    id: 'rush-tea',
    title: 'Rush Tea',
    description:
      'A vibrant e-commerce tea experience focused on premium Sri Lankan blends and product storytelling.',
    image: '/rushtea-mockup.png',
    url: 'https://rushtealanka.com/',
    bgColor: '#223624',
  },
  {
    id: 'weld-unity',
    title: 'Weld Unity',
    description:
      'Custom welding and fabrication brand presence designed to convert residential and commercial leads.',
    image: '/unity-welding-mockup.png',
    url: 'https://weldunity.com/',
    bgColor: '#2b2f34',
  },
]

const xPattern = [-0.9, 0.8, -0.7, 1, -0.75, 0.9]

const mixHex = (hex, target, targetWeight) => {
  const base = hex.replace('#', '')
  const to = target.replace('#', '')
  const weight = Math.min(Math.max(targetWeight, 0), 1)

  const r = Math.round(
    Number.parseInt(base.slice(0, 2), 16) * (1 - weight) +
      Number.parseInt(to.slice(0, 2), 16) * weight
  )
  const g = Math.round(
    Number.parseInt(base.slice(2, 4), 16) * (1 - weight) +
      Number.parseInt(to.slice(2, 4), 16) * weight
  )
  const b = Math.round(
    Number.parseInt(base.slice(4, 6), 16) * (1 - weight) +
      Number.parseInt(to.slice(4, 6), 16) * weight
  )

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`
}

const getContrastText = (hex) => {
  const value = hex.replace('#', '')
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.58 ? '#141414' : '#f4f4f4'
}

const galleryPlaneData = portfolioProjects.map((project, index) => {
  const backgroundColor = project.bgColor
  return {
    fallbackColor: '#ffffff',
    accentColor: mixHex(backgroundColor, '#ffffff', 0.45),
    textureSrc: `/api/image?path=${encodeURIComponent(project.image)}`,
    projectUrl: project.url,
    position: { x: xPattern[index % xPattern.length], y: 0 },
    backgroundColor,
    blob1Color: mixHex(backgroundColor, '#ffffff', 0.2),
    blob2Color: mixHex(backgroundColor, '#000000', 0.15),
    label: {
      title: project.title,
      description: project.description,
      url: project.url,
      cta: 'Visit Website',
      color: getContrastText(backgroundColor),
    },
  }
})

export { galleryPlaneData }
