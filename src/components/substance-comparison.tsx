import React, { useState } from 'react';
import { Info, ChevronRight } from 'lucide-react';

const SubstanceComparison = () => {
  const [selectedForComparison, setSelectedForComparison] = useState(['psilocybin', 'lsd']);

  const substances = [
    { id: 'psilocybin', name: 'Psilocybin', aliases: ['Magic Mushrooms', 'Shrooms'] },
    { id: 'lsd', name: 'LSD', aliases: ['Acid'] },
    { id: 'mdma', name: 'MDMA', aliases: ['Ecstasy', 'Molly'] },
    { id: 'ayahuasca', name: 'Ayahuasca', aliases: ['Yagé'] },
    { id: 'ketamine', name: 'Ketamine', aliases: ['Special K'] },
  ];

  const toggleSubstanceComparison = (substanceId) => {
    if (selectedForComparison.includes(substanceId)) {
      if (selectedForComparison.length > 1) {
        setSelectedForComparison(selectedForComparison.filter(id => id !== substanceId));
      }
    } else {
      if (selectedForComparison.length < 3) {
        setSelectedForComparison([...selectedForComparison, substanceId]);
      }
    }
  };

  // Comparison data
  const comparisonData = {
    psilocybin: {
      duration: '3-6 hours',
      onset: '20-40 min',
      peakIntensity: 'Moderate to High',
      physicalSafety: 'Very Low Toxicity',
      commonAdverse: ['Nausea (Common)', 'Anxiety (15-31%)', 'Increased HR/BP'],
      criticalRisks: ['Psychotic disorders', 'Uncontrolled hypertension', 'Active mania'],
      uniqueConsiderations: ['Most research backing', 'Predictable duration', 'Lower risk than MDMA/Ketamine'],
      addictionPotential: 'Minimal',
      erRate: '0.6%',
      legalStatus: 'Schedule I (USA)'
    },
    lsd: {
      duration: '8-12 hours',
      onset: '30-90 min',
      peakIntensity: 'High',
      physicalSafety: 'Very Low Toxicity',
      commonAdverse: ['Anxiety (64% first-time)', 'Increased HR/BP', 'Pupil dilation'],
      criticalRisks: ['Psychotic disorders', 'Uncontrolled hypertension', 'Active mania'],
      uniqueConsiderations: ['Much longer duration', 'Higher HPPD association', 'Adulteration risk (NBOMe)'],
      addictionPotential: 'Minimal',
      erRate: '1%',
      legalStatus: 'Schedule I (USA)'
    },
    mdma: {
      duration: '3-5 hours',
      onset: '30-45 min',
      peakIntensity: 'High',
      physicalSafety: 'Moderate Risk',
      commonAdverse: ['Hyponatremia risk (31-37%)', 'Hyperthermia', 'Jaw clenching', 'Comedown effects'],
      criticalRisks: ['Cardiovascular disease', 'Liver/kidney issues', 'SSRIs/MAOIs', 'Dehydration risks'],
      uniqueConsiderations: ['Higher physiological risk', 'Neurotoxicity concerns', 'Sex differences (women higher risk)'],
      addictionPotential: 'Low to Moderate',
      erRate: '1%',
      legalStatus: 'Schedule I (USA)'
    },
    ketamine: {
      duration: '1-2 hours',
      onset: '5-20 min (depends on ROA)',
      peakIntensity: 'High',
      physicalSafety: 'Moderate Risk',
      commonAdverse: ['Dissociation', 'Nausea', 'Confusion', 'Bladder issues (chronic use)'],
      criticalRisks: ['Uncontrolled hypertension', 'Increased ICP', 'Liver disease', 'Psychotic disorders'],
      uniqueConsiderations: ['Shorter acting', 'Dissociative (different mechanism)', 'Bladder damage with frequent use'],
      addictionPotential: 'Moderate',
      erRate: '0.6%',
      legalStatus: 'Schedule III (USA)'
    },
    ayahuasca: {
      duration: '4-6 hours',
      onset: '20-60 min',
      peakIntensity: 'High',
      physicalSafety: 'Low Toxicity (with proper preparation)',
      commonAdverse: ['Purging (expected)', 'Nausea/vomiting', 'Diarrhea', 'Anxiety'],
      criticalRisks: ['MAOIs require dietary restrictions', 'Psychotic disorders', 'SSRIs (serotonin syndrome)'],
      uniqueConsiderations: ['Contains MAOIs', 'Requires dietary prep', 'Ceremonial context important', 'Higher trauma reactivation'],
      addictionPotential: 'Minimal',
      erRate: 'Variable',
      legalStatus: 'Complex (religious exemptions exist)'
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Compare Substance Safety Profiles</h2>
          <p className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>Select 2-3 substances to compare side-by-side</p>
        </div>

        {/* Substance Selection */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
          <h3 className="font-semibold mb-4 text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Select Substances (2-3)</h3>
          <div className="flex flex-wrap gap-3">
            {substances.map(substance => (
              <button
                key={substance.id}
                onClick={() => toggleSubstanceComparison(substance.id)}
                disabled={!selectedForComparison.includes(substance.id) && selectedForComparison.length >= 3}
                className={`px-4 py-2 rounded-[12px] font-medium text-sm transition-all ${
                  selectedForComparison.includes(substance.id)
                    ? 'bg-[#FCA300] text-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]'
                    : selectedForComparison.length >= 3
                    ? 'bg-[#FFF9F5] text-[#4E4E4E] cursor-not-allowed'
                    : 'bg-[#FFF9F5] text-[#2C1B11] hover:bg-[#FEEAD8]'
                }`}
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                {substance.name}
                {selectedForComparison.includes(substance.id) && ' ✓'}
              </button>
            ))}
          </div>
          {selectedForComparison.length >= 3 && (
            <p className="text-xs text-[#4E4E4E] mt-2" style={{fontFamily: 'Inter, sans-serif'}}>Maximum 3 substances can be compared at once</p>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#007F6E]">
                <tr>
                  <th className="text-left p-4 font-semibold text-white border-r border-[#00594E]" style={{fontFamily: 'Satoshi, sans-serif'}}>Characteristic</th>
                  {selectedForComparison.map(id => {
                    const substance = substances.find(s => s.id === id);
                    return (
                      <th key={id} className="text-left p-4 font-semibold text-white" style={{fontFamily: 'Satoshi, sans-serif'}}>
                        {substance?.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* Duration */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>Duration</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{comparisonData[id]?.duration}</td>
                  ))}
                </tr>

                {/* Onset */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>Onset</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{comparisonData[id]?.onset}</td>
                  ))}
                </tr>

                {/* Peak Intensity */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>Peak Intensity</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{comparisonData[id]?.peakIntensity}</td>
                  ))}
                </tr>

                {/* Physical Safety Profile */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>Physical Safety</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-[12px] text-xs font-medium ${
                        comparisonData[id]?.physicalSafety.includes('Very Low') ? 'bg-green-100 text-green-700' :
                        comparisonData[id]?.physicalSafety.includes('Low') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`} style={{fontFamily: 'Inter, sans-serif'}}>
                        {comparisonData[id]?.physicalSafety}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* ER Visit Rate */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>ER Visit Rate</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{comparisonData[id]?.erRate}</td>
                  ))}
                </tr>

                {/* Addiction Potential */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>Addiction Potential</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-[12px] text-xs font-medium ${
                        comparisonData[id]?.addictionPotential === 'Minimal' ? 'bg-green-100 text-green-700' :
                        comparisonData[id]?.addictionPotential.includes('Low') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`} style={{fontFamily: 'Inter, sans-serif'}}>
                        {comparisonData[id]?.addictionPotential}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Common Adverse Events */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5] align-top" style={{fontFamily: 'Satoshi, sans-serif'}}>Common Adverse Events</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4">
                      <ul className="space-y-1">
                        {comparisonData[id]?.commonAdverse.map((event, idx) => (
                          <li key={idx} className="text-xs text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>• {event}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Critical Contraindications */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5] align-top" style={{fontFamily: 'Satoshi, sans-serif'}}>Critical Contraindications</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4">
                      <ul className="space-y-1">
                        {comparisonData[id]?.criticalRisks.map((risk, idx) => (
                          <li key={idx} className="text-xs text-red-700" style={{fontFamily: 'Inter, sans-serif'}}>• {risk}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Unique Considerations */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5] align-top" style={{fontFamily: 'Satoshi, sans-serif'}}>Unique Considerations</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4">
                      <ul className="space-y-1">
                        {comparisonData[id]?.uniqueConsiderations.map((consideration, idx) => (
                          <li key={idx} className="text-xs text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>• {consideration}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Legal Status */}
                <tr className="border-t border-[#E8D9C8] hover:bg-[#FFF9F5]">
                  <td className="p-4 font-medium text-[#2C1B11] border-r border-[#E8D9C8] bg-[#FFF9F5]" style={{fontFamily: 'Satoshi, sans-serif'}}>Legal Status (USA)</td>
                  {selectedForComparison.map(id => (
                    <td key={id} className="p-4 text-xs text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{comparisonData[id]?.legalStatus}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Decision Guide */}
        <div className="bg-[#FEEAD8] border-2 border-[#E8D9C8] p-6 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[#2C1B11] mb-3 flex items-center" style={{fontFamily: 'Satoshi, sans-serif'}}>
            <Info className="w-5 h-5 mr-2" />
            Interpretation Guide
          </h3>
          <div className="space-y-2 text-sm text-[#6C3000]" style={{fontFamily: 'Inter, sans-serif'}}>
            <p><strong style={{fontFamily: 'Satoshi, sans-serif'}}>Duration:</strong> Longer duration is not necessarily riskier, but it does require more time commitment and planning. Consider your schedule and support availability.</p>
            <p><strong style={{fontFamily: 'Satoshi, sans-serif'}}>Physical Safety:</strong> Classical psychedelics (psilocybin, LSD) have very low physiological toxicity with no known lethal dose. MDMA and ketamine require more medical caution due to cardiovascular and other physiological effects.</p>
            <p><strong style={{fontFamily: 'Satoshi, sans-serif'}}>ER Rates:</strong> These are low percentages overall, but comprehensive screening and proper setting can reduce these rates even further.</p>
            <p><strong style={{fontFamily: 'Satoshi, sans-serif'}}>Common vs Critical:</strong> Common adverse events are typically manageable with appropriate support and preparation. Critical contraindications require professional medical or psychiatric assessment before considering use.</p>
            <p><strong style={{fontFamily: 'Satoshi, sans-serif'}}>Addiction Potential:</strong> Most classical psychedelics have minimal addiction potential. However, ketamine shows moderate potential, especially with frequent use.</p>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
          <h3 className="font-semibold mb-3 text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Want More Details?</h3>
          <p className="text-sm text-[#4E4E4E] mb-4" style={{fontFamily: 'Inter, sans-serif'}}>Each substance has a comprehensive safety profile with detailed information about adverse events, risk factors, dosing, pharmacokinetics, and clinical context.</p>
          <div className="flex flex-wrap gap-3">
            {selectedForComparison.map(id => {
              const substance = substances.find(s => s.id === id);
              return (
                <button
                  key={id}
                  className="px-4 py-2 bg-[#FEEAD8] text-[#D26600] rounded-[12px] hover:bg-[#FFD480] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-colors text-sm font-medium flex items-center"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  View {substance?.name} Full Profile
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstanceComparison;