import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function HashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      if (location.pathname !== '/') window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(location.hash.slice(1))
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })

    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return null
}
