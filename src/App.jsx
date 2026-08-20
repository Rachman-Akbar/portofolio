import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import HashScroll from './components/HashScroll'

const WorkPage = lazy(() => import('./pages/WorkPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))

export default function App() {
  return (
    <>
      <HashScroll />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
