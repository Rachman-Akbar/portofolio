import { useEffect } from 'react'

export default function useRevealScope(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const targets = []
    if (scope.classList.contains('reveal')) targets.push(scope)
    targets.push(...scope.querySelectorAll('.reveal'))

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08 })

    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [scopeRef])
}
