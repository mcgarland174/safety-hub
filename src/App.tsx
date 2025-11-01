import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import HomePage from './components/home-page'
import SubstanceExplorer from './components/substance_explorer'
import ConditionExplorer from './components/condition_explorer'
import HarmReductionExplorer from './components/harm-reduction-explorer'
import CaseStudiesExplorer from './components/case-studies-explorer'
import ReferencesExplorer from './components/references-explorer'
import { FeedbackProvider } from './contexts/FeedbackContext'
import FeedbackButton from './components/FeedbackButton'
import FeedbackModal from './components/FeedbackModal'
import MedicalDisclaimerModal from './components/MedicalDisclaimerModal'

function App() {
  return (
    <FeedbackProvider>
      <MedicalDisclaimerModal />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/substances" element={<SubstanceExplorer />} />
        <Route path="/conditions" element={<ConditionExplorer />} />
        <Route path="/practices" element={<HarmReductionExplorer />} />
        <Route path="/case-studies" element={<CaseStudiesExplorer />} />
        <Route path="/references" element={<ReferencesExplorer />} />
      </Routes>
      <FeedbackButton />
      <FeedbackModal />
    </FeedbackProvider>
  )
}

export default App
