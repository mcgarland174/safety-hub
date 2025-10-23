import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import HomePage from './components/home-page'
import SubstanceExplorer from './components/substance_explorer'
import ConditionExplorer from './components/condition_explorer'
import HarmReductionExplorer from './components/harm-reduction-explorer'
import CaseStudiesExplorer from './components/case-studies-explorer'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/substances" element={<SubstanceExplorer />} />
        <Route path="/conditions" element={<ConditionExplorer />} />
        <Route path="/practices" element={<HarmReductionExplorer />} />
        <Route path="/case-studies" element={<CaseStudiesExplorer />} />
      </Routes>
    </>
  )
}

export default App
