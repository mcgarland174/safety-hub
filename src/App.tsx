import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import HomePage from './components/home-page'
import SubstanceExplorer from './components/substance_explorer'
import ConditionExplorer from './components/condition_explorer'
import SubstanceComparison from './components/substance-comparison'
import HarmReductionExplorer from './components/harm-reduction-explorer'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/substances" element={<SubstanceExplorer />} />
        <Route path="/conditions" element={<ConditionExplorer />} />
        <Route path="/comparison" element={<SubstanceComparison />} />
        <Route path="/practices" element={<HarmReductionExplorer />} />
      </Routes>
    </>
  )
}

export default App
