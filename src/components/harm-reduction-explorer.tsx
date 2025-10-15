import React, { useState, useMemo } from 'react';
import { Search, AlertCircle, Users, Heart, Brain, Filter, ChevronDown, ChevronRight, X, Check, Star, ExternalLink, FileText, Video, Globe, BookOpen } from 'lucide-react';
import { harmReductionResources } from '../data/harm-reduction-resources';

// Sample data structure based on the schemas
const harmReductionPractices = [
  // Screening & Consent - Pre-session
  {
    id: "hrp_screening_comprehensive_001",
    name: "Comprehensive Medical and Psychiatric Screening",
    category: "screening_consent",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "retreat"],
    timing: ["pre_session"],
    mitigatesRisks: ["psychotic_disorders", "bipolar", "cardiovascular", "trauma_history"],
    objectives: [
      "Identify absolute and relative contraindications",
      "Assess psychological vulnerabilities",
      "Evaluate risk factors",
      "Minimize adverse events"
    ],
    components: [
      "Standardized questionnaires (Swiss Psychedelic Side Effects Inventory)",
      "Clinical interviews by trained professionals",
      "Medical evaluations (physical exam, ECG, blood pressure)",
      "Contraindication assessment (absolute and relative)"
    ],
    description: "Systematic assessment of medical and psychiatric history to identify contraindications and ensure participant safety.",
    outcomes: "Screening significantly reduces severe adverse events. In screened populations: serious adverse events occurred in 4% of participants with prior psychiatric disorders vs 0% in healthy participants. 82% of psychedelic-related deaths involved polysubstance use—comprehensive screening could prevent many of these by identifying medication interactions and substance use patterns.",
    prevalenceData: "Resource requirements: 2-4 hours initial screening time with trained medical/psychiatric professionals. Tools include standardized assessment instruments.",
    applicableTo: ["all_substances"],
    resources: [
      {
        type: "paper",
        title: "Human hallucinogen research: guidelines for safety",
        authors: "Johnson, M. W., Richards, W. A., & Griffiths, R. R.",
        journal: "Journal of Psychopharmacology",
        year: 2008,
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3056407/",
        accessType: "free",
        description: "THE foundational paper that revitalized psychedelic research. Comprehensive safety guidelines including volunteer screening, exclusion criteria, and session protocols. Field standard for 15+ years."
      },
      {
        type: "protocol",
        title: "MDMA-Assisted Psychotherapy Treatment Manual",
        organization: "MAPS",
        year: 2015,
        url: "https://maps.org/research-archive/mdma/MDMA-Assisted-Psychotherapy-Treatment-Manual-Version7-19Aug15-FINAL.pdf",
        accessType: "free",
        description: "Official FDA Phase 3 trial protocol. Detailed screening procedures including psychiatric interviews, medical evaluations, and contraindication assessment."
      },
      {
        type: "video",
        title: "Dr. Matthew Johnson: Psychedelics for Treating Mental Disorders",
        platform: "Huberman Lab Podcast",
        author: "Dr. Matthew Johnson, Johns Hopkins",
        duration: "2h 30m",
        year: 2023,
        url: "https://www.hubermanlab.com/episode/dr-matthew-johnson-psychedelic-medicine",
        description: "Leading researcher discusses clinical screening protocols, contraindications, and risk assessment from years of Johns Hopkins studies."
      },
      {
        type: "website",
        title: "Center for Psychedelic & Consciousness Research",
        organization: "Johns Hopkins University",
        url: "https://hopkinspsychedelic.org/",
        description: "Leading academic center's research protocols and screening procedures. Gold standard in psychedelic research methodology."
      }
    ]
  },
  {
    id: "hrp_informed_consent_enhanced_001",
    name: "Enhanced Informed Consent",
    category: "screening_consent",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "retreat", "therapeutic"],
    timing: ["pre_session"],
    mitigatesRisks: ["inadequate_screening", "lack_preparation"],
    objectives: [
      "Provide comprehensive information",
      "Explain therapeutic process",
      "Address unique effects",
      "Ensure voluntariness"
    ],
    components: [
      "Comprehensive disclosure",
      "Therapeutic process explanation",
      "Set and setting discussion",
      "Unique effects disclosure"
    ],
    description: "Comprehensive consent process addressing unique aspects of psychedelic experiences, going beyond typical psychiatric intervention consent.",
    outcomes: "Builds practitioner-patient trust and contributes to better therapeutic outcomes.",
    applicableTo: ["all_substances"],
    resources: [
      {
        type: "paper",
        title: "Ethical and legal issues in psychedelic harm reduction and integration therapy",
        authors: "Brennan, W., & Belser, A. B.",
        journal: "Harm Reduction Journal",
        year: 2021,
        url: "https://harmreductionjournal.biomedcentral.com/articles/10.1186/s12954-021-00489-1",
        accessType: "free",
        description: "Comprehensive discussion of informed consent challenges specific to psychedelic therapy, including decision-making capacity during altered states."
      },
      {
        type: "protocol",
        title: "MAPS Informed Consent Protocols",
        organization: "MAPS",
        url: "https://maps.org/research-archive/",
        accessType: "free",
        description: "Detailed consent procedures from Phase 3 clinical trials, including disclosure requirements unique to psychedelic experiences."
      },
      {
        type: "protocol",
        title: "Clinical Study Protocol for Psilocybin Research",
        organization: "MAPS Research Archive",
        url: "https://maps.org/research-archive/cluster/psilo-lsd/pca1protocol.pdf",
        accessType: "free",
        description: "Complete protocol including informed consent templates and participant information sheets from approved clinical studies."
      }
    ]
  },
  {
    id: "hrp_preparation_meetings_001",
    name: "Multiple Preparation Meetings",
    category: "screening_consent",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "therapeutic"],
    timing: ["pre_session"],
    mitigatesRisks: ["lack_preparation", "unclear_intentions", "weak_alliance", "acute_anxiety"],
    objectives: [
      "Build rapport",
      "Review life history",
      "Discuss potential effects",
      "Address concerns",
      "Set intentions",
      "Practice coping strategies"
    ],
    description: "Series of 2-4 sessions before substance administration (60-90 min each) to build rapport and prepare participant through life review, intention setting, and coping strategy practice.",
    outcomes: "Strong therapeutic alliance, reduced anxiety, clearer intentions, better coping during session.",
    applicableTo: ["all_substances"]
  },
  // Preparation - Pre-session
  {
    id: "hrp_psychoeducation_comprehensive_001",
    name: "Comprehensive Psychoeducation",
    category: "preparation",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "therapeutic", "retreat"],
    timing: ["pre_session"],
    mitigatesRisks: ["lack_preparation", "inadequate_education", "acute_anxiety"],
    objectives: [
      "Manage expectations",
      "Reduce anxiety and fear",
      "Enhance safety awareness",
      "Prepare for challenges",
      "Optimize mindset"
    ],
    components: [
      "Substance pharmacology and effects timeline",
      "Range of possible experiences (mystical to challenging)",
      "Psychological and physical risks/benefits",
      "Harm reduction strategies",
      "Realistic expectations"
    ],
    description: "Providing detailed information about substance effects, risks, and benefits through verbal discussion, written materials, and Q&A sessions.",
    outcomes: "Reduced disappointment and distress, lower baseline anxiety, participants feel more ready, fewer adverse events.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_intention_setting_structured_001",
    name: "Structured Intention Setting",
    category: "preparation",
    criticality: "essential",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["clinical", "therapeutic", "retreat", "personal"],
    timing: ["pre_session"],
    mitigatesRisks: ["unclear_intentions", "confusion"],
    objectives: [
      "Provide direction and focus",
      "Enhance meaning-making",
      "Improve outcomes",
      "Facilitate integration"
    ],
    description: "Process of defining clear, meaningful intentions through reflection, exploration, articulation, discussion with facilitator, and documentation.",
    examples: [
      "Healing from specific trauma",
      "Understanding life purpose",
      "Connecting with spirituality",
      "Personal growth and insight"
    ],
    outcomes: "Provides structure for session, helps navigate challenging moments, facilitates integration.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_coping_skills_training_001",
    name: "Coping Skills Training",
    category: "preparation",
    criticality: "essential",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["clinical", "therapeutic", "retreat"],
    timing: ["pre_session"],
    description: "Teaching specific techniques to navigate difficult moments: breathing exercises, grounding, surrender/acceptance, mindfulness, and positive self-talk.",
    skills: [
      "Breathing techniques (box breathing, 4-7-8)",
      "Grounding techniques (5-4-3-2-1, body scanning)",
      "Surrender and acceptance",
      "Mindfulness",
      "Reassuring self-talk"
    ],
    outcomes: "Lower panic rates, better challenge navigation, reduced need for pharmacological intervention.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_mood_optimization_001",
    name: "Pre-Session Mood Optimization",
    category: "preparation",
    criticality: "important",
    effectiveness: "moderate",
    evidenceQuality: "moderate",
    settings: ["clinical", "therapeutic", "retreat"],
    timing: ["pre_session"],
    description: "Ensuring positive psychological state through mood assessment, stress management, timing optimization, and stable support systems.",
    components: [
      "Mood assessment",
      "Stress management and adequate sleep",
      "Timing optimization",
      "Stable social support"
    ],
    contraindications: ["Acute crisis", "Severe depression", "Acute grief", "Major conflict"],
    applicableTo: ["all_substances"]
  },
  // Setting - Pre-session & During
  {
    id: "hrp_physical_environment_001",
    name: "Optimized Physical Environment",
    category: "setting",
    criticality: "essential",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["clinical", "research", "retreat", "therapeutic"],
    timing: ["pre_session", "during_session"],
    mitigatesRisks: ["unsafe_setting", "interruptions", "clinical_artificiality"],
    components: [
      "Comfortable, warm space with pleasing artwork",
      "Safety measures (hazard-free, no vehicle access)",
      "Minimized clinical atmosphere",
      "Sensory optimization (music, lighting, eyeshades)"
    ],
    description: "Creating comfortable, safe, aesthetically pleasing spaces that balance safety with non-clinical ambiance.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_social_environment_001",
    name: "Supportive Social Environment",
    category: "setting",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "retreat", "therapeutic"],
    timing: ["pre_session", "during_session"],
    mitigatesRisks: ["lack_social_support", "weak_alliance", "acute_anxiety"],
    components: [
      "Clear guidelines and expectations",
      "Experienced facilitators with proper training",
      "Therapeutic alliance building",
      "Optimal: two therapists/guides"
    ],
    description: "Establishing clear guidelines, experienced support, and therapeutic alliance.",
    outcomes: "Strong alliance associated with better outcomes, greater emotional breakthrough, enhanced mystical experiences.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_cultural_sensitivity_001",
    name: "Culturally Sensitive Setting",
    category: "setting",
    criticality: "important",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["clinical", "ceremonial", "retreat", "therapeutic"],
    timing: ["pre_session", "during_session"],
    mitigatesRisks: ["lack_cultural_context", "lack_cultural_competence", "clashing_beliefs"],
    description: "Tailoring environment to participant's cultural background with cultural symbols, resonant music, traditional elements, and individualized approach.",
    applicableTo: ["all_substances"]
  },
  // Dosing - Pre-session
  {
    id: "hrp_start_low_go_slow_001",
    name: "Start Low, Go Slow Dosing",
    category: "dose_preparation",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "moderate_to_strong",
    settings: ["clinical", "therapeutic", "personal"],
    timing: ["pre_session"],
    mitigatesRisks: ["high_dose", "unknown_dose_purity"],
    description: "Beginning with low doses especially for first-time users, allowing assessment of sensitivity before increasing.",
    rationale: "For psilocybin, 10mg shows similar adverse events as 25mg, suggesting lower initial dose is feasible.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_weight_based_dosing_001",
    name: "Weight-Based Dosing",
    category: "dose_preparation",
    criticality: "important",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research"],
    timing: ["pre_session"],
    description: "Calculating doses based on body weight (mg/kg) for precision, accounting for pharmacokinetic variations.",
    applicableTo: ["psilocybin", "DMT"]
  },
  {
    id: "hrp_substance_testing_001",
    name: "Substance Testing and Verification",
    category: "dose_preparation",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["personal", "harm_reduction_services", "events"],
    timing: ["pre_session"],
    mitigatesRisks: ["adulteration_nbome", "adulteration_dox", "purity_variability"],
    description: "Testing substances to verify composition and identify adulterants using reagent kits, test doses, or professional drug checking services.",
    outcomes: "Prevents accidental ingestion of dangerous adulterants like NBOMe compounds, DOx family, and fentanyl. Testing can identify harmful substitutes with more dangerous side effects.",
    prevalenceData: "Among first-time LSD users, only 31.3% reported taking a test dose, meaning 68.7% did not—representing a significant opportunity for harm reduction improvement. Methods include affordable reagent test kits (like Ehrlich's reagent), professional laboratory testing services (limited but expanding), and small test doses to assess purity and potency.",
    applicableTo: ["LSD", "MDMA", "powder_substances"]
  },
  // Supervision - During session
  {
    id: "hrp_continuous_monitoring_001",
    name: "Continuous Session Monitoring",
    category: "supervision",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "therapeutic", "retreat"],
    timing: ["during_session"],
    mitigatesRisks: ["inadequate_training", "acute_anxiety", "panic"],
    components: [
      "Physical safety measures",
      "Psychological support availability",
      "Continuous facilitator presence",
      "Vital signs monitoring if indicated"
    ],
    description: "Ongoing observation and support throughout psychedelic experience.",
    outcomes: "Proper supervision reduces adverse outcomes. Historical data shows low rates of prolonged reactions with proper support.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_facilitator_training_001",
    name: "Standardized Facilitator Training",
    category: "supervision",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "moderate_to_strong",
    settings: ["clinical", "research", "therapeutic", "retreat"],
    timing: ["pre_session", "during_session"],
    mitigatesRisks: ["inadequate_training", "boundary_violations"],
    description: "Comprehensive training in ethical practices, risk management, support techniques, and psychedelic knowledge. Ongoing supervision essential (monthly minimum).",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_nondirective_support_001",
    name: "Non-Directive Support Approach",
    category: "supervision",
    criticality: "important",
    effectiveness: "high",
    evidenceQuality: "moderate",
    settings: ["clinical", "therapeutic", "retreat"],
    timing: ["during_session"],
    mitigatesRisks: ["spiritual_imposition", "epistemic_harm"],
    principles: [
      "Trust the process",
      "Avoid imposing meaning",
      "Support without directing",
      "Respect individual interpretation"
    ],
    description: "Allowing participants to explore experiences without interference or interpretation.",
    applicableTo: ["all_substances"]
  },
  // Crisis - During session
  {
    id: "hrp_crisis_nonpharm_001",
    name: "Non-Pharmacological Crisis Management",
    category: "crisis_intervention",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "research", "therapeutic", "retreat", "peer_support"],
    timing: ["during_session"],
    priority: "first_line",
    mitigatesRisks: ["acute_anxiety", "panic", "dysphoria", "paranoia"],
    interventions: [
      "Continuous monitoring and reassurance",
      "Calm presence",
      "Breathing guidance (box breathing: in for 4, hold for 4, out for 4)",
      "Grounding techniques (5-4-3-2-1 sensory exercise, feel feet on ground)",
      "Environmental adjustment (quiet area, dim lights, reduce noise)",
      "Avoid arguing with altered perceptions"
    ],
    description: "Psychological and environmental interventions for managing distress. First-line approach that manages most cases of acute distress without medication.",
    outcomes: "Highly effective: Johns Hopkins managed 380+ psilocybin sessions with 250 volunteers using reassurance alone, with very low rates of enduring symptoms. Historical data shows only 1.8 per 1,000 patients experienced prolonged reactions, 1.2 per 1,000 suicide attempts, and 0.4 per 1,000 completed suicides (though causal link unclear). Proper supervision significantly reduces these already-low adverse outcomes.",
    prevalenceData: "Success rate: Manages the vast majority of acute distress cases without need for pharmacological intervention. Most effective when combined with continuous facilitator presence and calm, non-judgmental approach.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_crisis_helpline_001",
    name: "Psychedelic Crisis Helplines",
    category: "crisis_intervention",
    criticality: "important",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["remote", "events"],
    timing: ["during_session"],
    examples: [
      "Fireside Project: 65.9% successfully de-escalated from psychological distress",
      "Prevented possible harm in 29.3% of cases",
      "Prevented potential 911 calls in 12.5% of cases",
      "Prevented potential ER visits in 10.8% of cases",
      "Suicide Crisis Lifeline: 988",
      "Zendo Project: On-site festival support with safe space"
    ],
    description: "Professional peer support via telephone for acute crises. Trained peer supporters provide immediate assistance and can prevent escalation.",
    outcomes: "Fireside Project data shows 65.9% de-escalation success rate from psychological distress. Prevented harm in nearly 30% of cases and reduced emergency services burden by preventing unnecessary 911 calls and ER visits in over 23% of combined cases.",
    prevalenceData: "Available 24/7 via text and call. Staffed by trained peer supporters with knowledge of psychedelic experiences. Can bridge gap between self-management and emergency services.",
    applicableTo: ["all_substances"]
  },
  // Integration - Post-session
  {
    id: "hrp_integration_therapy_001",
    name: "Professional Integration Therapy",
    category: "integration",
    criticality: "essential",
    effectiveness: "high",
    evidenceQuality: "strong",
    settings: ["clinical", "therapeutic"],
    timing: ["post_session"],
    mitigatesRisks: ["lack_integration", "negative_psychological_persisting"],
    structure: {
      initial: "1-2 days post-session (60-90 min)",
      ongoing: "Weekly to bi-weekly for 1-3 months"
    },
    description: "Structured therapy sessions to process experience and translate insights into sustainable behavior change.",
    outcomes: "Better incorporation of insights, sustained positive changes, lower rates of extended difficulties.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_integration_contemplative_001",
    name: "Contemplative Integration Practices",
    category: "integration",
    criticality: "important",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["personal", "therapeutic", "community"],
    timing: ["post_session"],
    description: "Daily meditation (10-30 min), mindfulness throughout activities, and prayer for ongoing integration.",
    outcomes: "Sustained awareness of insights, emotional regulation, continued connection to experience.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_integration_creative_001",
    name: "Creative Expression for Integration",
    category: "integration",
    criticality: "important",
    effectiveness: "moderate",
    evidenceQuality: "moderate",
    settings: ["personal", "therapeutic", "community"],
    timing: ["post_session"],
    modalities: [
      "Journaling (daily recommended initially)",
      "Art (drawing, painting, sculpture)",
      "Music (playing, composing, listening)",
      "Writing (poetry, prose)"
    ],
    description: "Using creative outlets to process and express psychedelic experiences.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_integration_peer_support_001",
    name: "Peer Support and Integration Circles",
    category: "integration",
    criticality: "important",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["community", "online"],
    timing: ["post_session"],
    description: "Group-based peer support through integration circles, online forums, and peer mentoring.",
    outcomes: "Shared experience, reduced isolation, community support, normalize challenges.",
    risks: ["Misinformation", "Cultic dynamics", "Lack of clinical oversight"],
    applicableTo: ["all_substances"]
  },
  // Public Education
  {
    id: "hrp_public_harm_reduction_001",
    name: "Public Harm Reduction Education",
    category: "public_education",
    criticality: "important",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["community", "online", "events"],
    timing: ["pre_session"],
    mitigatesRisks: ["lack_experience", "lack_preparation", "inadequate_education"],
    description: "Community-level education on harm reduction practices, risks/benefits, dangerous combinations, and responsible use.",
    prevalenceData: "8.5M Americans used psychedelics past year (2022), 22% lifetime use.",
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_first_responder_training_001",
    name: "First Responder Training Programs",
    category: "public_education",
    criticality: "important",
    effectiveness: "high",
    evidenceQuality: "limited",
    settings: ["municipal", "healthcare_systems"],
    timing: ["during_session"],
    description: "Training EMTs, police, ER staff on psychedelic crisis assessment and intervention.",
    targetAudience: ["EMTs", "Police", "ER staff", "Crisis counselors"],
    applicableTo: ["all_substances"]
  },
  {
    id: "hrp_drug_testing_services_001",
    name: "Community Drug Testing Services",
    category: "public_education",
    criticality: "essential",
    effectiveness: "moderate_to_high",
    evidenceQuality: "moderate",
    settings: ["events", "community_centers", "online"],
    timing: ["pre_session"],
    description: "Accessible testing: on-site at events, mail-in services, reagent kits (DanceSafe, Energy Control).",
    benefits: [
      "Prevent adverse effects from adulterants",
      "Identify dangerous substances",
      "Educate about purity"
    ],
    applicableTo: ["all_substances"]
  }
];

const timingCategories = {
  essential: { name: "Essential Practices", color: "bg-[#FFD480]", icon: Star },
  pre_session: { name: "Pre-Session", color: "bg-[#FCA300]", icon: Users },
  during_session: { name: "During Session", color: "bg-[#D26600]", icon: Heart },
  post_session: { name: "Post-Session", color: "bg-[#0D4038]", icon: Brain },
};

const categories = {
  screening_consent: { name: "Screening & Consent", color: "bg-[#FEEAD8] text-[#D26600]" },
  preparation: { name: "Preparation", color: "bg-[#FFD480] text-[#6C3000]" },
  setting: { name: "Setting", color: "bg-[#FFF9F5] text-[#D26600]" },
  dose_preparation: { name: "Dosing", color: "bg-[#0D4038] text-white" },
  supervision: { name: "Supervision", color: "bg-[#FFD480] text-[#2C1B11]" },
  crisis_intervention: { name: "Crisis", color: "bg-red-100 text-red-700" },
  integration: { name: "Integration", color: "bg-[#F7931A] text-white" },
  public_education: { name: "Education", color: "bg-[#FEEAD8] text-[#6C3000]" },
};

const HarmReductionExplorer = () => {
  const [selectedTiming, setSelectedTiming] = useState('essential');
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    criticality: [],
    effectiveness: [],
    category: [],
    setting: []
  });
  const [showEmergency, setShowEmergency] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPractices = useMemo(() => {
    let practices = harmReductionPractices;

    if (selectedTiming === 'essential') {
      practices = practices.filter(p => p.criticality === 'essential');
    } else if (selectedTiming) {
      practices = practices.filter(p => p.timing?.includes(selectedTiming));
    }

    if (searchTerm) {
      practices = practices.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.mitigatesRisks?.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.criticality.length > 0) {
      practices = practices.filter(p => filters.criticality.includes(p.criticality));
    }

    if (filters.effectiveness.length > 0) {
      practices = practices.filter(p => filters.effectiveness.includes(p.effectiveness));
    }

    if (filters.category.length > 0) {
      practices = practices.filter(p => filters.category.includes(p.category));
    }

    if (filters.setting.length > 0) {
      practices = practices.filter(p => 
        p.settings?.some(s => filters.setting.includes(s))
      );
    }

    return practices;
  }, [selectedTiming, searchTerm, filters]);

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      criticality: [],
      effectiveness: [],
      category: [],
      setting: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(f => f.length > 0);

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
            <div className="bg-red-500 text-white p-4 flex items-center justify-between rounded-t-[24px]">
              <div className="flex items-center gap-2">
                <AlertCircle size={24} />
                <h2 className="text-xl font-bold" style={{fontFamily: 'Satoshi, sans-serif'}}>Emergency Crisis Protocol</h2>
              </div>
              <button onClick={() => setShowEmergency(false)} className="hover:bg-red-600 p-1 rounded-[12px]">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4" style={{fontFamily: 'Inter, sans-serif'}}>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-[12px]">
                <h3 className="font-bold text-red-900 mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>First Line: Non-Pharmacological</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Reassurance:</strong> "You are safe. This is temporary. What you're experiencing is from the substance."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Breathing:</strong> Guide slow, deep breaths. "Breathe in for 4, hold for 4, out for 4."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Grounding:</strong> "Feel your feet on the ground. Notice the sounds around you."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Environment:</strong> Move to quiet area, dim lights, reduce stimulation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#2C1B11] text-white p-4 rounded-[12px]">
                <h3 className="font-bold mb-2 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  <AlertCircle size={20} />
                  Crisis Helplines
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Suicide Crisis Lifeline:</strong> Call 988</li>
                  <li><strong>Fireside Project:</strong> Psychedelic Peer Support (62FIRESIDE / 623-473-7433)</li>
                  <li><strong>Emergency Services:</strong> Call 911 if severe physiological symptoms, suicidal behavior, or uncontrolled violence</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-[12px]">
                <h3 className="font-bold text-orange-900 mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>When to Call Emergency Services</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Chest pain, seizure, or severe hyperthermia</li>
                  <li>• Suicidal ideation or behavior</li>
                  <li>• Violent or dangerous behavior</li>
                  <li>• Condition does not improve with interventions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 pt-8">
        <div className="bg-[#47A8E0] text-white p-8 rounded-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
          <h1 className="text-4xl font-bold mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Harm Reduction Practice Database</h1>
          <p className="text-white text-lg" style={{fontFamily: 'Inter, sans-serif'}}>Evidence-based practices for minimizing risks and promoting safety</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4E4E4E]" size={20} />
              <input
                type="text"
                placeholder="Search practices, risks, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8D9C8] rounded-[12px] focus:ring-2 focus:ring-[#FCA300] focus:border-transparent"
                style={{fontFamily: 'Inter, sans-serif'}}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-[12px] flex items-center gap-2 ${
                hasActiveFilters ? 'bg-[#FEEAD8] text-[#D26600] border-2 border-[#FCA300]' : 'bg-[#FFF9F5] text-[#4E4E4E]'
              }`}
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              <Filter size={20} />
              Filters {hasActiveFilters && `(${Object.values(filters).flat().length})`}
            </button>
          </div>

          {showFilters && (
            <div className="border-t border-[#E8D9C8] pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold" style={{fontFamily: 'Satoshi, sans-serif'}}>Filters</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-sm text-[#D26600] hover:text-[#6C3000]" style={{fontFamily: 'Inter, sans-serif'}}>
                    Clear all
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>Criticality</label>
                <div className="flex gap-2 mt-1">
                  {['essential', 'important', 'recommended'].map(c => (
                    <button
                      key={c}
                      onClick={() => toggleFilter('criticality', c)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.criticality.includes(c)
                          ? 'bg-[#FCA300] text-white'
                          : 'bg-[#FFF9F5] text-[#4E4E4E]'
                      }`}
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {c === 'essential' ? '⭐ Essential' : c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>Practice Type</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {Object.entries(categories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter('category', key)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.category.includes(key)
                          ? 'bg-[#FCA300] text-white'
                          : cat.color
                      }`}
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>Setting</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {['clinical', 'therapeutic', 'retreat', 'personal', 'community', 'events'].map(s => (
                    <button
                      key={s}
                      onClick={() => toggleFilter('setting', s)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.setting.includes(s)
                          ? 'bg-[#FCA300] text-white'
                          : 'bg-[#FFF9F5] text-[#4E4E4E]'
                      }`}
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(timingCategories).map(([key, cat]) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedTiming(key)}
                className={`px-6 py-3 rounded-[12px] whitespace-nowrap flex items-center gap-2 font-medium shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-shadow ${
                  selectedTiming === key
                    ? `${cat.color} text-white`
                    : 'bg-white text-[#4E4E4E] hover:bg-[#FFF9F5]'
                }`}
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <IconComponent size={20} />
                {cat.name}
              </button>
            );
          })}
          <button
            onClick={() => setSelectedTiming(null)}
            className={`px-6 py-3 rounded-[12px] whitespace-nowrap font-medium shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-shadow ${
              selectedTiming === null
                ? 'bg-[#FCA300] text-white'
                : 'bg-white text-[#4E4E4E] hover:bg-[#FFF9F5]'
            }`}
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            All Practices
          </button>
        </div>
      </div>

      <div id="practices-section" className="max-w-7xl mx-auto px-4 pb-12">
        {!selectedTiming && !searchTerm && !hasActiveFilters && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>All Practices</h2>
            <p className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>Complete catalog of evidence-based harm reduction practices</p>
          </div>
        )}

        {filteredPractices.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <Search size={48} className="mx-auto text-[#4E4E4E] mb-4" />
            <h3 className="text-xl font-semibold text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>No practices found</h3>
            <p className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPractices.map((practice) => {
              const category = categories[practice.category];

              return (
                <button
                  key={practice.id}
                  onClick={() => setSelectedPractice(practice)}
                  className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-all text-left p-4 hover:scale-[1.02]"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${category.color} px-2 py-1 rounded-[12px] text-xs font-medium`}>
                          {category.name}
                        </span>
                        {practice.criticality === 'essential' && (
                          <span className="bg-[#FFD480] text-[#2C1B11] px-2 py-1 rounded-[12px] text-xs font-medium flex items-center gap-1">
                            <Star size={12} />
                            Essential
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>{practice.name}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#4E4E4E] mb-3 line-clamp-2">{practice.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {practice.timing?.map(t => (
                      <span key={t} className="bg-[#FEEAD8] text-[#D26600] px-2 py-1 rounded-[12px] text-xs">
                        {t.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-3 text-xs">
                      <span className="text-[#4E4E4E]">
                        📊 Evidence: <span className="font-medium">{practice.evidenceQuality?.replace(/_/g, ' ')}</span>
                      </span>
                    </div>
                    <span className="text-[#D26600] flex items-center gap-1 font-medium">
                      View Details <ChevronRight size={16} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for Practice Details */}
      {selectedPractice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPractice(null)}>
          <div className="bg-white rounded-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.1)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#FCA300] text-white p-6 rounded-t-[24px] z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
                      {categories[selectedPractice.category]?.name}
                    </span>
                    {selectedPractice.criticality === 'essential' && (
                      <span className="bg-[#FFD480] text-[#2C1B11] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1" style={{fontFamily: 'Inter, sans-serif'}}>
                        <Star size={14} fill="currentColor" />
                        Essential
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>{selectedPractice.name}</h2>
                  <p className="text-[#FEEAD8]" style={{fontFamily: 'Inter, sans-serif'}}>{selectedPractice.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPractice(null)}
                  className="ml-4 p-2 hover:bg-white/20 rounded-[12px] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4" style={{fontFamily: 'Inter, sans-serif'}}>
              {selectedPractice.rationale && (
                <div className="bg-[#FEEAD8] border-l-4 border-[#FCA300] p-3 rounded-[12px]">
                  <h4 className="font-semibold text-sm text-[#2C1B11] mb-1" style={{fontFamily: 'Satoshi, sans-serif'}}>Rationale:</h4>
                  <p className="text-sm text-[#4E4E4E]">{selectedPractice.rationale}</p>
                </div>
              )}

              {selectedPractice.objectives && (
                <div>
                  <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Objectives:</h4>
                  <ul className="text-sm space-y-1">
                    {selectedPractice.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check size={14} className="mt-0.5 text-[#0D4038] flex-shrink-0" />
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.components && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Components:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.components.map((comp, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight size={14} className="mt-0.5 text-[#D26600] flex-shrink-0" />
                                  <span>{comp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.skills && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Key Skills:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.skills.map((skill, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight size={14} className="mt-0.5 text-[#D26600] flex-shrink-0" />
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.interventions && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Interventions:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.interventions.map((intervention, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight size={14} className="mt-0.5 text-[#D26600] flex-shrink-0" />
                                  <span>{intervention}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.principles && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Core Principles:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.principles.map((principle, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight size={14} className="mt-0.5 text-[#D26600] flex-shrink-0" />
                                  <span>{principle}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.mitigatesRisks && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Mitigates Risks:</h4>
                            <div className="flex flex-wrap gap-1">
                              {selectedPractice.mitigatesRisks.map((risk, i) => (
                                <span key={i} className="bg-red-50 text-red-700 px-2 py-1 rounded-[12px] text-xs">
                                  {risk.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedPractice.outcomes && (
                          <div className="bg-[#0D4038]/10 border-l-4 border-[#0D4038] p-3 rounded-[12px]">
                            <h4 className="font-semibold text-sm text-[#0D4038] mb-1" style={{fontFamily: 'Satoshi, sans-serif'}}>Outcomes & Evidence:</h4>
                            <p className="text-sm text-[#4E4E4E]">{selectedPractice.outcomes}</p>
                          </div>
                        )}

                        {selectedPractice.prevalenceData && (
                          <div className="bg-[#FEEAD8] border-l-4 border-[#FCA300] p-3 rounded-[12px]">
                            <h4 className="font-semibold text-sm text-[#2C1B11] mb-1" style={{fontFamily: 'Satoshi, sans-serif'}}>📊 Data & Statistics:</h4>
                            <p className="text-sm text-[#4E4E4E]">{selectedPractice.prevalenceData}</p>
                          </div>
                        )}

                        {selectedPractice.examples && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Examples:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.examples.map((example, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight size={14} className="mt-0.5 text-[#D26600] flex-shrink-0" />
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.benefits && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Benefits:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check size={14} className="mt-0.5 text-[#0D4038] flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.risks && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Potential Risks:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.risks.map((risk, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <AlertCircle size={14} className="mt-0.5 text-[#F7931A] flex-shrink-0" />
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.contraindications && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Contraindications:</h4>
                            <ul className="text-sm space-y-1">
                              {selectedPractice.contraindications.map((contraindication, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <X size={14} className="mt-0.5 text-red-500 flex-shrink-0" />
                                  <span>{contraindication}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.structure && (
                          <div className="bg-[#FFF9F5] p-3 rounded-[12px] border border-[#E8D9C8]">
                            <h4 className="font-semibold text-sm text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Structure & Timeline:</h4>
                            {typeof selectedPractice.structure === 'object' && (
                              <div className="text-sm space-y-2">
                                {Object.entries(selectedPractice.structure).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium text-[#6C3000]">{key.replace(/_/g, ' ')}:</span>
                                    <span className="text-[#4E4E4E] ml-2">{value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {harmReductionResources[selectedPractice.id] && (
                          <div className="border-t border-[#E8D9C8] pt-4">
                            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                              <BookOpen size={20} className="text-[#D26600]" />
                              Learn More & Resources
                            </h4>
                            <div className="space-y-3">
                              {harmReductionResources[selectedPractice.id].map((resource, idx) => {
                                const getResourceIcon = (type) => {
                                  switch (type) {
                                    case 'paper': return <FileText size={16} className="text-[#D26600]" />;
                                    case 'video': return <Video size={16} className="text-red-600" />;
                                    case 'protocol': return <FileText size={16} className="text-[#6C3000]" />;
                                    case 'website': return <Globe size={16} className="text-[#0D4038]" />;
                                    case 'training': return <Users size={16} className="text-[#F7931A]" />;
                                    case 'article': return <FileText size={16} className="text-[#D26600]" />;
                                    case 'product': return <Star size={16} className="text-[#FFD480]" />;
                                    case 'resource': return <BookOpen size={16} className="text-[#D26600]" />;
                                    default: return <ExternalLink size={16} className="text-[#4E4E4E]" />;
                                  }
                                };

                                const getResourceBadgeColor = (type) => {
                                  switch (type) {
                                    case 'paper': return 'bg-[#FEEAD8] text-[#D26600]';
                                    case 'video': return 'bg-red-100 text-red-800';
                                    case 'protocol': return 'bg-[#FFD480] text-[#6C3000]';
                                    case 'website': return 'bg-[#0D4038]/10 text-[#0D4038]';
                                    case 'training': return 'bg-[#F7931A]/20 text-[#6C3000]';
                                    case 'article': return 'bg-[#FEEAD8] text-[#D26600]';
                                    case 'product': return 'bg-[#FFD480] text-[#2C1B11]';
                                    case 'resource': return 'bg-[#FEEAD8] text-[#D26600]';
                                    default: return 'bg-[#FFF9F5] text-[#4E4E4E]';
                                  }
                                };

                                return (
                                  <div key={idx} className="bg-white border border-[#E8D9C8] rounded-[12px] p-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow">
                                    <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 mt-0.5">
                                        {getResourceIcon(resource.type)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`${getResourceBadgeColor(resource.type)} px-2 py-0.5 rounded-[12px] text-xs font-medium uppercase`} style={{fontFamily: 'Inter, sans-serif'}}>
                                              {resource.type}
                                            </span>
                                            {resource.year && (
                                              <span className="text-xs text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{resource.year}</span>
                                            )}
                                            {resource.accessType === 'free' && (
                                              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-[12px] text-xs font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
                                                FREE
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <h5 className="font-semibold text-sm text-[#2C1B11] mb-1" style={{fontFamily: 'Satoshi, sans-serif'}}>
                                          {resource.title}
                                        </h5>
                                        {resource.authors && (
                                          <p className="text-xs text-[#4E4E4E] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>
                                            {resource.authors}
                                            {resource.journal && ` • ${resource.journal}`}
                                          </p>
                                        )}
                                        {resource.author && (
                                          <p className="text-xs text-[#4E4E4E] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>
                                            {resource.author}
                                            {resource.platform && ` • ${resource.platform}`}
                                            {resource.duration && ` • ${resource.duration}`}
                                          </p>
                                        )}
                                        {resource.organization && (
                                          <p className="text-xs text-[#4E4E4E] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>
                                            {resource.organization}
                                            {resource.pages && ` • ${resource.pages}`}
                                            {resource.format && ` • ${resource.format}`}
                                            {resource.duration && ` • ${resource.duration}`}
                                            {resource.credits && ` • ${resource.credits}`}
                                            {resource.phone && ` • ${resource.phone}`}
                                            {resource.hours && ` • ${resource.hours}`}
                                          </p>
                                        )}
                                        <p className="text-xs text-[#4E4E4E] mb-2 line-clamp-2" style={{fontFamily: 'Inter, sans-serif'}}>
                                          {resource.description}
                                        </p>
                                        <a
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-xs font-medium text-[#D26600] hover:text-[#6C3000] hover:underline"
                                          style={{fontFamily: 'Inter, sans-serif'}}
                                        >
                                          {resource.type === 'video' && 'Watch'}
                                          {resource.type === 'paper' && 'Read Paper'}
                                          {resource.type === 'protocol' && 'View Protocol'}
                                          {resource.type === 'website' && 'Visit Website'}
                                          {resource.type === 'training' && 'Learn More'}
                                          {resource.type === 'article' && 'Read Article'}
                                          {resource.type === 'product' && 'View Product'}
                                          {resource.type === 'resource' && 'Access Resource'}
                                          {!['video', 'paper', 'protocol', 'website', 'training', 'article', 'product', 'resource'].includes(resource.type) && 'Learn More'}
                                          <ExternalLink size={12} />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
    </div>
  );
};

export default HarmReductionExplorer;