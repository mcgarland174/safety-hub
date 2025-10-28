import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Info, Shield, ChevronRight, AlertTriangle, CheckCircle, FileText, Edit3 } from 'lucide-react';
import caseStudiesData from '../data/case_studies_schema.json';
import { EvidenceDisplay } from './CitationText';
import { CitationLink } from './CitationLink';
import { useFeedback } from '../contexts/FeedbackContext';

const SubstanceExplorer = () => {
  const navigate = useNavigate();
  const { setPageContext, openFeedbackModal } = useFeedback();
  const [selectedSubstance, setSelectedSubstance] = useState('psilocybin');
  const [expandedSection, setExpandedSection] = useState(null);
  const [hoveredLegendItem, setHoveredLegendItem] = useState(null);
  const [clinicalContextExpanded, setClinicalContextExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('pharmacology');
  const [expandedSubstance, setExpandedSubstance] = useState('psilocybin');

  // Get related case studies for the selected substance
  const relatedCases = useMemo(() => {
    return caseStudiesData.caseStudies.filter(caseStudy =>
      caseStudy.substances.includes(selectedSubstance)
    );
  }, [selectedSubstance]);

  // Update feedback context when substance changes
  useEffect(() => {
    const substanceName = selectedSubstance.charAt(0).toUpperCase() + selectedSubstance.slice(1);
    setPageContext(`Substances > ${substanceName}`);
  }, [selectedSubstance, setPageContext]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const toggleSubstance = (substanceId) => {
    if (expandedSubstance === substanceId) {
      setExpandedSubstance(null);
    } else {
      setExpandedSubstance(substanceId);
      setSelectedSubstance(substanceId);
    }
  };

  const substances = [
    { id: 'psilocybin', name: 'Psilocybin', aliases: ['Magic Mushrooms', 'Shrooms'] },
    { id: 'lsd', name: 'LSD', aliases: ['Acid'] },
    { id: '2cb', name: '2C-B / 2C-x', aliases: ['Nexus', '2C Family'] },
    { id: 'dmt', name: 'DMT', aliases: ['Dimitri', 'Spirit Molecule'] },
    { id: '5meodmt', name: '5-MeO-DMT', aliases: ['The Toad', 'Bufo'] },
    { id: 'ibogaine', name: 'Iboga / Ibogaine', aliases: ['Iboga'] },
    { id: 'mdma', name: 'MDMA', aliases: ['Ecstasy', 'Molly'] },
    { id: 'ketamine', name: 'Ketamine', aliases: ['Special K', 'K'] },
    { id: 'ayahuasca', name: 'Ayahuasca', aliases: ['Yagé', 'Aya'] },
  ];

  const substanceColors = {
    psilocybin: '#E6543E',
    lsd: '#F4B63A',
    '2cb': '#007F6E',
    dmt: '#003B73',
    '5meodmt': '#47A8E0',
    ibogaine: '#A33D2C',
    mdma: '#F7DCC3',
    ketamine: '#E9D5B8',
    ayahuasca: '#000000',
  };

  const contraindicationLegend = [
    {
      level: 'Absolute',
      color: 'bg-red-100 text-red-700',
      description: 'Do not use under any circumstances. These conditions pose serious, potentially life-threatening risks that cannot be adequately mitigated.',
      examples: 'Active psychosis, uncontrolled hypertension, recent heart attack'
    },
    {
      level: 'Relative',
      color: 'bg-orange-100 text-orange-700',
      description: 'Use only with extreme caution and enhanced safety measures. May be possible in controlled settings with comprehensive screening, preparation, and monitoring.',
      examples: 'Stable bipolar disorder, personality disorders, family history of psychosis'
    },
    {
      level: 'Caution',
      color: 'bg-yellow-100 text-yellow-700',
      description: 'Proceed carefully with awareness of increased risks. Requires informed decision-making, proper preparation, and appropriate harm reduction strategies.',
      examples: 'Taking SSRIs, age under 25, history of anxiety'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const substanceData = {
    lsd: {
      overview: {
        classification: 'Classical Serotonergic Psychedelic (Ergoline)',
        mechanism: '5-HT2A receptor agonist',
        activeMetabolite: 'Direct action (no metabolites)',
        legalStatus: 'Schedule I (USA)',
      },
      dosing: {
        microdose: '5-20 mcg',
        threshold: '25 mcg',
        light: '25-75 mcg',
        common: '75-150 mcg',
        therapeutic: '100-200 mcg',
        strong: '150-300 mcg',
        heavy: '300 mcg+',
        recreational: '50-150 mcg (typical)'
      },
      pharmacokinetics: {
        onset: '30-60 minutes',
        peak: '2-3 hours',
        duration: '8-12 hours',
        tolerance: 'Develops rapidly, resets in 3-7 days',
        crossTolerance: 'Psilocybin, mescaline, other 5-HT2A agonists'
      },
      prevalenceData: {
        lifetimeUse: 'Increased 200% from early 2000s to late 2010s',
        erVisits: '1% of users (2020)',
        emergencyRate: '0.5% of first-time users seek emergency treatment'
      },
      riskFactors: [
        {
          category: 'Dosage',
          severity: 'high',
          conditions: [
            {
              name: 'High Dose Effects (200+ mcg)',
              level: 'Caution',
              notes: '31% experience "bad drug effects" at 200 mcg',
              details: {
                description: 'Higher doses dramatically increase the risk of psychological distress and physiological effects. At 200 mcg, effects can include ego dissolution, overwhelming anxiety, and significant cardiovascular strain.',
                mechanism: 'Dose-dependent increase in serotonergic activity leads to more intense perceptual, cognitive, and emotional effects. At 200+ mcg, ego dissolution becomes likely, which can be terrifying without proper preparation.',
                prevalence: 'At 50 mcg: 9% bad effects. At 100 mcg: 27% bad effects. At 200 mcg: 31% bad effects. Doses above 500 mcg produce extremely high risk of dangerous psychological outcomes.',
                harmReduction: [
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Enhanced Preparation for High Doses', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Experienced Trip Sitter Required', link: null }
                ],
                citations: 'Holze et al. 2022; Engel et al. 2024; Bremler et al. 2023'
              }
            },
            {
              name: 'Dosage uncertainty (blotter variability)',
              level: 'Caution',
              notes: 'Uneven LSD distribution creates hot/cold spots',
              details: {
                description: 'Illicit LSD on blotter paper often has highly uneven distribution, creating "hot spots" with much higher concentrations and "cold spots" with little to no LSD. This makes accurate dosing nearly impossible.',
                mechanism: 'During manufacture, LSD solution may be unevenly applied to blotter paper. As a result, users who cut or divide blotters can receive doses far higher or lower than intended, which can lead to unintentional overdose.',
                prevalence: 'Common problem in illicit market. Particularly problematic for microdosing where precision is important.',
                harmReduction: [
                  { name: 'Volumetric Dosing', link: null },
                  { name: 'Test Dose', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Substance Testing', link: null }
                ],
                citations: 'Miller et al. 2024; Abraham & Aldridge, 1993; Lea et al., 2020'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            {
              name: 'Active psychosis or mania',
              level: 'Absolute',
              notes: 'Can severely worsen symptoms and trigger prolonged episodes',
              details: {
                description: 'Active psychotic symptoms or manic episodes are absolute contraindications for LSD. The drug has the potential to severely exacerbate hallucinations, delusions, paranoia, and disorganized thinking.',
                mechanism: 'LSD amplifies existing alterations in perception and thought. In active psychosis, this can push symptoms to dangerous levels. In mania, it can worsen impulsivity, grandiosity, and loss of judgment.',
                prevalence: 'Prevalence of persistent psychotic symptoms averages 1-2% across studies. Risk is substantially higher in individuals with psychiatric vulnerabilities.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Psychiatric evaluation before use', link: null },
                  { name: 'Never use during active episodes', link: null }
                ],
                citations: 'Carhart-Harris & Nutt, 2010; Simonsson et al., 2023'
              }
            },
            {
              name: 'Personal history of psychotic disorders',
              level: 'Absolute',
              notes: 'High risk even when stable',
              details: {
                description: 'Personal history of schizophrenia or schizoaffective disorder is typically an absolute contraindication. Even when stable on medication, individuals remain vulnerable to psychotic decompensation.',
                mechanism: 'Individuals with psychotic disorder history have fundamental vulnerabilities in dopamine and serotonin systems that LSD can destabilize, triggering relapse.',
                prevalence: 'Psychedelic-induced psychosis is extremely rare, with incidences below 1% in general populations. However, in studies including individuals with histories of psychotic disorders, up to 3.8% developed long-lasting psychotic symptoms, indicating a substantially higher risk in psychiatric populations.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Avoid use entirely if personal history present', link: null }
                ],
                citations: 'Kopra et al. 2022; White et al. 2024; Johnson et al. 2008; Sabé et al., 2024'
              }
            },
            {
              name: 'Family history of psychosis/bipolar',
              level: 'Relative',
              notes: 'Genetic vulnerability requires careful assessment',
              details: {
                description: 'Family history increases risk of psychotic or manic reactions but is not an absolute contraindication. Requires thorough screening and extra caution.',
                mechanism: 'Genetic vulnerability to psychotic or bipolar disorders may be triggered by LSD even without personal history. First-degree relatives have significantly elevated risk. Psychedelic use is linked to greater manic symptoms in individuals with higher genetic vulnerability to schizophrenia or bipolar I disorder, indicating a significant role of genetic factors in psychiatric outcomes.',
                prevalence: 'Risk varies based on closeness of relationship and number of affected relatives. Closer family connections carry higher risk.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced Preparation', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Lower doses recommended', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Close monitoring during and after session', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Honk et al. 2024; Henningfield et al. 2023; Simonsson et al., 2023; Strassman, 1984'
              }
            },
            {
              name: 'Personality disorders',
              level: 'Relative',
              notes: '31% negative response rate; 4x higher adverse risk',
              details: {
                description: 'Personality disorders significantly increase risk of negative outcomes. Not absolute contraindication but requires enhanced support and careful monitoring.',
                mechanism: 'Difficulty with emotional regulation, interpersonal relationships, and self-concept can be dramatically amplified during LSD experiences.',
                prevalence: 'About 31% of individuals with personality disorders in the study experienced negative responses to psychedelics, compared to 16% of participants without personality disorders.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced therapeutic support', link: null },
                  { name: 'Extended Integration', link: 'hrp_integration_therapy_001' },
                  { name: 'Careful monitoring for destabilization', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Marrocu et al., 2024; Bremler et al. 2023'
              }
            },
            {
              name: 'Anxiety and Depression',
              level: 'Caution',
              notes: '87% with negative responses report anxiety worsening',
              details: {
                description: 'Pre-existing anxiety or depression can be both a therapeutic target and significant risk factor. Can paradoxically improve or worsen symptoms.',
                mechanism: 'LSD amplifies emotional states. Anxiety can spiral during the experience. However, with proper support, addressing these conditions is a therapeutic goal.',
                prevalence: '87% of those experiencing negative psychological responses reported anxiety worsening. 1.9% experienced persistent anxiety, 1.1% persistent depression after use.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Psychoeducation about challenging experiences', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Coping Skills Training', link: 'hrp_coping_skills_training_001' },
                  { name: 'Set and Setting Optimization', link: 'hrp_physical_environment_001' },
                  { name: 'Integration Support Essential', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Bremler et al. 2023; Carhart-Harris et al. 2010'
              }
            }
          ]
        },
        {
          category: 'Medications',
          severity: 'critical',
          conditions: [
            {
              name: 'Lithium',
              level: 'Absolute',
              notes: 'Dangerous interaction - seizures, delirium possible',
              details: {
                description: 'Lithium combined with LSD is an absolute contraindication. This combination creates severe and potentially life-threatening reactions.',
                mechanism: 'Unknown mechanism but well-documented dangerous interaction. Can cause seizures, severe confusion, and delirium.',
                prevalence: 'Documented cases of severe adverse reactions. Consistently cited as one of the most dangerous psychedelic combinations.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Never combine - absolute prohibition', link: null },
                  { name: 'Medical consultation required', link: null }
                ],
                citations: 'Ghaznavi et al. 2025'
              }
            },
            {
              name: 'MAOIs',
              level: 'Absolute',
              notes: 'Can cause life-threatening serotonin syndrome',
              details: {
                description: 'MAO inhibitors combined with LSD can cause potentially fatal serotonin syndrome. This is an absolute contraindication.',
                mechanism: 'MAOIs prevent breakdown of serotonin, and LSD increases serotonin activity. Together they cause dangerous serotonin accumulation leading to hyperthermia, seizures, and potentially death.',
                prevalence: 'Deaths documented with MAOI + psychedelic combinations.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Never combine - wait 2+ weeks after stopping MAOIs', link: null },
                  { name: 'Know serotonin syndrome symptoms', link: null }
                ],
                citations: 'Breeksema et al. 2022; Ghaznavi et al. 2025'
              }
            },
            {
              name: 'SSRIs',
              level: 'Caution',
              notes: 'Serotonin syndrome risk; may reduce effects',
              details: {
                description: 'SSRIs increase serotonin syndrome risk and may blunt LSD effects. Not absolute contraindication but requires caution.',
                mechanism: 'SSRIs increase serotonin levels and can potentiate LSD effects on serotonin system. They also downregulate 5-HT2A receptors which may reduce psychedelic effects.',
                prevalence: 'Common in clinical populations. Effects vary - some experience reduced psychedelic effects, others normal responses.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Consider tapering under medical supervision', link: null },
                  { name: 'Monitor for serotonin syndrome symptoms', link: null },
                  { name: 'May need adjusted doses but proceed cautiously', link: 'hrp_start_low_go_slow_001' }
                ],
                citations: 'Sakai et al. 2024; Gomez-Escolar et al. 2024; Malcolm & Thomas 2022'
              }
            }
          ]
        },
        {
          category: 'Cardiovascular',
          severity: 'high',
          conditions: [
            {
              name: 'Uncontrolled hypertension',
              level: 'Absolute',
              notes: 'LSD increases BP and HR significantly',
              details: {
                description: 'Uncontrolled high blood pressure is an absolute contraindication. LSD causes sympathomimetic cardiovascular effects that can dangerously elevate already high blood pressure.',
                mechanism: 'LSD increases heart rate and blood pressure through serotonergic effects on cardiovascular regulation. In uncontrolled hypertension, this can push readings to dangerous levels.',
                prevalence: 'At 200 mcg, 25% experience heart rate >100 bpm and 34% experience body temperature >38°C, indicating significant physiological stress.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Blood pressure control before any use', link: null },
                  { name: 'Continuous vital sign monitoring', link: null }
                ],
                citations: 'Holze et al. 2022; Fuentes et al. 2020; Bender & Hellerstein, 2022'
              }
            },
            {
              name: 'Arrhythmias',
              level: 'Absolute',
              notes: 'Cardiac rhythm disturbances can worsen',
              details: {
                description: 'Irregular heart rhythms are absolute contraindications due to potential for dangerous cardiac events during LSD use.',
                mechanism: 'Serotonergic effects on cardiac ion channels can worsen existing arrhythmias or trigger new rhythm disturbances.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'ECG screening before any psychedelic use', link: null }
                ],
                citations: 'Fuentes et al. 2020; Holze et al. 2021'
              }
            },
            {
              name: 'Recent MI or heart failure',
              level: 'Absolute',
              notes: 'Increased cardiac demand poses serious risk',
              details: {
                description: 'Recent myocardial infarction or heart failure are absolute contraindications. The cardiovascular stress from LSD could trigger another cardiac event.',
                mechanism: 'Increased heart rate and blood pressure place additional demand on compromised cardiac tissue.',
                prevalence: 'Typically an exclusion criterion in clinical trials.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Wait minimum 6 months post-MI before considering use', link: null }
                ],
                citations: 'Fuentes et al. 2020'
              }
            }
          ]
        },
        {
          category: 'Demographics & Situational',
          severity: 'moderate',
          conditions: [
            {
              name: 'Age under 25',
              level: 'Caution',
              notes: '53% of negative effects occur in this age group',
              details: {
                description: 'Younger individuals, especially under 25, show dramatically higher rates of negative effects and emergency treatment seeking.',
                mechanism: 'Developing brain is more vulnerable to disruption. Neurotransmitter systems are still maturing. Lower risk aversion and higher impulsivity increase behavioral risks.',
                prevalence: '53% of those experiencing negative effects were under 25. Majority of poison control cases are ages 13-19. Younger users have higher rates of emergency department visits.',
                harmReduction: [
                  { name: 'Enhanced education about risks', link: 'hrp_public_harm_reduction_001' },
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Mandatory supervision for adolescents', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Consider delaying use until brain fully developed (age 25+)', link: null }
                ],
                citations: 'Bremler et al. 2023; Malcolm & Thomas 2022; Breeksema et al. 2022'
              }
            },
            {
              name: 'First-time psychedelic use',
              level: 'Caution',
              notes: '64.1% of first-time users experience fear (generally mild)',
              details: {
                description: 'First-time users are particularly vulnerable due to unfamiliarity with dosing, unpredictability of effects, and inability to manage intense altered states.',
                mechanism: 'Lack of experience creates anxiety about the unknown. Users may not recognize normal psychedelic effects, leading to panic. Dosing errors more common.',
                prevalence: '64.1% of first-time users experienced fear, though generally mild and did not discourage further use. Only 0.5% sought emergency medical treatment.',
                harmReduction: [
                  { name: 'Comprehensive education beforehand', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Start with low doses (50-75 mcg)', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Experienced trip sitter present', link: null },
                  { name: 'Safe, familiar setting', link: 'hrp_physical_environment_001' }
                ],
                citations: 'Baxter et al. 2024'
              }
            },
            {
              name: 'Stressful life circumstances',
              level: 'Caution',
              notes: 'Major life changes increase psychological risk',
              details: {
                description: 'Ongoing stress or major life changes significantly increase risk of anxiety, panic, and longer-term psychological distress during and after LSD use.',
                mechanism: 'LSD amplifies existing emotional states. Unresolved stress or grief can become overwhelming during the experience.',
                prevalence: 'Common risk factor in those experiencing challenging trips.',
                harmReduction: [
                  { name: 'Consider postponing use until circumstances stabilize', link: null },
                  { name: 'Enhanced psychological support if proceeding', link: 'hrp_integration_therapy_001' },
                  { name: 'Preparation work to address life stressors', link: 'hrp_preparation_meetings_001' }
                ],
                citations: 'Bremler et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Contamination & Quality',
          severity: 'high',
          conditions: [
            {
              name: 'NBOMe adulterants',
              level: 'Absolute',
              notes: 'Dangerous compounds sold as LSD - seizures, deaths',
              details: {
                description: 'NBOMe compounds (25I, 25C, 25B-NBOMe) are often sold as LSD but are far more dangerous. They have caused seizures, severe adverse reactions, and deaths.',
                mechanism: 'NBOMes have different pharmacology than LSD, causing severe vasoconstriction, hyperthermia, and seizures at doses that appear on blotter.',
                prevalence: 'Common problem in illicit markets. Multiple documented deaths.',
                harmReduction: [
                  { name: 'Test substances with Ehrlich reagent', link: null },
                  { name: 'If blotter tastes bitter, spit it out immediately (LSD is tasteless)', link: null },
                  { name: 'Use trusted sources', link: null }
                ],
                citations: 'Hirschfeld et al. 2021; Malcolm & Thomas 2022'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Acute Anxiety and Panic',
            timeframe: 'During session',
            severity: 'Mild to Severe',
            prevalence: '64.1% of first-time users experience fear (generally mild); 69.6% of emergency seekers had anxiety/panic',
            description: 'Most commonly reported adverse effect. Anxiety and panic reactions during LSD experience ranging from mild unease to overwhelming terror. Intense fear, racing heart, sense of impending doom, inability to calm down.',
            management: 'Reassurance, breathing exercises, grounding techniques, environmental adjustment. Benzodiazepines if severe and unresponsive to non-pharmacological approaches.',
            notes: 'Usually resolves during or shortly after session. Can escalate without proper support. Non-pharmacological interventions effective in majority of cases.',
            harmReduction: [
              { name: 'Comprehensive Psychoeducation', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Coping Skills Training', link: 'hrp_coping_skills_training_001' },
              { name: 'Set and Setting Optimization', link: 'hrp_physical_environment_001' },
              { name: 'Trip Sitter Present', link: null }
            ]
          },
          {
            name: 'Acute Psychotic Symptoms',
            timeframe: 'During session',
            severity: 'Moderate to Severe',
            prevalence: '1.3% experience persistent psychotic symptoms',
            description: 'Paranoia, hallucinations beyond typical effects, delusions, derealization, disorganized thinking, loss of reality testing. May overlap with severe "bad trip."',
            management: 'Supportive care, benzodiazepines, antipsychotics if severe and unresponsive. Medical evaluation required.',
            notes: 'Usually acute but can become prolonged, especially in those with psychiatric vulnerabilities. Prevalence averages 1-2% across studies.',
            harmReduction: [
              { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Exclude high-risk individuals', link: null },
              { name: 'Continuous Monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          },
          {
            name: 'Challenging Experiences ("Bad Trips")',
            timeframe: 'During session',
            severity: 'Moderate to High',
            prevalence: 'Dose-dependent: 9% at 50mcg, 27% at 100mcg, 31% at 200mcg',
            description: 'Unpleasant emotional states including dysphoria, confusion, fear, sense of doom, emotional pain, confrontation with difficult emotions. Clear dose-response relationship.',
            management: 'Non-directive support, acceptance, avoiding resistance. Reminder that experience is temporary. These experiences can be therapeutically valuable when properly supported.',
            notes: 'Risk increases significantly with dose. Higher doses produce more intense and overwhelming experiences.',
            harmReduction: [
              { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
              { name: 'Multiple Preparation Meetings', link: 'hrp_preparation_meetings_001' },
              { name: 'Non-directive Support', link: 'hrp_nondirective_support_001' },
              { name: 'Integration Therapy', link: 'hrp_integration_therapy_001' }
            ]
          },
          {
            name: 'Ego Dissolution',
            timeframe: 'During session',
            severity: 'Variable',
            prevalence: 'Common at 200+ mcg doses',
            description: 'Loss of sense of self or identity. Can be profoundly positive (mystical experience, unity consciousness, transformative insights) or terrifying (panic, confusion, fear of death or insanity).',
            management: 'Preparation critical. During experience: reassurance that sense of self will return. Non-directive support.',
            notes: 'Highly dependent on preparation, set, setting, and support. Can be most valued or most frightening aspect of experience.',
            harmReduction: [
              { name: 'Enhanced Preparation for High Doses', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Set Clear Intentions', link: null },
              { name: 'Experienced Guide Present', link: null }
            ]
          },
          {
            name: 'Suicidal Ideation and Self-Harm',
            timeframe: 'Acute and long-term',
            severity: 'Critical',
            prevalence: '20.6% of emergency treatment seekers; 1.2/1000 attempts, 0.4/1000 completed in historic data',
            description: 'Thoughts or acts of self-harm during or after experience. More common in those with pre-existing mental health issues, history of suicidal ideation, or depression.',
            management: 'Immediate support, continuous monitoring, safety measures, emergency services if needed, psychiatric evaluation.',
            notes: 'Direct causal link unclear; may reflect underlying issues exacerbated by experience. Screening essential.',
            harmReduction: [
              { name: 'Thorough Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Exclude active suicidality', link: null },
              { name: 'Close monitoring during and after session', link: 'hrp_continuous_monitoring_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: '25% >100bpm heart rate and 34% >38°C temperature at 200mcg',
            description: 'Increased heart rate, blood pressure, and body temperature. Typically benign in healthy individuals but can be problematic in those with cardiovascular disease.',
            management: 'Monitoring, reassurance. Medical intervention if sustained elevation in at-risk individuals. Ensure adequate hydration and temperature control.',
            notes: 'Effects dose-dependent. At 200 mcg, significant portion experience tachycardia and elevated temperature.',
            harmReduction: [
              { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Continuous vital sign monitoring', link: 'hrp_continuous_monitoring_001' },
              { name: 'Exclude cardiovascular disease', link: null }
            ]
          },
          {
            name: 'Other Physical Symptoms',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common: sweating (26.5%), palpitations (25.5%), difficulty breathing (20.6%), nausea (17.6%)',
            description: 'Various somatic symptoms including sweating, palpitations, difficulty breathing, nausea/vomiting, headache, mydriasis (pupil dilation).',
            management: 'Supportive care. Usually self-limiting. Reassurance that symptoms are temporary and related to drug effects.',
            notes: 'Typically subside as drug effects wear off. Less common than psychological effects but can contribute to anxiety.',
            harmReduction: [
              { name: 'Prepare for physical symptoms', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Comfortable environment', link: 'hrp_physical_environment_001' }
            ]
          },
          {
            name: 'Overdose',
            timeframe: 'Acute',
            severity: 'Critical',
            prevalence: 'Very rare',
            description: 'Rare case reports of severe overdose causing coma, hyperthermia, bleeding complications, respiratory depression, cardiovascular collapse. Accidental deaths documented but extremely rare.',
            management: 'Emergency medical treatment. Supportive care. Address hyperthermia, stabilize cardiovascular function.',
            notes: 'LSD has very high therapeutic index. Overdoses typically involve massive doses or contaminated substances.',
            harmReduction: [
              { name: 'Accurate dosing', link: null },
              { name: 'Start low', link: 'hrp_start_low_go_slow_001' },
              { name: 'Test substances', link: null }
            ]
          }
        ],
        perceptual: [
          {
            name: 'HPPD (Hallucinogen Persisting Perception Disorder)',
            timeframe: 'Long-term',
            severity: 'Variable',
            prevalence: '15-77% across studies (wide variation); 25-40% report some changes',
            description: 'Persistent visual disturbances (visual snow, trails, afterimages, geometric patterns, halos, palinopsia) and dissociative symptoms (depersonalization, derealization) lasting beyond session.',
            management: 'Reassurance. Benzodiazepines (anecdotal). Lamotrigine (case reports). Often improves with time.',
            notes: 'No cases in modern clinical trials. More associated with frequent, high-dose, or long-term use. Some experience as non-harmful; others find distressing. Methodological concerns may inflate prevalence rates.',
            harmReduction: [
              { name: 'Avoid frequent use', link: null },
              { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
              { name: 'Avoid polydrug use', link: null }
            ]
          },
          {
            name: 'Flashbacks',
            timeframe: 'Long-term',
            severity: 'Variable',
            prevalence: '10-69% report flashbacks (wide range)',
            description: 'Spontaneous, brief recurrence of aspects of LSD experience. Triggered by stress, fatigue, cannabis, dark environments, exercise. Duration typically seconds to minutes.',
            management: 'Reassurance that they are temporary. Identify and avoid triggers if distressing.',
            notes: 'Related to but distinct from HPPD. Not all distressing or harmful. Some find them interesting or benign.',
            harmReduction: [
              { name: 'Manage stress', link: null },
              { name: 'Adequate sleep', link: null },
              { name: 'Avoid cannabis if flashbacks occur', link: null }
            ]
          }
        ]
      },
      clinicalContext: [
        {
          title: 'Dose-Response Relationship is Clear',
          icon: '📊',
          content: 'LSD shows a remarkably clear dose-response curve for adverse effects. At 50 mcg, only 9% experience "bad drug effects." This rises to 27% at 100 mcg and 31% at 200 mcg. Positive effects plateau around 100 mcg while anxiety and negative effects continue to increase at higher doses. This demonstrates that "start low, go slow" is not just harm reduction rhetoric—it\'s evidence-based medicine.',
          citations: ['holze_2022', 'engel_2024']
        },
        {
          title: 'First-Time Users Are Generally Safe',
          icon: '🔰',
          content: 'Despite 64.1% of first-time LSD users experiencing fear, this was generally mild and did not discourage further use. Only 0.5% sought emergency medical treatment. Most first-time users took LSD with close friends or partners in familiar settings, demonstrating that the community naturally practices good harm reduction. When set and setting are optimized, first experiences are typically manageable.',
          citations: ['baxter_2024']
        },
        {
          title: 'Young Age is a Major Risk Factor',
          icon: '👤',
          content: 'An alarming 53% of people experiencing negative effects were under age 25, and the majority of poison control cases involved teenagers (ages 13-19). This is not a minor statistical blip—it represents a fundamental vulnerability of developing brains to psychedelic disruption. Young people also demonstrate lower risk aversion and higher impulsivity, compounding psychological with behavioral risks.',
          citations: ['bremler_2023', 'malcolm_2022', 'breeksema_2022']
        },
        {
          title: 'Lithium Interaction is Uniquely Dangerous',
          icon: '⚠️',
          content: 'Among all drug interactions with LSD, the combination with lithium stands out for its severity and unpredictability. It can cause seizures, severe confusion, and delirium through an unknown mechanism. This is one of the few absolute pharmacological contraindications for LSD and should be widely known.',
          citations: ['ghaznavi_2025']
        },
        {
          title: 'NBOMes: The Hidden Killer',
          icon: '☠️',
          content: 'NBOMe compounds (25I-NBOMe, 25C-NBOMe, 25B-NBOMe) sold as LSD have caused multiple deaths. They produce severe vasoconstriction, hyperthermia, and seizures. The critical harm reduction message: if a blotter tastes bitter, spit it out immediately. Real LSD is tasteless. This simple action can save lives.',
          citations: ['hirschfeld_2021', 'malcolm_2022']
        },
        {
          title: 'Polydrug Use Drives Mortality',
          icon: '💊',
          content: 'A staggering 82% of psychedelic-related deaths involved polydrug use. LSD itself has a very high therapeutic index and is rarely lethal on its own. The real danger comes from combinations—with alcohol, other drugs, contaminated substances, or contraindicated medications. Isolation of LSD use (avoiding mixing) is perhaps the single most important mortality-prevention strategy.',
          citations: ['kopra_2025']
        },
        {
          title: 'HPPD: Prevalence Unclear, Impact Variable',
          icon: '👁️',
          content: 'HPPD prevalence estimates range wildly from 15% to 77% depending on the study, likely reflecting methodological differences and subjective interpretation. Importantly, no cases have been reported in contemporary clinical trials with screened populations. Many who experience persistent perceptual changes do not find them distressing or harmful. For those who do, the condition appears more associated with frequent, high-dose, or polydrug use.',
          citations: ['halpern_2003', 'carhart-harris_2010', 'ortiz_bernal_2022']
        },
        {
          title: 'Psychiatric Screening Works',
          icon: '🔍',
          content: 'In screened clinical populations, serious adverse psychiatric events are rare. The 1.3% rate of persistent psychotic symptoms and low rates of emergency interventions in modern trials contrast sharply with higher rates in naturalistic use. This demonstrates that comprehensive psychiatric screening—excluding active psychosis, personal history of psychotic disorders, and carefully managing other risk factors—dramatically improves safety outcomes.',
          citations: ['carhart-harris_2010', 'johnson_2008', 'garcia-romeu_2018']
        }
      ]
    },
    '2cb': {
      overview: {
        classification: 'Non-Classical Serotonergic Psychedelic (Phenethylamine)',
        mechanism: '5-HT2A partial agonist',
        activeMetabolite: 'Direct action',
        legalStatus: 'Schedule I (USA)',
      },
      dosing: {
        microdose: 'Not established',
        threshold: '1 mg',
        light: '1-5 mg',
        common: '10-25 mg',
        therapeutic: 'No established protocols',
        strong: '20-30 mg',
        heavy: '30 mg+',
        recreational: '10-25 mg (typical)'
      },
      pharmacokinetics: {
        onset: '20-60 minutes',
        peak: '60-120 minutes',
        duration: '6-8 hours',
        tolerance: 'Presumed rapid development',
        crossTolerance: 'LSD, mescaline, other phenethylamines'
      },
      prevalenceData: {
        lifetimeUse: 'Limited data - found in illicit markets',
        erVisits: 'Rare but documented severe reactions',
        emergencyRate: 'Very high co-use with MDMA (common combination)'
      },
      riskFactors: [
        {
          category: 'Route of Administration - CRITICAL',
          severity: 'critical',
          conditions: [
            {
              name: 'Insufflation (Snorting)',
              level: 'Absolute',
              notes: 'SEVERE NEUROLOGICAL RISKS - Never insufflate 2C-B',
              details: {
                description: 'Insufflation (snorting) of 2C-B is associated with severe, potentially life-threatening neurological complications. This route of administration dramatically increases risk compared to oral use and has NO safety benefit.',
                mechanism: 'Intranasal administration causes direct neurological impact, possibly through rapid absorption or local tissue effects. The mechanism is not fully understood but complications are well-documented.',
                prevalence: 'Documented cases of cerebral edema, epileptic seizures, and cerebral vasculopathy specifically with insufflation. These are NOT seen with oral administration.',
                harmReduction: [
                  { name: 'ORAL ADMINISTRATION ONLY', link: null },
                  { name: 'Never insufflate 2C-X compounds', link: null },
                  { name: 'Education about neurological risks', link: 'hrp_psychoeducation_comprehensive_001' }
                ],
                citations: 'Hirschfeld et al. 2021'
              }
            }
          ]
        },
        {
          category: 'Contamination & Adulteration',
          severity: 'critical',
          conditions: [
            {
              name: 'NBOMe Adulteration',
              level: 'Absolute',
              notes: 'Extremely dangerous compounds sold as 2C-B - deaths documented',
              details: {
                description: 'NBOMe compounds (25I-NBOMe, 25C-NBOMe, 25B-NBOMe) are frequently sold as 2C-B or LSD. These substances are FAR more dangerous than 2C-B, causing seizures, severe adverse reactions, and deaths.',
                mechanism: 'NBOMes have different pharmacology with much higher toxicity. They cause severe vasoconstriction, hyperthermia, seizures, and can be fatal at doses that fit on blotter or in capsules.',
                prevalence: 'Common problem in illicit markets. Multiple documented deaths. 67% of regular NBOMe users develop HPPD; 20% risk from single use.',
                harmReduction: [
                  { name: 'Reagent testing essential (Ehrlich, Marquis reagents)', link: null },
                  { name: 'If bitter taste, spit it out (2C-B has minimal taste)', link: null },
                  { name: 'Test doses with unknown sources', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Lab analysis when available', link: null }
                ],
                citations: 'Hirschfeld et al. 2021; Malcolm & Thomas 2022'
              }
            },
            {
              name: 'Dosage Variability',
              level: 'Caution',
              notes: 'Hot spots and cold spots within same batch',
              details: {
                description: 'Illicit 2C-B powder and crystal formulations show dramatic inconsistency in concentration, with "hot spots" of high concentration and "cold spots" with little active ingredient within the same batch.',
                mechanism: 'Uneven distribution in powder, variable tablet pressing, inconsistent synthesis create unpredictable dosing.',
                prevalence: 'Documented problem. Makes consistent dosing extremely difficult and increases overdose risk.',
                harmReduction: [
                  { name: 'Volumetric dosing for powder', link: null },
                  { name: 'Precision milligram scale (0.001g minimum)', link: null },
                  { name: 'Never eyeball doses', link: null },
                  { name: 'Start very low with new batches', link: 'hrp_start_low_go_slow_001' }
                ],
                citations: 'Hirschfeld et al. 2021; Bremler et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Medications',
          severity: 'critical',
          conditions: [
            {
              name: 'SSRIs / MAOIs / Triptans',
              level: 'Absolute',
              notes: 'SEVERE serotonin syndrome risk - potentially fatal',
              details: {
                description: 'Combining 2C-B with serotonergic medications (SSRIs, MAOIs, triptans for migraines) creates critical risk of serotonin syndrome - a potentially life-threatening emergency.',
                mechanism: 'Excessive serotonergic activity from combined effects. MAOIs prevent serotonin breakdown while 2C-B increases activity, leading to dangerous accumulation. SSRIs block reuptake, creating similar risk.',
                prevalence: 'Well-documented risk. Serotonin syndrome can be fatal without treatment.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Never combine - absolute prohibition', link: null },
                  { name: 'Know serotonin syndrome symptoms', link: null },
                  { name: 'Wait appropriate washout period after stopping medications', link: null }
                ],
                citations: 'Hirschfeld et al. 2021'
              }
            },
            {
              name: 'Lithium',
              level: 'Absolute',
              notes: 'Significantly increased seizure risk',
              details: {
                description: 'Lithium combined with psychedelics including 2C-B dramatically increases seizure risk. This is an absolute contraindication.',
                mechanism: 'Unknown mechanism but well-documented dangerous interaction that significantly elevates seizure risk.',
                prevalence: 'Documented cases of seizures with lithium + psychedelic combinations.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Never combine', link: null },
                  { name: 'Medical consultation essential', link: null }
                ],
                citations: 'Nayak et al. 2021'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            {
              name: 'Personal or family history of psychosis',
              level: 'Absolute',
              notes: 'High risk of triggering episodes',
              details: {
                description: 'Personal history of psychotic disorders or strong family history are contraindications for 2C-B use due to elevated risk of triggering psychotic episodes.',
                mechanism: 'Psychedelics including 2C-B can destabilize vulnerable neurotransmitter systems, triggering psychotic decompensation even in those currently stable.',
                prevalence: 'Prolonged psychotic reactions documented though rare. Higher risk in those with psychiatric vulnerabilities.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Avoid use if personal history present', link: null },
                  { name: 'Extra caution with family history', link: null }
                ],
                citations: 'Baumeister et al. 2015; Sabe et al. 2024'
              }
            },
            {
              name: 'Bipolar disorder',
              level: 'Absolute',
              notes: 'Risk of manic episode induction',
              details: {
                description: 'Bipolar disorder is an absolute contraindication for 2C-B. Risk of triggering manic episodes and mood destabilization.',
                mechanism: '2C-B can induce mania or hypomania in vulnerable individuals, causing dangerous mood destabilization.',
                prevalence: 'Documented risk of manic episode induction.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance recommended', link: null }
                ],
                citations: 'Aday et al. 2021; Ghaznavi et al. 2025'
              }
            },
            {
              name: 'Anxiety and mood disorders',
              level: 'Relative',
              notes: 'Can worsen existing symptoms',
              details: {
                description: 'Pre-existing anxiety or depression are relative contraindications. 2C-B can worsen symptoms, though therapeutic potential exists with proper support.',
                mechanism: '2C-B can amplify existing anxiety or depressive symptoms during and after the experience.',
                prevalence: 'Common in those seeking alternatives. Variable outcomes.',
                harmReduction: [
                  { name: 'Thorough assessment', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Symptom stability required', link: null },
                  { name: 'Enhanced support', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Integration planning', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Ona et al. 2018'
              }
            }
          ]
        },
        {
          category: 'Cardiovascular',
          severity: 'high',
          conditions: [
            {
              name: 'Uncontrolled hypertension / Arrhythmias',
              level: 'Absolute',
              notes: '2C-B increases heart rate and blood pressure',
              details: {
                description: 'Cardiovascular disease including uncontrolled hypertension and arrhythmias are contraindications. 2C-B increases cardiac workload.',
                mechanism: '2C-B increases heart rate and blood pressure through serotonergic and sympathomimetic effects on cardiovascular system.',
                prevalence: 'Documented tachycardia and hypertension in emergency presentations. 2C-I specifically associated with cardiac arrest.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Blood pressure control essential', link: null },
                  { name: 'Continuous vital sign monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Medical supervision required', link: null }
                ],
                citations: 'Aday et al. 2020; Fonzo et al. 2025; Baumeister et al. 2015'
              }
            }
          ]
        },
        {
          category: 'Polydrug Use',
          severity: 'high',
          conditions: [
            {
              name: 'Co-use with MDMA',
              level: 'Caution',
              notes: 'Very common but risky combination',
              details: {
                description: '2C-B is very commonly combined with MDMA in party/festival settings. This combination creates unpredictable interactions and increased physiological burden.',
                mechanism: 'Both substances affect serotonin. Combined cardiovascular effects increase strain on heart. Difficult to attribute effects to specific substance.',
                prevalence: 'Extremely common combination according to global surveys. High co-use rates.',
                harmReduction: [
                  { name: 'Ideally avoid combination', link: null },
                  { name: 'If combining, use lower doses of both', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Increased monitoring essential', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Stay cool and hydrated', link: null },
                  { name: 'Substance testing for both', link: null }
                ],
                citations: 'Caudevilla et al. 2012; Kopra et al. 2025'
              }
            }
          ]
        },
        {
          category: 'Demographics',
          severity: 'moderate',
          conditions: [
            {
              name: 'Age under 25',
              level: 'Caution',
              notes: 'Developing brain more vulnerable',
              details: {
                description: 'Younger individuals under 25 show elevated vulnerability to adverse effects from all psychedelics including 2C-B.',
                mechanism: 'Developing brain more susceptible to disruption. Neurotransmitter systems still maturing. Lower risk awareness and higher impulsivity.',
                prevalence: '53% of those with negative psychedelic effects were under 25.',
                harmReduction: [
                  { name: 'Enhanced education', link: 'hrp_public_harm_reduction_001' },
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Supervision recommended', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Consider delaying use until age 25+', link: null }
                ],
                citations: 'Bremler et al. 2023'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Acute Anxiety',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Specific data not available; presumed common based on general psychedelic use',
            description: 'Anxiety experienced during 2C-B experience. May range from mild unease to significant distress.',
            management: 'Reassurance typically sufficient. Breathing exercises, grounding techniques, environmental adjustment. Benzodiazepines if reassurance insufficient.',
            notes: 'Limited specific data for 2C-B. Evidence extrapolated from other psychedelics.',
            harmReduction: [
              { name: 'Set and Setting Optimization', link: 'hrp_physical_environment_001' },
              { name: 'Coping Skills Training', link: 'hrp_coping_skills_training_001' },
              { name: 'Trip Sitter Present', link: null }
            ]
          },
          {
            name: 'Paranoia and Confusion',
            timeframe: 'During session',
            severity: 'Moderate to Severe',
            prevalence: 'Documented with 2C-I; presumed risk with 2C-B',
            description: 'Paranoid ideation, suspiciousness, confusion, and disorientation. 2C-I specifically associated with paranoia and aggression.',
            management: 'Calm environment, reassurance, avoid confrontation. Benzodiazepines first-line. Antipsychotics if severe and unresponsive.',
            notes: '2C-I has documented paranoia and aggression in emergency presentations.',
            harmReduction: [
              { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Supportive Environment', link: 'hrp_physical_environment_001' },
              { name: 'Avoid 2C-I specifically', link: null }
            ]
          },
          {
            name: 'Prolonged Psychotic Reactions',
            timeframe: 'Extended (days to weeks)',
            severity: 'Severe',
            prevalence: 'Rare but documented',
            description: 'Psychotic symptoms persisting beyond acute drug effects. Higher risk in those with psychiatric vulnerabilities.',
            management: 'Psychiatric evaluation, antipsychotic medication, supportive therapy, hospitalization if severe.',
            notes: 'More common in uncontrolled settings and vulnerable individuals.',
            harmReduction: [
              { name: 'Comprehensive Psychiatric Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Exclude high-risk individuals', link: null },
              { name: 'Integration Support', link: 'hrp_integration_therapy_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During session',
            severity: 'Moderate to Severe',
            prevalence: 'Common; 2C-I associated with cardiac arrest in case reports',
            description: 'Tachycardia, hypertension, risk of cardiac events. 2C-I specifically documented with cardiac arrest and respiratory arrest.',
            management: 'Vital signs monitoring, supportive care. Beta-blockers if indicated. Emergency medical services for severe cardiac symptoms.',
            notes: '2C-I appears particularly dangerous for cardiovascular system. All 2C-X should be considered to carry cardiovascular risk.',
            harmReduction: [
              { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Continuous Vital Sign Monitoring', link: 'hrp_continuous_monitoring_001' },
              { name: 'Exclude cardiovascular disease', link: null }
            ]
          },
          {
            name: 'Serotonin Syndrome',
            timeframe: 'Acute (minutes to hours)',
            severity: 'Severe to Critical',
            prevalence: 'Risk elevated with medication combinations',
            description: 'Potentially life-threatening condition from excessive serotonin. Symptoms: hyperthermia, agitation, muscle rigidity, tremor, hyperreflexia, confusion. Severe cases: seizures, rhabdomyolysis, death.',
            management: 'EMERGENCY. Discontinue all serotonergic agents. Benzodiazepines, cooling measures, IV fluids, vital sign monitoring. ICU admission for severe cases. Cyproheptadine (serotonin antagonist).',
            notes: 'Can be fatal without treatment. Especially with SSRI, MAOI, or triptan combinations.',
            harmReduction: [
              { name: 'Comprehensive Medication Review', link: 'hrp_screening_comprehensive_001' },
              { name: 'Absolute avoidance of serotonergic drug combinations', link: null },
              { name: 'Know serotonin syndrome symptoms', link: null },
              { name: 'Emergency protocol prepared', link: null }
            ]
          },
          {
            name: 'Seizures',
            timeframe: 'Acute',
            severity: 'Severe to Critical',
            prevalence: 'Documented with 2C-I and insufflation of 2C-B; greatly increased with lithium',
            description: 'Seizure activity. Risk dramatically elevated with insufflation route and lithium co-administration.',
            management: 'Immediate medical attention. Benzodiazepines. Airway protection. Emergency services.',
            notes: 'Insufflation of 2C-B specifically associated with epileptic seizures. Lithium combination significantly increases risk.',
            harmReduction: [
              { name: 'ORAL administration only', link: null },
              { name: 'Never insufflate', link: null },
              { name: 'Never combine with lithium', link: null },
              { name: 'Medical screening', link: 'hrp_screening_comprehensive_001' }
            ]
          },
          {
            name: 'Cerebral Edema',
            timeframe: 'Acute',
            severity: 'Critical',
            prevalence: 'Documented with insufflation',
            description: 'Brain swelling. Life-threatening emergency. Associated specifically with intranasal administration of 2C-B.',
            management: 'IMMEDIATE emergency services. Hospital admission. Intensive care. Neurosurgical consultation.',
            notes: 'Insufflation dramatically increases this risk. NOT seen with oral administration.',
            harmReduction: [
              { name: 'ORAL administration only', link: null },
              { name: 'Never insufflate 2C-X compounds', link: null },
              { name: 'Strong education about route risks', link: 'hrp_psychoeducation_comprehensive_001' }
            ]
          },
          {
            name: 'Cerebral Vasculopathy',
            timeframe: 'Acute',
            severity: 'Critical',
            prevalence: 'Documented with insufflation',
            description: 'Blood vessel abnormalities in the brain. Severe to critical. Associated with intranasal administration.',
            management: 'Immediate medical attention. Neurological assessment. Imaging. Specialist consultation.',
            notes: 'Specific to insufflation route. Another reason intranasal administration is absolutely contraindicated.',
            harmReduction: [
              { name: 'ORAL administration only', link: null },
              { name: 'Never insufflate', link: null }
            ]
          },
          {
            name: 'Renal Failure',
            timeframe: 'Acute to subacute',
            severity: 'Critical',
            prevalence: 'Rare but documented with 2C-I',
            description: 'Acute kidney injury or renal failure. Life-threatening.',
            management: 'Immediate medical attention. Supportive care. Dialysis if indicated. Hospitalization required.',
            notes: '2C-I specifically documented with renal failure in emergency presentations.',
            harmReduction: [
              { name: 'Medical screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Avoid 2C-I specifically', link: null },
              { name: 'Hydration', link: null }
            ]
          }
        ],
        perceptual: [
          {
            name: 'HPPD (Hallucinogen Persisting Perception Disorder)',
            timeframe: 'Long-term',
            severity: 'Variable',
            prevalence: 'NBOMes: 67% regular use, 20% single use. 2C-B: presumed lower but unknown',
            description: 'Persistent visual disturbances (visual snow, trails, afterimages, geometric patterns) lasting beyond session. NBOMe compounds carry dramatically elevated HPPD risk.',
            management: 'Reassurance. Benzodiazepines (anecdotal). Lamotrigine (case reports). Often improves with time.',
            notes: 'NBOMe adulteration makes this a critical concern. If substance is actually NBOMe and not 2C-B, HPPD risk is extremely high.',
            harmReduction: [
              { name: 'Substance testing to avoid NBOMes', link: null },
              { name: 'Avoid frequent use', link: null },
              { name: 'Avoid polydrug combinations', link: null }
            ]
          }
        ]
      },
      clinicalContext: [
        {
          title: 'The Research Void',
          icon: '❌',
          content: 'There is virtually NO clinical research on 2C-B. Unlike psilocybin and LSD which have dozens of modern clinical trials, 2C-B has essentially zero controlled studies. Everything we know comes from case reports, emergency room presentations, and user surveys. This means the safety profile is highly uncertain, proper dosing is not established, and drug interactions are poorly understood. Users are essentially conducting uncontrolled experiments on themselves.',
          citations: ['metadata_2cx']
        },
        {
          title: 'Insufflation is Uniquely Dangerous',
          icon: '💀',
          content: 'Snorting 2C-B is associated with severe neurological complications NOT seen with oral administration: cerebral edema (brain swelling), epileptic seizures, and cerebral vasculopathy (blood vessel abnormalities in the brain). The mechanism is unknown, but the risk is documented. There is NO safety benefit to insufflation. This is an absolute contraindication - oral administration only.',
          citations: ['hirschfeld_2021']
        },
        {
          title: 'NBOMe: The Deadly Impostor',
          icon: '☠️',
          content: 'NBOMe compounds (25I-NBOMe and others) are frequently sold as 2C-B or LSD. These are FAR more dangerous: multiple deaths documented, seizures, severe vasoconstriction, hyperthermia. The HPPD risk is staggering - 67% of regular users and 20% from SINGLE use. NBOMes have a bitter taste; 2C-B does not. If it tastes bitter, spit it out immediately. Reagent testing is not optional—it\'s lifesaving.',
          citations: ['hirschfeld_2021', 'malcolm_2022', 'retrospective_analysis']
        },
        {
          title: 'The MDMA Combination',
          icon: '💊',
          content: '2C-B is very commonly combined with MDMA in party and festival settings. While this combination is popular, it creates unpredictable interactions, increased physiological burden (both affect serotonin and cardiovascular system), and makes it difficult to determine which substance is causing effects. The combination amplifies risks and complicates emergency response. If combining despite risks, use significantly lower doses of both substances.',
          citations: ['caudevilla_2012']
        },
        {
          title: 'Serotonin Syndrome is Real and Fatal',
          icon: '🔥',
          content: 'Combining 2C-B with SSRIs, MAOIs, or triptans (migraine medications) creates severe serotonin syndrome risk. Symptoms: hyperthermia, muscle rigidity, confusion, agitation, seizures. This can be FATAL without treatment. The combination is an absolute contraindication. Anyone taking serotonergic medications must wait for appropriate washout periods before considering 2C-B use.',
          citations: ['hirschfeld_2021']
        },
        {
          title: 'Lithium Creates Seizure Risk',
          icon: '⚡',
          content: 'Lithium combined with psychedelics including 2C-B significantly increases seizure risk through an unknown mechanism. This interaction is well-documented and represents an absolute contraindication. Anyone taking lithium should never use 2C-B or other psychedelics.',
          citations: ['nayak_2021']
        },
        {
          title: 'Dosing is a Nightmare',
          icon: '⚖️',
          content: 'Illicit 2C-B shows dramatic dosage variability with "hot spots" and "cold spots" within the same batch. Powder and crystal forms are particularly problematic. Without a precision milligram scale (0.001g accuracy) and volumetric dosing technique, consistent dosing is impossible. "Eyeballing" doses is extremely dangerous and can lead to accidental overdoses.',
          citations: ['hirschfeld_2021', 'bremler_2023']
        },
        {
          title: 'Rave Culture Context',
          icon: '🎵',
          content: '2C-B is primarily used in recreational party/festival settings rather than therapeutic contexts. This culture emphasizes hedonistic use over intentional exploration, normalizes polydrug combinations, and exposes users to environmental stressors (heat, noise, crowds) that increase risks. The lack of preparation, integration, and harm reduction infrastructure in these settings amplifies dangers. Applying therapeutic use principles even in recreational contexts could significantly improve safety.',
          citations: ['cultural_factors_2cx']
        }
      ]
    },
    mdma: {
      overview: {
        classification: 'Entactogen/Empathogen (Phenethylamine)',
        mechanism: 'Monoamine transporter reversal (SERT, NET, DAT)',
        activeMetabolite: 'Multiple active metabolites',
        legalStatus: 'Schedule I (USA) - FDA Breakthrough Therapy for PTSD',
      },
      dosing: {
        microdose: 'Not applicable',
        threshold: '50 mg',
        light: '50-75 mg',
        common: '75-125 mg',
        therapeutic: '75-225 mg (psychedelic-assisted therapy)',
        strong: '125-150 mg',
        heavy: '150 mg+',
        recreational: '75-150 mg (typical)'
      },
      pharmacokinetics: {
        onset: '30-60 minutes',
        peak: '60-120 minutes',
        duration: '3-6 hours (acute effects), 24-72 hours (aftereffects)',
        tolerance: 'Develops with regular use',
        crossTolerance: 'Minimal with classical psychedelics'
      },
      prevalenceData: {
        lifetimeUse: '3.5% of 15-34 year-olds (Switzerland); 4.5-6% of 14-15 year-olds (England)',
        erVisits: '1% of users (2020)',
        emergencyRate: 'Among most commonly used illicit substances worldwide'
      },
      riskFactors: [
        {
          category: 'Dosage & Redosing',
          severity: 'critical',
          conditions: [
            {
              name: 'High Dose (>150 mg)',
              level: 'Caution',
              notes: 'Dramatically increases risk; illicit pills often contain 200-300mg',
              details: {
                description: 'Higher doses significantly increase risk of hyperthermia, hyponatremia, serotonin syndrome, cardiovascular complications, neurotoxicity, cognitive impairment, and amnesia. Illicit market "megadose" pills containing 200-300mg are increasingly common.',
                mechanism: 'Non-linear dose-response relationship. MDMA inhibits its own metabolism, causing disproportionate increases in effects and toxicity at higher doses.',
                prevalence: 'Illicit tablets often contain 2-3x typical recreational dose. Up to 500mg/session reported. High doses (≥3 mg/kg, ~210mg for 70kg person) may have addictive potential.',
                harmReduction: [
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Substance testing to determine actual dose', link: null },
                  { name: 'Never exceed 150mg', link: null },
                  { name: 'Medical supervision for therapeutic use', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Dourron et al. 2023; Bremler et al. 2023; Henriquez et al. 2023; Pantoni et al. 2022; Papaseit et al. 2018'
              }
            },
            {
              name: 'Redosing / Repeated Consumption',
              level: 'Absolute',
              notes: 'CRITICAL RISK - Exponentially increases toxicity',
              details: {
                description: 'Taking multiple doses within a short period (redosing) is one of the most dangerous MDMA practices. Creates exponential increases in plasma levels and adverse effects due to non-linear kinetics.',
                mechanism: 'MDMA inhibits its own metabolism through CYP2D6. Each additional dose is metabolized more slowly, causing dramatic accumulation. Second dose can produce 3-4x the expected increase in plasma levels.',
                prevalence: 'Common in party settings. Users redose due to memory impairment, tolerance perception, or desire to prolong effects. Memory impairment during MDMA use increases risk of unintentional redosing.',
                harmReduction: [
                  { name: 'Never redose - single dose only', link: null },
                  { name: 'If redosing occurs despite advice, wait minimum 3-4 hours and use much smaller dose', link: null },
                  { name: 'Write down dose and time to prevent memory-related redosing', link: null },
                  { name: 'Trip sitter to prevent impulsive redosing', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Dourron et al. 2023; Henriquez et al. 2023; Papaseit et al. 2018; Poyatos et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Demographics',
          severity: 'high',
          conditions: [
            {
              name: 'Female Sex',
              level: 'Caution',
              notes: 'Women significantly more vulnerable to adverse effects',
              details: {
                description: 'Women experience higher plasma MDMA concentrations, more intense subjective and perceptual effects, more frequent and intense anxiety and depression, more adverse mood during comedown, and elevated hyponatremia risk.',
                mechanism: 'Higher plasma concentrations from same dose due to sex differences in metabolism, body composition, and hormonal factors. Women with lower BMIs particularly vulnerable to hyponatremia.',
                prevalence: 'Documented in multiple controlled studies showing consistent sex differences in MDMA response.',
                harmReduction: [
                  { name: 'Lower doses for women (consider 1.0-1.5 mg/kg vs 1.5-2.0 mg/kg)', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Enhanced monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Careful fluid restriction', link: null },
                  { name: 'Integration support for comedown', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Papaseit et al. 2018; Atila et al. 2024; Parrott 2014'
              }
            },
            {
              name: 'Low Body Mass Index',
              level: 'Caution',
              notes: 'Lower BMI = higher plasma concentrations = higher risk',
              details: {
                description: 'Lower body weight results in higher plasma MDMA concentrations from same absolute dose, significantly increasing hyponatremia and other adverse effect risks.',
                mechanism: 'Concentration-dependent effects. Same mg dose produces higher blood levels in smaller individuals.',
                prevalence: 'Particularly relevant for women, who tend to have lower average body weight.',
                harmReduction: [
                  { name: 'Dose based on body weight (mg/kg)', link: null },
                  { name: 'Enhanced monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Fluid restriction', link: null }
                ],
                citations: 'Atila et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Environmental',
          severity: 'critical',
          conditions: [
            {
              name: 'Hot Environments & Physical Exertion',
              level: 'Caution',
              notes: 'Dancing in hot clubs/festivals = hyperthermia risk',
              details: {
                description: 'Hot environments combined with physical exertion (dancing) create life-threatening hyperthermia risk. This is a LEADING CAUSE of MDMA-related deaths.',
                mechanism: 'MDMA inhibits brain\'s temperature regulation center. Physical exertion generates heat. Crowded environments reduce heat dissipation. Dehydration compounds risk. The combination creates a perfect storm for dangerous temperature elevation.',
                prevalence: 'Hyperthermia is leading cause of MDMA-related deaths. Can occur even with modest doses when environmental conditions are unfavorable.',
                harmReduction: [
                  { name: 'Cool environment essential', link: 'hrp_physical_environment_001' },
                  { name: 'Take regular breaks from dancing', link: null },
                  { name: 'Cool down periodically', link: null },
                  { name: 'Light, breathable clothing', link: null },
                  { name: 'Monitor for hyperthermia symptoms', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Access to air conditioning or cool areas', link: null }
                ],
                citations: 'Curry et al. 2018; Papaseit et al. 2018; Vollenweider 1998; Atila et al. 2024; Barnett et al. 2021'
              }
            },
            {
              name: 'Overhydration (Excessive Water Intake)',
              level: 'Absolute',
              notes: '37% develop hyponatremia even in controlled settings - CAN BE FATAL',
              details: {
                description: 'Drinking excessive water with MDMA causes life-threatening hyponatremia (dangerously low sodium). Occurred in 37% of participants even in controlled study with medical supervision. Severe cases can be FATAL.',
                mechanism: 'MDMA causes inappropriate ADH (antidiuretic hormone) secretion, increasing water retention. Excessive water intake dilutes sodium in blood. Combination creates dangerous hyponatremia even from single dose.',
                prevalence: '37% with unrestricted fluid intake, 31% even with fluid restriction in controlled study. Severe cases documented with sodium levels 101-130 mEq/L (normal 135-145). Multiple deaths from water intoxication.',
                harmReduction: [
                  { name: 'FLUID RESTRICTION during session', link: null },
                  { name: 'Maximum ~500ml water per hour', link: null },
                  { name: 'Sip, don\'t chug', link: null },
                  { name: 'Electrolyte drinks instead of plain water', link: null },
                  { name: 'Education: "More water is NOT safer"', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Monitor for hyponatremia symptoms', link: null }
                ],
                citations: 'Atila et al. 2024; Barnett et al. 2021; Edwards et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Medications',
          severity: 'critical',
          conditions: [
            {
              name: 'MAOIs (Monoamine Oxidase Inhibitors)',
              level: 'Absolute',
              notes: 'POTENTIALLY FATAL serotonin syndrome - NEVER COMBINE',
              details: {
                description: 'Combining MDMA with MAOIs is ABSOLUTELY CONTRAINDICATED. Can cause severe, potentially fatal serotonin syndrome. Multiple deaths documented.',
                mechanism: 'MAOIs prevent breakdown of serotonin. MDMA massively increases serotonin release. Together they cause profound, dangerous serotonin accumulation.',
                prevalence: 'Deaths documented. Repeatedly cited in medical literature as one of most dangerous drug combinations. Even moclobemide (reversible MAOI) has caused life-threatening reactions.',
                harmReduction: [
                  { name: 'NEVER COMBINE - Absolute prohibition', link: null },
                  { name: 'Wait minimum 2 weeks after stopping MAOIs', link: null },
                  { name: 'Comprehensive medication screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Know serotonin syndrome symptoms', link: null }
                ],
                citations: 'Barnett et al. 2021; Malcolm & Thomas 2022'
              }
            },
            {
              name: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
              level: 'Relative',
              notes: 'Serotonin syndrome risk; may reduce MDMA effects',
              details: {
                description: 'SSRIs increase serotonin syndrome risk and typically blunt MDMA effects. Not absolute contraindication but requires caution and medical supervision.',
                mechanism: 'SSRIs block serotonin reuptake, increasing risk of excessive serotonin with MDMA. They also downregulate receptors, often reducing MDMA\'s subjective effects.',
                prevalence: 'Common in clinical populations. Variable outcomes - some experience reduced effects, others normal responses, some increased adverse effects.',
                harmReduction: [
                  { name: 'Medical supervision essential', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Consider tapering under medical guidance', link: null },
                  { name: 'May need dose adjustment (often lower)', link: null },
                  { name: 'Monitor for serotonin syndrome symptoms', link: null },
                  { name: 'Comprehensive medication screening', link: 'hrp_screening_comprehensive_001' }
                ],
                citations: 'Barnett et al. 2021; Baggott et al.; Sarparast et al. 2022'
              }
            },
            {
              name: 'Ritonavir (HIV Antiretroviral)',
              level: 'Absolute',
              notes: 'Liver metabolism interaction causes overdose',
              details: {
                description: 'Ritonavir and other protease inhibitor antiretrovirals dramatically inhibit MDMA metabolism, causing dangerous overdose from normal doses.',
                mechanism: 'Ritonavir inhibits CYP enzymes that metabolize MDMA. Same dose produces much higher blood levels.',
                prevalence: 'Critical concern for people living with HIV on antiretroviral therapy.',
                harmReduction: [
                  { name: 'Comprehensive medication screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Significant dose reduction if use occurs despite advice', link: null },
                  { name: 'Medical supervision essential', link: null }
                ],
                citations: 'Sarparast et al. 2022'
              }
            }
          ]
        },
        {
          category: 'Cardiovascular',
          severity: 'critical',
          conditions: [
            {
              name: 'Severe Cardiovascular Disease',
              level: 'Absolute',
              notes: 'MI, arrhythmia, sudden death risk',
              details: {
                description: 'Severe cardiovascular disease including recent MI, unstable angina, severe arrhythmias, or uncontrolled hypertension are absolute contraindications. MDMA can trigger life-threatening cardiac events.',
                mechanism: 'MDMA significantly increases heart rate and blood pressure through sympathomimetic effects. In compromised cardiovascular systems, this can trigger MI, arrhythmia, or sudden cardiac death.',
                prevalence: 'Myocardial infarction documented in emergency presentations. Typically excluded from clinical trials.',
                harmReduction: [
                  { name: 'Comprehensive cardiac screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'ECG and medical evaluation', link: null },
                  { name: 'Absolute avoidance if severe disease', link: null },
                  { name: 'Continuous monitoring if mild/controlled disease', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Baumeister et al. 2015; Vollenweider 1998; Makunts et al. 2021, 2023'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'high',
          conditions: [
            {
              name: 'Active Psychotic Disorders',
              level: 'Absolute',
              notes: 'Can trigger prolonged psychotic episodes',
              details: {
                description: 'Active psychotic disorders including schizophrenia, schizoaffective disorder, or bipolar with psychotic features are absolute contraindications.',
                mechanism: 'MDMA can exacerbate psychotic symptoms and trigger prolonged psychotic episodes.',
                prevalence: 'Documented cases of psychotic exacerbation.',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance if active psychosis', link: null }
                ],
                citations: 'Ghaznavi et al. 2025; Strassman 1984; Parrott 2014'
              }
            },
            {
              name: 'Active Suicidality',
              level: 'Absolute',
              notes: 'Risk increased during comedown period',
              details: {
                description: 'Recent suicide attempts or active suicidal ideation are absolute contraindications. MDMA comedown can worsen depression and suicidal thoughts.',
                mechanism: 'Serotonin depletion during comedown can worsen depression. "Midweek blues" can trigger suicidal ideation in vulnerable individuals.',
                prevalence: 'Temporary depression common after MDMA use. Can be severe in those with pre-existing depression.',
                harmReduction: [
                  { name: 'Thorough suicide risk assessment', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance if active suicidality', link: null },
                  { name: 'Post-session monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Integration support', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Parrott 2014; Sarparast et al. 2022'
              }
            },
            {
              name: 'Depression & Anxiety Disorders',
              level: 'Relative',
              notes: 'Can worsen during comedown; therapeutic target',
              details: {
                description: 'Pre-existing depression or anxiety are relative contraindications. MDMA can worsen symptoms during comedown but is also being studied therapeutically for these conditions.',
                mechanism: 'Serotonin depletion after MDMA can temporarily worsen depression and anxiety. However, therapeutic use with proper support may improve these conditions.',
                prevalence: 'Comedown depression and anxiety very common. 83% of regular users report low mood between sessions, 80% report impaired concentration.',
                harmReduction: [
                  { name: 'Careful screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Symptom stability required', link: null },
                  { name: 'Integration support essential', link: 'hrp_integration_therapy_001' },
                  { name: 'Post-session monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Avoid if currently unstable', link: null }
                ],
                citations: 'Lacroix et al. 2024; Parrott 2014; Breeksema et al. 2022'
              }
            }
          ]
        },
        {
          category: 'Polydrug Use',
          severity: 'critical',
          conditions: [
            {
              name: 'Alcohol Co-Use',
              level: 'Caution',
              notes: '81% of users combine; 66% of deaths involve other drugs',
              details: {
                description: 'Combining MDMA with alcohol dramatically increases adverse effects, dehydration, and impaired judgment. 81% of ecstasy users also consume alcohol. 66% of MDMA deaths involve another drug besides alcohol.',
                mechanism: 'Alcohol increases dehydration risk, impairs judgment (leading to poor decisions about dosing/hydration), increases toxicity, and compounds cardiovascular stress.',
                prevalence: 'Extremely common combination. 66% of MDMA/ecstasy-related deaths in England and Wales involved another drug.',
                harmReduction: [
                  { name: 'Avoid alcohol entirely during MDMA use', link: null },
                  { name: 'If alcohol consumed, minimize amount', link: null },
                  { name: 'Enhanced hydration monitoring', link: null },
                  { name: 'Education about polydrug risks', link: 'hrp_public_harm_reduction_001' }
                ],
                citations: 'Edwards et al. 2023; Sarparast et al. 2022; Makunts et al. 2023'
              }
            },
            {
              name: 'Stimulant Combinations',
              level: 'Absolute',
              notes: 'Severe cardiovascular stress, hyperthermia',
              details: {
                description: 'Combining MDMA with other stimulants (cocaine, amphetamines, methamphetamine) is extremely dangerous, causing severe cardiovascular stress and hyperthermia.',
                mechanism: 'Additive stimulant effects dramatically increase heart rate, blood pressure, body temperature, and cardiac workload.',
                prevalence: 'Common but extremely dangerous combination.',
                harmReduction: [
                  { name: 'Never combine with stimulants', link: null },
                  { name: 'Education about combination dangers', link: 'hrp_public_harm_reduction_001' }
                ],
                citations: 'Sarparast et al. 2022; Makunts et al. 2023'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Acute Anxiety',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Most common psychological adverse event in acute phase',
            description: 'Anxiety during or shortly after MDMA administration. Can range from mild apprehensiveness to fear of losing control, panic, fear of death.',
            management: 'Reassurance, calm environment, breathing exercises. Usually sufficient. Benzodiazepines if severe.',
            notes: 'More frequent and intense in women.',
            harmReduction: [
              { name: 'Set and Setting Optimization', link: 'hrp_physical_environment_001' },
              { name: 'Psychoeducation', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Supportive presence', link: null }
            ]
          },
          {
            name: 'Memory Impairment (Acute)',
            timeframe: 'During session',
            severity: 'Moderate',
            prevalence: 'Common',
            description: 'Transient memory impairment during effects. Primarily affects memory while executive functions and attention mostly unaffected. Includes false memories for similar details and decreased accuracy of true memories.',
            management: 'Document dose and timing in writing. Trip sitter to help track.',
            notes: 'CRITICAL CONCERN: May lead to dangerous redosing due to forgetting amount already consumed.',
            harmReduction: [
              { name: 'Write down dose and time', link: null },
              { name: 'Trip sitter present', link: null },
              { name: 'Pre-commitment to single dose', link: null }
            ]
          },
          {
            name: 'Post-MDMA "Blues" / "Midweek Blues"',
            timeframe: 'Subacute (24-72 hours post-use)',
            severity: 'Moderate',
            prevalence: 'Very common - 83% of regular users report low mood between sessions',
            description: 'Period of neurochemical depletion following MDMA use. Symptoms: anhedonia, lethargy, anger, depression, low mood, impaired concentration (80%).',
            management: 'Supportive care, adequate rest, nutrition, integration therapy. Usually resolves within days.',
            notes: 'Women report more adverse mood effects than men. Can trigger suicidal ideation in vulnerable individuals.',
            harmReduction: [
              { name: 'Prepare for comedown', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Clear schedule for recovery period', link: null },
              { name: 'Integration support', link: 'hrp_integration_therapy_001' },
              { name: 'Social support', link: null }
            ]
          },
          {
            name: 'Long-term Cognitive Impairment',
            timeframe: 'Long-term (months to years)',
            severity: 'Variable - primarily in heavy users',
            prevalence: 'Controversial - more common with heavy/repeated use',
            description: 'Memory deficits, attention problems, verbal and non-verbal learning impairment, psychomotor function deficits, executive function deficits. Can persist up to two years after cessation.',
            management: 'Cessation of use, cognitive rehabilitation, time.',
            notes: 'Extent in humans debated. More likely with high doses, frequent use, and polydrug use.',
            harmReduction: [
              { name: 'Avoid frequent use', link: null },
              { name: 'Minimize total lifetime exposure', link: null },
              { name: 'Avoid high doses', link: 'hrp_start_low_go_slow_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Hyperthermia',
            timeframe: 'Acute',
            severity: 'Critical',
            prevalence: 'LEADING CAUSE of MDMA-related deaths',
            description: 'Dangerous increase in body temperature. Can occur even with modest doses when combined with hot environments and physical exertion.',
            management: 'EMERGENCY. Immediate cooling measures, IV fluids, ice packs, cold water, fan. Emergency medical services. Can be fatal without rapid treatment.',
            notes: 'Mechanism: MDMA inhibits brain\'s temperature regulation center. Exacerbated by dancing, hot environments, dehydration.',
            harmReduction: [
              { name: 'Cool environment essential', link: 'hrp_physical_environment_001' },
              { name: 'Regular breaks from activity', link: null },
              { name: 'Monitor temperature', link: 'hrp_continuous_monitoring_001' },
              { name: 'Access to cooling', link: null }
            ]
          },
          {
            name: 'Hyponatremia (Water Intoxication)',
            timeframe: 'Acute',
            severity: 'Critical',
            prevalence: '37% in controlled study with unrestricted fluids; 31% even with restriction',
            description: 'Dangerously low sodium levels (<135 mEq/L). Severe cases documented with sodium 101-130 mEq/L. Symptoms: nausea, headache, confusion (mild); vomiting, muscle weakness (moderate); seizures, coma, death (severe).',
            management: 'EMERGENCY if severe. Hospital admission, hypertonic saline, fluid restriction. Can be FATAL.',
            notes: 'Caused by inappropriate ADH secretion + excessive water intake. Higher risk in women with low BMI.',
            harmReduction: [
              { name: 'FLUID RESTRICTION - maximum ~500ml/hour', link: null },
              { name: 'Sip, don\'t chug', link: null },
              { name: 'Electrolyte drinks preferred', link: null },
              { name: 'Education: more water is NOT safer', link: 'hrp_psychoeducation_comprehensive_001' }
            ]
          },
          {
            name: 'Serotonin Syndrome',
            timeframe: 'Acute (minutes to hours)',
            severity: 'Critical',
            prevalence: 'Rare alone; more common with polydrug use (SSRIs, MAOIs)',
            description: 'Potentially life-threatening condition from excessive serotonin. Symptoms: hyperthermia, tachycardia, hypertension, muscle rigidity, tremor, hyperreflexia, agitation, confusion. Severe: seizures, death.',
            management: 'EMERGENCY. Discontinue all serotonergic agents. Benzodiazepines, cooling, IV fluids, ICU admission for severe cases. Cyproheptadine (serotonin antagonist).',
            notes: 'Especially with MAOI or SSRI combinations. Can be FATAL without treatment.',
            harmReduction: [
              { name: 'Comprehensive medication screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Never combine with MAOIs', link: null },
              { name: 'Caution with SSRIs', link: null },
              { name: 'Know symptoms', link: null }
            ]
          },
          {
            name: 'Cardiovascular Effects',
            timeframe: 'Acute',
            severity: 'Moderate to Severe',
            prevalence: 'Increased HR and BP common; MI rare but documented',
            description: 'Increased heart rate and blood pressure. Severe cases: hypertensive crisis, myocardial infarction, arrhythmia, sudden cardiac death.',
            management: 'Vital signs monitoring. Medical intervention if sustained elevation. Emergency services for severe symptoms.',
            notes: 'Particularly dangerous in those with pre-existing cardiovascular disease.',
            harmReduction: [
              { name: 'Cardiac screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' },
              { name: 'Avoid if cardiovascular disease', link: null }
            ]
          },
          {
            name: 'Neurotoxicity',
            timeframe: 'Long-term',
            severity: 'Variable',
            prevalence: 'Documented in animals; extent in humans debated',
            description: 'Potential persistent damage to serotonergic neurons. May contribute to long-term cognitive and psychiatric problems.',
            management: 'Prevention through minimizing use, avoiding high doses and frequent use.',
            notes: 'Particularly concerning with heavy, repeated use over time.',
            harmReduction: [
              { name: 'Minimize lifetime exposure', link: null },
              { name: 'Avoid high doses', link: 'hrp_start_low_go_slow_001' },
              { name: 'Avoid frequent use', link: null },
              { name: 'Long intervals between uses', link: null }
            ]
          }
        ],
        perceptual: []
      },
      clinicalContext: [
        {
          title: 'FDA Breakthrough Therapy for PTSD',
          icon: '🏥',
          content: 'MDMA has received FDA Breakthrough Therapy designation for PTSD treatment. Multiple Phase 3 clinical trials show remarkable efficacy when combined with psychotherapy. This represents a potential paradigm shift in trauma treatment. However, therapeutic use occurs in carefully controlled medical settings with screening, preparation, medical supervision, and integration support—very different from recreational use.',
          citations: ['sarparast_2022', 'mithoefer_2013']
        },
        {
          title: 'Hyperthermia: The Leading Killer',
          icon: '🌡️',
          content: 'Hyperthermia (overheating) is the LEADING CAUSE of MDMA-related deaths. MDMA disrupts the brain\'s temperature regulation center. Combined with hot nightclub environments, prolonged dancing, crowded spaces, and dehydration, this creates a perfect storm for dangerous temperature elevation. Can occur even with modest doses. Deaths have been documented. Cool environments and regular breaks from physical activity are not optional—they\'re lifesaving.',
          citations: ['curry_2018', 'papaseit_2018', 'vollenweider_1998']
        },
        {
          title: 'The Hyponatremia Epidemic',
          icon: '💧',
          content: 'In a controlled medical study, 37% of participants developed hyponatremia (dangerously low sodium) from a single MDMA dose with unrestricted fluid intake. Even with fluid restriction, 31% still developed it. Severe cases with sodium levels of 101-130 mEq/L (normal 135-145) have been documented—these are life-threatening emergencies. Multiple deaths have occurred from "water intoxication." The harm reduction message "drink water" has backfired catastrophically. The truth: FLUID RESTRICTION is essential. Maximum ~500ml per hour. Sip, don\'t chug. More water is NOT safer.',
          citations: ['atila_2024', 'barnett_2021', 'edwards_2023']
        },
        {
          title: 'Redosing is Exponentially Dangerous',
          icon: '🔄',
          content: 'MDMA inhibits its own metabolism. Taking a second dose doesn\'t double effects—it can triple or quadruple them due to non-linear kinetics. Each additional dose is metabolized more slowly, causing dramatic accumulation. This is compounded by MDMA\'s memory impairment effects, which can lead users to forget how much they\'ve taken. Redosing is one of the most dangerous MDMA practices and dramatically increases risk of all adverse events including hyperthermia, hyponatremia, and serotonin syndrome.',
          citations: ['dourron_2023', 'henriquez_2023', 'papaseit_2018', 'poyatos_2023']
        },
        {
          title: 'Women Are More Vulnerable',
          icon: '♀️',
          content: 'Women experience significantly higher plasma MDMA concentrations from the same dose, more intense subjective and perceptual effects, more frequent and intense anxiety and depression during use, worse comedown symptoms, and elevated hyponatremia risk—especially those with lower body weight. This isn\'t a minor difference; it\'s a fundamental sex-based vulnerability that requires dose adjustment and enhanced monitoring. Women should consider using lower doses (1.0-1.5 mg/kg vs 1.5-2.0 mg/kg for men).',
          citations: ['papaseit_2018', 'atila_2024', 'parrott_2014']
        },
        {
          title: 'The "Midweek Blues" Are Real',
          icon: '😔',
          content: 'MDMA causes massive serotonin release followed by depletion. This creates the characteristic "comedown" or "midweek blues" 1-3 days after use: depression, anhedonia, lethargy, irritability, impaired concentration. 83% of regular users report low mood between sessions; 80% report impaired concentration. This isn\'t just feeling tired—it\'s neurochemical depletion. In vulnerable individuals, it can trigger suicidal ideation. Plan for recovery time. Clear your schedule. Have integration support. This is a medical necessity, not a lifestyle choice.',
          citations: ['parrott_2014', 'breeksema_2022']
        },
        {
          title: 'Polydrug Use Drives Mortality',
          icon: '💊',
          content: '66% of MDMA/ecstasy-related deaths in England and Wales involved another drug besides alcohol. 81% of ecstasy users also consume alcohol. The combination dramatically increases dehydration, impairs judgment (leading to dangerous decisions about dosing and hydration), and compounds toxicity. Combining MDMA with other stimulants creates severe cardiovascular stress. The MAO inhibitor combination can be FATAL. Isolation of MDMA use—avoiding all other substances—is critical for safety.',
          citations: ['edwards_2023', 'sarparast_2022', 'makunts_2023']
        },
        {
          title: 'Memory Impairment Causes Redosing',
          icon: '🧠',
          content: 'MDMA causes transient memory impairment during acute effects. Users may forget how much they\'ve taken, when they took it, or that they\'d decided not to redose. This cognitive impairment directly contributes to dangerous redosing behavior. The solution: write down your dose and time before taking MDMA. Have a trip sitter who knows the plan. Pre-commit to a single dose. Your memory cannot be trusted during MDMA intoxication.',
          citations: ['basedow_2024', 'kloft_2022', 'kuypers_2005']
        }
      ]
    },
    dmt: {
      overview: {
        classification: 'Classical Serotonergic Psychedelic (Tryptamine)',
        mechanism: '5-HT2A receptor agonist',
        activeMetabolite: 'None (rapid metabolism via MAO)',
        legalStatus: 'Schedule I (USA)',
      },
      dosing: {
        microdose: 'Not applicable',
        threshold: '1 mg',
        light: '5-10 mg (inhaled)',
        common: '10-20 mg (inhaled)',
        therapeutic: '0.1-0.4 mg/kg IV (research)',
        strong: '20-40 mg (inhaled)',
        heavy: '40+ mg (inhaled)',
        recreational: '6-20 mg (typical inhaled)'
      },
      pharmacokinetics: {
        onset: 'Seconds (inhaled/IV), 30-60 min (oral with MAOI)',
        peak: '2 minutes (inhaled/IV)',
        duration: '10-30 minutes (inhaled/IV), 4-6 hours (oral with MAOI)',
        tolerance: 'Minimal - may sensitize with repeated use',
        crossTolerance: 'Psilocybin, LSD, mescaline'
      },
      prevalenceData: {
        lifetimeUse: 'Relatively low compared to other psychedelics',
        erVisits: 'Deaths from DMT alone are rare',
        emergencyRate: 'Most deaths involve polydrug use'
      },
      riskFactors: [
        {
          category: 'Dosage & Administration',
          severity: 'high',
          conditions: [
            {
              name: 'Steep Dose-Response Curve',
              level: 'Caution',
              notes: 'Small increases cause large effect increases',
              details: {
                description: 'DMT has an extremely steep dose-response curve. Small increases in dose cause disproportionately large increases in effects. This makes accidental overdosing easy and effects highly unpredictable.',
                mechanism: 'Non-linear dose-response relationship combined with difficulty in accurate dosing, especially with smoking/vaporizing methods.',
                prevalence: 'Common problem with illicit DMT. Variable potency, lack of quality control, and difficulty measuring precise amounts create high risk.',
                harmReduction: [
                  { name: 'Use pharmaceutical-grade DMT when possible', link: null },
                  { name: 'Precise measurement essential', link: null },
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Substance testing for purity', link: null }
                ],
                citations: 'Bremler et al. 2023; Malcolm & Thomas 2022; Lancelotta & Daws 2020; Engel et al. 2024'
              }
            },
            {
              name: 'Route of Administration Risks',
              level: 'Caution',
              notes: 'IV/IM extremely rapid and intense; oral requires MAOI',
              details: {
                description: 'Different routes create vastly different experiences and risks. IV/IM routes produce extremely rapid, overwhelming onset with highest cardiovascular stress. Inhalation difficult to dose accurately. Oral route inactive without MAOI, creating dangerous interaction risks.',
                mechanism: 'IV produces almost immediate effects (seconds) with highest intensity. Smoking/vaporizing has rapid onset but difficult dose control. Oral DMT requires MAOI for activity, creating serotonin syndrome risk.',
                prevalence: 'Smoking/vaporizing most common recreationally. IV only in research settings. Oral in ayahuasca contexts.',
                harmReduction: [
                  { name: 'Avoid IV/IM outside clinical settings', link: null },
                  { name: 'If smoking, use seated position', link: null },
                  { name: 'Have sitter present for immediate onset', link: null },
                  { name: 'Oral use: only in controlled ceremonial/clinical setting', link: null },
                  { name: 'MAOI combinations require medical supervision', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Barker et al. 2022; Falchi-Carvalho & Baker 2024; Engel et al. 2024; Dos Santos et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Behavioral Risks',
          severity: 'high',
          conditions: [
            {
              name: 'Loss of Awareness & Unpredictable Behavior',
              level: 'Caution',
              notes: 'Users may lack memory/awareness of actions during effects',
              details: {
                description: 'DMT users often exhibit unpredictable behaviors and may lack awareness or memory of their actions during acute effects. Includes muscle jerking, twitching, vomiting, screaming, removing clothes, self-injury (rare).',
                mechanism: 'Extreme alteration in consciousness creates dissociation from physical body and surroundings. Users cannot control or remember their actions.',
                prevalence: 'Common. Odd behaviors very frequent during DMT experiences.',
                harmReduction: [
                  { name: 'NEVER use DMT alone', link: null },
                  { name: 'Trained facilitator or experienced sitter essential', link: null },
                  { name: 'Safe physical environment', link: 'hrp_physical_environment_001' },
                  { name: 'Remove hazards from setting', link: null },
                  { name: 'Continuous monitoring', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Dourron & Saiz 2023'
              }
            },
            {
              name: 'Flashbacks / Reactivations',
              level: 'Caution',
              notes: '25-73% experience brief re-experiences of drug effects',
              details: {
                description: 'Re-experiencing DMT effects after acute experience subsided. Brief (seconds) visual, auditory, or emotional experiences. More common with DMT than typical psychedelics.',
                mechanism: 'Unknown. May relate to epileptiform activity in temporal lobes.',
                prevalence: '25-73% depending on study. More frequent at night or when drifting to sleep. Most positive/neutral; minority report distress.',
                harmReduction: [
                  { name: 'Psychoeducation about possibility', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Integration support if distressing', link: 'hrp_integration_therapy_001' },
                  { name: 'Reassurance they are brief and temporary', link: null }
                ],
                citations: 'Dourron & Saiz 2023; Ortiz-Bernal et al. 2022; Ramaekers et al. 2025'
              }
            }
          ]
        },
        {
          category: 'Polydrug Use',
          severity: 'critical',
          conditions: [
            {
              name: 'DMT + MDMA',
              level: 'Absolute',
              notes: 'Fatal adverse events documented',
              details: {
                description: 'Combining DMT with MDMA has caused fatal adverse events. This combination is extremely dangerous.',
                mechanism: 'Both affect serotonin system. Combined effects create unpredictable and potentially fatal serotonin toxicity and cardiovascular stress.',
                prevalence: 'Deaths documented. Absolute contraindication.',
                harmReduction: [
                  { name: 'NEVER combine DMT with MDMA', link: null },
                  { name: 'Education about lethal combinations', link: 'hrp_public_harm_reduction_001' }
                ],
                citations: 'Malcolm & Thomas 2022; Kopra et al. 2025'
              }
            },
            {
              name: 'DMT + 5-MeO-DMT',
              level: 'Absolute',
              notes: 'Fatal adverse events documented',
              details: {
                description: 'Combining DMT with 5-MeO-DMT has caused deaths. Never combine these substances.',
                mechanism: 'Both are powerful tryptamines affecting serotonin. Combined effects unpredictable and dangerous.',
                prevalence: 'Deaths documented.',
                harmReduction: [
                  { name: 'NEVER combine DMT with 5-MeO-DMT', link: null }
                ],
                citations: 'Malcolm & Thomas 2022; Kopra et al. 2025'
              }
            },
            {
              name: 'MAOIs (for oral DMT)',
              level: 'Caution',
              notes: 'Required for oral activity but creates serious risks',
              details: {
                description: 'Oral DMT requires MAOI co-administration (ayahuasca). This creates serotonin syndrome risk, dangerous drug interactions, and hypertensive crisis with tyramine foods. Only acceptable in controlled ceremonial or clinical settings.',
                mechanism: 'MAOIs prevent DMT breakdown, enabling oral activity. But MAOIs cause dangerous interactions with many medications and foods.',
                prevalence: 'Traditional ayahuasca use widespread. Requires extensive precautions.',
                harmReduction: [
                  { name: 'Only in controlled ayahuasca ceremony or clinical setting', link: null },
                  { name: 'Tyramine-free diet', link: null },
                  { name: 'Comprehensive medication review', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Medical supervision', link: null }
                ],
                citations: 'Dos Santos et al. 2024; Malcolm & Thomas 2022; Engel et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            {
              name: 'Psychotic Disorders',
              level: 'Absolute',
              notes: 'Schizophrenia, schizoaffective, psychotic depression',
              details: {
                description: 'Personal history of psychotic disorders is absolute contraindication for DMT.',
                mechanism: 'DMT may trigger or exacerbate psychotic episodes in vulnerable individuals.',
                prevalence: 'Minimal risk in general population but high risk in those with psychiatric vulnerabilities.',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance if personal history', link: null },
                  { name: 'Family history warrants caution', link: null }
                ],
                citations: 'Sabe et al. 2024; White et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Cardiovascular',
          severity: 'critical',
          conditions: [
            {
              name: 'Unstable Cardiovascular Disease',
              level: 'Absolute',
              notes: 'DMT increases BP and HR - sympathomimetic effects',
              details: {
                description: 'Unstable or severe cardiovascular disease is absolute contraindication. DMT causes increases in blood pressure and heart rate.',
                mechanism: 'Sympathomimetic effects increase cardiovascular workload.',
                prevalence: 'Generally mild and transient in healthy individuals but dangerous in those with cardiovascular disease.',
                harmReduction: [
                  { name: 'Cardiovascular assessment mandatory', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Real-time monitoring during sessions', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Absolute contraindication if unstable', link: null }
                ],
                citations: 'Falchi-Carvalho & Baker 2024; Ramaekers et al. 2025; Strassman 1994'
              }
            }
          ]
        },
        {
          category: 'Other Contraindications',
          severity: 'critical',
          conditions: [
            {
              name: 'Epilepsy',
              level: 'Absolute',
              notes: 'Theoretical seizure induction risk',
              details: {
                description: 'Epilepsy is absolute contraindication for DMT due to theoretical seizure induction risk.',
                mechanism: 'Theoretical concern based on mechanism. Basis for exclusion from clinical trials.',
                prevalence: 'No documented cases but excluded from trials as precaution.',
                harmReduction: [
                  { name: 'Absolute avoidance if epilepsy', link: null },
                  { name: 'Family history also warrants caution', link: null }
                ],
                citations: 'Bodnar et al. 2019'
              }
            },
            {
              name: 'Pregnancy',
              level: 'Absolute',
              notes: 'Abortifacient and teratogenic effects in animal models',
              details: {
                description: 'Pregnancy is absolute contraindication. Animal models show abortifacient and teratogenic effects at higher ayahuasca doses.',
                mechanism: 'Potential fetal harm documented in animal research.',
                prevalence: 'Absolute exclusion from any use.',
                harmReduction: [
                  { name: 'Never use during pregnancy', link: null }
                ],
                citations: 'White et al. 2024; Bodnar et al. 2019'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Overwhelming Breakthrough Experiences',
            timeframe: 'During session (peak 2-10 min)',
            severity: 'Profound',
            prevalence: 'Very common at higher doses',
            description: 'Extreme alterations in spatiotemporal perception, sense of transportation to alternate dimensions, entity encounters, ego death, mystical experiences. Can be overwhelming and terrifying despite being subjectively valuable.',
            management: 'Preparation essential. During experience: reassurance, non-directive support, safe environment. Integration support after.',
            notes: 'DMT produces uniquely intense experiences distinct from other psychedelics. Rapid onset leaves little time for psychological adjustment.',
            harmReduction: [
              { name: 'Enhanced preparation for extreme intensity', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Start with lower doses', link: 'hrp_start_low_go_slow_001' },
              { name: 'Experienced guide present', link: null },
              { name: 'Integration therapy essential', link: 'hrp_integration_therapy_001' }
            ]
          },
          {
            name: 'Challenging Experiences / Fear',
            timeframe: 'During session',
            severity: 'Moderate to Severe',
            prevalence: 'Common, especially with insufficient preparation',
            description: 'Intense fear, anxiety, sense of dying, terror, panic. The rapid, overwhelming onset and extreme nature of DMT experiences can be profoundly frightening.',
            management: 'Reassurance, grounding (though often ineffective during peak), reminders that effects are temporary. Preparation is key.',
            notes: 'More likely with high doses, unprepared users, unsafe settings.',
            harmReduction: [
              { name: 'Comprehensive preparation', link: 'hrp_preparation_meetings_001' },
              { name: 'Appropriate set and setting', link: 'hrp_physical_environment_001' },
              { name: 'Trusted guide', link: null }
            ]
          },
          {
            name: 'Flashbacks / Reactivations',
            timeframe: 'Days to weeks post-use',
            severity: 'Variable',
            prevalence: '25-73% experience brief reactivations',
            description: 'Spontaneous, brief (seconds) re-experiencing of visual, auditory, or emotional aspects of DMT experience. Can occur at night or when drifting to sleep. Most positive/neutral but minority find distressing.',
            management: 'Psychoeducation, reassurance of brevity and temporary nature. Integration support if distressing.',
            notes: 'More common with DMT than typical psychedelics. May be more common after vaporized administration.',
            harmReduction: [
              { name: 'Prepare users for possibility', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Integration support', link: 'hrp_integration_therapy_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Increases in blood pressure and heart rate. Generally mild and transient in healthy individuals.',
            management: 'Monitoring essential. Medical evaluation if sustained elevation.',
            notes: 'Sympathomimetic effects. Dangerous in those with cardiovascular disease.',
            harmReduction: [
              { name: 'Cardiovascular screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          },
          {
            name: 'Physical Symptoms',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Respiratory irritation from smoking (coughing, airway hyperresponsiveness), nausea, increased body temperature, muscle jerking, twitching.',
            management: 'Generally self-limiting. Supportive care.',
            notes: 'Smoking/vaporizing harsh on airways.',
            harmReduction: [
              { name: 'Use electric combustion over flame', link: null },
              { name: 'Inhale while seated', link: null }
            ]
          }
        ],
        perceptual: []
      },
      clinicalContext: [
        {
          title: 'The "Businessman\'s Trip" - Intensity in Minutes',
          icon: '⚡',
          content: 'DMT is nicknamed the "Businessman\'s Trip" because the entire experience lasts only 10-30 minutes when inhaled. But don\'t let the brevity fool you—those minutes contain what users describe as the most intense psychedelic experience possible. The onset is measured in seconds. Peak effects at 2 minutes. No time to ease in, no time to prepare psychologically once it starts. This compressed timeline makes DMT uniquely overwhelming and demanding of preparation beforehand.',
          citations: ['engel_2024', 'falchi-carvalho_2024']
        },
        {
          title: 'Entity Encounters & Alternate Dimensions',
          icon: '👽',
          content: 'DMT produces a phenomenology unlike any other psychedelic. Users consistently report transportation to entirely different dimensions, encounters with autonomous entities (often described as intelligent beings), immersion in impossible geometric spaces, and complete replacement of consensus reality. These aren\'t "hallucinations" in the typical sense—they\'re experienced as more real than everyday reality. This unique phenomenology requires specific preparation and integration that differs from other psychedelics.',
          citations: ['lancelotta_2020', 'strassman_1994']
        },
        {
          title: 'The Steep Dose-Response Cliff',
          icon: '📊',
          content: 'DMT has an exceptionally steep dose-response curve. Small increases in dose create disproportionately large increases in effects. The difference between 15mg and 25mg inhaled can be the difference between manageable and completely overwhelming. Combined with difficulty in accurate dosing (especially with smoking/vaporizing), this creates high risk for accidental overdosing and unpredictable intensity. Precision in dosing is not optional.',
          citations: ['lancelotta_2020', 'engel_2024']
        },
        {
          title: 'Behavioral Unpredictability',
          icon: '🤸',
          content: 'During DMT experiences, users frequently exhibit behaviors they have no awareness of or memory of: muscle jerking, twitching, vomiting, screaming, removing clothes, abnormal vocalizations. Rare but documented: self-injurious behavior. Users are completely dissociated from their physical body and surroundings. This is why you should NEVER use DMT alone. An experienced sitter is not optional—it\'s essential for safety.',
          citations: ['dourron_2023']
        },
        {
          title: 'Flashbacks Are Common',
          icon: '💫',
          content: '25-73% of DMT users experience flashbacks or "reactivations"—brief (seconds) spontaneous re-experiencing of visual, auditory, or emotional aspects of the DMT trip. More common than with typical psychedelics. Often occur at night or when falling asleep. Most are positive or neutral, but some find them distressing enough to seek psychological help. The mechanism is unknown but may relate to epileptiform activity in temporal lobes. Users should be prepared for this possibility.',
          citations: ['dourron_2023', 'ortiz_bernal_2022', 'ramaekers_2025']
        },
        {
          title: 'Polydrug Fatalities',
          icon: '☠️',
          content: 'Deaths from DMT alone are rare. But combining DMT with MDMA or 5-MeO-DMT has caused fatal adverse events. Multiple deaths are documented with these combinations. The mechanism is poorly understood but involves serotonin toxicity and cardiovascular stress. These are absolute contraindications. Most psychedelic-related deaths involve multiple implicated drugs. DMT should never be combined with other substances.',
          citations: ['malcolm_2022', 'kopra_2025']
        },
        {
          title: 'The Ayahuasca Context',
          icon: '🌿',
          content: 'DMT is orally inactive unless combined with MAO inhibitors (MAOIs). In ayahuasca brews, harmala alkaloids provide MAOI activity, enabling 4-6 hour DMT experiences. But MAOIs create serious risks: serotonin syndrome with many medications, hypertensive crisis with tyramine-containing foods, and dangerous interactions. Ayahuasca use should only occur in controlled ceremonial settings with proper dietary restrictions, medication review, and experienced facilitation. This is not recreational use—it\'s a medical necessity for safety.',
          citations: ['dos_santos_2024', 'malcolm_2022']
        },
        {
          title: 'Therapeutic Promise vs. Research Gap',
          icon: '🔬',
          content: 'DMT is being investigated for treatment-resistant depression. Its rapid onset, short duration, reliable production of mystical experiences, and scalability make it theoretically attractive versus longer-acting psychedelics. But research remains limited compared to psilocybin. Safety profile less established. Dosing protocols less refined. The therapeutic potential is real, but we\'re still in early stages of understanding how to use DMT safely and effectively in clinical contexts.',
          citations: ['falchi-carvalho_2024', 'eckernas_2022', 'dourron_2023']
        }
      ]
    },
    '5meodmt': {
      overview: {
        classification: 'Atypical Psychedelic (Tryptamine)',
        mechanism: 'Non-selective serotonin receptor agonist (5-HT1A > 5-HT2A)',
        activeMetabolite: 'Bufotenine (also psychoactive)',
        legalStatus: 'Schedule I (USA)',
      },
      dosing: {
        microdose: 'Not applicable',
        threshold: '1 mg',
        light: '1-5 mg (intranasal)',
        common: '6-12 mg (intranasal), 6-20 mg (inhaled)',
        therapeutic: '1-12 mg (intranasal, research)',
        strong: '12-20 mg (inhaled)',
        heavy: '20+ mg (inhaled)',
        recreational: '6-20 mg (typical inhaled)'
      },
      pharmacokinetics: {
        onset: 'Seconds (inhaled/IV), 5-7 min (intranasal)',
        peak: '2-5 minutes (inhaled)',
        duration: '15-20 minutes (inhaled), 45 minutes (intranasal)',
        tolerance: 'Sensitization possible (opposite of tolerance)',
        crossTolerance: 'Unclear - different from classical psychedelics'
      },
      prevalenceData: {
        lifetimeUse: '1.2% US adults (2009-2013) for psychedelic tryptamines group',
        erVisits: 'Strongest association with perceived need for care among psychedelics',
        emergencyRate: 'Elevated risk of contraindications'
      },
      riskFactors: [
        {
          category: 'Extreme Intensity',
          severity: 'critical',
          conditions: [
            {
              name: 'More Intense Than Other Psychedelics',
              level: 'Caution',
              notes: '37% of first-time users report challenging effects',
              details: {
                description: '5-MeO-DMT is consistently described as MORE INTENSE than other psychedelics including DMT, psilocybin, and LSD. Produces profound ego dissolution, mystical experiences, sense of dying, and "white-out" void experiences. 37% of first-time users experience fear, anxiety, feeling like dying, panic.',
                mechanism: 'Higher affinity for 5-HT1A than 5-HT2A (opposite of classical psychedelics). Non-selective serotonin agonism creates uniquely intense and unpredictable effects.',
                prevalence: 'Extremely intense experiences nearly universal at common-strong doses. Preparation often inadequate for actual intensity.',
                harmReduction: [
                  { name: 'Enhanced preparation essential', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Start with very low doses', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Experienced facilitator required', link: null },
                  { name: 'Expect overwhelming intensity', link: null }
                ],
                citations: 'Dourron & Saiz 2023; Lancelotta & Daws 2020; Rucker et al. 2024'
              }
            },
            {
              name: 'Steep Dose-Response Curve',
              level: 'Caution',
              notes: 'Small dose increases = large effect increases',
              details: {
                description: '5-MeO-DMT has extremely steep dose-response curve. Small increases in dose cause dramatic increases in effects. Easy to accidentally overdose. Many users uncertain of dose consumed.',
                mechanism: 'High potency combined with steep dose-effect relationship.',
                prevalence: 'Dosing uncertainty common. Toad venom has highly variable concentrations.',
                harmReduction: [
                  { name: 'Precise measurement essential', link: null },
                  { name: 'Use synthetic 5-MeO-DMT (consistent potency)', link: null },
                  { name: 'Avoid toad-derived (variable, unethical)', link: null },
                  { name: 'Volumetric dosing if possible', link: null }
                ],
                citations: 'Lancelotta & Daws 2020; Bremler et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Behavioral Risks',
          severity: 'high',
          conditions: [
            {
              name: 'Loss of Control & Unpredictable Behavior',
              level: 'Caution',
              notes: 'Users lack awareness of physical actions',
              details: {
                description: 'Users exhibit unpredictable behaviors with no awareness or memory: vomiting, screaming, removing clothes, muscle jerking/twitching, abnormal vocalizations, spontaneous orgasms, self-injury (rare). Complete dissociation from physical body.',
                mechanism: 'Profound ego dissolution and loss of bodily awareness.',
                prevalence: 'Behavioral unpredictability very common.',
                harmReduction: [
                  { name: 'NEVER use alone', link: null },
                  { name: 'Experienced trip sitter essential', link: null },
                  { name: 'Safe physical environment', link: 'hrp_physical_environment_001' },
                  { name: 'Remove hazards', link: null }
                ],
                citations: 'Dourron & Saiz 2023'
              }
            },
            {
              name: 'Flashbacks / Reactivations',
              level: 'Caution',
              notes: '27-73% experience reactivations - MORE than typical psychedelics',
              details: {
                description: 'Brief (seconds) spontaneous re-experiences of drug effects. Visual, auditory, emotional components. More frequent with 5-MeO-DMT than other psychedelics. Vaporized route more likely than IM. Most positive/neutral but 4-7% report negative reactivations requiring psychological help.',
                mechanism: 'Unknown. May relate to epileptiform activity in temporal lobes.',
                prevalence: '27-73% across studies. Higher in ceremonial settings (73%) vs general population (27%).',
                harmReduction: [
                  { name: 'Psychoeducation about high likelihood', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Integration support', link: 'hrp_integration_therapy_001' },
                  { name: 'Consider IM over inhalation to reduce risk', link: null }
                ],
                citations: 'Dourron & Saiz 2023; Ortiz-Bernal et al. 2022; Ramaekers et al. 2025'
              }
            }
          ]
        },
        {
          category: 'Pharmacological Risks',
          severity: 'critical',
          conditions: [
            {
              name: 'Sensitization (Not Tolerance)',
              level: 'Caution',
              notes: 'Effects may INCREASE with repeated use',
              details: {
                description: 'Unlike typical psychedelics, 5-MeO-DMT may cause SENSITIZATION rather than tolerance. Repeated use may increase rather than decrease effects. This is opposite of normal tolerance pattern.',
                mechanism: 'Animal studies show behavioral sensitization. Higher peak experiences seen with individualized dosing regimens.',
                prevalence: 'Evidence from animal models and clinical observations.',
                harmReduction: [
                  { name: 'Do not assume tolerance with repeated use', link: null },
                  { name: 'May need lower doses after previous exposure', link: null },
                  { name: 'Unpredictable outcomes with frequent use', link: null }
                ],
                citations: 'Dourron & Saiz 2003'
              }
            },
            {
              name: 'Individual Metabolic Variability',
              level: 'Caution',
              notes: 'Genetic differences create unpredictable responses',
              details: {
                description: 'Genetic variations in cytochrome P450 enzymes affect 5-MeO-DMT metabolism, creating variable drug exposure and susceptibility to adverse effects. Bufotenine metabolite may accumulate unpredictably.',
                mechanism: 'Pharmacogenetic differences in metabolism.',
                prevalence: 'Universal - everyone has different metabolic profile.',
                harmReduction: [
                  { name: 'Start with very low doses', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Expect individual variability', link: null }
                ],
                citations: 'Dourron & Saiz 2023'
              }
            },
            {
              name: 'Potential Seizure Risk',
              level: 'Caution',
              notes: 'White-outs may relate to seizure-like activity',
              details: {
                description: 'Unique pharmacology may precipitate epileptiform activity. "White-out" void experiences may relate to seizure-like states. Muscle jerking, twitching, abnormal vocalizations documented.',
                mechanism: '5-HT1A receptor action in medial temporal lobes may trigger epileptiform activity.',
                prevalence: 'Animal studies document seizure-like behaviors. Case reports in humans.',
                harmReduction: [
                  { name: 'Absolute contraindication if seizure history', link: null },
                  { name: 'Family history of epilepsy warrants caution', link: null }
                ],
                citations: 'Dourron & Saiz 2023'
              }
            }
          ]
        },
        {
          category: 'MAOI Interactions',
          severity: 'critical',
          conditions: [
            {
              name: 'MAOIs + 5-MeO-DMT = FATAL',
              level: 'Absolute',
              notes: 'DEATHS DOCUMENTED - sixfold exposure increase',
              details: {
                description: 'Combining 5-MeO-DMT with MAOIs can be FATAL. Deaths documented. MAOIs increase 5-MeO-DMT exposure up to SIXFOLD, causing severe to fatal serotonin syndrome. This includes harmala alkaloids (ayahuasca, Syrian rue), pharmaceutical MAOIs, and natural MAOIs.',
                mechanism: 'MAOIs prevent 5-MeO-DMT breakdown, causing massive drug accumulation and serotonin toxicity.',
                prevalence: 'MULTIPLE DEATHS DOCUMENTED. Absolute contraindication.',
                harmReduction: [
                  { name: 'NEVER COMBINE - Absolute prohibition', link: null },
                  { name: 'Avoid harmala alkaloids entirely', link: null },
                  { name: 'No ayahuasca + 5-MeO-DMT', link: null },
                  { name: 'Comprehensive medication screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Know serotonin syndrome symptoms', link: null }
                ],
                citations: 'Malcolm & Thomas 2022'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            {
              name: 'Personal or Family History of Psychosis',
              level: 'Absolute',
              notes: 'Risk of long-lasting psychotic reactions',
              details: {
                description: 'Personal history of psychotic disorders (schizophrenia, schizoaffective, psychotic depression) or strong family history are absolute contraindications.',
                mechanism: 'May trigger or exacerbate psychotic episodes.',
                prevalence: 'Elevated risk in vulnerable populations.',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance if personal history', link: null },
                  { name: 'Family history requires extreme caution', link: null }
                ],
                citations: 'Sabe et al. 2024; White et al. 2024'
              }
            },
            {
              name: 'Prior Psychological Vulnerabilities',
              level: 'Relative',
              notes: '87% experienced anxiety worsening in one study',
              details: {
                description: 'History of anxiety, depression, or trauma are relative contraindications. One study found 87% experienced anxiety worsening.',
                mechanism: '5-MeO-DMT amplifies existing psychological issues.',
                prevalence: 'Very high rate of anxiety exacerbation.',
                harmReduction: [
                  { name: 'Careful screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced preparation', link: 'hrp_preparation_meetings_001' },
                  { name: 'Increased support', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Bremler et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Cardiovascular',
          severity: 'high',
          conditions: [
            {
              name: 'Cardiovascular Conditions',
              level: 'Relative',
              notes: 'Effects on CV system not well understood',
              details: {
                description: 'Cardiovascular effects not well understood. Dose-dependent increases in blood pressure and heart rate documented. Strong G-protein binding activation.',
                mechanism: 'Serotonergic effects on cardiovascular system.',
                prevalence: 'Transient increases common.',
                harmReduction: [
                  { name: 'Careful medical evaluation', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Continuous monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Medical personnel present', link: null }
                ],
                citations: 'Malcolm & Thomas 2022; James et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Source & Quality',
          severity: 'high',
          conditions: [
            {
              name: 'Toad-Derived vs Synthetic',
              level: 'Caution',
              notes: 'Toad venom: variable, contains bufotenin, unethical',
              details: {
                description: 'Toad-derived 5-MeO-DMT (Sonoran Desert toad venom) has significant concentration variability, contains bufotenine and other bufotoxins, and raises animal welfare concerns. Synthetic provides consistent potency without animal harm.',
                mechanism: 'Natural sources inherently variable. Additional compounds in toad venom create uncertainty.',
                prevalence: 'Both toad and synthetic available. Synthetic preferred.',
                harmReduction: [
                  { name: 'Use synthetic 5-MeO-DMT', link: null },
                  { name: 'Avoid toad-derived for ethical and safety reasons', link: null },
                  { name: 'Substance testing', link: null }
                ],
                citations: 'Neumann et al. 2024; Dourron & Saiz 2023; Ortiz-Bernal et al. 2022'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Overwhelming Ego Dissolution & White-Outs',
            timeframe: 'During session (peak 2-5 min)',
            severity: 'Profound',
            prevalence: 'Very common at typical doses',
            description: 'Complete loss of sense of self, experience of void or complete absence ("white-out"), feeling of being dead or dying, loss of awareness, amnesia for parts of experience. Can be profoundly disorienting and terrifying.',
            management: 'Preparation essential. Reassurance during (though user may not perceive). Integration support after.',
            notes: 'More common with 5-MeO-DMT than DMT or classical psychedelics. Uniquely intense.',
            harmReduction: [
              { name: 'Enhanced preparation for extreme intensity', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Experienced guide essential', link: null },
              { name: 'Integration therapy', link: 'hrp_integration_therapy_001' }
            ]
          },
          {
            name: 'Fear, Anxiety, Panic',
            timeframe: 'During session (especially first 10-15 min)',
            severity: 'Moderate to Severe',
            prevalence: '37% of first-time users experience challenging effects',
            description: 'Intense fear, anxiety, feeling like dying, panic, pressure on chest, body shaking. Particularly common during onset.',
            management: 'Reassurance, calm presence, reminders that experience is temporary.',
            notes: 'More intense than other psychedelics.',
            harmReduction: [
              { name: 'Comprehensive preparation', link: 'hrp_preparation_meetings_001' },
              { name: 'Start with lower doses', link: 'hrp_start_low_go_slow_001' },
              { name: 'Supportive setting', link: 'hrp_physical_environment_001' }
            ]
          },
          {
            name: 'Flashbacks / Reactivations',
            timeframe: 'Days to weeks post-use',
            severity: 'Variable',
            prevalence: '27-73% experience reactivations',
            description: 'MORE COMMON with 5-MeO-DMT than typical psychedelics. Brief spontaneous re-experiences. Visual, auditory, emotional. Most positive/neutral but 4-7% report distressing reactivations.',
            management: 'Psychoeducation, integration support, reassurance of brevity.',
            notes: 'Vaporized route more likely than intramuscular. May persist for months (anecdotal).',
            harmReduction: [
              { name: 'Prepare users for high likelihood', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Integration support', link: 'hrp_integration_therapy_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Transient increases in blood pressure and heart rate.',
            management: 'Monitoring essential.',
            notes: 'Generally mild and transient but not well characterized.',
            harmReduction: [
              { name: 'Cardiovascular screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          },
          {
            name: 'Nausea & Vomiting',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Nausea, vomiting, headache. Nasal discomfort with intranasal route.',
            management: 'Supportive care. Generally self-limiting.',
            notes: 'Part of purging process in ceremonial contexts.',
            harmReduction: [
              { name: 'Prepare users for possibility', link: 'hrp_psychoeducation_comprehensive_001' }
            ]
          }
        ],
        perceptual: []
      },
      clinicalContext: [
        {
          title: 'The Most Intense Psychedelic',
          icon: '🔥',
          content: '5-MeO-DMT is consistently described as MORE INTENSE than any other psychedelic including DMT, psilocybin, and LSD. Users report complete ego dissolution, white-out void experiences, feeling of death, and overwhelming mystical states that exceed anything experienced with other substances. 37% of FIRST-TIME users experience fear, anxiety, feeling like dying, and panic. This is not hyperbole—it is THE most intense psychedelic known. Preparation that works for other substances is often inadequate.',
          citations: ['dourron_2023', 'lancelotta_2020', 'rucker_2024']
        },
        {
          title: 'MAOIs Are FATAL',
          icon: '☠️',
          content: 'Combining 5-MeO-DMT with MAOIs causes SIXFOLD increases in drug exposure and has caused MULTIPLE DEATHS. This includes harmala alkaloids (ayahuasca, Syrian rue), pharmaceutical MAOIs, and natural MAOIs. Fatal serotonin syndrome is well-documented. Unlike DMT which requires MAOIs for oral activity, 5-MeO-DMT with MAOIs is a lethal combination. This is an absolute contraindication with documented fatalities. Safety profile fundamentally different from classical tryptamines.',
          citations: ['malcolm_2022']
        },
        {
          title: 'Flashbacks Are MORE Common',
          icon: '💫',
          content: '27-73% of 5-MeO-DMT users experience flashbacks/reactivations—significantly MORE than typical psychedelics and even more than DMT. Brief spontaneous re-experiences can persist for days, weeks, or months (anecdotal). Vaporized route appears riskier than intramuscular. While most are positive or neutral, 4-7% find them distressing enough to seek psychological help. The mechanism may relate to epileptiform activity in temporal lobes. This high rate should be disclosed to all users.',
          citations: ['dourron_2023', 'ortiz_bernal_2022', 'ramaekers_2025']
        },
        {
          title: 'Sensitization, Not Tolerance',
          icon: '📈',
          content: 'Unlike every other psychedelic, 5-MeO-DMT may cause SENSITIZATION with repeated use—effects become STRONGER, not weaker. Animal studies show behavioral sensitization. Clinical observations suggest higher peak experiences with individualized dosing regimens. This is the opposite of tolerance. Users should not assume they need higher doses with repeated use. In fact, they may need LOWER doses. Unpredictable and fundamentally different from classical psychedelics.',
          citations: ['dourron_2003']
        },
        {
          title: 'The Toad Problem',
          icon: '🐸',
          content: 'Toad-derived 5-MeO-DMT (Sonoran Desert toad venom) contains highly variable concentrations of 5-MeO-DMT, bufotenine, and other bufotoxins. This makes dosing inconsistent and dangerous. Additionally, toad harvesting raises serious animal welfare and population concerns. Synthetic 5-MeO-DMT provides consistent potency, no bufotenine, and no animal harm. User reports suggest differences in experiences between toad and synthetic. For safety and ethics: use synthetic only.',
          citations: ['neumann_2024', 'dourron_2023', 'ortiz_bernal_2022']
        },
        {
          title: 'Seizure-Like Activity',
          icon: '⚡',
          content: 'The "white-out" void experiences characteristic of 5-MeO-DMT may relate to epileptiform activity in the brain. The 5-HT1A receptor action in medial temporal lobes may precipitate seizure-like states. Animal studies document seizure-like behaviors. Users exhibit muscle jerking, twitching, abnormal vocalizations. History of epilepsy or seizures is absolute contraindication. The mechanism behind white-outs remains unclear but neurological involvement is suspected.',
          citations: ['dourron_2023']
        },
        {
          title: 'Research Deserts',
          icon: '🏜️',
          content: 'Unlike psilocybin, LSD, and even DMT, 5-MeO-DMT has very limited controlled human research. Less data on safe dosing ranges, long-term effects, and optimal administration. Most knowledge comes from naturalistic use reports, ceremonial contexts, and limited clinical trials. This lack of research means uncertainty about safety profile, appropriate screening, and contraindications. Users are essentially participating in uncontrolled experiments. Evidence-based recommendations are difficult when evidence is scarce.',
          citations: ['engel_2024']
        },
        {
          title: 'Not Recreational',
          icon: '🚫',
          content: '5-MeO-DMT is fundamentally unsuitable for recreational use. The extreme intensity, unpredictable nature, high rate of challenging experiences, behavioral unpredictability, and potential for lasting psychological impact require clinical or ceremonial frameworks with proper screening, preparation, experienced facilitation, safe setting, and integration support. Recreational use lacks these safety measures and dramatically increases risks. Use outside controlled settings creates dosage uncertainty, adulterant risks, inadequate support, and inappropriate settings. This is medicine, not recreation.',
          citations: ['gomez-escolar_2024', 'bremler_2023']
        }
      ]
    },
    ayahuasca: {
      overview: {
        classification: 'Traditional Plant Medicine (DMT + MAOI)',
        mechanism: '5-HT1A/2A partial agonist + reversible MAO-A inhibitor',
        activeMetabolite: 'DMT (from Psychotria viridis) + Harmala alkaloids (from Banisteriopsis caapi)',
        legalStatus: 'Schedule I for DMT component (USA) - Religious exemptions exist',
      },
      dosing: {
        microdose: 'Not applicable',
        threshold: 'Variable by preparation',
        light: 'Not standardized',
        common: '0.85 mg/kg DMT + 1.4 mg/kg harmine (typical ceremony)',
        therapeutic: '0.36 mg/mL DMT + 1.86 mg/mL harmine (depression study)',
        strong: 'Higher ceremonial doses',
        heavy: 'Not recommended',
        recreational: 'Traditional ceremonial use only - not recreational'
      },
      pharmacokinetics: {
        onset: '20-60 minutes',
        peak: '60-120 minutes',
        duration: '4-6 hours',
        tolerance: 'Rapid for DMT component',
        crossTolerance: 'Other classical psychedelics'
      },
      prevalenceData: {
        lifetimeUse: 'Growing global use in ceremony/retreat contexts',
        erVisits: 'Rare in traditional supervised settings',
        emergencyRate: 'Higher in non-traditional, unsupervised contexts'
      },
      riskFactors: [
        {
          category: 'MAOI Drug & Food Interactions',
          severity: 'critical',
          conditions: [
            {
              name: 'Tyramine-Rich Foods',
              level: 'Absolute',
              notes: 'HYPERTENSIVE CRISIS - potentially fatal',
              details: {
                description: 'MAO inhibitors in ayahuasca (harmala alkaloids) prevent breakdown of tyramine. Consuming tyramine-rich foods causes DANGEROUS blood pressure spikes that can be FATAL.',
                mechanism: 'MAOIs block MAO enzymes that normally break down tyramine. Tyramine accumulation triggers massive norepinephrine release, causing hypertensive crisis.',
                prevalence: 'Well-documented risk. Multiple emergency cases. Preventable with dietary restrictions.',
                harmReduction: [
                  { name: 'Strict dietary restrictions 24-48 hours before AND after ceremony', link: null },
                  { name: 'Avoid: aged cheeses, cured meats, fermented products, certain wines, soy sauce, overripe fruits', link: null },
                  { name: 'Comprehensive participant education', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Written dietary guidelines', link: null }
                ],
                citations: 'Dos Santos et al. 2024; Gomez-Escolar et al. 2024'
              }
            },
            {
              name: 'SSRIs / SNRIs / Antidepressants',
              level: 'Absolute',
              notes: 'SEROTONIN SYNDROME - potentially fatal',
              details: {
                description: 'Combining ayahuasca MAOIs with serotonergic medications causes potentially FATAL serotonin syndrome. Symptoms: hyperthermia, muscle rigidity, confusion, seizures, death.',
                mechanism: 'MAOIs prevent serotonin breakdown. Serotonergic medications increase serotonin. Together they cause dangerous serotonin accumulation.',
                prevalence: 'Well-documented lethal risk. Absolute contraindication.',
                harmReduction: [
                  { name: 'NEVER combine - absolute prohibition', link: null },
                  { name: 'Comprehensive medication screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Appropriate washout periods required (typically 2-6 weeks depending on medication)', link: null },
                  { name: 'Medical supervision essential', link: null },
                  { name: 'Know serotonin syndrome symptoms', link: null }
                ],
                citations: 'Dos Santos et al. 2024; Gomez-Escolar et al. 2024; White et al. 2024'
              }
            },
            {
              name: 'MDMA / Stimulants / Dextromethorphan',
              level: 'Absolute',
              notes: 'Serotonin syndrome and hypertensive crisis',
              details: {
                description: 'Combining ayahuasca with MDMA, stimulants, or dextromethorphan (cough syrup) creates severe serotonin syndrome and cardiovascular risks.',
                mechanism: 'Multiple pathways to dangerous serotonin and norepinephrine accumulation.',
                prevalence: 'Documented dangerous interactions.',
                harmReduction: [
                  { name: 'NEVER combine', link: null },
                  { name: 'Comprehensive substance use screening', link: 'hrp_screening_comprehensive_001' }
                ],
                citations: 'Dos Santos et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Setting & Supervision',
          severity: 'critical',
          conditions: [
            {
              name: 'Non-Traditional / Unsupervised Use',
              level: 'Absolute',
              notes: 'Dramatically increases all risks',
              details: {
                description: 'Using ayahuasca outside traditional ceremonial contexts with experienced facilitators DRAMATICALLY increases risks. Traditional settings provide essential safety structures: proper screening, dietary preparation, experienced guidance, emergency protocols, integration support.',
                mechanism: 'Ayahuasca requires extensive preparation and support that only traditional/clinical contexts provide. Without these, risks multiply.',
                prevalence: 'Non-supervised use associated with significantly elevated adverse effects (arthromyalgical, mental health).',
                harmReduction: [
                  { name: 'ONLY use in traditional ceremony or clinical setting', link: null },
                  { name: 'Experienced facilitator/shaman essential', link: null },
                  { name: 'Comprehensive screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Proper dietary preparation', link: null },
                  { name: 'Integration support', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Bouso et al. 2022; Evans et al. 2023; White et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            {
              name: 'Psychotic Disorders / Bipolar Disorder',
              level: 'Absolute',
              notes: 'Personal or family history',
              details: {
                description: 'Personal or family history of schizophrenia, schizoaffective disorder, psychotic depression, or bipolar disorder are absolute contraindications for ayahuasca.',
                mechanism: 'May trigger or exacerbate psychotic or manic episodes.',
                prevalence: 'High risk in vulnerable populations.',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance if personal or strong family history', link: null }
                ],
                citations: 'Sabe et al. 2024; Aday et al. 2020'
              }
            }
          ]
        },
        {
          category: 'Demographics',
          severity: 'moderate',
          conditions: [
            {
              name: 'Female Sex',
              level: 'Caution',
              notes: 'Higher risk of adverse effects and trauma re-experiencing',
              details: {
                description: 'Women at elevated risk for general adverse effects and particularly high risk of re-experiencing sexual assault trauma during ayahuasca ceremonies.',
                mechanism: 'Ayahuasca can trigger traumatic memories. Women disproportionately experience sexual trauma. Vulnerable state during ceremony.',
                prevalence: 'Significantly elevated risk documented. High rates of sexual assault re-experiencing in ceremonies.',
                harmReduction: [
                  { name: 'Trauma-informed screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Women-only ceremonies if preferred', link: null },
                  { name: 'Clear safety protocols', link: null },
                  { name: 'Integration support for trauma', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Bouso et al. 2022; Weiss et al. 2023'
              }
            },
            {
              name: 'Older Age at First Use',
              level: 'Caution',
              notes: 'Increased risk of adverse physical effects',
              details: {
                description: 'First ayahuasca use at older age associated with higher adverse effect risk.',
                mechanism: 'Older bodies less resilient to physiological stress. More likely to have pre-existing conditions.',
                prevalence: 'Documented correlation.',
                harmReduction: [
                  { name: 'Comprehensive medical screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced monitoring', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Bouso et al. 2022'
              }
            }
          ]
        },
        {
          category: 'Other Risk Factors',
          severity: 'high',
          conditions: [
            {
              name: 'Pre-existing Physical Health Conditions',
              level: 'Relative',
              notes: 'Cardiovascular disease, seizure disorders',
              details: {
                description: 'Cardiovascular conditions (uncontrolled hypertension, arrhythmias, coronary artery disease) and seizure disorders are relative contraindications. Ayahuasca causes transient BP/HR increases. 1.3% report seizures.',
                mechanism: 'Cardiovascular stress from ayahuasca. Potential seizure induction.',
                prevalence: 'Elevated risk with pre-existing conditions.',
                harmReduction: [
                  { name: 'Medical screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Medical personnel present', link: null }
                ],
                citations: 'Dos Santos et al. 2024; Bouso et al. 2022; White et al. 2024'
              }
            },
            {
              name: 'Increased Lifetime Use',
              level: 'Caution',
              notes: 'More frequent use = higher adverse effect risk',
              details: {
                description: 'Increased lifetime ayahuasca use positively correlated with higher risk of adverse physical and neurological effects.',
                mechanism: 'Cumulative exposure. Traditional use patterns involve infrequent dosing for good reason.',
                prevalence: 'Documented correlation.',
                harmReduction: [
                  { name: 'Infrequent use recommended', link: null },
                  { name: 'Adequate integration time between ceremonies', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Bouso et al. 2022'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Challenging Experiences',
            timeframe: 'During ceremony (4-6 hours)',
            severity: 'Moderate to Severe',
            prevalence: 'Common - inherent to ayahuasca experience',
            description: 'Intense fear, anxiety, confrontation with difficult emotions/memories, existential distress, sense of dying. Traditional context frames these as healing/purging rather than purely adverse.',
            management: 'Experienced facilitator guidance, non-directive support, integration of challenging content, reframing as therapeutic process.',
            notes: 'Traditional ceremonial context essential for managing intensity.',
            harmReduction: [
              { name: 'Multiple preparation meetings', link: 'hrp_preparation_meetings_001' },
              { name: 'Experienced facilitator', link: null },
              { name: 'Integration therapy', link: 'hrp_integration_therapy_001' }
            ]
          },
          {
            name: 'Trauma Re-experiencing',
            timeframe: 'During ceremony',
            severity: 'Severe',
            prevalence: 'High risk for women; high rates of sexual assault re-experiencing',
            description: 'Spontaneous re-experiencing of traumatic memories, particularly sexual trauma. Can be re-traumatizing without proper support.',
            management: 'Trauma-informed facilitation, safety protocols, integration support, therapeutic processing.',
            notes: 'Women at particularly high risk. Requires trauma-informed approach.',
            harmReduction: [
              { name: 'Trauma-informed screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Clear safety protocols', link: null },
              { name: 'Trauma integration support', link: 'hrp_integration_therapy_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Vomiting & Purging',
            timeframe: 'During ceremony',
            severity: 'Mild to Moderate',
            prevalence: 'Very common - expected part of experience',
            description: 'Nausea and vomiting. In traditional contexts, this is "la purga" (the purge) and integrated as cleansing/healing process rather than purely adverse.',
            management: 'Expected and accepted. Bucket provided. Supportive environment. Dehydration prevention.',
            notes: 'Cultural framing as therapeutic purging changes experience. Still physically uncomfortable.',
            harmReduction: [
              { name: 'Prepare participants for likelihood', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Appropriate facilities', link: 'hrp_physical_environment_001' }
            ]
          },
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During ceremony',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Transient increases in blood pressure and heart rate. Generally well-tolerated in healthy individuals.',
            management: 'Monitoring. Medical intervention if severe or in those with cardiovascular disease.',
            notes: 'Dangerous in those with uncontrolled hypertension or cardiovascular disease.',
            harmReduction: [
              { name: 'Cardiovascular screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          },
          {
            name: 'Seizures',
            timeframe: 'During ceremony',
            severity: 'Severe',
            prevalence: '1.3% report seizures',
            description: 'Seizure activity during ayahuasca experience.',
            management: 'Emergency protocols, medical personnel, seizure first aid.',
            notes: 'History of seizures is relative contraindication.',
            harmReduction: [
              { name: 'Screen for seizure history', link: 'hrp_screening_comprehensive_001' },
              { name: 'Medical personnel present', link: null }
            ]
          }
        ],
        perceptual: []
      },
      clinicalContext: [
        {
          title: 'Traditional Context is NOT Optional',
          icon: '🌿',
          content: 'Ayahuasca use in non-traditional, unsupervised settings dramatically increases risk of adverse effects. Traditional ceremonial contexts provide essential safety structures: comprehensive screening (dietary, medication, psychiatric), experienced facilitation by shamans/curanderos who understand ayahuasca\'s effects, emergency protocols, dietary preparation (MAOI restrictions), integration support, and cultural frameworks that help process challenging experiences. These are not optional extras—they are medical necessities for safety. Recreational or casual use outside these contexts is dangerous.',
          citations: ['bouso_2022', 'evans_2023', 'white_2024']
        },
        {
          title: 'MAOI Interactions Can Be FATAL',
          icon: '☠️',
          content: 'The harmala alkaloids in ayahuasca are reversible MAO-A inhibitors. This creates two potentially FATAL interactions: 1) Tyramine-rich foods (aged cheese, cured meats, fermented products) cause hypertensive crisis. 2) Serotonergic medications (SSRIs, SNRIs, MAOIs, MDMA, St. John\'s Wort) cause serotonin syndrome. Both can kill. Dietary restrictions 24-48 hours before AND after ceremony are absolute requirements. Medication screening and appropriate washout periods (typically 2-6 weeks) are essential. These interactions are well-documented and preventable.',
          citations: ['dos_santos_2024', 'gomez-escolar_2024', 'white_2024']
        },
        {
          title: 'La Purga: Vomiting as Medicine',
          icon: '🌊',
          content: 'Vomiting is expected and very common with ayahuasca. But traditional contexts frame this as "la purga" (the purge)—a cleansing, healing process that releases physical and emotional toxins. This cultural framework transforms a physically unpleasant experience into a therapeutically meaningful one. Western users unfamiliar with this framing may find the nausea/vomiting purely aversive. Understanding and accepting purging as part of the healing process is important preparation.',
          citations: ['traditional_use_context']
        },
        {
          title: 'Women Face Unique Risks',
          icon: '⚠️',
          content: 'Women are at elevated risk for general adverse effects AND particularly high risk of re-experiencing sexual assault trauma during ayahuasca ceremonies. The vulnerable, altered state combined with the trauma-surfacing properties of ayahuasca creates specific dangers. Trauma-informed screening, women-only ceremonies (if preferred), clear safety protocols, and integration support for trauma processing are essential. The high rates of sexual assault re-experiencing documented in ceremonies demand explicit attention to women\'s safety.',
          citations: ['bouso_2022', 'weiss_2023']
        },
        {
          title: 'More Use ≠ More Benefit',
          icon: '📊',
          content: 'Increased lifetime ayahuasca use is positively correlated with HIGHER risk of adverse physical and neurological effects. Traditional use patterns involve infrequent dosing—often months or years between ceremonies—for good reason. The Western tendency toward frequent dosing or "ayahuasca tourism" with multiple ceremonies in short periods contradicts traditional wisdom and increases risks. Integration time between ceremonies is therapeutically and medically important.',
          citations: ['bouso_2022']
        },
        {
          title: 'Preparation Method Matters',
          icon: '⚙️',
          content: 'Ayahuasca preparation techniques affect chemical composition and safety. Traditional brewing involves specific plant proportions, boiling times, and methods refined over generations. Deviations create unpredictable potency and potentially higher harmaline concentrations (associated with stronger, more challenging effects). Non-traditional preparations may lack safety knowledge embedded in traditional methods. This is another reason to seek traditional preparation rather than DIY approaches.',
          citations: ['white_2024', 'marcus_2023']
        },
        {
          title: 'Religious/Therapeutic, Not Recreational',
          icon: '🙏',
          content: 'Ayahuasca is sacred medicine in indigenous contexts and increasingly used therapeutically for depression, PTSD, and addiction. It is NOT a recreational substance. The intensity (4-6 hours), purging, challenging psychological content, MAOI risks, and need for integration make it fundamentally unsuitable for casual use. Religious exemptions exist in some countries recognizing traditional/sacramental use (Santo Daime, União do Vegetal). Therapeutic research shows promise for depression. But recreational tourism or casual experimentation misses the point and multiplies dangers.',
          citations: ['therapeutic_applications', 'traditional_context']
        },
        {
          title: 'Older Age Increases Risk',
          icon: '👴',
          content: 'First ayahuasca use at older ages is associated with increased adverse physical effects. Older bodies are less resilient to the physiological stress (cardiovascular effects, purging, extended duration). More likely to have pre-existing conditions that complicate ayahuasca use. This doesn\'t mean older adults cannot use ayahuasca, but comprehensive medical screening and enhanced monitoring become increasingly important with age.',
          citations: ['bouso_2022']
        }
      ]
    },
    ketamine: {
      overview: {
        classification: 'Dissociative Anesthetic (NMDA Receptor Antagonist)',
        mechanism: 'Noncompetitive NMDA receptor antagonist',
        activeMetabolite: 'Norketamine and other metabolites',
        legalStatus: 'Schedule III (USA) - FDA approved for depression (esketamine)',
      },
      dosing: {
        microdose: 'Not applicable',
        threshold: '0.1 mg/kg',
        light: '0.1-0.6 mg/kg (recreational)',
        common: '0.5-1.0 mg/kg',
        therapeutic: '0.5 mg/kg IV (40 min infusion for depression)',
        strong: '1.0-1.5 mg/kg',
        heavy: '1.5+ mg/kg',
        recreational: '0.1-1.5 mg/kg depending on desired effects'
      },
      pharmacokinetics: {
        onset: '1-5 min (IV), 5-15 min (IM), 5-10 min (intranasal), 15-30 min (oral)',
        peak: '5-10 minutes (IV)',
        duration: '1-2 hours primary effects, several hours aftereffects',
        tolerance: 'Develops with regular use',
        crossTolerance: 'Other NMDA antagonists'
      },
      prevalenceData: {
        lifetimeUse: '2.3 million US (2006); 5.93% Global Drug Survey (2018)',
        erVisits: '0.6% of users (2020)',
        emergencyRate: '0.1% past-year users require EMT',
        dependence: '8.55% past-year users meet dependence criteria'
      },
      riskFactors: [
        {
          category: 'Addiction & Dependence',
          severity: 'critical',
          conditions: [
            {
              name: 'Moderate to High Addiction Potential',
              level: 'Caution',
              notes: '8.55% of past-year users meet dependence criteria',
              details: {
                description: 'Ketamine has moderate-to-high addiction potential. 8.55% of past-year users meet dependence criteria—significantly higher than classical psychedelics. Tolerance develops with regular use, leading to dose escalation.',
                mechanism: 'Euphoric and dissociative effects are reinforcing. Tolerance develops, driving higher doses. Psychological and physiological dependence documented.',
                prevalence: '8.55% dependence rate in past-year users. Cravings and psychological distress with cessation.',
                harmReduction: [
                  { name: 'Infrequent use only', link: null },
                  { name: 'Screening for substance use disorder history', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Monitor for dependence signs', link: null },
                  { name: 'Avoid in those with addiction history', link: null }
                ],
                citations: 'Barrios et al. 2024; Baumeister et al. 2015; Lacroix et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Cognitive Impairment',
          severity: 'high',
          conditions: [
            {
              name: 'Long-term Cognitive Deficits',
              level: 'Caution',
              notes: 'Memory, verbal learning, spatial memory affected',
              details: {
                description: 'Chronic ketamine use causes long-term cognitive impairment, particularly in memory domains. Ketamine-dependent individuals show worse performance and slower task completion.',
                mechanism: 'NMDA receptor antagonism affects learning and memory processes. Chronic use causes lasting changes.',
                prevalence: 'Well-documented in chronic users. Functional impairment demonstrated.',
                harmReduction: [
                  { name: 'Limit frequency of use', link: null },
                  { name: 'Avoid chronic use', link: null },
                  { name: 'Cognitive monitoring', link: null }
                ],
                citations: 'Baumeister et al. 2015; Gomez-Escolar et al. 2024; Liu et al. 2016; Maxwell & Morris 2005'
              }
            }
          ]
        },
        {
          category: 'Urological Damage',
          severity: 'critical',
          conditions: [
            {
              name: 'Ketamine Bladder / Ulcerative Cystitis',
              level: 'Absolute',
              notes: '>25% of regular users develop urinary symptoms',
              details: {
                description: 'Chronic ketamine use causes "ketamine bladder"—ulcerative cystitis with painful urination, frequent urination, blood in urine, and potential bladder dysfunction. Can lead to permanent damage requiring surgery.',
                mechanism: 'Direct toxic effects on bladder tissue. Dose and frequency dependent.',
                prevalence: '>25% of regular users experience urinary symptoms. Severity linked to frequency and dosage.',
                harmReduction: [
                  { name: 'AVOID chronic use', link: null },
                  { name: 'Limit frequency', link: null },
                  { name: 'Monitor for urinary symptoms', link: null },
                  { name: 'Seek medical attention if symptoms develop', link: null }
                ],
                citations: 'Baumeister et al. 2015; Lacroix et al. 2024; Ou et al. 2020'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            {
              name: 'Active Psychotic Disorder',
              level: 'Absolute',
              notes: 'Psychotomimetic properties worsen symptoms',
              details: {
                description: 'Active psychotic symptoms (schizophrenia, schizoaffective disorder) are absolute contraindications. Ketamine has psychotomimetic properties that can exacerbate hallucinations, delusions, and thought disorganization.',
                mechanism: 'NMDA antagonism produces psychosis-like states. Worsens existing psychotic symptoms.',
                prevalence: 'Absolute contraindication in clinical trials.',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Absolute avoidance if active psychosis', link: null }
                ],
                citations: 'Baumeister et al. 2015; Collins et al. 2024'
              }
            },
            {
              name: 'Personality Disorders',
              level: 'Relative',
              notes: '31% negative response rate; 4x higher adverse risk',
              details: {
                description: 'Personality disorders significantly increase risk. 31% negative response rate. Greater than 4-fold elevated risk of adverse psychological responses.',
                mechanism: 'Difficulty with emotional regulation amplified by dissociation.',
                prevalence: 'Significantly elevated risk.',
                harmReduction: [
                  { name: 'Careful screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced support', link: null },
                  { name: 'Integration therapy', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Collins et al. 2024; Marrocu et al., 2024'
              }
            }
          ]
        },
        {
          category: 'Cardiovascular',
          severity: 'critical',
          conditions: [
            {
              name: 'Untreated Hypertension / Cardiovascular Disease',
              level: 'Absolute',
              notes: 'Ketamine elevates BP and HR',
              details: {
                description: 'Untreated hypertension and active cardiovascular disease are absolute contraindications. Ketamine increases blood pressure and heart rate, risking hypertensive crisis and cardiovascular events.',
                mechanism: 'Decreased catecholamine reuptake increases BP and HR.',
                prevalence: 'Standard exclusion in clinical trials.',
                harmReduction: [
                  { name: 'Comprehensive cardiovascular screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Blood pressure control essential', link: null },
                  { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Gomez-Escolar et al. 2024; Bennett et al. 2023; Riva-Posse et al. 2018'
              }
            }
          ]
        },
        {
          category: 'Polydrug Use',
          severity: 'critical',
          conditions: [
            {
              name: 'CNS Depressants (Alcohol, Benzodiazepines)',
              level: 'Absolute',
              notes: 'Potentially FATAL respiratory depression',
              details: {
                description: 'Combining ketamine with CNS depressants (alcohol, benzodiazepines, opioids) can cause potentially FATAL respiratory depression. This combination dramatically increases overdose risk.',
                mechanism: 'Additive respiratory depression from multiple depressants.',
                prevalence: 'Common dangerous combination. Documented fatalities.',
                harmReduction: [
                  { name: 'NEVER combine with CNS depressants', link: null },
                  { name: 'Education about lethal combinations', link: 'hrp_public_harm_reduction_001' }
                ],
                citations: 'Barrios et al. 2024; Guo et al. 2022'
              }
            },
            {
              name: 'Stimulants (Cocaine, Methamphetamine)',
              level: 'Caution',
              notes: 'Increased cardiovascular stress and lethality',
              details: {
                description: 'Combining ketamine with stimulants (cocaine, methamphetamine) increases lethal effects and cardiovascular stress.',
                mechanism: 'Ketamine increases BP/HR. Stimulants do the same. Combined cardiovascular burden.',
                prevalence: 'Common combination. Elevated risk.',
                harmReduction: [
                  { name: 'Avoid stimulant combinations', link: null },
                  { name: 'Monitor cardiovascular function', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Barrios et al. 2024'
              }
            }
          ]
        },
        {
          category: 'Other Risks',
          severity: 'high',
          conditions: [
            {
              name: 'K-Hole Distress',
              level: 'Caution',
              notes: 'Profound dissociation can be terrifying',
              details: {
                description: 'High doses produce "K-hole"—profound dissociation with out-of-body experiences, ego dissolution, complete detachment from reality. Can be pleasurable OR intensely disturbing and terrifying.',
                mechanism: 'Complete NMDA blockade at high doses.',
                prevalence: 'Common at high doses. Unpredictable whether experience will be positive or distressing.',
                harmReduction: [
                  { name: 'Start with lower doses', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Preparation for dissociation', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Safe environment', link: 'hrp_physical_environment_001' },
                  { name: 'Trip sitter present', link: null }
                ],
                citations: 'Cornfield et al. 2024; Baumeister et al. 2015'
              }
            },
            {
              name: 'Lack of Standardized Dosing',
              level: 'Caution',
              notes: 'No clear low/medium/high dose definitions',
              details: {
                description: 'No standardized dosing protocols exist. Difficulty defining safe dose ranges creates risk of unintentional adverse effects.',
                mechanism: 'Wide individual variability. No consensus guidelines.',
                prevalence: 'Universal problem in non-clinical use.',
                harmReduction: [
                  { name: 'Start low', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Weight-based dosing', link: null },
                  { name: 'Precise measurement', link: null }
                ],
                citations: 'Cornfield et al. 2024; Baumeister et al. 2015'
              }
            },
            {
              name: 'Contamination & Purity',
              level: 'Caution',
              notes: 'Illicit ketamine purity cannot be guaranteed',
              details: {
                description: 'Illicit ketamine may contain unknown substances, variable potency, or dangerous adulterants. Cognitive impairment and urinary damage may be linked to contaminated supplies.',
                mechanism: 'No quality control in illicit market.',
                prevalence: 'Common problem.',
                harmReduction: [
                  { name: 'Substance testing', link: null },
                  { name: 'Trusted sources', link: null },
                  { name: 'Medical-grade ketamine preferable', link: null }
                ],
                citations: 'Lacroix et al. 2024; Glynos et al. 2023'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'K-Hole (Profound Dissociation)',
            timeframe: 'During session (high doses)',
            severity: 'Variable - can be positive or terrifying',
            prevalence: 'Common at high doses',
            description: 'Complete dissociation from body and reality. Out-of-body experiences, ego dissolution, detachment from surroundings. Can be transcendent or intensely disturbing.',
            management: 'Preparation essential. Safe environment. Reassurance that effects are temporary. Integration support.',
            notes: 'Unpredictable whether experience will be positive or distressing. Dose-dependent.',
            harmReduction: [
              { name: 'Start with lower doses', link: 'hrp_start_low_go_slow_001' },
              { name: 'Preparation for dissociation', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Trip sitter', link: null }
            ]
          },
          {
            name: 'Anxiety & Panic',
            timeframe: 'During session',
            severity: 'Moderate',
            prevalence: 'Common',
            description: 'Anxiety, panic, fear during dissociative state. Loss of control can be frightening.',
            management: 'Reassurance, grounding (though difficult when dissociated), reminder effects are temporary.',
            notes: 'More likely without preparation or in unsafe settings.',
            harmReduction: [
              { name: 'Psychoeducation', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Safe setting', link: 'hrp_physical_environment_001' }
            ]
          },
          {
            name: 'Cognitive Impairment (Chronic Use)',
            timeframe: 'Long-term',
            severity: 'Moderate to High',
            prevalence: 'Well-documented in chronic users',
            description: 'Memory deficits, verbal learning impairment, spatial memory problems, slowed task completion. Functional impairment.',
            management: 'Cessation of use. Cognitive rehabilitation. May improve with abstinence.',
            notes: 'Linked to frequency and duration of use.',
            harmReduction: [
              { name: 'Avoid chronic use', link: null },
              { name: 'Infrequent use only', link: null }
            ]
          }
        ],
        physiological: [
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Increased blood pressure and heart rate. Small changes generally well-tolerated but higher peaks in hypertensive patients.',
            management: 'Monitoring. Medical intervention if severe or in vulnerable individuals.',
            notes: 'Dangerous in those with cardiovascular disease.',
            harmReduction: [
              { name: 'Cardiovascular screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Vital sign monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          },
          {
            name: 'Ulcerative Cystitis (Ketamine Bladder)',
            timeframe: 'Chronic use',
            severity: 'Severe',
            prevalence: '>25% of regular users',
            description: 'Painful urination, frequent urination, blood in urine, bladder dysfunction. Can progress to permanent damage requiring surgery (contracted bladder, hydronephrosis).',
            management: 'Cessation of ketamine. Urological evaluation. Symptomatic treatment. Surgery if severe.',
            notes: 'Dose and frequency dependent. Potentially irreversible.',
            harmReduction: [
              { name: 'AVOID chronic use', link: null },
              { name: 'Monitor for urinary symptoms', link: null },
              { name: 'Seek medical attention if symptoms develop', link: null }
            ]
          },
          {
            name: 'Gastrointestinal Effects (K-Cramps)',
            timeframe: 'Acute and chronic',
            severity: 'Moderate',
            prevalence: '21% of ER admissions for ketamine',
            description: 'Abdominal pain, cramps. More common with frequent use and high doses.',
            management: 'Supportive care. Cessation of use.',
            notes: 'Associated with chronic use patterns.',
            harmReduction: [
              { name: 'Limit frequency', link: null },
              { name: 'Avoid high doses', link: 'hrp_start_low_go_slow_001' }
            ]
          },
          {
            name: 'Respiratory Depression (with CNS Depressants)',
            timeframe: 'Acute',
            severity: 'Critical',
            prevalence: 'Elevated with polydrug use',
            description: 'Potentially FATAL respiratory depression when combined with alcohol, benzodiazepines, or other CNS depressants.',
            management: 'EMERGENCY. Respiratory support. Emergency services.',
            notes: 'Leading cause of ketamine-related fatalities.',
            harmReduction: [
              { name: 'NEVER combine with CNS depressants', link: null }
            ]
          }
        ],
        perceptual: []
      },
      clinicalContext: [
        {
          title: 'FDA Approved for Depression',
          icon: '🏥',
          content: 'Ketamine (esketamine nasal spray, Spravato®) is FDA-approved for treatment-resistant depression. Clinical trials show rapid antidepressant effects—often within hours—making it revolutionary for severe depression unresponsive to traditional treatments. However, therapeutic use occurs in controlled medical settings with screening, monitoring, and psychiatric support. This is fundamentally different from recreational use, which lacks these safety structures and carries significant risks.',
          citations: ['riva_posse_2018', 'raja_2024', 'fda_approval']
        },
        {
          title: 'Addiction Risk is REAL',
          icon: '⚠️',
          content: 'Unlike classical psychedelics, ketamine has moderate-to-high addiction potential. 8.55% of past-year users meet dependence criteria. Tolerance develops with regular use, driving dose escalation. Cravings and psychological distress occur with cessation. This addiction profile is dramatically different from psilocybin or LSD. History of substance use disorder is a relative contraindication. Infrequent use and monitoring for dependence signs are essential.',
          citations: ['barrios_2024', 'baumeister_2015', 'lacroix_2024']
        },
        {
          title: 'Ketamine Bladder is Devastating',
          icon: '🚽',
          content: 'MORE than 25% of regular ketamine users develop urinary symptoms—painful urination, frequent urination, blood in urine. This is "ketamine bladder" (ulcerative cystitis). Severity is dose and frequency dependent. Can progress to permanent bladder damage requiring surgery: contracted bladder, hydronephrosis, renal function decline. Some cases irreversible. This is not a minor side effect—it\'s a debilitating condition that ruins quality of life. Chronic ketamine use is simply not worth this risk.',
          citations: ['baumeister_2015', 'lacroix_2024', 'ou_2020']
        },
        {
          title: 'Cognitive Damage from Chronic Use',
          icon: '🧠',
          content: 'Long-term ketamine use causes lasting cognitive impairment, particularly in memory domains. Ketamine-dependent individuals perform worse on cognitive tasks and complete them more slowly. Verbal learning, spatial memory affected. This creates functional impairment in daily life. While some recovery may occur with abstinence, chronic use creates real cognitive damage. The therapeutic benefits of infrequent ketamine use do not justify the cognitive costs of regular recreational use.',
          citations: ['baumeister_2015', 'gomez_escolar_2024', 'liu_2016', 'maxwell_2005']
        },
        {
          title: 'CNS Depressants = Fatal',
          icon: '☠️',
          content: 'Combining ketamine with CNS depressants (alcohol, benzodiazepines, opioids) causes potentially FATAL respiratory depression. This is the leading cause of ketamine-related deaths. The combination is especially dangerous because both substances suppress breathing. Overdose risk dramatically elevated. This is an absolute contraindication. Yet the combination remains common in party settings. Education about this lethal interaction is critical.',
          citations: ['barrios_2024', 'guo_2022']
        },
        {
          title: 'The K-Hole: Transcendence or Terror',
          icon: '🕳️',
          content: 'High ketamine doses produce the "K-hole"—profound dissociation with complete detachment from body and reality, out-of-body experiences, ego dissolution. For some this is transcendent, mystical, healing. For others it\'s intensely disturbing, terrifying, traumatizing. The experience is unpredictable and uncontrollable once it begins. Unlike classical psychedelics where consciousness remains (even if altered), the K-hole involves near-complete loss of awareness. Preparation and safe setting are essential. But there\'s no guarantee the experience won\'t be distressing.',
          citations: ['cornfield_2024', 'baumeister_2015']
        },
        {
          title: 'Therapeutic ≠ Recreational',
          icon: '🔬',
          content: 'Ketamine\'s FDA approval for depression is a major breakthrough. But therapeutic use (0.5 mg/kg IV infusion in medical setting with psychiatric support) is fundamentally different from recreational use (variable doses, often combined with other substances, no medical supervision, no psychiatric support). Therapeutic benefits don\'t translate to recreational safety. In fact, the addiction potential, bladder damage, cognitive impairment, and polydrug risks make recreational ketamine use particularly dangerous. The substance has medical utility but significant abuse liability.',
          citations: ['therapeutic_vs_recreational']
        },
        {
          title: 'Personality Disorders: 4x Risk',
          icon: '📊',
          content: 'Individuals with personality disorders face greater than 4-fold elevated risk of adverse psychological responses to ketamine. 31% experience negative responses. The dissociation that ketamine produces can dramatically worsen difficulties with emotional regulation, self-concept, and interpersonal relationships characteristic of personality disorders. This population requires particularly careful screening and enhanced support—or avoidance of ketamine entirely.',
          citations: ['collins_2024', 'marrocu']
        }
      ]
    },
    ibogaine: {
      overview: {
        classification: 'Atypical Psychedelic (Indole Alkaloid)',
        mechanism: 'Multi-receptor interaction (κ-opioid, μ-opioid, NMDA, σ2) - NOT primarily 5-HT2A',
        activeMetabolite: 'Noribogaine (48-hour half-life, extends effects)',
        legalStatus: 'Schedule I (USA), Unscheduled in many countries',
      },
      dosing: {
        microdose: 'Not applicable',
        threshold: 'Not applicable',
        light: 'Not applicable',
        common: 'Not applicable',
        therapeutic: '25-42 mg/kg (weight-dependent, medical only)',
        strong: 'Exceeding therapeutic dose',
        heavy: 'Dangerous - cardiac risk',
        recreational: 'NOT SAFE - Medical supervision mandatory'
      },
      pharmacokinetics: {
        onset: '30-120 minutes',
        peak: '2-4 hours',
        duration: '4-8 hours (acute), 24-48 hours (noribogaine effects)',
        tolerance: 'Unknown - limited research',
        crossTolerance: 'Unknown'
      },
      prevalenceData: {
        lifetimeUse: 'Rare - primarily used in addiction treatment contexts',
        erVisits: '19 documented fatalities in literature review',
        emergencyRate: '6 of 19 deaths had pre-existing heart conditions'
      },
      riskFactors: [
        {
          category: 'Cardiovascular',
          severity: 'critical',
          conditions: [
            {
              name: 'Any Pre-existing Heart Condition',
              level: 'Absolute',
              notes: 'ABSOLUTE CONTRAINDICATION - High fatality risk',
              details: {
                description: 'Ibogaine has UNIQUE and SEVERE cardiovascular risks not seen with classical psychedelics. Unlike psilocybin or LSD, ibogaine causes direct cardiac effects that can be FATAL.',
                mechanism: 'Ibogaine causes QT interval prolongation averaging 95ms (range 29-146ms). 50% of users reach clinically dangerous QTc >500ms. This leads to life-threatening Torsade de pointes arrhythmia. Also causes bradycardia (slow heart rate) within first 72 hours. 6 of 19 documented fatalities had pre-existing heart conditions.',
                prevalence: 'QT prolongation occurs in virtually all users. Sudden cardiac death is the primary cause of ibogaine-related fatalities.',
                harmReduction: [
                  { name: 'MANDATORY pre-screening ECG to detect QT prolongation', link: null },
                  { name: 'Exclude ALL cardiac arrhythmias, Long QT syndrome, coronary disease', link: null },
                  { name: 'CONTINUOUS ECG monitoring during and 72 hours post-administration', link: null },
                  { name: 'Medical facility with cardiac emergency response capability REQUIRED', link: null },
                  { name: 'Electrolyte panel (potassium, magnesium) before administration', link: null },
                  { name: 'NO use outside controlled medical settings - recreational use can be FATAL', link: null }
                ],
                citations: 'Cherian 2024; Koenig 2015; Glue 2016; Knuijver 2022; Rocha 2023'
              }
            },
            {
              name: 'Medications That Prolong QT Interval',
              level: 'Absolute',
              notes: 'Additive QT prolongation - FATAL risk',
              details: {
                description: 'Many common medications prolong the QT interval. Combined with ibogaine, this creates critical arrhythmia risk.',
                mechanism: 'Additive QT prolongation increases risk of Torsade de pointes exponentially.',
                prevalence: 'Common QT-prolonging drugs include certain antibiotics (macrolides, fluoroquinolones), antipsychotics, antiarrhythmics, and some antidepressants.',
                harmReduction: [
                  { name: 'Complete medication review before ibogaine', link: null },
                  { name: 'Discontinue QT-prolonging medications with appropriate washout', link: null },
                  { name: 'Medical supervision for medication management', link: null },
                  { name: 'Never combine ibogaine with these medications', link: null }
                ],
                citations: 'Koenig 2015'
              }
            },
            {
              name: 'Electrolyte Imbalances',
              level: 'Absolute',
              notes: 'Must be corrected before administration',
              details: {
                description: 'Low potassium (hypokalemia) or low magnesium (hypomagnesemia) dramatically increase cardiac risk with ibogaine.',
                mechanism: 'Electrolyte imbalances increase susceptibility to QT prolongation and arrhythmias.',
                prevalence: 'Common in individuals with substance use disorders, malnutrition, or dehydration.',
                harmReduction: [
                  { name: 'MANDATORY pre-screening electrolyte panel', link: null },
                  { name: 'Correct any imbalances before ibogaine administration', link: null },
                  { name: 'Monitor electrolytes during session', link: null },
                  { name: 'Ensure adequate nutrition and hydration', link: null }
                ],
                citations: 'Koenig 2015'
              }
            }
          ]
        },
        {
          category: 'Opioid Use',
          severity: 'critical',
          conditions: [
            {
              name: 'Current Use of Long-Acting Opioids',
              level: 'Absolute',
              notes: 'Methadone, buprenorphine - FATAL interaction',
              details: {
                description: 'Ibogaine is often sought for opioid addiction treatment, but CURRENT opioid use—especially long-acting opioids like methadone and buprenorphine—creates a paradoxical and dangerous contraindication.',
                mechanism: 'Methadone inhibits CYP2D6 enzyme, impairing ibogaine metabolism and causing toxic accumulation. Creates dangerous drug interaction and overdose risk. Some fatalities involved concurrent use of cocaine, alcohol, methamphetamine, and heroin.',
                prevalence: 'Many people seeking ibogaine are active opioid users, making this a critical screening issue.',
                harmReduction: [
                  { name: 'COMPLETE opioid withdrawal REQUIRED before ibogaine', link: null },
                  { name: 'Medical supervision for opioid tapering and withdrawal', link: null },
                  { name: 'Appropriate washout periods (varies by opioid half-life)', link: null },
                  { name: 'Short-acting opioids require washout; long-acting require extended abstinence', link: null },
                  { name: 'Medical assessment of withdrawal status', link: null }
                ],
                citations: 'Cherian 2024; Koenig 2015'
              }
            },
            {
              name: 'Polydrug Use Patterns',
              level: 'Relative',
              notes: 'Multiple substance use increases risk',
              details: {
                description: 'Many ibogaine fatalities involved individuals addicted to multiple substances (cocaine, alcohol, methamphetamine, heroin).',
                mechanism: 'Polydrug use increases cardiovascular burden, creates unpredictable interactions, and complicates medical management.',
                prevalence: 'Common in addiction populations seeking ibogaine treatment.',
                harmReduction: [
                  { name: 'Complete substance use history disclosure', link: null },
                  { name: 'Appropriate washout periods for all substances', link: null },
                  { name: 'Avoid stimulants (cocaine, methamphetamine) - increase cardiac risk', link: null },
                  { name: 'Medical supervision and enhanced monitoring', link: null }
                ],
                citations: 'Cherian 2024; Bremler 2023; Rocha 2023'
              }
            }
          ]
        },
        {
          category: 'Genetic Factors',
          severity: 'high',
          conditions: [
            {
              name: 'CYP2D6 Poor Metabolizers',
              level: 'Relative',
              notes: '5-10% of population - impaired metabolism',
              details: {
                description: 'Genetic variations in CYP2D6 enzyme (which metabolizes ibogaine) create higher toxicity risk.',
                mechanism: 'Poor metabolizers cannot efficiently convert ibogaine to noribogaine, leading to elevated plasma concentrations and increased adverse effects.',
                prevalence: '5-10% of population are CYP2D6 poor metabolizers. Methadone also inhibits CYP2D6, creating similar risk.',
                harmReduction: [
                  { name: 'Consider genetic testing before ibogaine', link: null },
                  { name: 'Dose adjustment may be needed', link: null },
                  { name: 'Enhanced medical monitoring', link: null },
                  { name: 'Identify medications that inhibit CYP2D6', link: null }
                ],
                citations: 'Koenig 2015'
              }
            },
            {
              name: 'hERG Gene Mutations',
              level: 'Absolute',
              notes: 'Associated with Long QT syndrome',
              details: {
                description: 'Mutations in hERG gene cause Long QT syndrome, dramatically increasing risk of fatal arrhythmias with ibogaine.',
                mechanism: 'hERG mutations impair cardiac repolarization, and ibogaine further prolongs QT interval.',
                prevalence: 'Rare, but potentially undiagnosed in some individuals.',
                harmReduction: [
                  { name: 'Pre-screening ECG mandatory', link: null },
                  { name: 'Family history of sudden cardiac death is red flag', link: null },
                  { name: 'Genetic testing if suspected', link: null },
                  { name: 'Absolute exclusion if Long QT syndrome diagnosed', link: null }
                ],
                citations: 'Koenig 2015'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'high',
          conditions: [
            {
              name: 'Psychosis or Bipolar Disorder',
              level: 'Absolute',
              notes: 'Active condition - risk of severe decompensation',
              details: {
                description: 'Active psychosis or bipolar disorder are high-risk conditions for ibogaine. History of these conditions requires careful assessment.',
                mechanism: 'Ibogaine can trigger psychotic episodes, manic episodes, or severe mood destabilization. 37.5% of those with negative responses lasting 72+ hours received psychiatric diagnoses post-use. 87-93% experienced anxiety worsening or onset.',
                prevalence: 'Among those with negative psychological responses to ibogaine, psychiatric complications are common.',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening before ibogaine', link: null },
                  { name: 'Absolute contraindication if actively psychotic or manic', link: null },
                  { name: 'Relative contraindication if history - requires specialist evaluation', link: null },
                  { name: 'Enhanced psychiatric monitoring during and after', link: null },
                  { name: 'Integration therapy and psychiatric follow-up', link: null }
                ],
                citations: 'Cherian 2024; Tabaac 2024; Bremler 2023; Rosenblat 2023'
              }
            },
            {
              name: 'Persistent Psychological Effects',
              level: 'Caution',
              notes: 'Small percentage experience long-term effects',
              details: {
                description: 'A small percentage of ibogaine users experience persistent anxiety, depression, or HPPD (Hallucinogen Persisting Perception Disorder).',
                mechanism: 'Challenging or traumatic ibogaine experiences, especially in those with pre-existing vulnerabilities, can lead to lasting psychological effects.',
                prevalence: '8.9% of psychedelic users report functional impairment; 2.6% seek medical help. 37.5% with PTSD reported trauma re-experiencing with ayahuasca (similar alkaloid profile).',
                harmReduction: [
                  { name: 'Comprehensive psychiatric screening', link: null },
                  { name: 'Enhanced support during challenging experiences', link: null },
                  { name: 'Integration therapy post-session', link: null },
                  { name: 'Trauma-informed care if needed', link: null },
                  { name: 'Follow-up psychiatric support', link: null }
                ],
                citations: 'Weiss 2023; Ghaznavi 2025; Knuijver 2018'
              }
            }
          ]
        },
        {
          category: 'Environmental',
          severity: 'critical',
          conditions: [
            {
              name: 'Uncontrolled Settings',
              level: 'Absolute',
              notes: 'Ibogaine should NEVER be used outside medical supervision',
              details: {
                description: 'Unlike classical psychedelics, ibogaine CANNOT be safely used in recreational, ceremonial, or unsupervised settings. The cardiac risks require medical monitoring.',
                mechanism: 'Sudden death from cardiac arrhythmias can occur without warning, particularly in first 72 hours. Without ECG monitoring and emergency response capability, fatalities cannot be prevented.',
                prevalence: 'Many documented fatalities occurred in uncontrolled settings.',
                harmReduction: [
                  { name: 'ONLY use ibogaine in medical facility with cardiac monitoring', link: null },
                  { name: 'Continuous ECG monitoring capability required', link: null },
                  { name: 'Emergency resuscitation equipment and trained personnel', link: null },
                  { name: 'Physician or qualified medical professional present', link: null },
                  { name: '24-hour monitoring for at least 72 hours post-administration', link: null },
                  { name: 'Do not attempt home use or retreat settings without full medical infrastructure', link: null }
                ],
                citations: 'Knuijver 2022; Rocha 2023; Cherian 2024'
              }
            }
          ]
        },
        {
          category: 'Neurological',
          severity: 'moderate',
          conditions: [
            {
              name: 'History of Seizures',
              level: 'Relative',
              notes: 'Increased seizure risk',
              details: {
                description: 'Seizure history creates additional risk with ibogaine. Case reports document generalized seizures after ibogaine use.',
                mechanism: 'Ibogaine can lower seizure threshold. One case involved 38 grams purchased online for spiritual cleansing.',
                prevalence: 'Unknown, but documented in case reports.',
                harmReduction: [
                  { name: 'Disclose seizure history during screening', link: null },
                  { name: 'Medical assessment of seizure control', link: null },
                  { name: 'Anti-seizure medication management', link: null },
                  { name: 'Enhanced monitoring during session', link: null },
                  { name: 'Emergency seizure protocols available', link: null }
                ],
                citations: 'Rocha 2023'
              }
            },
            {
              name: 'Ataxia (100% of users)',
              level: 'Caution',
              notes: 'Loss of coordination universal',
              details: {
                description: '100% of users in opioid detox studies experienced ataxia (loss of coordination and balance).',
                mechanism: 'Direct neurological effect of ibogaine.',
                prevalence: 'Universal during effects.',
                harmReduction: [
                  { name: 'Ensure safe environment with no fall hazards', link: null },
                  { name: 'Assistance with movement during session', link: null },
                  { name: 'Bed rest recommended', link: null },
                  { name: 'Medical supervision', link: null }
                ],
                citations: 'Knuijver 2022; Bender & Hellerstein, 2022; Rocha 2023'
              }
            }
          ]
        },
        {
          category: 'Dosing & Quality',
          severity: 'high',
          conditions: [
            {
              name: 'Variable Purity and Potency',
              level: 'Caution',
              notes: 'Difficult to determine accurate dosing',
              details: {
                description: 'Unregulated ibogaine has wildly variable purity. Root bark extracts: 8.2-32.9% ibogaine. Ibogaine hydrochloride: 61.5-73.4%. Some samples contain NO ibogaine or unidentified substances.',
                mechanism: 'Variable potency makes dosing extremely dangerous - accidental overdose or underdosing.',
                prevalence: 'Extremely common in unregulated markets and online purchases.',
                harmReduction: [
                  { name: 'ONLY use pharmaceutical-grade ibogaine hydrochloride from verified sources', link: null },
                  { name: 'Laboratory testing when possible', link: null },
                  { name: 'Avoid online purchases without verification', link: null },
                  { name: 'Weight-based dosing (25-42 mg/kg) calculated by medical professional', link: null },
                  { name: 'Medical supervision for dosing', link: null }
                ],
                citations: 'Rocha 2023; Gomez-Escolar 2024'
              }
            }
          ]
        },
        {
          category: 'Demographic',
          severity: 'high',
          conditions: [
            {
              name: 'Pregnancy and Breastfeeding',
              level: 'Relative',
              notes: 'Generally advisable to avoid',
              details: {
                description: 'Ibogaine effects on pregnancy and breastfeeding are unknown, but avoidance is recommended.',
                mechanism: 'Unknown effects on fetal development and nursing infant.',
                prevalence: 'No research on pregnancy safety.',
                harmReduction: [
                  { name: 'Avoid ibogaine during pregnancy', link: null },
                  { name: 'Avoid during breastfeeding', link: null },
                  { name: 'Use reliable contraception if considering ibogaine', link: null },
                  { name: 'Consult healthcare provider', link: null }
                ],
                citations: 'White 2024; Izmi 2024'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Acute Anxiety',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Frequently reported; 87-93% experienced anxiety worsening among those with negative responses',
            description: 'Transient anxiety during ibogaine experience. Among those with negative psychological responses lasting 72+ hours, anxiety worsening or onset is nearly universal.',
            management: 'Reassurance, calming presence, supportive environment. Benzodiazepines if severe.',
            notes: 'Generally transient and resolves during or after session. More common than with classical psychedelics.',
            harmReduction: [
              { name: 'Comprehensive psychiatric screening', link: null },
              { name: 'Experienced medical supervision', link: null },
              { name: 'Supportive environment', link: null }
            ]
          },
          {
            name: 'Confusion and Disorientation',
            timeframe: 'During session',
            severity: 'Moderate',
            prevalence: 'Common during effects',
            description: 'Confusion, disorientation, agitation, and derealization (detachment from surroundings) during ibogaine experience.',
            management: 'Supportive care, environmental safety, reassurance that effects are temporary.',
            notes: 'Expected during session. Ensure safe environment to prevent falls or injury.',
            harmReduction: [
              { name: 'Safe environment with no hazards', link: null },
              { name: 'Continuous supervision', link: null },
              { name: 'Bed rest recommended', link: null }
            ]
          },
          {
            name: 'Persistent Psychological Effects',
            timeframe: 'Long-term (weeks to months)',
            severity: 'Variable',
            prevalence: '8.9% functional impairment, 2.6% sought medical help (psychedelic users general); 37.5% psychiatric diagnosis post-use among negative responders',
            description: 'Small percentage experience persistent anxiety, depression, or HPPD (visual disturbances, geometric patterns, halos, trails) lasting weeks to months after ibogaine.',
            management: 'Integration therapy, psychiatric follow-up, trauma-informed care if needed.',
            notes: 'Risk increased in those with pre-existing mental health conditions or challenging traumatic experiences during session.',
            harmReduction: [
              { name: 'Comprehensive psychiatric screening', link: null },
              { name: 'Integration therapy post-session', link: null },
              { name: 'Psychiatric support available', link: null },
              { name: 'Enhanced support for those with PTSD', link: null }
            ]
          },
          {
            name: 'Psychiatric Decompensation',
            timeframe: 'Acute and long-term',
            severity: 'Severe',
            prevalence: '37.5% received psychiatric diagnosis among those with negative responses lasting 72+ hours',
            description: 'Psychotic episodes, manic episodes, or severe mood destabilization in vulnerable individuals. Can trigger or exacerbate underlying psychiatric conditions.',
            management: 'Immediate psychiatric intervention, medication if needed, hospitalization if severe.',
            notes: 'Absolute contraindication if actively psychotic or manic. Relative contraindication with psychiatric history.',
            harmReduction: [
              { name: 'Comprehensive psychiatric screening mandatory', link: null },
              { name: 'Exclude active psychiatric conditions', link: null },
              { name: 'Enhanced monitoring for vulnerable individuals', link: null }
            ]
          }
        ],
        physiological: [
          {
            name: 'QT Interval Prolongation',
            timeframe: 'During and up to 72 hours post',
            severity: 'Critical',
            prevalence: 'Virtually universal; average 95ms increase (range 29-146ms); 50% reach QTc >500ms (dangerous threshold)',
            description: 'Prolongation of QT interval on ECG. This is the PRIMARY cardiac risk with ibogaine and can lead to life-threatening arrhythmias. Noribogaine (metabolite) also prolongs QT for 24-48 hours after session.',
            management: 'CONTINUOUS ECG monitoring during and 72 hours post-administration. Medical facility with cardiac emergency capability required. Magnesium sulfate for Torsade de pointes if occurs.',
            notes: 'This is near-universal and CRITICAL. Unlike classical psychedelics, cardiac monitoring is mandatory.',
            harmReduction: [
              { name: 'Pre-screening ECG mandatory', link: null },
              { name: 'Continuous ECG monitoring during and 72h post', link: null },
              { name: 'Medical facility with cardiac emergency capability', link: null },
              { name: 'Correct electrolyte imbalances before administration', link: null }
            ]
          },
          {
            name: 'Sudden Cardiac Death',
            timeframe: 'Particularly within first 72 hours',
            severity: 'Fatal',
            prevalence: '19 documented fatalities in literature review; 6 had pre-existing heart conditions',
            description: 'Cardiac arrest and death from bradycardia, QT prolongation leading to Torsade de pointes, or cardiac arrhythmias. This is the PRIMARY CAUSE of ibogaine-related fatalities.',
            management: 'PREVENTION through comprehensive screening, continuous monitoring, medical supervision, and controlled medical setting. Emergency cardiac protocols if occurs.',
            notes: 'Ibogaine has unique fatality risk not seen with classical psychedelics. Medical supervision is NOT optional.',
            harmReduction: [
              { name: 'ABSOLUTE contraindication for any heart condition', link: null },
              { name: 'Comprehensive cardiovascular screening', link: null },
              { name: 'Continuous cardiac monitoring', link: null },
              { name: 'Medical facility ONLY - never unsupervised use', link: null }
            ]
          },
          {
            name: 'Ataxia (Loss of Coordination)',
            timeframe: 'During session',
            severity: 'Moderate',
            prevalence: '100% of users in opioid detox studies',
            description: 'Universal loss of coordination and balance during ibogaine effects. Difficulty with movement, unsteady gait, inability to walk safely.',
            management: 'Ensure safe environment with no fall hazards. Assistance with any movement. Bed rest strongly recommended.',
            notes: 'Universal effect. Plan for complete immobility during session.',
            harmReduction: [
              { name: 'Safe environment with no fall hazards', link: null },
              { name: 'Bed rest mandatory', link: null },
              { name: 'Assistance for any movement', link: null },
              { name: 'Remove sharp objects', link: null }
            ]
          },
          {
            name: 'Nausea and Vomiting',
            timeframe: 'Early in experience',
            severity: 'Mild to Moderate',
            prevalence: '62% (most common acute adverse effect)',
            description: 'Gastrointestinal distress including nausea, vomiting, and diarrhea. Most common non-cardiac adverse effect.',
            management: 'Antiemetics may be considered. Hydration. Supportive care. Positioning to prevent aspiration.',
            notes: 'Usually manageable but can be distressing. Similar to ayahuasca purging.',
            harmReduction: [
              { name: 'Antiemetics available', link: null },
              { name: 'Hydration', link: null },
              { name: 'Proper positioning', link: null }
            ]
          },
          {
            name: 'Bradycardia',
            timeframe: 'Within first 72 hours',
            severity: 'Moderate to Critical',
            prevalence: 'Documented in case reports',
            description: 'Abnormally slow heart rate. Associated with sudden death risk.',
            management: 'Continuous cardiac monitoring. Atropine per ACLS protocols if symptomatic. Medical supervision required.',
            notes: 'Part of cardiac risk profile. Requires continuous monitoring.',
            harmReduction: [
              { name: 'Continuous cardiac monitoring', link: null },
              { name: 'Medical facility with emergency protocols', link: null }
            ]
          },
          {
            name: 'Seizures',
            timeframe: 'During or shortly after',
            severity: 'High',
            prevalence: 'Documented in case reports; one case involved 38g purchased online',
            description: 'Generalized seizures. Risk increased with very high doses, history of seizure disorder, or unknown purity/content.',
            management: 'Protect from injury, maintain airway, benzodiazepines if prolonged, medical evaluation.',
            notes: 'History of seizures is relative contraindication.',
            harmReduction: [
              { name: 'Disclose seizure history during screening', link: null },
              { name: 'Pharmaceutical-grade ibogaine only', link: null },
              { name: 'Appropriate dosing by medical professional', link: null },
              { name: 'Emergency seizure protocols available', link: null }
            ]
          },
          {
            name: 'Hypertension',
            timeframe: 'During session',
            severity: 'Moderate to High',
            prevalence: 'Some develop systolic >160 mmHg and diastolic >100 mmHg',
            description: 'Elevated blood pressure during ibogaine effects. Higher risk in older patients or those with underlying conditions.',
            management: 'Blood pressure monitoring. Antihypertensive medication if severe.',
            notes: 'Part of cardiovascular monitoring requirements.',
            harmReduction: [
              { name: 'Baseline blood pressure assessment', link: null },
              { name: 'Continuous vital signs monitoring', link: null },
              { name: 'Medical supervision', link: null }
            ]
          },
          {
            name: 'Other Autonomic Effects',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: 'Common',
            description: 'Feeling cold, motor agitation/restlessness, excessive sweating (hyperhidrosis), urinary incontinence, orthostatic hypotension (low BP on standing), tremor, dizziness.',
            management: 'Supportive care, temperature regulation, hydration, assistance with movement.',
            notes: 'Generally manageable but can be uncomfortable.',
            harmReduction: [
              { name: 'Temperature regulation (blankets)', link: null },
              { name: 'Supportive care', link: null },
              { name: 'Assistance with any movement', link: null }
            ]
          }
        ],
        perceptual: [
          {
            name: 'Introspective Visions',
            timeframe: 'During session',
            severity: 'Variable',
            prevalence: 'Common in therapeutic context',
            description: 'Altered perceptions and introspective visions during experience, often related to trauma, addiction patterns, or life events. Visual disturbances. Moderate intensity compared to classical psychedelics like DMT or high-dose psilocybin.',
            management: 'Supportive presence, integration therapy post-session.',
            notes: 'Often considered therapeutically valuable in addiction treatment context. Less intense perceptually than classical psychedelics.',
            harmReduction: [
              { name: 'Preparation for psychological content', link: null },
              { name: 'Integration therapy post-session', link: null },
              { name: 'Trauma-informed support if needed', link: null }
            ]
          },
          {
            name: 'HPPD (Hallucinogen Persisting Perception Disorder)',
            timeframe: 'Long-term (persistent)',
            severity: 'Variable',
            prevalence: 'Unknown; documented cases exist but less studied than HPPD from classical psychedelics',
            description: 'Persistent perceptual disturbances after ibogaine including visual disturbances, geometric patterns, halos, trails. Can last weeks to months or longer.',
            management: 'Psychiatric follow-up, reassurance, avoid further psychedelic use. Some cases resolve spontaneously.',
            notes: 'Less studied than HPPD from LSD/psilocybin. Prevalence unclear.',
            harmReduction: [
              { name: 'Comprehensive screening', link: null },
              { name: 'Avoid if history of HPPD', link: null },
              { name: 'Integration support', link: null }
            ]
          }
        ]
      },
      clinicalContext: [
        {
          title: 'NOT a Classical Psychedelic - Unique Mechanism',
          icon: '⚠️',
          content: 'Ibogaine is an ATYPICAL psychedelic with a unique mechanism completely different from psilocybin, LSD, or DMT. It is NOT a serotonergic 5-HT2A agonist. Instead, it acts on κ-opioid receptors (high affinity), μ-opioid receptors (moderate), NMDA receptors (moderate), and σ2 receptors (moderate). This multi-receptor profile creates its distinctive anti-addictive properties but also its severe cardiac risks. It should NOT be considered in the same category as classical psychedelics.',
          citations: ['cherian_2024', 'koenig_2015']
        },
        {
          title: 'CRITICAL Cardiac Risk - Medical Supervision MANDATORY',
          icon: '☠️',
          content: 'Ibogaine has UNIQUE and SEVERE cardiovascular risks not seen with any classical psychedelic. It causes QT interval prolongation in virtually all users (average 95ms, up to 146ms). 50% of users reach the dangerous threshold of QTc >500ms. This leads to life-threatening Torsade de pointes arrhythmia. Bradycardia and sudden cardiac death can occur within the first 72 hours. 19 fatalities have been documented in literature review; 6 had pre-existing heart conditions. Ibogaine should ONLY be used in medical facilities with continuous ECG monitoring, emergency cardiac response capability, and physician supervision. Recreational or ceremonial use can be FATAL.',
          citations: ['cherian_2024', 'koenig_2015', 'glue_2016', 'knuijver_2022', 'rocha_2023']
        },
        {
          title: 'Anti-Addictive Properties - Opioid Use Disorder Treatment',
          icon: '🏥',
          content: 'Ibogaine is primarily used for addiction treatment, especially opioid use disorder. It has remarkable properties: reduces withdrawal symptoms, decreases cravings, and provides psychological insights into addiction patterns. However, this creates a paradox: opioid users are the target population, but CURRENT opioid use (especially methadone and buprenorphine) is an absolute contraindication due to fatal drug interactions. Complete opioid withdrawal is required before ibogaine administration. Medical supervision for withdrawal management and post-ibogaine support is essential.',
          citations: ['cherian_2024', 'knuijver_2022', 'gomez-escolar_2024']
        },
        {
          title: 'Traditional Bwiti Use - Cultural Context',
          icon: '🌿',
          content: 'Ibogaine comes from the iboga plant (Tabernanthe iboga), used for centuries in Bwiti spiritual and medicinal practices in West Central Africa (Gabon, Cameroon). Traditional use involves whole plant preparations in ceremonial contexts, which differs from extracted ibogaine hydrochloride used clinically. Increasing demand for ibogaine has led to sustainability concerns, overharvesting, and exploitation of indigenous communities. Respect for traditional knowledge, benefit-sharing, and environmental sustainability are critical ethical considerations.',
          citations: ['cherian_2024']
        },
        {
          title: 'Noribogaine - Long-Acting Metabolite',
          icon: '⏱️',
          content: 'Ibogaine is metabolized by CYP2D6 enzyme to noribogaine, an active metabolite with a 48-hour half-life (significantly longer than ibogaine itself). Noribogaine is also psychoactive and exhibits concentration-dependent QT prolongation. This means effects—including cardiac risks—persist for 24-48 hours after the acute experience. Monitoring must continue for at least 72 hours post-administration. Genetic variations in CYP2D6 (5-10% are poor metabolizers) create higher toxicity risk.',
          citations: ['koenig_2015', 'glue_2016']
        },
        {
          title: 'Variable Purity - Quality Control Critical',
          icon: '💊',
          content: 'Unregulated ibogaine has wildly variable purity creating dangerous dosing unpredictability. Root bark extracts: 8.2-32.9% ibogaine content. Ibogaine hydrochloride: 61.5-73.4%. Some samples purchased online contained NO ibogaine or unidentified adulterants. One case report involved 38 grams of online-purchased ibogaine causing seizures. Unknown potency creates overdose risk (high-purity samples) or ineffectiveness (low-purity). ONLY pharmaceutical-grade ibogaine hydrochloride from verified sources with laboratory testing should be used. Never purchase ibogaine online without verification.',
          citations: ['rocha_2023', 'alper_2008']
        },
        {
          title: 'Pre-Screening Mandatory - ECG, Electrolytes, Medications',
          icon: '🔍',
          content: 'Comprehensive medical screening before ibogaine is MANDATORY to prevent fatalities. Requirements: (1) Baseline ECG to detect QT prolongation, arrhythmias, structural heart disease - any abnormality is exclusion. (2) Electrolyte panel (potassium, magnesium) - imbalances must be corrected before administration. (3) Complete medication review - identify QT-prolonging drugs, opioids, CYP2D6 inhibitors. (4) Psychiatric assessment - psychosis, bipolar, severe depression. (5) Substance use history - polydrug use, opioid withdrawal status. (6) Family history of sudden cardiac death. Without this screening, ibogaine use is extremely dangerous.',
          citations: ['cherian_2024', 'koenig_2015']
        },
        {
          title: 'Legal Status - Schedule I in USA, Unscheduled Elsewhere',
          icon: '⚖️',
          content: 'Ibogaine is Schedule I in the United States (illegal, no accepted medical use). However, it is unscheduled in many countries including Canada, Mexico, and several European nations. This creates "medical tourism" where people travel internationally for ibogaine treatment. Legal variability affects access to quality-controlled pharmaceutical-grade substance and complicates follow-up care. Some clinics operate in countries with minimal regulation, creating quality and safety concerns. Always verify clinic credentials, medical capabilities, and regulatory oversight.',
          citations: ['cherian_2024']
        }
      ]
    },
    psilocybin: {
      overview: {
        classification: 'Classical Serotonergic Psychedelic (Tryptamine)',
        mechanism: '5-HT2A receptor agonist',
        activeMetabolite: 'Psilocin (rapidly converted in stomach)',
        legalStatus: 'Schedule I (USA)',
      },
      dosing: {
        microdose: '0.1-0.4g dried mushrooms (0.8-5mg synthetic)',
        threshold: '2mg',
        light: '3-6mg',
        common: '6-15mg', 
        therapeutic: '10-30mg (typical 15-20mg)',
        strong: '15-30mg',
        heavy: '30mg+',
        recreational: '1-5g dried mushrooms'
      },
      pharmacokinetics: {
        onset: '20-40 minutes',
        peak: '60-90 minutes',
        duration: '3-6 hours',
        tolerance: 'Develops rapidly, resets in 3-7 days',
        crossTolerance: 'LSD, mescaline'
      },
      prevalenceData: {
        lifetimeUse: '8.7% of US adults (22.9 million people)',
        erVisits: '1% of users (2020)',
        emergencyRate: '0.6% seeking emergency care'
      },
      riskFactors: [
        { 
          category: 'Cardiovascular',
          severity: 'high',
          conditions: [
            { 
              name: 'Uncontrolled hypertension',
              level: 'Relative',
              notes: 'Psilocybin increases BP and HR',
              details: {
                description: 'Uncontrolled high blood pressure is a relative contraindication for psilocybin use. Psilocybin causes sympathomimetic cardiovascular effects that can dangerously elevate already high blood pressure.',
                mechanism: 'Psilocybin acts on serotonin receptors that regulate cardiovascular function, leading to moderate increases in blood pressure and heart rate. In those with uncontrolled hypertension, this can push systolic BP above 160mmHg and diastolic above 100mmHg.',
                prevalence: '7% of administrations resulted in tachycardia (HR >100bpm). Older patients particularly at risk.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Continuous vital sign monitoring', link: null },
                  { name: 'ECG monitoring if indicated', link: null }
                ],
                citations: 'Petranker et al., 2020; Wsol et al. 2023; Bender & Hellerstein, 2022; Straumann et al., 2024; Nahlawi et al., 2025'
              }
            },
            { 
              name: 'Recent heart attack/MI (within 6 months)', 
              level: 'Absolute', 
              notes: 'Increased cardiac demand poses serious risk',
              details: {
                description: 'Recent heart attack is an absolute contraindication. The cardiovascular stress from psilocybin could trigger another cardiac event.',
                mechanism: 'Increased heart rate and blood pressure place additional demand on compromised cardiac tissue that is still healing from myocardial infarction.',
                prevalence: 'This is typically an exclusion criterion in clinical trials.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Wait minimum 6 months post-MI before considering use', link: null }
                ],
                citations: 'Marazziti et al. 2024'
              }
            },
            { 
              name: 'Arrhythmias', 
              level: 'Absolute', 
              notes: 'Cardiac rhythm disturbances can worsen',
              details: {
                description: 'Irregular heart rhythms are absolute contraindications due to potential for dangerous cardiac events.',
                mechanism: 'Serotonergic effects on cardiac ion channels can worsen existing arrhythmias or trigger new rhythm disturbances.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'ECG screening before any psychedelic use', link: null }
                ],
                citations: 'Petranker et al., 2020; Marazziti et al. 2024; Neumann et al., 2024'
              }
            },
            {
              name: 'Coronary artery disease', 
              level: 'Relative', 
              notes: 'Requires medical monitoring',
              details: {
                description: 'Stable coronary artery disease is a relative contraindication. May be possible with careful medical supervision.',
                mechanism: 'Narrowed arteries may not be able to accommodate increased cardiac demand from elevated heart rate and blood pressure.',
                harmReduction: [
                  { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Continuous Monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Medical supervision required throughout session', link: null }
                ],
                citations: 'Petranker et al., 2020'
              }
            }
          ]
        },
        {
          category: 'Psychiatric',
          severity: 'critical',
          conditions: [
            { 
              name: 'Active psychosis or mania', 
              level: 'Absolute', 
              notes: 'Can trigger prolonged episodes',
              details: {
                description: 'Active psychotic symptoms or manic episodes are absolute contraindications. Psilocybin has the potential to severely exacerbate these conditions.',
                mechanism: 'Psilocybin can intensify delusional thinking, hallucinations, and disorganized thought patterns. In mania, it can amplify dangerous impulsivity and grandiosity.',
                prevalence: 'Prolonged psychotic reactions documented in literature, though rare in screened populations.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Psychiatric evaluation before use', link: null },
                  { name: 'Never use during active episodes', link: null }
                ],
                citations: 'Honk et al. 2024; Johnson et al. 2008; Breeksema et al. 2022; Amsterdam et al., 2011; Rosenblat et al., 2023'
              }
            },
            { 
              name: 'Personal history of psychotic disorders', 
              level: 'Absolute', 
              notes: 'High risk of triggering episodes',
              details: {
                description: 'Personal history of schizophrenia or schizoaffective disorder is typically an absolute contraindication.',
                mechanism: 'Individuals with a history of psychotic disorders, even when stable, possess vulnerable neurotransmitter systems that psychedelics may destabilize',
                prevalence: 'Individuals with pre-existing psychotic disorders are at elevated risk for symptom exacerbation and prolonged adverse reactions. Clinical trials typically exclude this population due to safety concerns.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Avoid use entirely if personal history present', link: null }
                ],
                citations: 'Henningfield et al. 2023; Carbonaro et al. 2016; MacCallum et al., 2022'
              }
            },
            {
              name: 'Family history of psychosis/bipolar', 
              level: 'Relative', 
              notes: 'Elevated risk',
              details: {
                description: 'Family history increases risk but is not an absolute contraindication. Requires careful assessment.',
                mechanism: 'Genetic vulnerability to psychotic or bipolar disorders may be triggered by psychedelic use, even without personal history. Psychedelic use was linked to greater manic symptoms in individuals with higher genetic vulnerability to schizophrenia or bipolar I disorder, indicating a significant role of genetic factors in psychiatric outcomes.',
                prevalence: 'Risk multiplier varies based on closeness of family relationship and number of affected relatives.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced Preparation', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Close monitoring during and after session', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Honk et al. 2024; Simonsson et al., 2023'
              }
            },
            { 
              name: 'Bipolar disorder (stable)', 
              level: 'Relative', 
              notes: 'Emerging evidence shows safety in controlled settings',
              details: {
                description: 'Despite psilocybin use being linked to the onset of mania, in individuals with bipolar disorder, it is not an absolute contraindication. Recent research suggests that, in controlled therapeutic settings with appropriate screening and monitoring protocols, psilocybin may be administered safely under supervision.',
                mechanism: 'Risk of manic episode induction exists, but appears manageable with comprehensive screening, preparation, and monitoring.',
                prevalence: 'Study of Bipolar II treatment-resistant depression with psilocybin showed no increases in mania/hypomania.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Multiple Preparation Meetings', link: 'hrp_preparation_meetings_001' },
                  { name: 'Continuous Monitoring', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Integration Support', link: 'hrp_integration_support_001' }
                ],
                citations: 'Honk et al. 2024; Marrocu et al., 2024; Sabe et al. 2024'
              }
            },
            { 
              name: 'Personality disorders', 
              level: 'Relative', 
              notes: '31% negative response rate; 4x higher adverse risk',
              details: {
                description: 'Personality disorders significantly increase risk of negative outcomes. Not absolute contraindication but requires enhanced support.',
                mechanism: 'Difficulty with emotional regulation, interpersonal relationships, and self-concept can be amplified during psychedelic experiences.',
                prevalence: 'About 31% of individuals with personality disorders in the study experienced negative responses to psychedelics, compared to 16% of participants without personality disorders.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Enhanced therapeutic support', link: null },
                  { name: 'Extended Integration', link: 'hrp_integration_therapy_001' },
                  { name: 'Careful monitoring for destabilization', link: 'hrp_continuous_monitoring_001' }
                ],
                citations: 'Marrocu et al., 2024; Bremler et al. 2023'
              }
            }
          ]
        },
        {
          category: 'Trauma & Anxiety',
          severity: 'moderate',
          conditions: [
            { 
              name: 'Unprocessed trauma/PTSD', 
              level: 'Relative', 
              notes: 'Can reactivate trauma; needs specialized support',
              details: {
                description: 'A history of trauma is not a contraindication for psychedelic use but requires specialized, trauma-informed support. With appropriate preparation and integration, psychedelic experiences can be therapeutically valuable for individuals who have experienced trauma. ',
                mechanism: 'Psychedelics can bring traumatic memories and emotions to consciousness, leading to reexperiencing. This can be healing or destabilizing depending on support available.',
                prevalence: 'In a 2023 Scientific Reports study of ayahuasca retreat participants, people with a self-reported lifetime PTSD diagnosis had "more than 60%" prevalence of re-experiencing adverse life events during ceremony (vs. lower rates in those without PTSD)',
                harmReduction: [
                  { name: 'Trauma-informed screening and preparation', link: null },
                  { name: 'Specialized trauma therapy support', link: null },
                  { name: 'Grounding techniques training', link: 'hrp_coping_skills_training_001' },
                  { name: 'Safety planning', link: null },
                  { name: 'Integration focused on trauma processing', link: 'hrp_integration_therapy_001' }
                ],
                citations: 'Bremler et al. 2023; Gorman et al. 2021; Weiss et al. 2023; Scala et al. 2024'
              }
            },
            { 
              name: 'Active anxiety/depression', 
              level: 'Moderate', 
              notes: '87% with negative responses report worsening anxiety',
              details: {
                description: 'Pre-existing anxiety or depression can be both a therapeutic target and risk factor. Paradoxically, it can worsen or improve symptoms.',
                mechanism: 'Anxiety and depressive symptoms may be amplified during psychedelic states. However, with proper support and guidance, addressing both anxiety and depression is a common therapeutic goal.',
                prevalence: '87% of those experiencing negative psychological responses reported anxiety worsening.',
                harmReduction: [
                  { name: 'Comprehensive Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Psychoeducation about challenging experiences', link: 'hrp_psychoeducation_comprehensive_001' },
                  { name: 'Coping Skills Training', link: 'hrp_coping_skills_training_001' },
                  { name: 'Set and Setting Optimization', link: 'hrp_physical_environment_001' },
                  { name: 'Non-pharmacological Crisis Management', link: 'hrp_crisis_nonpharm_001' }
                ],
                citations: 'Bremler et al. 2023; Simonsson et al., 2023'
              }
            }
          ]
        },
        {
          category: 'Medications',
          severity: 'critical',
          conditions: [
            { 
              name: 'MAOIs',
              level: 'Relative',
              notes: 'Can cause life-threatening serotonin syndrome',
              details: {
                description: 'MAO inhibitors combined with psilocybin can cause potentially fatal serotonin syndrome. This is a relative contraindication due to the increased risk of serotonin syndrome.',
                mechanism: 'MAOIs prevent breakdown of serotonin, and psychedelics increase serotonin activity. Together they cause dangerous serotonin accumulation leading to hyperthermia, seizures, and potentially death.',
                prevalence: 'Deaths documented with MAOI + psychedelic combinations, particularly 5-MeO-DMT.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Never combine - wait 2+ weeks after stopping MAOIs', link: null },
                  { name: 'Know serotonin syndrome symptoms', link: null }
                ],
                citations: 'Malcolm & Thomas 2022'
              }
            },
            { 
              name: 'SSRIs', 
              level: 'Caution', 
              notes: 'Increased serotonin syndrome risk; may reduce effects',
              details: {
                description: 'SSRIs increase serotonin syndrome risk and may blunt psychedelic effects. Not absolute contraindication but requires caution.',
                mechanism: 'SSRIs increase serotonin levels and can potentiate psychedelic effects on serotonin system. They also downregulate 5-HT2A receptors which may reduce psychedelic effects.',
                prevalence: 'SSRI use is common among individuals seeking psychedelic therapy. Effects vary - some experience reduced psychedelic effects, others normal responses. In rare instances, more severe symptoms such as cardiac events, seizures, and even fatalities are documented in individuals on SSRIs.',
                harmReduction: [
                  { name: 'Comprehensive Medication Screening', link: 'hrp_screening_comprehensive_001' },
                  { name: 'Consider tapering under medical supervision', link: null },
                  { name: 'Monitor for serotonin syndrome symptoms', link: null },
                  { name: 'May need higher doses but proceed cautiously', link: 'hrp_start_low_go_slow_001' }
                ],
                citations: 'Sakai et al. 2024; Malcolm & Thomas 2022; Bender & Hellerstein, 2022'
              }
            }
          ]
        },
        {
          category: 'Dosing & Preparation',
          severity: 'moderate',
          conditions: [
            {
              name: 'Dosage uncertainty (mushroom variability)',
              level: 'Caution',
              notes: 'Mushroom potency varies significantly',
              details: {
                description: 'One of the primary risks of psilocybin consumption is the variability in potency, which can result from differences in mushroom species, growing conditions, and preservation methods. Even within the same species, psilocybin content can fluctuate significantly, making it difficult to achieve consistent and predictable dosing.',
                mechanism: 'Variable psilocybin content in mushrooms makes accurate dosing challenging. Different species, growing conditions, and preservation methods all affect potency. This variability increases risk of unintended high doses or challenging psychological experiences.',
                prevalence: 'Common issue with natural mushrooms. Less problematic with pharmaceutical-grade synthetic psilocybin used in clinical trials.',
                harmReduction: [
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Test dose with small amount first', link: null },
                  { name: 'Substance testing when available', link: null },
                  { name: 'Consider synthetic psilocybin in clinical settings', link: null }
                ],
                citations: 'Kopra et al., 2022; Cavanna et al., 2022; Johnson et al., 2018'
              }
            }
          ]
        },
        {
          category: 'Demographics',
          severity: 'moderate',
          conditions: [
            {
              name: 'Age under 25', 
              level: 'Caution', 
              notes: '53% of negative effects occur in this age group',
              details: {
                description: 'Younger individuals, especially under 25, show higher rates of negative effects and emergency treatment seeking.',
                mechanism: 'Developing brain is more vulnerable to disruption. Neurotransmitter systems are still maturing. Lower risk aversion and higher impulsivity increase behavioral risks.',
                prevalence: 'Research suggests that younger individuals, particularly those under 25, may be more likely to experience adverse psychological reactions following psychedelic use. Individuals under 25 are also more likely to experience challenging experiences than those 25+ (Iseger et al., 2024). Young psychedelic users have higher rates of emergency department visits.',
                harmReduction: [
                  { name: 'Enhanced education about risks', link: 'hrp_public_harm_reduction_001' },
                  { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
                  { name: 'Mandatory supervision for adolescents', link: 'hrp_continuous_monitoring_001' },
                  { name: 'Consider delaying use until brain fully developed (age 25+)', link: null }
                ],
                citations: 'Marazziti et al. 2024; Iseger et al., 2024; Breeksema et al. 2022; Bremler et al. 2023'
              }
            }
          ]
        }
      ],
      adverseEvents: {
        psychological: [
          {
            name: 'Acute Anxiety',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: '15-31% in clinical trials',
            description: 'Most common psychological adverse event. Anxiety during or shortly after administration. Usually resolves during or shortly after session, though may last hours beyond peak in some cases.',
            management: 'Reassurance typically sufficient; benzodiazepines if severe',
            notes: '87% of those with negative psychological responses experienced anxiety worsening. Often manageable with calm presence and breathing guidance.',
            harmReduction: [
              { name: 'Comprehensive Psychoeducation', link: 'hrp_psychoeducation_comprehensive_001' },
              { name: 'Coping Skills Training', link: 'hrp_coping_skills_training_001' },
              { name: 'Set and Setting Optimization', link: 'hrp_physical_environment_001' },
              { name: 'Non-pharmacological Crisis Management', link: 'hrp_crisis_nonpharm_001' }
            ]
          },
          {
            name: 'Panic Reactions',
            timeframe: 'During session',
            severity: 'Moderate to High',
            prevalence: 'Variable, dose-dependent',
            description: 'Intense fear, overwhelming anxiety, sense of losing control or dying. More severe than general anxiety.',
            management: 'Calm presence, verbal reassurance, breathing guidance, grounding techniques. Benzodiazepines if non-pharmacological insufficient.',
            harmReduction: [
              { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' },
              { name: 'Coping Skills Training', link: 'hrp_coping_skills_training_001' },
              { name: 'Continuous Monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          },
          {
            name: 'Dysphoria & Challenging Experiences',
            timeframe: 'During session',
            severity: 'Moderate to High',
            prevalence: 'Common but highly variable',
            description: 'Unpleasant emotional states including dysphoria, confusion, fear, sense of doom, emotional pain. The classic "bad trip." Can include confrontation with difficult emotions or trauma.',
            management: 'Non-directive support, acceptance, avoiding resistance. These experiences are often therapeutically valuable when properly supported.',
            notes: 'Paradoxically, difficult experiences often rated as meaningful and valuable in retrospect with proper integration.',
            harmReduction: [
              { name: 'Multiple Preparation Meetings', link: 'hrp_preparation_meetings_001' },
              { name: 'Non-directive Support', link: 'hrp_nondirective_support_001' },
              { name: 'Integration Therapy', link: 'hrp_integration_therapy_001' }
            ]
          }
        ],
        physiological: [
          {
            name: 'Nausea & Vomiting',
            timeframe: 'Onset to peak',
            severity: 'Mild to Moderate',
            prevalence: 'Common, especially at higher doses',
            description: 'Gastrointestinal distress is expected with psilocybin, particularly with whole mushrooms. More pronounced than synthetic psilocybin.',
            management: 'Anti-nausea medication, ginger, fasting beforehand (4-6 hours), reassurance that it typically passes',
            harmReduction: [
              { name: 'Fasting before session', link: null },
              { name: 'Ginger or anti-nausea medication', link: null }
            ]
          },
          {
            name: 'Cardiovascular Effects',
            timeframe: 'During session',
            severity: 'Mild to Moderate',
            prevalence: '7% experience tachycardia >100bpm',
            description: 'Increased heart rate and blood pressure. Systolic BP >160mmHg and diastolic >100mmHg reported, especially in older patients.',
            management: 'Monitoring, reassurance. Medical intervention if sustained elevation in at-risk individuals.',
            harmReduction: [
              { name: 'Comprehensive Medical Screening', link: 'hrp_screening_comprehensive_001' },
              { name: 'Continuous vital sign monitoring', link: 'hrp_continuous_monitoring_001' }
            ]
          }
        ],
        perceptual: [
          {
            name: 'HPPD',
            timeframe: 'Long-term',
            severity: 'Variable',
            prevalence: '25-40% report some changes; 4% clinically significant',
            description: 'Persistent visual disturbances (visual snow, trails, afterimages, geometric patterns) lasting beyond session.',
            management: 'Reassurance, benzodiazepines (anecdotal), lamotrigine (case reports)',
            notes: 'No cases in modern clinical trials. More associated with frequent use.',
            harmReduction: [
              { name: 'Avoid frequent use', link: null },
              { name: 'Start Low, Go Slow', link: 'hrp_start_low_go_slow_001' }
            ]
          }
        ]
      },
      clinicalContext: [
        {
          title: 'The "Bad Trip" Paradox',
          icon: '🎭',
          content: 'Research shows that even those who report acute distress during psilocybin sessions often rate the experience as highly enriching months later. Over 60% call it "highly enriching" and >90% "moderately enriching" even when the acute experience was difficult. This suggests that challenging experiences, when properly supported, can be therapeutically valuable.',
          citations: ['carbonaro_2016']
        },
        {
          title: 'Set and Setting: The Real Risk Multiplier',
          icon: '🏠',
          content: '33% of people with negative experiences took psilocybin with someone they had relationship issues with. In contrast, the Johns Hopkins model managed 380+ sessions with no serious lasting adverse events using reassurance alone, demonstrating that proper preparation and supportive environments are more protective than the substance itself is risky.',
          citations: ['bremler_2023', 'johnson_2008']
        },
        {
          title: 'The Screening Effect',
          icon: '🔍',
          content: 'In screened populations, serious adverse events occur in 4% of those with prior psychiatric disorders but 0% in healthy participants. Comprehensive medical and psychiatric screening dramatically reduces adverse outcomes. Deaths from psychedelics almost always involve polysubstance use (82% of cases), highlighting that screening and education about dangerous combinations is critical.',
          citations: ['garcia-romeu_2018', 'kopra_2025']
        },
        {
          title: 'Non-Pharmacological Interventions Work',
          icon: '🤝',
          content: 'In the vast majority of cases, acute psychological distress during psilocybin sessions can be managed with reassurance, calm presence, and breathing guidance alone. Benzodiazepines are available but rarely needed. This demonstrates that trained psychological support is the primary safety measure, not medication.',
          citations: ['johnson_2008', 'garcia-romeu_2018']
        },
        {
          title: 'Age and Vulnerability',
          icon: '👥',
          content: '53% of those experiencing negative effects were under age 25, despite young adults not being the majority of users. Developing brains appear more vulnerable to adverse psychological effects. This suggests that extra caution, education, and support are warranted for younger individuals, though use is not recommended until brain development is complete.',
          citations: ['bremler_2023', 'marazziti_2024']
        },
        {
          title: 'The Bipolar Disorder Nuance',
          icon: '⚖️',
          content: 'While bipolar disorder has traditionally been considered an absolute contraindication, emerging research suggests that in controlled therapeutic settings with comprehensive preparation and monitoring, stable Bipolar II patients showed no increases in mania or hypomania. This challenges blanket exclusions and suggests risk is more nuanced than previously thought.',
          citations: ['honk_2024', 'sabe_2024']
        },
        {
          title: 'Extremely Low Emergency Rates',
          icon: '🚑',
          content: 'Only 0.6% of psilocybin users seek emergency care, and only 1% visit emergency rooms. For context, this is lower than many legal substances. The rarity of medical emergencies in population-level data suggests that when used responsibly, physiological risks are minimal.',
          citations: ['canady_2023', 'baxter_2024']
        },
        {
          title: 'Therapeutic Alliance as Protective Factor',
          icon: '💚',
          content: 'The quality of the relationship between therapist/guide and participant is a strong predictor of outcomes. Strong therapeutic alliance is associated with greater emotional breakthrough and enhanced mystical-type experiences, while weak alliance predicts poorer outcomes. The relationship itself is therapeutic infrastructure.',
          citations: ['garcia-romeu_2018', 'davis_nd']
        }
      ]
    }
  };

  const RiskCard = ({ condition, categoryId, expandedSection, toggleSection }) => {
    const isExpanded = expandedSection === `risk-${categoryId}`;
    
    return (
      <div className="border border-[#E8D9C8] rounded-[12px] overflow-hidden">
        <button
          onClick={() => toggleSection(`risk-${categoryId}`)}
          className="w-full p-3 bg-[#FFF9F5] hover:bg-[#FEEAD8] transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-base text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>{condition.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                  condition.level === 'Absolute' ? 'bg-red-100 text-red-700' :
                  condition.level === 'Relative' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {condition.level}
                </span>
              </div>
              {condition.notes && !isExpanded && (
                <p className="text-sm text-[#4E4E4E] mt-1" style={{fontFamily: 'Inter, sans-serif'}}>{condition.notes}</p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openFeedbackModal(`${condition.category} > ${condition.name}`);
              }}
              className="p-1.5 hover:bg-[#E6F7F4] rounded-[8px] transition-colors text-[#007F6E] flex-shrink-0"
              title="Suggest edit for this condition"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <ChevronRight className={`w-4 h-4 text-[#4E4E4E] flex-shrink-0 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </button>
        
        {isExpanded && condition.details && (
          <div className="p-4 bg-white border-t border-[#E8D9C8] space-y-3">
            <div>
              <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{condition.details.description}</p>
            </div>

            {condition.details.mechanism && (
              <div>
                <p className="text-xs font-semibold text-[#6C3000] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>How it increases risk:</p>
                <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{condition.details.mechanism}</p>
              </div>
            )}

            {condition.details.prevalence && (
              <div>
                <p className="text-xs font-semibold text-[#6C3000] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Prevalence data:</p>
                <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{condition.details.prevalence}</p>
              </div>
            )}

            {condition.details.harmReduction && condition.details.harmReduction.length > 0 && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-[12px]">
                <p className="text-xs font-semibold text-green-800 mb-2" style={{fontFamily: 'Inter, sans-serif'}}>Harm reduction strategies:</p>
                <ul className="space-y-1">
                  {condition.details.harmReduction.map((hr, idx) => (
                    <li key={idx} className="text-sm text-green-900 flex items-start">
                      <span className="text-green-600 mr-2">→</span>
                      {hr.link ? (
                        <a href={`#${hr.link}`} className="flex-1 hover:underline text-green-700 font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
                          {hr.name}
                        </a>
                      ) : (
                        <span className="flex-1" style={{fontFamily: 'Inter, sans-serif'}}>{hr.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {condition.details.citations && (
              <div className="pt-2 border-t border-[#E8D9C8]">
                <EvidenceDisplay citations={condition.details.citations} className="text-xs" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const AdverseEventCard = ({ event, categoryId, expandedSection, toggleSection }) => {
    const isExpanded = expandedSection === `ae-${categoryId}`;

    return (
      <div className="border border-[#E8D9C8] rounded-[12px] overflow-hidden">
        <button
          onClick={() => toggleSection(`ae-${categoryId}`)}
          className="w-full p-4 hover:bg-[#FFF9F5] transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-base mb-1 text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>{event.name}</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#FFF9F5] px-2 py-1 rounded-[12px] text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{event.timeframe}</span>
                <span className={`text-xs px-2 py-1 rounded-[12px] ${
                  event.severity.includes('High') ? 'bg-red-100 text-red-700' :
                  event.severity.includes('Moderate') ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`} style={{fontFamily: 'Inter, sans-serif'}}>
                  {event.severity}
                </span>
                <span className="text-xs bg-[#FFD480] text-[#6C3000] px-2 py-1 rounded-[12px]" style={{fontFamily: 'Inter, sans-serif'}}>{event.prevalence}</span>
              </div>
              {!isExpanded && (
                <p className="text-sm text-[#4E4E4E] mt-2 line-clamp-2" style={{fontFamily: 'Inter, sans-serif'}}>{event.description}</p>
              )}
            </div>
            <ChevronRight className={`w-4 h-4 text-[#4E4E4E] flex-shrink-0 ml-3 mt-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 space-y-3 border-t border-[#E8D9C8] bg-[#FFF9F5]">
            <div className="pt-3">
              <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{event.description}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#6C3000] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Management:</p>
              <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{event.management}</p>
            </div>

            {event.notes && (
              <div className="bg-[#FEEAD8] border border-[#E8D9C8] p-3 rounded-[12px]">
                <p className="text-xs font-semibold text-[#6C3000] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Clinical Note:</p>
                <p className="text-sm text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{event.notes}</p>
              </div>
            )}

            {event.harmReduction && event.harmReduction.length > 0 && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-[12px]">
                <p className="text-xs font-semibold text-green-800 mb-2" style={{fontFamily: 'Inter, sans-serif'}}>Harm Reduction Strategies:</p>
                <ul className="space-y-1">
                  {event.harmReduction.map((hr, idx) => (
                    <li key={idx} className="text-sm text-green-900 flex items-start">
                      <Shield className="w-3 h-3 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      {hr.link ? (
                        <a href={`#${hr.link}`} className="flex-1 hover:underline text-green-700 font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
                          {hr.name}
                        </a>
                      ) : (
                        <span className="flex-1" style={{fontFamily: 'Inter, sans-serif'}}>{hr.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const substance = substances.find(s => s.id === selectedSubstance);
  const data = substanceData[selectedSubstance];
  const hasData = data !== undefined;

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-4">
              <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 border border-[#E8D9C8]">
                <div className="mb-4 pb-3 border-b-2 border-[#E8D9C8]">
                  <h3 className="text-sm font-bold text-[#2C1B11] uppercase tracking-wide mb-3" style={{fontFamily: 'Satoshi, sans-serif'}}>Substances</h3>
                  <button
                    onClick={() => openFeedbackModal('Substance Information - Propose Addition or Edit')}
                    className="w-full px-4 py-3 bg-[#E6543E] hover:bg-[#D24E38] text-white rounded-[12px] font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                    style={{fontFamily: 'Inter, sans-serif'}}
                  >
                    <Edit3 className="w-4 h-4" />
                    Suggest Edit
                  </button>
                </div>
                
                <nav className="space-y-1">
                  {substances.map(sub => {
                    const isExpanded = expandedSubstance === sub.id;
                    const hasData = substanceData[sub.id] !== undefined;
                    const substanceColor = substanceColors[sub.id];

                    return (
                      <div key={sub.id}>
                        <button
                          onClick={() => toggleSubstance(sub.id)}
                          className={`w-full text-left px-4 py-3 rounded-[12px] text-sm font-medium transition-all flex items-center justify-between ${
                            selectedSubstance === sub.id
                              ? 'shadow-[0_6px_18px_rgba(0,0,0,0.1)]'
                              : 'text-[#4E4E4E] hover:bg-[#FEEAD8] hover:text-[#D26600]'
                          }`}
                          style={selectedSubstance === sub.id ? {
                            backgroundColor: substanceColor,
                            color: substanceColor === '#000000' || substanceColor === '#003B73' || substanceColor === '#007F6E' || substanceColor === '#A33D2C' || substanceColor === '#E6543E' ? 'white' : '#2C1B11'
                          } : {}}
                        >
                          <span>{sub.name}</span>
                          {hasData && (
                            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          )}
                        </button>
                        
                        {isExpanded && hasData && (
                          <div className="ml-4 mt-1 space-y-1">
                            <button
                              onClick={() => scrollToSection('pharmacology')}
                              className={`w-full text-left px-3 py-2 rounded-[12px] text-xs font-medium transition-all flex items-center space-x-2 ${
                                activeSection === 'pharmacology'
                                  ? 'bg-[#FFD480] text-[#6C3000]'
                                  : 'text-[#4E4E4E] hover:bg-[#FFF9F5]'
                              }`}
                            >
                              <span className="text-sm">📊</span>
                              <span>Pharmacology</span>
                            </button>
                            
                            <button
                              onClick={() => scrollToSection('risk-factors')}
                              className={`w-full text-left px-3 py-2 rounded-[12px] text-xs font-medium transition-all flex items-center space-x-2 ${
                                activeSection === 'risk-factors'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'text-[#4E4E4E] hover:bg-[#FFF9F5]'
                              }`}
                            >
                              <span className="text-sm">⚠️</span>
                              <span>Risk Factors</span>
                            </button>
                            
                            <button
                              onClick={() => scrollToSection('adverse-events')}
                              className={`w-full text-left px-3 py-2 rounded-[12px] text-xs font-medium transition-all flex items-center space-x-2 ${
                                activeSection === 'adverse-events'
                                  ? 'bg-red-100 text-red-700'
                                  : 'text-[#4E4E4E] hover:bg-[#FFF9F5]'
                              }`}
                            >
                              <span className="text-sm">🚨</span>
                              <span>Adverse Events</span>
                            </button>
                            
                            <button
                              onClick={() => scrollToSection('clinical-context')}
                              className={`w-full text-left px-3 py-2 rounded-[12px] text-xs font-medium transition-all flex items-center space-x-2 ${
                                activeSection === 'clinical-context'
                                  ? 'bg-[#FEEAD8] text-[#D26600]'
                                  : 'text-[#4E4E4E] hover:bg-[#FFF9F5]'
                              }`}
                            >
                              <span className="text-sm">💡</span>
                              <span>Clinical Context</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            {!hasData ? (
              <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-[#FFF9F5] rounded-full flex items-center justify-center mx-auto">
                    <Info className="w-8 h-8 text-[#4E4E4E]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Data Coming Soon</h3>
                  <p className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>
                    Comprehensive safety information for {substance?.name} is currently being compiled.
                    Check back soon for detailed risk factors, adverse events, and clinical insights.
                  </p>
                  <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>
                    Currently available: <span className="font-semibold text-[#FCA300]">Psilocybin</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-white rounded-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.1)] overflow-hidden" style={{backgroundColor: substanceColors[selectedSubstance]}}>
                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-4xl font-bold mb-2 tracking-tight" style={{fontFamily: 'Satoshi, sans-serif'}}>{substance?.name}</h2>
                        <p className="text-xl opacity-90 font-light" style={{fontFamily: 'Inter, sans-serif'}}>{data.overview.classification}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-[12px]">
                        <p className="text-xs opacity-75 mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Legal Status</p>
                        <p className="text-sm font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>{data.overview.legalStatus}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 border border-white/20">
                        <p className="text-xs opacity-75 mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Mechanism</p>
                        <p className="text-sm font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>{data.overview.mechanism}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 border border-white/20">
                        <p className="text-xs opacity-75 mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Duration</p>
                        <p className="text-sm font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>{data.pharmacokinetics.duration}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 border border-white/20">
                        <p className="text-xs opacity-75 mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Lifetime Use (US)</p>
                        <p className="text-sm font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>{data.prevalenceData.lifetimeUse}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="pharmacology" className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-4 pb-3 border-b-2 border-[#E8D9C8]">
                    <div className="w-1 h-8 bg-[#FCA300] rounded"></div>
                    <h3 className="font-bold text-2xl text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Pharmacology Overview</h3>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#FEEAD8] p-3 rounded-[12px]">
                      <p className="text-xs text-[#D26600] font-medium mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Onset</p>
                      <p className="font-semibold text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.pharmacokinetics.onset}</p>
                    </div>
                    <div className="bg-[#FEEAD8] p-3 rounded-[12px]">
                      <p className="text-xs text-[#D26600] font-medium mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Peak</p>
                      <p className="font-semibold text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.pharmacokinetics.peak}</p>
                    </div>
                    <div className="bg-[#FEEAD8] p-3 rounded-[12px]">
                      <p className="text-xs text-[#D26600] font-medium mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Duration</p>
                      <p className="font-semibold text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.pharmacokinetics.duration}</p>
                    </div>
                    <div className="bg-[#FEEAD8] p-3 rounded-[12px]">
                      <p className="text-xs text-[#D26600] font-medium mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Tolerance Reset</p>
                      <p className="font-semibold text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.pharmacokinetics.tolerance}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Typical Dosing Ranges</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>Microdose</span>
                        <span className="font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.dosing.microdose}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>Therapeutic</span>
                        <span className="font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.dosing.therapeutic}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>Recreational</span>
                        <span className="font-medium text-[#2C1B11]" style={{fontFamily: 'Inter, sans-serif'}}>{data.dosing.recreational}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="risk-factors" className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] scroll-mt-24">
                  <div className="p-6 pb-4 border-b-2 border-[#E8D9C8]">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-8 bg-orange-600 rounded"></div>
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                      <h3 className="font-bold text-2xl text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Risk Factors & Contraindications</h3>
                    </div>
                  </div>

                  <div className="p-6 pt-4">
                    <div className="mb-6 p-4 bg-[#FFF9F5] rounded-[12px] border border-[#E8D9C8]">
                      <p className="text-sm font-semibold text-[#2C1B11] mb-3" style={{fontFamily: 'Satoshi, sans-serif'}}>Contraindication Levels:</p>
                      <div className="flex flex-wrap gap-3">
                        {contraindicationLegend.map((item, idx) => (
                          <div
                            key={idx}
                            className="relative"
                            onMouseEnter={() => setHoveredLegendItem(item.level)}
                            onMouseLeave={() => setHoveredLegendItem(null)}
                          >
                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium cursor-help ${item.color}`}>
                              {item.level}
                            </span>
                            
                            {hoveredLegendItem === item.level && (
                              <div className="absolute z-50 w-80 p-4 mt-2 bg-white rounded-[12px] shadow-[0_6px_18px_rgba(0,0,0,0.1)] border-2 border-[#E8D9C8] left-0">
                                <div className="space-y-2">
                                  <p className="text-sm font-semibold text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>{item.level} Contraindication</p>
                                  <p className="text-sm text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{item.description}</p>
                                  <div className="pt-2 border-t border-[#E8D9C8]">
                                    <p className="text-xs font-semibold text-[#6C3000] mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Examples:</p>
                                    <p className="text-xs text-[#4E4E4E]" style={{fontFamily: 'Inter, sans-serif'}}>{item.examples}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {data.riskFactors.map((category, idx) => (
                        <div key={idx} className="border-l-4 border-[#E8D9C8] pl-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <h4 className="font-semibold text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>{category.category}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              category.severity === 'critical' ? 'bg-red-100 text-red-700' :
                              category.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {category.severity}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {category.conditions.map((condition, cidx) => (
                              <RiskCard 
                                key={cidx} 
                                condition={condition} 
                                categoryId={`${idx}-${cidx}`}
                                expandedSection={expandedSection}
                                toggleSection={toggleSection}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div id="adverse-events" className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] scroll-mt-24">
                  <div className="p-6 pb-4 border-b-2 border-[#E8D9C8]">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-8 bg-red-600 rounded"></div>
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      <h3 className="font-bold text-2xl text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Adverse Events</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-4">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-[#6C3000]" style={{fontFamily: 'Satoshi, sans-serif'}}>Psychological</h4>
                        <div className="space-y-3">
                          {data.adverseEvents.psychological.map((event, idx) => (
                            <AdverseEventCard key={idx} event={event} categoryId={`psych-${idx}`} expandedSection={expandedSection} toggleSection={toggleSection} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-red-900">Physiological</h4>
                        <div className="space-y-3">
                          {data.adverseEvents.physiological.map((event, idx) => (
                            <AdverseEventCard key={idx} event={event} categoryId={`phys-${idx}`} expandedSection={expandedSection} toggleSection={toggleSection} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-[#6C3000]" style={{fontFamily: 'Satoshi, sans-serif'}}>Perceptual</h4>
                        <div className="space-y-3">
                          {data.adverseEvents.perceptual.map((event, idx) => (
                            <AdverseEventCard key={idx} event={event} categoryId={`perc-${idx}`} expandedSection={expandedSection} toggleSection={toggleSection} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="clinical-context" className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] scroll-mt-24">
                  <button
                    onClick={() => setClinicalContextExpanded(!clinicalContextExpanded)}
                    className="w-full p-6 pb-4 hover:bg-[#FFF9F5] transition-colors border-b-2 border-[#E8D9C8]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-8 bg-[#FCA300] rounded"></div>
                        <Info className="w-6 h-6 text-[#FCA300]" />
                        <div className="text-left">
                          <h3 className="font-bold text-2xl text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>Clinical Context & Key Insights</h3>
                          <p className="text-sm text-[#4E4E4E] mt-1" style={{fontFamily: 'Inter, sans-serif'}}>Real-world patterns and research findings that contextualize the risk data</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-[#4E4E4E] flex-shrink-0 transition-transform ${clinicalContextExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  
                  {clinicalContextExpanded && (
                    <div className="p-6 pt-4">
                      <div className="space-y-4">
                        {data.clinicalContext.map((context, idx) => (
                          <div key={idx} className="bg-[#FDE9D6] border-l-4 border-[#FCA300] p-5 rounded-r-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-shadow">
                            <div className="flex items-start space-x-3">
                              <div className="text-3xl flex-shrink-0">{context.icon}</div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-bold text-[#6C3000] text-base flex-1" style={{fontFamily: 'Satoshi, sans-serif'}}>{context.title}</h4>
                                  <button
                                    onClick={() => openFeedbackModal(`Clinical Insight: ${context.title}`)}
                                    className="p-1.5 hover:bg-[#FCA300] hover:bg-opacity-30 rounded-[8px] transition-colors text-[#6C3000] flex-shrink-0"
                                    title="Suggest edit for this insight"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <p className="text-sm text-[#2C1B11] leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>{context.content}</p>

                                <div className="pt-2 border-t border-[#E8D9C8] flex flex-wrap items-center gap-2">
                                  <span className="text-xs text-[#D26600] font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>Sources:</span>
                                  {context.citations.map((citation, cidx) => (
                                    <CitationLink
                                      key={cidx}
                                      citationKey={citation}
                                      showIcon={true}
                                      className="text-xs bg-[#FFD480] hover:bg-[#FCA300] text-[#6C3000] px-2.5 py-1 rounded-[12px] transition-colors font-medium"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-[12px]">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-amber-900 mb-1" style={{fontFamily: 'Satoshi, sans-serif'}}>Context Matters</p>
                            <p className="text-sm text-amber-800" style={{fontFamily: 'Inter, sans-serif'}}>These insights demonstrate that risk is not inherent to the substance alone, but heavily influenced by screening, preparation, setting, and support systems. The same substance can have dramatically different safety profiles depending on context.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-green-50 border-2 border-green-200 p-6 rounded-[24px]">
                  <h3 className="font-semibold text-lg mb-3 flex items-center" style={{fontFamily: 'Satoshi, sans-serif'}}>
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Safety Summary
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span style={{fontFamily: 'Inter, sans-serif'}}>Low physiological toxicity; no known lethal dose</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span style={{fontFamily: 'Inter, sans-serif'}}>Most adverse events are psychological and manageable with support</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span style={{fontFamily: 'Inter, sans-serif'}}>Comprehensive screening dramatically reduces serious complications</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span style={{fontFamily: 'Inter, sans-serif'}}>Set, setting, and therapeutic support are critical protective factors</span>
                    </li>
                  </ul>
                </div>

                {/* Related Case Studies Section */}
                {relatedCases.length > 0 && (
                  <div className="bg-[#A33D2C] bg-opacity-10 border-2 border-[#A33D2C] p-6 rounded-[24px]">
                    <h3 className="font-semibold text-lg mb-3 flex items-center" style={{fontFamily: 'Satoshi, sans-serif'}}>
                      <FileText className="w-5 h-5 text-[#A33D2C] mr-2" />
                      Related Case Studies ({relatedCases.length})
                    </h3>
                    <p className="text-sm text-[#4E4E4E] mb-4" style={{fontFamily: 'Inter, sans-serif'}}>
                      Real-world cases involving {substanceColors[selectedSubstance] ? substance.name : selectedSubstance} from the Psychedelic Safety Institute Case Book
                    </p>
                    <div className="space-y-3">
                      {relatedCases.slice(0, 5).map((caseStudy) => (
                        <div
                          key={caseStudy.id}
                          className="bg-white p-4 rounded-[12px] border-2 border-[#E8D9C8] hover:border-[#A33D2C] transition-all cursor-pointer"
                          onClick={() => navigate('/case-studies')}
                        >
                          <h4 className="font-semibold text-[#2C1B11] mb-1" style={{fontFamily: 'Satoshi, sans-serif'}}>
                            {caseStudy.title}
                          </h4>
                          <p className="text-xs text-[#6C3000] mb-2" style={{fontFamily: 'Inter, sans-serif'}}>
                            {caseStudy.year} • {caseStudy.setting}
                          </p>
                          <p className="text-sm text-[#4E4E4E] line-clamp-2" style={{fontFamily: 'Inter, sans-serif'}}>
                            {caseStudy.summary}
                          </p>
                        </div>
                      ))}
                      {relatedCases.length > 5 && (
                        <button
                          onClick={() => navigate('/case-studies')}
                          className="w-full px-4 py-3 bg-[#A33D2C] text-white rounded-[12px] font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                          style={{fontFamily: 'Inter, sans-serif'}}
                        >
                          <span>View All {relatedCases.length} Related Cases</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstanceExplorer;