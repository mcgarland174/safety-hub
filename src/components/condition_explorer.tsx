import React, { useState, useMemo, useEffect } from 'react';
import { Info, AlertTriangle, Shield, ChevronRight, ChevronDown, Search, X, AlertCircle, Zap, Settings, Edit3 } from 'lucide-react';
import { useFeedback } from '../contexts/FeedbackContext';

const ConditionExplorer = () => {
  const { setPageContext, openFeedbackModal } = useFeedback();
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Set page context
  useEffect(() => {
    setPageContext('Conditions Explorer');
  }, [setPageContext]);

  const conditionCategories = [
    {
      category: 'Cardiovascular',
      icon: '❤️',
      conditions: [
        { 
          id: 'hypertension', 
          name: 'Uncontrolled Hypertension',
          shortDesc: 'High blood pressure not controlled by medication',
          severity: 'critical',
          searchTerms: ['high blood pressure', 'bp', 'hypertension', 'htn'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Can push BP >160/100mmHg - Medical emergency risk'
        },
        { 
          id: 'cad', 
          name: 'Coronary Artery Disease',
          shortDesc: 'Narrowed or blocked heart arteries',
          severity: 'high',
          searchTerms: ['heart disease', 'cad', 'coronary', 'chest pain', 'angina'],
          contraindications: 3,
          substancesAffected: 4,
          criticalInteraction: 'Cardiovascular strain during psychedelic effects'
        },
        { 
          id: 'arrhythmia', 
          name: 'Heart Arrhythmias',
          shortDesc: 'Irregular heart rhythms',
          severity: 'critical',
          searchTerms: ['irregular heartbeat', 'afib', 'atrial fibrillation', 'palpitations', 'arrhythmia'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Can trigger dangerous heart rhythm changes'
        },
        {
          id: 'recent_mi',
          name: 'Recent Myocardial Infarction',
          shortDesc: 'Heart attack within 6 months',
          severity: 'critical',
          searchTerms: ['heart attack', 'mi', 'myocardial infarction', 'cardiac event'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Extreme risk - cardiac events likely'
        },
        {
          id: 'long_qt',
          name: 'Long QT Syndrome',
          shortDesc: 'Genetic heart rhythm disorder',
          severity: 'critical',
          searchTerms: ['long qt', 'lqts', 'qt prolongation', 'arrhythmia', 'herg'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'FATAL with ibogaine - causes Torsade de pointes arrhythmia'
        },
        {
          id: 'herg_mutation',
          name: 'hERG Gene Mutations',
          shortDesc: 'Genetic predisposition to cardiac arrhythmias',
          severity: 'critical',
          searchTerms: ['herg', 'genetic', 'qt', 'cardiac genes'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'ABSOLUTE contraindication for ibogaine - genetic cardiac risk'
        },
        {
          id: 'cardiomyopathy',
          name: 'Cardiomyopathy',
          shortDesc: 'Dilated or hypertrophic heart muscle disease',
          severity: 'critical',
          searchTerms: ['cardiomyopathy', 'enlarged heart', 'heart muscle', 'dcm', 'hcm'],
          contraindications: 2,
          substancesAffected: 5,
          criticalInteraction: 'Weakened heart cannot handle cardiovascular strain'
        },
        {
          id: 'electrolyte_imbalance',
          name: 'Electrolyte Imbalances',
          shortDesc: 'Low potassium, magnesium, or sodium',
          severity: 'high',
          searchTerms: ['electrolyte', 'hypokalemia', 'hyponatremia', 'hypomagnesemia', 'potassium', 'sodium'],
          contraindications: 2,
          substancesAffected: 2,
          criticalInteraction: 'Increases QT prolongation risk with ibogaine; hyponatremia risk with MDMA'
        }
      ]
    },
    {
      category: 'Psychiatric',
      icon: '🧠',
      conditions: [
        { 
          id: 'psychosis', 
          name: 'Psychotic Disorders',
          shortDesc: 'Schizophrenia, schizoaffective disorder',
          severity: 'critical',
          searchTerms: ['schizophrenia', 'psychosis', 'hallucinations', 'delusions', 'schizoaffective'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Can trigger severe, prolonged psychotic episodes'
        },
        { 
          id: 'bipolar', 
          name: 'Bipolar Disorder',
          shortDesc: 'Bipolar I or II, cyclothymia',
          severity: 'high',
          searchTerms: ['bipolar', 'manic', 'mania', 'mood disorder', 'cyclothymia'],
          contraindications: 3,
          substancesAffected: 4,
          criticalInteraction: 'Risk of triggering manic/hypomanic episodes'
        },
        { 
          id: 'personality', 
          name: 'Personality Disorders',
          shortDesc: 'Borderline, antisocial, narcissistic, etc.',
          severity: 'moderate',
          searchTerms: ['bpd', 'borderline', 'personality disorder', 'antisocial', 'narcissistic'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: '4x higher risk of adverse psychological responses'
        },
        { 
          id: 'ptsd', 
          name: 'PTSD / Trauma History',
          shortDesc: 'Post-traumatic stress disorder, unprocessed trauma',
          severity: 'moderate',
          searchTerms: ['ptsd', 'trauma', 'abuse', 'assault', 'complex ptsd', 'cptsd'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: '37.5% experience trauma reactivation - requires specialized support'
        },
        { 
          id: 'depression', 
          name: 'Major Depression',
          shortDesc: 'Clinical depression, treatment-resistant depression',
          severity: 'moderate',
          searchTerms: ['depression', 'depressed', 'mdd', 'major depressive', 'trd'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: 'May worsen symptoms without proper therapeutic context'
        },
        { 
          id: 'anxiety', 
          name: 'Anxiety Disorders',
          shortDesc: 'Generalized anxiety, panic disorder, social anxiety',
          severity: 'moderate',
          searchTerms: ['anxiety', 'panic', 'gad', 'social anxiety', 'panic attacks', 'panic disorder'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: '87% of negative responses involve anxiety worsening'
        },
        {
          id: 'ocd',
          name: 'OCD',
          shortDesc: 'Obsessive-compulsive disorder',
          severity: 'moderate',
          searchTerms: ['ocd', 'obsessive', 'compulsive', 'intrusive thoughts'],
          contraindications: 0,
          substancesAffected: 4,
          criticalInteraction: 'Can intensify obsessive patterns during experience'
        },
        {
          id: 'schizoaffective',
          name: 'Schizoaffective Disorder',
          shortDesc: 'Combination of schizophrenia and mood disorder',
          severity: 'critical',
          searchTerms: ['schizoaffective', 'psychosis', 'mood', 'schizo'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'ABSOLUTE contraindication - can trigger severe psychotic episodes'
        },
        {
          id: 'psychotic_depression',
          name: 'Psychotic Depression',
          shortDesc: 'Major depression with psychotic features',
          severity: 'critical',
          searchTerms: ['psychotic depression', 'depression with psychosis', 'delusional depression'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Higher risk than depression alone - can worsen psychotic symptoms'
        },
        {
          id: 'active_mania',
          name: 'Active Mania / Manic Episode',
          shortDesc: 'Currently experiencing manic symptoms',
          severity: 'critical',
          searchTerms: ['mania', 'manic episode', 'active mania', 'manic'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'ABSOLUTE contraindication when actively manic - can severely worsen episode'
        },
        {
          id: 'paranoid_personality',
          name: 'Paranoid Personality Traits',
          shortDesc: 'Persistent suspiciousness and distrust',
          severity: 'moderate',
          searchTerms: ['paranoid', 'paranoia', 'suspicious', 'distrust'],
          contraindications: 0,
          substancesAffected: 4,
          criticalInteraction: 'Can intensify paranoid thinking during experience'
        },
        {
          id: 'suicidality',
          name: 'Active Suicidal Ideation',
          shortDesc: 'Current thoughts of self-harm or suicide',
          severity: 'critical',
          searchTerms: ['suicidal', 'suicide', 'self-harm', 'suicidality'],
          contraindications: 3,
          substancesAffected: 5,
          criticalInteraction: 'ABSOLUTE contraindication - 20.6% of ER seekers had suicidal ideation'
        }
      ]
    },
    {
      category: 'Medications',
      icon: '💊',
      conditions: [
        { 
          id: 'maoi', 
          name: 'Taking MAOIs',
          shortDesc: 'Monoamine oxidase inhibitors',
          severity: 'critical',
          searchTerms: ['maoi', 'nardil', 'parnate', 'marplan', 'phenelzine', 'tranylcypromine'],
          contraindications: 4,
          substancesAffected: 4,
          criticalInteraction: 'Potentially fatal serotonin syndrome'
        },
        { 
          id: 'ssri', 
          name: 'Taking SSRIs',
          shortDesc: 'Selective serotonin reuptake inhibitors',
          severity: 'high',
          searchTerms: ['ssri', 'prozac', 'zoloft', 'lexapro', 'paxil', 'celexa', 'antidepressants', 'fluoxetine', 'sertraline'],
          contraindications: 2,
          substancesAffected: 5,
          criticalInteraction: 'Serotonin syndrome risk, may reduce psychedelic effects'
        },
        { 
          id: 'lithium', 
          name: 'Taking Lithium',
          shortDesc: 'Mood stabilizer medication',
          severity: 'high',
          searchTerms: ['lithium', 'mood stabilizer'],
          contraindications: 3,
          substancesAffected: 4,
          criticalInteraction: 'Can cause severe seizures when combined'
        },
        {
          id: 'antipsychotics',
          name: 'Taking Antipsychotics',
          shortDesc: 'Medications for psychosis',
          severity: 'moderate',
          searchTerms: ['antipsychotic', 'risperdal', 'zyprexa', 'seroquel', 'abilify', 'haldol', 'risperidone', 'olanzapine', 'quetiapine'],
          contraindications: 1,
          substancesAffected: 5,
          criticalInteraction: 'May block psychedelic effects or cause adverse reactions'
        },
        {
          id: 'serotonin_syndrome_risk',
          name: 'Serotonin Syndrome Risk',
          shortDesc: 'Dangerous serotonin level elevation from drug combinations',
          severity: 'critical',
          searchTerms: ['serotonin syndrome', 'drug interaction', 'maoi', 'ssri'],
          contraindications: 4,
          substancesAffected: 4,
          criticalInteraction: 'LIFE-THREATENING - fever, seizures, death from MAOIs + serotonergic drugs'
        },
        {
          id: 'antiretrovirals',
          name: 'Taking Antiretroviral Medications',
          shortDesc: 'HIV medications, especially ritonavir',
          severity: 'high',
          searchTerms: ['antiretroviral', 'hiv', 'ritonavir', 'arv'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'Drug metabolism interactions can cause MDMA overdose'
        }
      ]
    },
    {
      category: 'Neurological',
      icon: '⚡',
      conditions: [
        { 
          id: 'epilepsy', 
          name: 'Epilepsy / Seizure Disorder',
          shortDesc: 'History of seizures',
          severity: 'high',
          searchTerms: ['epilepsy', 'seizures', 'convulsions', 'seizure disorder'],
          contraindications: 3,
          substancesAffected: 5,
          criticalInteraction: 'May lower seizure threshold'
        },
        { 
          id: 'tbi', 
          name: 'Traumatic Brain Injury',
          shortDesc: 'History of significant head trauma',
          severity: 'moderate',
          searchTerms: ['tbi', 'brain injury', 'concussion', 'head trauma', 'head injury'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: 'Increased vulnerability to adverse neurological effects'
        }
      ]
    },
    {
      category: 'Urological',
      icon: '🚽',
      conditions: [
        {
          id: 'ketamine_uropathy',
          name: 'Ketamine-Associated Uropathy',
          shortDesc: 'Bladder damage from chronic ketamine use',
          severity: 'critical',
          searchTerms: ['ketamine bladder', 'k-bladder', 'uropathy', 'bladder damage'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: '25% of regular ketamine users - history contraindicates more ketamine'
        },
        {
          id: 'ulcerative_cystitis',
          name: 'Ulcerative Cystitis',
          shortDesc: 'Bladder wall inflammation and ulcers',
          severity: 'critical',
          searchTerms: ['cystitis', 'bladder inflammation', 'ulcerative'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'From chronic ketamine - further use worsens condition'
        },
        {
          id: 'haemorrhagic_cystitis',
          name: 'Haemorrhagic Cystitis',
          shortDesc: 'Bleeding bladder inflammation',
          severity: 'critical',
          searchTerms: ['hemorrhagic', 'haemorrhagic', 'bleeding bladder', 'blood in urine'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'Severe ketamine bladder complication - STOP ketamine immediately'
        },
        {
          id: 'contracted_bladder',
          name: 'Contracted Bladder',
          shortDesc: 'Shrunken bladder with reduced capacity',
          severity: 'high',
          searchTerms: ['contracted bladder', 'small bladder', 'bladder capacity'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'End-stage ketamine bladder damage - permanent harm'
        },
        {
          id: 'hydronephrosis',
          name: 'Hydronephrosis',
          shortDesc: 'Kidney swelling from urine backup',
          severity: 'critical',
          searchTerms: ['hydronephrosis', 'kidney swelling', 'urine backup'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'Secondary to ketamine bladder - can cause kidney failure'
        },
        {
          id: 'ureteral_stenosis',
          name: 'Ureteral Stenosis',
          shortDesc: 'Narrowing of ureters from ketamine',
          severity: 'high',
          searchTerms: ['ureteral', 'stenosis', 'ureter narrowing'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'Chronic ketamine damage - blocks urine flow'
        }
      ]
    },
    {
      category: 'Other Medical',
      icon: '🏥',
      conditions: [
        { 
          id: 'liver', 
          name: 'Liver Disease',
          shortDesc: 'Hepatitis, cirrhosis, liver impairment',
          severity: 'high',
          searchTerms: ['liver', 'hepatitis', 'cirrhosis', 'liver disease', 'hepatic'],
          contraindications: 2,
          substancesAffected: 4,
          criticalInteraction: 'Impaired drug metabolism increases toxicity risk'
        },
        { 
          id: 'kidney', 
          name: 'Kidney Disease',
          shortDesc: 'Chronic kidney disease, renal impairment',
          severity: 'high',
          searchTerms: ['kidney', 'renal', 'kidney disease', 'ckd', 'dialysis'],
          contraindications: 2,
          substancesAffected: 4,
          criticalInteraction: 'Impaired drug elimination increases toxicity risk'
        },
        { 
          id: 'diabetes', 
          name: 'Diabetes',
          shortDesc: 'Type 1 or Type 2 diabetes',
          severity: 'moderate',
          searchTerms: ['diabetes', 'diabetic', 'blood sugar', 'type 1', 'type 2', 't1d', 't2d'],
          contraindications: 0,
          substancesAffected: 3,
          criticalInteraction: 'May affect blood sugar control'
        },
        {
          id: 'pregnancy',
          name: 'Pregnancy',
          shortDesc: 'Currently pregnant',
          severity: 'critical',
          searchTerms: ['pregnancy', 'pregnant', 'fetal', 'expecting'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'ABSOLUTE contraindication - unknown fetal effects'
        },
        {
          id: 'breastfeeding',
          name: 'Breastfeeding / Lactation',
          shortDesc: 'Currently nursing an infant',
          severity: 'critical',
          searchTerms: ['breastfeeding', 'nursing', 'lactating', 'lactation'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'ABSOLUTE contraindication - drugs pass into breast milk'
        }
      ]
    },
    {
      category: 'Demographics',
      icon: '👥',
      conditions: [
        { 
          id: 'age_young', 
          name: 'Under 25 Years Old',
          shortDesc: 'Brain still developing',
          severity: 'moderate',
          searchTerms: ['young', 'under 25', 'youth', 'age', 'teenager'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: '53% of negative effects occur in those under 25'
        },
        { 
          id: 'age_adolescent', 
          name: 'Adolescent (13-19)',
          shortDesc: 'Teenager',
          severity: 'high',
          searchTerms: ['adolescent', 'teenager', 'teen', 'youth', 'minor'],
          contraindications: 1,
          substancesAffected: 5,
          criticalInteraction: 'Majority of poison control cases - high vulnerability'
        },
        {
          id: 'family_psychosis',
          name: 'Family History of Psychosis',
          shortDesc: 'Close relatives with schizophrenia',
          severity: 'moderate',
          searchTerms: ['family history psychosis', 'genetic', 'hereditary', 'relatives', 'schizophrenia family'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: 'Elevated genetic risk of psychotic reactions'
        },
        {
          id: 'family_bipolar',
          name: 'Family History of Bipolar',
          shortDesc: 'Close relatives with bipolar disorder',
          severity: 'moderate',
          searchTerms: ['family history bipolar', 'genetic', 'hereditary', 'relatives', 'bipolar family'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: 'Elevated genetic risk of mania induction'
        },
        {
          id: 'substance_use_disorder',
          name: 'History of Substance Use Disorder',
          shortDesc: 'Past or current addiction/dependence',
          severity: 'moderate',
          searchTerms: ['addiction', 'substance abuse', 'alcoholism', 'dependence', 'sud'],
          contraindications: 1,
          substancesAffected: 2,
          criticalInteraction: 'Ketamine has 8.55% addiction rate - high risk for those with SUD history'
        },
        {
          id: 'hppd_history',
          name: 'History of HPPD',
          shortDesc: 'Previous hallucinogen persisting perception disorder',
          severity: 'moderate',
          searchTerms: ['hppd', 'visual snow', 'persistent visuals', 'flashbacks'],
          contraindications: 0,
          substancesAffected: 5,
          criticalInteraction: 'Relative contraindication - may worsen persistent visual disturbances'
        }
      ]
    },
    {
      category: 'Other Medical',
      icon: '🏥',
      conditions: [
        {
          id: 'glaucoma',
          name: 'Glaucoma',
          shortDesc: 'Elevated intraocular pressure',
          severity: 'moderate',
          searchTerms: ['glaucoma', 'eye pressure', 'intraocular pressure', 'iop'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'Ketamine increases intraocular pressure'
        },
        {
          id: 'dementia',
          name: 'Dementia or Delirium',
          shortDesc: 'Cognitive impairment or acute confusion',
          severity: 'high',
          searchTerms: ['dementia', 'alzheimers', 'delirium', 'cognitive impairment', 'confusion'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Cannot provide informed consent, severe confusion risk'
        },
        {
          id: 'malnourishment',
          name: 'Malnourishment',
          shortDesc: 'Severe nutritional deficiency',
          severity: 'moderate',
          searchTerms: ['malnutrition', 'underweight', 'nutritional deficiency', 'emaciated'],
          contraindications: 2,
          substancesAffected: 5,
          criticalInteraction: 'Electrolyte imbalances and reduced physiological reserves'
        },
        {
          id: 'organic_brain_disorder',
          name: 'Organic-Toxic Cerebral Disorder',
          shortDesc: 'Structural or metabolic brain dysfunction',
          severity: 'critical',
          searchTerms: ['organic brain syndrome', 'toxic encephalopathy', 'brain disorder', 'cerebral disorder'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Absolute contraindication - unpredictable and dangerous reactions'
        },
        {
          id: 'low_bmi',
          name: 'Low BMI (Underweight)',
          shortDesc: 'Body mass index below healthy range',
          severity: 'moderate',
          searchTerms: ['low bmi', 'underweight', 'low body weight', 'thin'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'MDMA: Increased hyponatremia risk, especially in females'
        },
        {
          id: 'cyp2d6_poor',
          name: 'CYP2D6 Poor Metabolizer',
          shortDesc: 'Genetic variation affecting drug metabolism',
          severity: 'moderate',
          searchTerms: ['cyp2d6', 'poor metabolizer', 'genetic', 'metabolism'],
          contraindications: 1,
          substancesAffected: 1,
          criticalInteraction: 'MDMA reaches toxic levels - requires dose adjustment or avoidance'
        },
        {
          id: 'older_adult',
          name: 'Older Adults (Over 65)',
          shortDesc: 'Age-related vulnerabilities',
          severity: 'moderate',
          searchTerms: ['elderly', 'senior', 'older adult', 'over 65', 'geriatric'],
          contraindications: 2,
          substancesAffected: 5,
          criticalInteraction: 'Multiple medications, cardiovascular risks, limited research'
        }
      ]
    },
    {
      category: 'Drug Interactions',
      icon: '💊',
      conditions: [
        {
          id: 'snri',
          name: 'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
          shortDesc: 'Antidepressants affecting serotonin and norepinephrine',
          severity: 'high',
          searchTerms: ['snri', 'effexor', 'cymbalta', 'venlafaxine', 'duloxetine', 'pristiq'],
          contraindications: 3,
          substancesAffected: 4,
          criticalInteraction: 'Serotonin syndrome risk, severe hypertension possible'
        },
        {
          id: 'triptans',
          name: 'Triptans (Migraine Medications)',
          shortDesc: 'Serotonin agonists for migraines',
          severity: 'high',
          searchTerms: ['triptan', 'sumatriptan', 'rizatriptan', 'imitrex', 'migraine medication'],
          contraindications: 3,
          substancesAffected: 4,
          criticalInteraction: 'Serotonin syndrome and severe vasoconstriction risk'
        },
        {
          id: 'stimulants',
          name: 'Stimulants (Cocaine, Methamphetamine)',
          shortDesc: 'Concurrent use of stimulant drugs',
          severity: 'critical',
          searchTerms: ['cocaine', 'meth', 'methamphetamine', 'stimulants', 'amphetamine', 'coke'],
          contraindications: 5,
          substancesAffected: 5,
          criticalInteraction: 'Severe cardiovascular stress, hyperthermia, neurotoxicity, death risk'
        },
        {
          id: 'opioids',
          name: 'Opioids',
          shortDesc: 'Concurrent opioid use',
          severity: 'critical',
          searchTerms: ['opioids', 'heroin', 'fentanyl', 'methadone', 'oxycodone', 'hydrocodone'],
          contraindications: 5,
          substancesAffected: 1,
          criticalInteraction: 'ABSOLUTE with ibogaine - fatal interaction, especially methadone'
        },
        {
          id: 'qt_prolonging_meds',
          name: 'QT-Prolonging Medications',
          shortDesc: 'Drugs that affect cardiac repolarization',
          severity: 'critical',
          searchTerms: ['qt prolongation', 'arrhythmia meds', 'cardiac meds', 'heart rhythm drugs'],
          contraindications: 5,
          substancesAffected: 1,
          criticalInteraction: 'ABSOLUTE with ibogaine - fatal arrhythmia risk'
        }
      ]
    },
    {
      category: 'Environmental/Contextual',
      icon: '🌡️',
      conditions: [
        {
          id: 'high_temperature',
          name: 'High Temperature Environments',
          shortDesc: 'Hot settings like clubs, festivals',
          severity: 'critical',
          searchTerms: ['hot environment', 'club', 'festival', 'heat', 'high temperature', 'dancing'],
          contraindications: 5,
          substancesAffected: 1,
          criticalInteraction: 'MDMA in heat: Severe hyperthermia, organ failure, death'
        },
        {
          id: 'tyramine_foods',
          name: 'Tyramine-Rich Foods (with MAOIs)',
          shortDesc: 'Aged cheese, cured meats while on MAOIs',
          severity: 'critical',
          searchTerms: ['tyramine', 'aged cheese', 'cured meat', 'fermented', 'maoi diet', 'ayahuasca diet'],
          contraindications: 5,
          substancesAffected: 1,
          criticalInteraction: 'Hypertensive crisis with ayahuasca/MAOIs - stroke risk'
        }
      ]
    }
  ];

  const conditionDetails = {
    hypertension: {
      name: 'Uncontrolled Hypertension',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Psilocybin', 'LSD', 'MDMA', 'Ketamine'],
      keyActions: [
        'Blood pressure must be controlled (<140/90) before any consideration',
        'Medical supervision mandatory if proceeding',
        'Continuous vital sign monitoring required',
        'Have emergency protocols in place'
      ],
      description: 'High blood pressure that is not adequately controlled by medication or lifestyle interventions. Systolic BP typically >140mmHg or diastolic >90mmHg.',
      whyItMatters: 'Psychedelics cause sympathomimetic cardiovascular effects that increase blood pressure and heart rate. In those with uncontrolled hypertension, this can push BP to dangerous levels (>160/100 mmHg), increasing stroke and cardiac event risk.',
      prevalenceData: '7% of psilocybin administrations resulted in tachycardia. Older patients particularly at risk for severe BP elevation.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Can push systolic >160mmHg and diastolic >100mmHg. Medical emergency risk.',
          citations: ['anderson_2020', 'bender_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'Similar cardiovascular effects to psilocybin. Longer duration increases risk window.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Strongest cardiovascular effects of common psychedelics. Significant BP and HR increases.',
          citations: ['papaseit_2018']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'Reliably increases BP. Particularly dangerous with uncontrolled hypertension.',
          citations: ['li_2016']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'MAOI component plus psychedelic effects create cardiovascular strain.',
          citations: ['dos_santos_2016']
        }
      ],
      harmReduction: [
        { name: 'Comprehensive Medical Screening with ECG', link: 'hrp_screening_comprehensive_001' },
        { name: 'BP must be controlled before any consideration', link: null },
        { name: 'Medical supervision mandatory if proceeding', link: 'hrp_continuous_monitoring_001' },
        { name: 'Continuous vital sign monitoring throughout', link: null }
      ],
      clinicalGuidance: 'This is considered an absolute contraindication in most contexts. Blood pressure must be well-controlled (consistently <140/90) before any psychedelic use could be considered, and even then only with full medical supervision and monitoring.',
      citations: ['anderson_2020', 'wsol_2023', 'marazziti_2024']
    },
    ptsd: {
      name: 'PTSD / Trauma History',
      overallSeverity: 'moderate_to_high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Ayahuasca (37.5% reactivation)', 'Any without trauma-informed support'],
      keyActions: [
        'Work with trauma-specialized therapist',
        'Develop safety plan for reactivation',
        'Learn grounding techniques before session',
        'Ensure trauma-focused integration therapy available'
      ],
      description: 'Post-traumatic stress disorder or significant unprocessed trauma from past experiences including abuse, assault, violence, accidents, or other traumatic events.',
      whyItMatters: 'Psychedelics can bring traumatic memories and emotions to consciousness, leading to reexperiencing. This can be therapeutically valuable with proper support or retraumatizing without it. The line between healing and harm depends entirely on the quality of support.',
      prevalenceData: 'In a 2023 Scientific Reports study of ayahuasca retreat participants, people with a self-reported lifetime PTSD diagnosis had "more than 60%" prevalence of re-experiencing adverse life events during ceremony (vs. lower rates in those without PTSD)',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative (Requires Specialized Support)',
          details: 'Can facilitate trauma processing but requires trauma-informed preparation and integration. Active research for PTSD treatment.',
          citations: ['davis_2021', 'mitchell_2021']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Therapeutic Potential with Proper Protocol',
          details: 'FDA Breakthrough Therapy for PTSD. Strongest evidence base for trauma treatment, but requires specific therapeutic protocol.',
          citations: ['mitchell_2021', 'mithoefer_2018']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative (Limited Evidence)',
          details: 'Can trigger trauma reexperiencing. Less research than MDMA/psilocybin for trauma.',
          citations: []
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Relative (High Reactivation Rate)',
          details: '37.5% experienced trauma reexperiencing in ceremonies. Requires specialized trauma-informed facilitation.',
          citations: ['weiss_2023', 'bouso_2022']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative (Dissociative Approach)',
          details: 'Different mechanism - may allow processing without full reexperiencing. Used clinically for PTSD.',
          citations: ['feder_2014']
        }
      ],
      harmReduction: [
        { name: 'Trauma-informed screening and preparation', link: 'hrp_screening_comprehensive_001' },
        { name: 'Work with trauma-specialized therapist', link: null },
        { name: 'Safety planning for reactivation', link: null },
        { name: 'Grounding techniques training', link: 'hrp_coping_skills_training_001' },
        { name: 'Trauma-focused integration therapy', link: 'hrp_integration_therapy_001' }
      ],
      clinicalGuidance: 'A history of trauma is not a contraindication for psychedelic use but requires specialized, trauma-informed support. MDMA-assisted therapy has the strongest evidence for PTSD. Without proper trauma-informed care, reactivation can be harmful. With appropriate preparation and integration, psychedelic experiences can be therapeutically valuable for individuals who have experienced trauma.',
      citations: ['weiss_2023', 'mitchell_2021', 'gorman_2021']
    },
    psychosis: {
      name: 'Psychotic Disorders',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All substances - no safe options'],
      keyActions: [
        'Absolute avoidance if personal history present',
        'Comprehensive psychiatric screening essential',
        'Family history requires careful evaluation',
        'Consider alternative treatments'
      ],
      description: 'Personal history of schizophrenia, schizoaffective disorder, or other psychotic disorders characterized by hallucinations, delusions, and disorganized thinking.',
      whyItMatters: 'Psychedelics can intensify psychotic symptoms and trigger prolonged psychotic episodes. Individuals with a history of psychotic disorders, even when stable, possess vulnerable neurotransmitter systems that psychedelics may destabilize',
      prevalenceData: 'Prolonged psychotic reactions documented in literature. Virtually absent in properly screened clinical trials. Historical rate: 1.8 per 1,000 patients.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Can trigger severe psychotic episodes. Standard exclusion criterion in clinical trials.',
          citations: ['johnson_2008', 'breeksema_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'Can induce prolonged psychosis. Higher risk than psilocybin due to longer duration.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Can worsen psychotic symptoms and trigger episodes.',
          citations: ['parrott_2014']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'Dissociative effects can worsen psychotic symptoms and thought disorder.',
          citations: ['morgan_2012']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Powerful psychedelic effects pose severe risk for those with psychotic vulnerability.',
          citations: ['dos_santos_2016']
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
        { name: 'Absolute avoidance if personal history present', link: null },
        { name: 'Family history requires careful assessment', link: null }
      ],
      clinicalGuidance: 'Personal history of psychotic disorders is an absolute contraindication. The risk of triggering severe, prolonged psychotic episodes outweighs any potential benefits. Family history is a relative contraindication requiring thorough evaluation.',
      citations: ['honk_2024', 'henningfield_2023', 'johnson_2008']
    },
    long_qt: {
      name: 'Long QT Syndrome',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Ibogaine - FATAL risk of Torsades de Pointes'],
      keyActions: [
        'ECG screening mandatory before any psychedelic use',
        'ABSOLUTE avoidance of ibogaine',
        'Check family history of sudden cardiac death',
        'Avoid all QT-prolonging substances'
      ],
      description: 'Genetic or acquired heart rhythm disorder characterized by prolonged QT interval on ECG (>450ms in men, >460ms in women). Can cause sudden ventricular arrhythmias (Torsades de Pointes) leading to sudden cardiac death.',
      whyItMatters: 'Ibogaine significantly prolongs QT interval. In people with Long QT Syndrome, ibogaine can trigger Torsades de Pointes, a life-threatening arrhythmia that causes sudden death. Multiple fatalities documented.',
      prevalenceData: 'Long QT affects 1 in 2,000 people. Accounts for significant portion of ibogaine-related deaths. Often undiagnosed until cardiac event occurs.',
      substanceInteractions: [
        {
          substance: 'Ibogaine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - FATAL RISK',
          details: 'Ibogaine prolongs QT interval by average 33ms. In Long QT patients, this triggers Torsades de Pointes arrhythmia causing sudden death. Multiple documented fatalities.',
          citations: ['koenig_2014', 'alper_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Relative Contraindication',
          details: 'Can cause arrhythmias via sympathomimetic effects. Increased risk with Long QT but not as severe as ibogaine.',
          citations: ['montoya_2002']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Moderate Risk',
          details: 'Generally does not prolong QT, but cardiovascular activation increases arrhythmia risk in vulnerable patients.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Moderate Risk',
          details: 'Similar to psilocybin - no direct QT prolongation but sympathetic activation poses risk.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Moderate Risk',
          details: 'Can cause arrhythmias through cardiovascular effects. Less dangerous than ibogaine but caution warranted.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'ECG screening before any psychedelic use', link: 'hrp_screening_comprehensive_001' },
        { name: 'NEVER use ibogaine with Long QT', link: null },
        { name: 'Cardiology consultation for risk assessment', link: null },
        { name: 'Continuous cardiac monitoring if proceeding', link: 'hrp_continuous_monitoring_001' },
        { name: 'Screen family history of sudden cardiac death', link: null }
      ],
      clinicalGuidance: 'Long QT Syndrome is an ABSOLUTE contraindication for ibogaine - multiple fatalities documented. For other psychedelics, requires comprehensive cardiac evaluation, ECG screening, and continuous monitoring. Any family history of sudden cardiac death warrants ECG screening before psychedelic use.',
      citations: ['koenig_2014', 'alper_2016', 'mash_2018']
    },
    ketamine_uropathy: {
      name: 'Ketamine-Associated Uropathy (K-Bladder)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Any further ketamine use'],
      keyActions: [
        'Complete cessation of ketamine use',
        'Urological evaluation and monitoring',
        'Avoid all ketamine exposure',
        'Consider alternative treatments'
      ],
      description: 'Bladder and urinary tract damage caused by chronic ketamine use. Characterized by painful urination, frequency, urgency, and in severe cases bladder ulceration and reduced capacity. Affects up to 25% of regular ketamine users.',
      whyItMatters: 'Ketamine metabolites accumulate in urine and cause direct toxic damage to bladder lining. Continued use leads to progressive deterioration: ulcerative cystitis → hemorrhagic cystitis → contracted bladder → hydronephrosis → kidney failure. This damage can be irreversible and life-altering.',
      prevalenceData: '20-25% of people who use ketamine regularly. Higher risk with daily use and doses >3g/week. Can occur after just 6 months of regular use. Some cases require bladder removal.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Any history of ketamine uropathy is absolute contraindication to further ketamine use. Continued exposure causes progressive irreversible damage to bladder and kidneys.',
          citations: ['mason_2010', 'shahani_2007']
        }
      ],
      harmReduction: [
        { name: 'Complete ketamine cessation', link: null },
        { name: 'Urological assessment and monitoring', link: null },
        { name: 'Monitor kidney function (creatinine, GFR)', link: null },
        { name: 'Pain management for bladder symptoms', link: null },
        { name: 'Explore alternative treatments (psilocybin, MDMA)', link: null }
      ],
      clinicalGuidance: 'Any history of ketamine-associated urological symptoms is an absolute contraindication to further ketamine use. Damage can progress even after cessation. Requires urological evaluation and monitoring. Alternative psychedelics (psilocybin, MDMA) do not cause bladder toxicity and may be considered.',
      citations: ['mason_2010', 'shahani_2007', 'middela_2010']
    },
    herg_mutation: {
      name: 'hERG Gene Mutations',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Ibogaine - genetic cardiac vulnerability'],
      keyActions: [
        'Genetic screening if family history of sudden cardiac death',
        'ABSOLUTE avoidance of ibogaine',
        'ECG screening mandatory',
        'Cardiology consultation before any psychedelic use'
      ],
      description: 'Mutations in the hERG (KCNH2) gene that encodes cardiac potassium channels. These genetic variants increase vulnerability to drug-induced Long QT syndrome and sudden cardiac arrhythmias.',
      whyItMatters: 'hERG mutations make the heart extremely vulnerable to drugs that affect cardiac repolarization. Ibogaine is a potent hERG channel blocker. In people with hERG mutations, ibogaine can trigger fatal arrhythmias even at therapeutic doses. This is a GENETIC contraindication.',
      prevalenceData: 'hERG mutations account for 30-40% of congenital Long QT syndrome cases. Often undiagnosed until adverse drug reaction or sudden cardiac death. Family history of unexplained sudden death under age 40 is red flag.',
      substanceInteractions: [
        {
          substance: 'Ibogaine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - GENETIC VULNERABILITY',
          details: 'Ibogaine blocks hERG potassium channels. In people with hERG mutations, this causes severe QT prolongation and Torsades de Pointes arrhythmia. FATAL risk - multiple deaths documented.',
          citations: ['koenig_2014', 'alper_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Caution Required',
          details: 'Can cause arrhythmias in those with cardiac ion channel abnormalities. Requires cardiac screening.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Moderate Risk',
          details: 'No direct hERG interaction but cardiovascular activation requires cardiac clearance.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Moderate Risk',
          details: 'Similar to psilocybin - requires cardiac evaluation for those with hERG mutations.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Genetic screening if family history present', link: null },
        { name: 'NEVER use ibogaine with hERG mutations', link: null },
        { name: 'ECG screening before any psychedelic', link: 'hrp_screening_comprehensive_001' },
        { name: 'Cardiology consultation and risk stratification', link: null },
        { name: 'Avoid all QT-prolonging medications', link: null }
      ],
      clinicalGuidance: 'hERG mutations are an ABSOLUTE contraindication for ibogaine. For other psychedelics, requires comprehensive cardiac genetics evaluation, ECG screening, and cardiology clearance. Screen family history: sudden unexplained deaths under 40, drownings in strong swimmers, seizure-like episodes are warning signs.',
      citations: ['koenig_2014', 'alper_2016', 'roden_2004']
    },
    serotonin_syndrome_risk: {
      name: 'Serotonin Syndrome Risk / MAOI Use',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['MDMA + MAOI = FATAL', 'Any serotonergic drug + MAOI'],
      keyActions: [
        'NEVER combine MDMA with MAOIs',
        '14-day washout period required after stopping MAOIs',
        'Check all medications for serotonergic effects',
        'Know signs of serotonin syndrome: agitation, fever, tremor'
      ],
      description: 'Risk of serotonin syndrome when combining serotonergic psychedelics (especially MDMA) with MAOIs or other serotonergic medications. Serotonin syndrome is a life-threatening condition causing hyperthermia, seizures, and potentially death.',
      whyItMatters: 'MDMA causes massive serotonin release. MAOIs prevent serotonin breakdown. Combined, this creates toxic serotonin levels causing serotonin syndrome - a medical emergency with high mortality. Multiple deaths documented. Even "natural" MAOIs like Syrian rue are dangerous.',
      prevalenceData: 'MDMA + MAOI combination has caused multiple fatalities. Serotonin syndrome mortality rate: 2-12%. Risk extends to SSRIs, but MAOI combination is most dangerous.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'ABSOLUTE CONTRAINDICATION WITH MAOIs - FATAL',
          details: 'MDMA + MAOI is potentially FATAL. Causes severe serotonin syndrome with hyperthermia (>106°F), seizures, multi-organ failure. Multiple documented deaths. 14-day washout required.',
          citations: ['vuori_2003', 'kolbrich_2008']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Contains MAOIs - Interaction Risk',
          details: 'Ayahuasca contains harmine/harmaline (MAOIs). Do NOT combine with MDMA or serotonergic medications. 14-day buffer required.',
          citations: ['callaway_1999']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Moderate Risk with MAOIs',
          details: 'Psilocybin with MAOIs can intensify effects and prolong duration. Less dangerous than MDMA but caution required.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Low-Moderate Risk',
          details: 'LSD primarily acts on 5-HT2A receptors. Less serotonin release than MDMA but interactions possible.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'NEVER combine MDMA with MAOIs', link: null },
        { name: '14-day washout from MAOIs before MDMA', link: null },
        { name: 'Check all medications for serotonergic effects', link: null },
        { name: 'Know serotonin syndrome symptoms', link: null },
        { name: 'Emergency cooling and benzodiazepines for treatment', link: null }
      ],
      clinicalGuidance: 'MDMA combined with MAOIs (pharmaceutical or natural like Syrian rue) is an ABSOLUTE contraindication - multiple fatalities. Requires 14-day washout period after stopping MAOIs. SSRIs reduce MDMA effects but pose lower serotonin syndrome risk than MAOIs. Check all medications for serotonergic properties before any psychedelic use.',
      citations: ['vuori_2003', 'callaway_1999', 'gillman_2010']
    },
    schizoaffective: {
      name: 'Schizoaffective Disorder',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics - no safe options'],
      keyActions: [
        'Absolute avoidance recommended',
        'Risk of severe psychotic decompensation',
        'Can destabilize even well-controlled symptoms',
        'Consider alternative evidence-based treatments'
      ],
      description: 'Schizoaffective disorder combines symptoms of schizophrenia (hallucinations, delusions, disorganized thinking) with mood disorder symptoms (depression or mania). Requires ongoing psychiatric treatment and often medication management.',
      whyItMatters: 'Schizoaffective disorder indicates vulnerable psychotic neurobiology. Psychedelics can trigger severe psychotic decompensation, prolong episodes, and destabilize previously controlled symptoms. The combination of psychotic and mood vulnerabilities creates compounded risk.',
      prevalenceData: 'Schizoaffective disorder affects 0.3% of population. Psychotic reactions to psychedelics show highest rates in those with pre-existing psychotic spectrum disorders. Clinical trials uniformly exclude this population.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Can trigger severe psychotic episodes and destabilize mood symptoms. Standard exclusion in all clinical trials.',
          citations: ['johnson_2008', 'breeksema_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'High risk of prolonged psychotic reaction and mood destabilization. Longer duration increases risk.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Can worsen psychotic symptoms and trigger mania in susceptible individuals.',
          citations: ['parrott_2014']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'Ketamine can cause psychotomimetic effects and worsen thought disorder.',
          citations: ['morgan_2012']
        },
        {
          substance: 'DMT/Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Powerful psychedelic effects pose severe risk for psychotic decompensation.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
        { name: 'Absolute avoidance recommended', link: null },
        { name: 'Continue evidence-based psychiatric treatment', link: null },
        { name: 'Explore alternative treatments without psychotic risk', link: null }
      ],
      clinicalGuidance: 'Schizoaffective disorder is an absolute contraindication for all psychedelics. The risk of severe psychotic decompensation and mood destabilization outweighs any potential benefits. This is a standard exclusion criterion in all clinical trials. Alternative evidence-based treatments should be pursued.',
      citations: ['honk_2024', 'breeksema_2022', 'johnson_2008']
    },
    active_mania: {
      name: 'Active Mania / Manic Episode',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics - can severely worsen episode'],
      keyActions: [
        'ABSOLUTE avoidance during active mania',
        'Stabilize mood before any consideration',
        'Psychiatric treatment and mood stabilization priority',
        'Wait until euthymic (stable mood) for minimum 3-6 months'
      ],
      description: 'Currently experiencing a manic episode characterized by elevated or irritable mood, increased energy, decreased need for sleep, racing thoughts, impulsivity, grandiosity, and poor judgment. Different from stable bipolar disorder.',
      whyItMatters: 'Psychedelics can dramatically worsen active mania, intensifying grandiosity, poor judgment, and impulsivity to dangerous levels. The combination can lead to severe harm through reckless behavior, psychotic features, and complete loss of insight. Active mania impairs ability to make informed decisions about drug use.',
      prevalenceData: 'Psychedelics can induce mania in 1.1-4.3% of bipolar individuals. Risk dramatically higher during active episodes versus stable periods. Manic episodes in bipolar I last average 3-6 months untreated.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'ABSOLUTE CONTRAINDICATION DURING MANIA',
          details: 'Can intensify manic symptoms dramatically, worsen judgment and impulsivity, and precipitate psychotic features. Must be euthymic before any consideration.',
          citations: ['dos_santos_2021', 'johnson_2008']
        },
        {
          substance: 'LSD',
          riskLevel: 'ABSOLUTE CONTRAINDICATION DURING MANIA',
          details: 'Longer duration than psilocybin creates extended period of destabilization. Can trigger mixed episodes or psychosis.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'ABSOLUTE CONTRAINDICATION DURING MANIA',
          details: 'Stimulant properties can significantly worsen mania. Combination of serotonergic and dopaminergic effects dangerous.',
          citations: []
        },
        {
          substance: 'DMT/Ayahuasca',
          riskLevel: 'ABSOLUTE CONTRAINDICATION DURING MANIA',
          details: 'Powerful effects combined with manic state create severe risk of dangerous behavior.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION DURING MANIA',
          details: 'Dissociation combined with mania can lead to extremely dangerous behavior and loss of reality testing.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'ABSOLUTE avoidance during active mania', link: null },
        { name: 'Psychiatric treatment for mood stabilization', link: null },
        { name: 'Wait until euthymic for 3-6 months minimum', link: null },
        { name: 'Comprehensive screening before any future consideration', link: 'hrp_screening_comprehensive_001' },
        { name: 'Lower doses and careful monitoring if proceeding when stable', link: null }
      ],
      clinicalGuidance: 'Active mania is an ABSOLUTE contraindication. The impaired judgment inherent to mania means consent cannot be truly informed. Must achieve mood stabilization and maintain euthymic state for minimum 3-6 months before any psychedelic use could be considered. Even when stable, bipolar disorder remains a relative contraindication requiring careful evaluation.',
      citations: ['dos_santos_2021', 'johnson_2008', 'breeksema_2022']
    },
    haemorrhagic_cystitis: {
      name: 'Haemorrhagic Cystitis (Ketamine-Induced)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Any further ketamine use'],
      keyActions: [
        'Immediate cessation of all ketamine',
        'Urgent urological evaluation',
        'Monitor for kidney damage progression',
        'Blood in urine requires immediate medical attention'
      ],
      description: 'Severe bladder inflammation with bleeding caused by chronic ketamine use. Characterized by blood in urine (hematuria), severe pelvic pain, urinary frequency/urgency, and potentially life-threatening complications including bladder perforation and kidney failure.',
      whyItMatters: 'Haemorrhagic cystitis represents severe ketamine bladder toxicity. It indicates significant bladder wall damage with ulceration and bleeding. Can progress to contracted bladder (reduced capacity), hydronephrosis (kidney swelling), and renal failure. Some cases require surgical intervention including bladder augmentation or removal.',
      prevalenceData: 'Occurs in severe ketamine uropathy cases. More common with high-dose chronic use (>3g/week). Can develop after 1-2 years of regular ketamine use. Progressive condition that worsens with continued exposure.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Haemorrhagic cystitis indicates severe bladder damage. ANY further ketamine use will worsen damage, potentially causing bladder perforation, severe hemorrhage, or kidney failure requiring dialysis.',
          citations: ['mason_2010', 'shahani_2007']
        }
      ],
      harmReduction: [
        { name: 'Immediate and permanent ketamine cessation', link: null },
        { name: 'Urgent urological consultation and cystoscopy', link: null },
        { name: 'Monitor renal function (creatinine, GFR)', link: null },
        { name: 'Pain management and bladder symptom treatment', link: null },
        { name: 'Consider alternative psychedelics without bladder toxicity', link: null }
      ],
      clinicalGuidance: 'Haemorrhagic cystitis from ketamine is an ABSOLUTE contraindication to any further ketamine exposure. Requires urgent urological evaluation. May need cystoscopy, imaging for hydronephrosis, and renal function monitoring. Damage can be irreversible. Alternative psychedelics (psilocybin, MDMA, LSD) do not cause bladder toxicity.',
      citations: ['mason_2010', 'shahani_2007', 'middela_2010']
    },
    psychotic_depression: {
      name: 'Psychotic Depression',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All classical psychedelics'],
      keyActions: [
        'Absolute contraindication for classical psychedelics',
        'Requires antipsychotic + antidepressant treatment',
        'Ketamine may be exception under medical supervision',
        'Stabilize psychotic symptoms before any consideration'
      ],
      description: 'Major depressive disorder with psychotic features including delusions (often guilt, nihilism, or somatic themes) and sometimes hallucinations. More severe than non-psychotic depression with higher suicide risk and poorer outcomes.',
      whyItMatters: 'Psychotic depression indicates underlying psychotic vulnerability. Classical psychedelics (psilocybin, LSD) can worsen psychotic symptoms, intensify delusions, and potentially trigger prolonged psychotic episodes. The presence of psychotic features changes risk profile dramatically compared to non-psychotic depression.',
      prevalenceData: 'Psychotic features occur in 15-19% of major depression cases. More common in severe depression, older adults, and bipolar depression. Has higher suicide risk than non-psychotic depression.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Can intensify psychotic symptoms, worsen delusions, and trigger prolonged psychotic episodes. Standard exclusion in depression trials.',
          citations: ['johnson_2008', 'breeksema_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'High risk of worsening psychotic symptoms. Longer duration increases risk window.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Can worsen psychotic features. Excluded from PTSD trials if psychotic symptoms present.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Potential Exception - Medical Setting Only',
          details: 'Ketamine used clinically for treatment-resistant depression including some psychotic depression cases. Requires psychiatric supervision and may need concurrent antipsychotic.',
          citations: ['feder_2014', 'wilkinson_2018']
        },
        {
          substance: 'DMT/Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Powerful psychedelic effects pose severe risk for worsening psychotic symptoms.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric evaluation', link: 'hrp_screening_comprehensive_001' },
        { name: 'Treat psychotic symptoms first with antipsychotics', link: null },
        { name: 'AVOID classical psychedelics (psilocybin, LSD)', link: null },
        { name: 'Ketamine may be option under psychiatric care', link: null },
        { name: 'Continue evidence-based treatment', link: null }
      ],
      clinicalGuidance: 'Psychotic depression is an absolute contraindication for classical psychedelics (psilocybin, LSD, MDMA, ayahuasca). Ketamine is an exception - used clinically for treatment-resistant depression including some psychotic depression cases, but requires psychiatric supervision. Psychotic symptoms must be evaluated and treated before any psychedelic consideration.',
      citations: ['rothschild_2013', 'johnson_2008', 'wilkinson_2018']
    },
    family_psychosis: {
      name: 'Family History of Psychotic Disorders',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses or multiple first-degree relatives with psychosis'],
      keyActions: [
        'Comprehensive psychiatric screening',
        'Evaluate degree of relationship and number of affected relatives',
        'Start with lower doses if proceeding',
        'Ensure psychiatric support available'
      ],
      description: 'Family history of schizophrenia, schizoaffective disorder, or other psychotic disorders in first-degree relatives (parents, siblings, children) or multiple second-degree relatives. Indicates elevated genetic risk for psychotic vulnerability.',
      whyItMatters: 'Psychotic disorders have strong genetic component. First-degree relatives of people with schizophrenia have 10% lifetime risk (vs 1% general population). Psychedelics can unmask latent psychotic vulnerability. Family history is key screening criterion in clinical trials.',
      prevalenceData: 'Heritability of schizophrenia: 80%. First-degree relative increases risk 10-fold. Multiple affected relatives or early-onset psychosis in family indicates higher genetic load and greater risk.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative Contraindication - Requires Screening',
          details: 'Family history is standard exclusion in most trials. If proceeding, requires comprehensive screening, lower doses, and psychiatric support.',
          citations: ['johnson_2008', 'breeksema_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative Contraindication - Higher Risk',
          details: 'Longer duration than psilocybin. Family history increases risk of prolonged reactions.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative Contraindication',
          details: 'Can trigger psychotic symptoms in vulnerable individuals. Family history warrants caution.',
          citations: []
        },
        {
          substance: 'DMT/Ayahuasca',
          riskLevel: 'Relative Contraindication',
          details: 'Intense experiences may trigger psychotic symptoms in those with genetic vulnerability.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Moderate Risk',
          details: 'Dissociative effects different from classical psychedelics but can cause psychotomimetic symptoms.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
        { name: 'Evaluate family history thoroughly', link: null },
        { name: 'Start with lower doses (50-75% of standard)', link: null },
        { name: 'Ensure psychiatric support available', link: null },
        { name: 'Be alert for early psychotic symptoms', link: null }
      ],
      clinicalGuidance: 'Family history of psychosis is a relative contraindication, not absolute. Risk stratification depends on: (1) degree of relationship, (2) number of affected relatives, (3) age of onset in relatives, (4) type of disorder. One second-degree relative = lower risk. Multiple first-degree relatives or early-onset psychosis = higher risk approaching absolute contraindication. Most clinical trials exclude first-degree family history.',
      citations: ['honk_2024', 'breeksema_2022', 'johnson_2008']
    },
    breastfeeding: {
      name: 'Breastfeeding / Lactation',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics pass into breast milk'],
      keyActions: [
        'Absolute avoidance while breastfeeding',
        'Psychedelics pass into breast milk and affect infant',
        'Consider waiting until weaning complete',
        'If proceeding, requires extended pump-and-dump period'
      ],
      description: 'Currently breastfeeding an infant. Psychedelics are lipophilic and pass into breast milk, exposing nursing infants to active compounds with unknown effects on developing brains.',
      whyItMatters: 'All psychedelics pass into breast milk due to their lipophilic properties. Infant exposure through breast milk can affect brain development during critical periods. Effects on infant neurodevelopment are completely unknown. Infants cannot consent and are uniquely vulnerable.',
      prevalenceData: 'No studies on psychedelic concentrations in breast milk or effects on nursing infants. Animal studies show passage into milk and effects on offspring development. Risk to infant development unknown but potentially severe.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Passes into breast milk. Effects on infant brain development unknown but potentially significant.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'Long half-life means extended presence in breast milk. Unknown effects on infant.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Highly lipophilic, concentrated in breast milk. Stimulant and neurotoxic effects concerning for infant.',
          citations: ['steiner_2002']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'Passes into breast milk. NMDA receptor effects on developing brain potentially harmful.',
          citations: []
        },
        {
          substance: 'DMT/Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Both DMT and MAOI components pass into milk. Unknown effects on infant.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'AVOID all psychedelics while breastfeeding', link: null },
        { name: 'Wait until weaning complete', link: null },
        { name: 'If use occurs: pump-and-dump for 24-48 hours minimum', link: null },
        { name: 'Consider infant formula as alternative', link: null }
      ],
      clinicalGuidance: 'Breastfeeding is an absolute contraindication for all psychedelics. All compounds pass into breast milk and expose nursing infants to psychoactive substances during critical neurodevelopmental periods. Effects are unknown but potentially severe. If psychedelic use occurs, requires extended pump-and-dump period (24-48+ hours depending on substance) before nursing resumes.',
      citations: ['steiner_2002']
    },
    pregnancy: {
      name: 'Pregnancy',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics - fetal effects unknown'],
      keyActions: [
        'Absolute avoidance during pregnancy',
        'Effects on fetal development completely unknown',
        'Crosses placenta and reaches fetus',
        'Consider waiting until after pregnancy and breastfeeding'
      ],
      description: 'Currently pregnant. Psychedelics cross the placenta and expose the developing fetus to psychoactive compounds. Effects on fetal brain development, organ formation, and long-term outcomes are unknown.',
      whyItMatters: 'Fetal brain development is extraordinarily sensitive to chemical exposures. Serotonin plays critical roles in brain development. Psychedelics cross the placenta and can disrupt normal neurodevelopmental processes. No human studies exist. Animal studies show developmental effects. Risk of birth defects, neurodevelopmental disorders, or long-term effects unknown.',
      prevalenceData: 'Zero human studies on psychedelic use during pregnancy. Animal studies show effects on offspring development. Serotonergic system disruption during fetal development can cause lasting changes. Historical thalidomide tragedy demonstrates unknown fetal risks.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Crosses placenta. Serotonergic effects during fetal brain development pose unknown risk. No human safety data.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'Crosses placenta. Historical concerns about chromosomal damage debunked, but fetal effects remain unknown.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Animal studies show neurodevelopmental effects in offspring. Serotonergic and dopaminergic effects concerning.',
          citations: ['thompson_2009']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'NMDA receptor antagonism during fetal development may cause neuronal apoptosis. Used medically only when benefits outweigh risks.',
          citations: []
        },
        {
          substance: 'DMT/Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Both DMT and MAOI components cross placenta. Effects on fetal development unknown.',
          citations: []
        },
        {
          substance: 'Ibogaine',
          riskLevel: 'Absolute Contraindication',
          details: 'Cardiac effects and long duration make this especially dangerous during pregnancy.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'AVOID all psychedelics during pregnancy', link: null },
        { name: 'Pregnancy test before any psychedelic use (women of childbearing age)', link: null },
        { name: 'Wait until after pregnancy and breastfeeding', link: null },
        { name: 'If accidental exposure: consult maternal-fetal medicine specialist', link: null }
      ],
      clinicalGuidance: 'Pregnancy is an absolute contraindication for all psychedelics. Effects on fetal development are completely unknown. No human studies exist. Animal studies suggest potential for developmental effects. The fetus cannot consent and is uniquely vulnerable. Women of childbearing age should have pregnancy testing before psychedelic use. Wait until after pregnancy AND breastfeeding is complete.',
      citations: ['thompson_2009']
    },
    substance_use_disorder: {
      name: 'History of Substance Use Disorder',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Ketamine (8.55% addiction rate)'],
      keyActions: [
        'Comprehensive addiction history screening',
        'AVOID ketamine - significant addiction potential',
        'Structured therapeutic setting preferred',
        'Addiction treatment integration important'
      ],
      description: 'Past or current history of substance use disorder (addiction/dependence) including alcohol, stimulants, opioids, benzodiazepines, cannabis, or other substances. Indicates vulnerability to problematic substance use patterns.',
      whyItMatters: 'People with substance use disorder history have neurobiological vulnerabilities that increase risk of problematic use. Ketamine has significant addiction potential (8.55% in clinical studies) and is especially risky. Classical psychedelics have lower abuse potential but compulsive use can occur. Structured therapeutic context reduces risk.',
      prevalenceData: 'Ketamine addiction/dependence occurs in 8.55% of medical ketamine users. Much higher in recreational use (up to 30%). Classical psychedelics have low addiction potential but "psychedelic seeking" behavior can develop in those with SUD history.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'High Risk - Relative Contraindication',
          details: '8.55% addiction rate documented in clinical studies. Higher in recreational use. History of SUD significantly increases risk of ketamine dependence.',
          citations: ['sassano-higgins_2016', 'liu_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Moderate Risk',
          details: 'Stimulant properties and euphoric effects create some abuse potential. Less than ketamine but higher than classical psychedelics.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Lower Risk',
          details: 'Low abuse potential. Actually being studied for addiction treatment. Structured setting recommended for SUD history.',
          citations: ['bogenschutz_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Lower Risk',
          details: 'Low addiction potential but "psychedelic seeking" can occur in vulnerable individuals.',
          citations: []
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Lower Risk',
          details: 'Used traditionally for addiction treatment. Aversive properties reduce abuse potential.',
          citations: ['thomas_2013']
        }
      ],
      harmReduction: [
        { name: 'Comprehensive SUD history screening', link: 'hrp_screening_comprehensive_001' },
        { name: 'AVOID ketamine if SUD history present', link: null },
        { name: 'Structured therapeutic setting strongly recommended', link: null },
        { name: 'Integration with addiction treatment', link: null },
        { name: 'Monitor for problematic use patterns', link: null }
      ],
      clinicalGuidance: 'Substance use disorder history is a relative contraindication, not absolute. Risk stratification: (1) AVOID ketamine - significant addiction potential, (2) MDMA - moderate risk, (3) Classical psychedelics - lower risk, actually studied for addiction treatment. Therapeutic setting with proper support strongly recommended. Integration with existing addiction treatment important. Monitor for problematic use patterns.',
      citations: ['sassano-higgins_2016', 'bogenschutz_2022', 'thomas_2013']
    },
    cardiomyopathy: {
      name: 'Cardiomyopathy',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics - cardiac strain risk'],
      keyActions: [
        'Cardiology evaluation and clearance required',
        'Assess ejection fraction and cardiac function',
        'AVOID ibogaine - highest cardiac risk',
        'Continuous cardiac monitoring if proceeding'
      ],
      description: 'Disease of the heart muscle causing abnormal structure or function. Types include dilated, hypertrophic, and restrictive cardiomyopathy. Reduces heart\'s ability to pump blood effectively.',
      whyItMatters: 'Psychedelics increase heart rate and blood pressure, placing additional strain on compromised heart muscle. Cardiomyopathy patients have reduced cardiac reserve and higher risk of arrhythmias, heart failure, and sudden cardiac death. Ibogaine poses extreme risk due to direct cardiac effects.',
      prevalenceData: 'Cardiomyopathy affects 1 in 500 people. Higher rates in older adults. Ejection fraction <40% indicates significant dysfunction. Can be caused by genetics, alcohol, viral infections, or other factors.',
      substanceInteractions: [
        {
          substance: 'Ibogaine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Ibogaine has direct cardiac effects including QT prolongation. In cardiomyopathy patients, risk of fatal arrhythmias is extremely high.',
          citations: ['koenig_2014', 'alper_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Strongest cardiovascular effects. Significantly increases cardiac workload beyond compromised heart\'s capacity.',
          citations: ['papaseit_2018']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative Contraindication - Requires Evaluation',
          details: 'Increases HR and BP but less than MDMA. Requires cardiology clearance and careful monitoring.',
          citations: ['anderson_2020']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative Contraindication',
          details: 'Reliably increases BP. Cardiac assessment essential before use.',
          citations: ['li_2016']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative Contraindication',
          details: 'Similar cardiovascular effects to psilocybin but longer duration increases risk window.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Cardiology evaluation with ejection fraction assessment', link: 'hrp_screening_comprehensive_001' },
        { name: 'NEVER use ibogaine with cardiomyopathy', link: null },
        { name: 'ECG and cardiac monitoring if proceeding', link: 'hrp_continuous_monitoring_001' },
        { name: 'Emergency cardiac protocols in place', link: null }
      ],
      clinicalGuidance: 'Cardiomyopathy is an absolute contraindication for ibogaine and MDMA. For other psychedelics, requires comprehensive cardiology evaluation including echocardiogram and ejection fraction assessment. Only proceed with cardiology clearance and continuous cardiac monitoring. Severity depends on type of cardiomyopathy and ejection fraction.',
      citations: ['koenig_2014', 'papaseit_2018', 'anderson_2020']
    },
    electrolyte_imbalance: {
      name: 'Electrolyte Imbalances',
      overallSeverity: 'high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA (hyponatremia risk)', 'Ibogaine (cardiac arrhythmia risk)'],
      keyActions: [
        'Check electrolytes before any psychedelic use',
        'Correct imbalances before proceeding',
        'CRITICAL with MDMA - hyponatremia risk',
        'Avoid excessive water intake with MDMA'
      ],
      description: 'Abnormal blood levels of sodium, potassium, magnesium, or calcium. Can be caused by kidney disease, medications (diuretics), endocrine disorders, dehydration, or excessive water intake.',
      whyItMatters: 'Electrolyte imbalances affect cardiac rhythm and neurological function. MDMA causes SIADH (inappropriate ADH secretion) leading to hyponatremia (low sodium), which can cause seizures, brain swelling, and death. Ibogaine requires normal electrolytes for cardiac safety. Hypokalemia and hypomagnesemia increase arrhythmia risk.',
      prevalenceData: 'MDMA-related hyponatremia has caused multiple deaths. More common in women. Occurs when MDMA users drink excessive water without electrolyte replacement. Pre-existing electrolyte imbalances dramatically increase risk.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'HIGH RISK with Electrolyte Imbalance',
          details: 'MDMA causes SIADH and hyponatremia. Pre-existing low sodium dramatically increases risk of severe hyponatremia, seizures, cerebral edema, and death. Multiple fatalities documented.',
          citations: ['rosenson_2007', 'parrott_2014']
        },
        {
          substance: 'Ibogaine',
          riskLevel: 'HIGH RISK - Requires Normal Electrolytes',
          details: 'Cardiac effects of ibogaine require normal electrolytes. Hypokalemia and hypomagnesemia increase risk of fatal arrhythmias.',
          citations: ['koenig_2014']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Moderate Risk',
          details: 'Can affect electrolyte balance with chronic use. Pre-existing imbalances should be corrected.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Lower Risk',
          details: 'Less direct electrolyte effects than MDMA but severe imbalances should be corrected first.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Check electrolytes (Na, K, Mg, Ca) before psychedelic use', link: 'hrp_screening_comprehensive_001' },
        { name: 'Correct any imbalances before proceeding', link: null },
        { name: 'AVOID MDMA if sodium low', link: null },
        { name: 'Moderate water intake with MDMA (not excessive)', link: null },
        { name: 'Consider electrolyte supplementation', link: null }
      ],
      clinicalGuidance: 'Electrolyte imbalances are a relative contraindication requiring correction before psychedelic use. CRITICAL with MDMA - hyponatremia (low sodium) dramatically increases risk of severe MDMA-related hyponatremia. Ibogaine requires normal potassium and magnesium for cardiac safety. Check electrolytes in anyone with kidney disease, on diuretics, with eating disorders, or endocrine conditions.',
      citations: ['rosenson_2007', 'koenig_2014', 'parrott_2014']
    },
    ulcerative_cystitis: {
      name: 'Ulcerative Cystitis (Ketamine-Induced)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Any further ketamine use'],
      keyActions: [
        'Complete cessation of ketamine',
        'Urological evaluation with cystoscopy',
        'Monitor for progression to more severe damage',
        'Consider alternative psychedelics'
      ],
      description: 'Bladder wall ulceration caused by chronic ketamine use. Characterized by painful ulcers in bladder lining, severe urinary frequency and urgency, pain during urination, and bladder inflammation.',
      whyItMatters: 'Ulcerative cystitis indicates significant ketamine-induced bladder damage. Continued ketamine use causes progression: hemorrhagic cystitis → contracted bladder → hydronephrosis → renal failure. Ulcers can be painful and debilitating. Some cases become irreversible despite cessation.',
      prevalenceData: 'Common in chronic ketamine users (>3g/week). Can develop after 1-2 years of regular use. More severe than simple cystitis. Cystoscopy shows characteristic ulceration pattern.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Ulcerative cystitis is absolute contraindication to further ketamine. Continued exposure causes progressive irreversible bladder damage and potential kidney failure.',
          citations: ['mason_2010', 'shahani_2007']
        }
      ],
      harmReduction: [
        { name: 'Immediate and permanent ketamine cessation', link: null },
        { name: 'Urological consultation and cystoscopy', link: null },
        { name: 'Monitor for hydronephrosis and renal function', link: null },
        { name: 'Pain management and bladder symptom treatment', link: null },
        { name: 'Alternative psychedelics (psilocybin, MDMA) safe for bladder', link: null }
      ],
      clinicalGuidance: 'Ulcerative cystitis from ketamine is an ABSOLUTE contraindication to any further ketamine use. Requires urological evaluation including cystoscopy to assess damage. Monitor kidney function as damage can progress to hydronephrosis. Alternative psychedelics (psilocybin, LSD, MDMA) do not cause bladder toxicity.',
      citations: ['mason_2010', 'shahani_2007', 'middela_2010']
    },
    contracted_bladder: {
      name: 'Contracted Bladder (Ketamine-Induced)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Any ketamine exposure'],
      keyActions: [
        'Absolute avoidance of any ketamine',
        'Urological management for reduced bladder capacity',
        'Monitor kidney function closely',
        'May require surgical intervention'
      ],
      description: 'Severe reduction in bladder capacity caused by chronic ketamine use. Bladder becomes thick-walled, fibrotic, and shrunken. Capacity can reduce from normal 400-600ml to <50ml. Causes severe urinary frequency (30-40+ times daily), incontinence, and pain.',
      whyItMatters: 'Contracted bladder represents end-stage ketamine bladder damage. Often irreversible even with cessation. Dramatically impacts quality of life with constant urination needs. Can cause bilateral hydronephrosis and kidney failure. Some cases require bladder augmentation surgery or even bladder removal with urinary diversion.',
      prevalenceData: 'Occurs in severe chronic ketamine uropathy cases. More common with very high-dose use (>5g/week) over years. Some patients require bladder augmentation or complete bladder removal (cystectomy). Life-altering condition.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - SEVERE DAMAGE',
          details: 'Contracted bladder indicates severe irreversible ketamine damage. ANY further ketamine exposure could worsen condition and cause kidney failure. Absolute permanent contraindication.',
          citations: ['mason_2010', 'chu_2008']
        }
      ],
      harmReduction: [
        { name: 'NEVER use ketamine again - permanent contraindication', link: null },
        { name: 'Urological management and monitoring', link: null },
        { name: 'Monitor kidney function (creatinine, GFR, hydronephrosis)', link: null },
        { name: 'May require surgical intervention', link: null },
        { name: 'Support for significant quality of life impact', link: null }
      ],
      clinicalGuidance: 'Contracted bladder is an ABSOLUTE PERMANENT contraindication to any ketamine use. Represents severe end-stage damage often requiring surgical intervention. Requires ongoing urological care and monitoring for kidney complications. Quality of life severely impacted. Alternative psychedelics do not cause bladder damage but individual should be aware of life-altering nature of their condition.',
      citations: ['mason_2010', 'chu_2008', 'shahani_2007']
    },
    hydronephrosis: {
      name: 'Hydronephrosis (Ketamine-Related)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Any ketamine use'],
      keyActions: [
        'Absolute contraindication for ketamine',
        'Urgent nephrology and urology evaluation',
        'Monitor renal function closely',
        'May require surgical intervention for obstruction'
      ],
      description: 'Kidney swelling caused by urinary flow obstruction. In ketamine users, caused by bladder fibrosis, ureteral stenosis, or contracted bladder preventing urine drainage. Can be unilateral or bilateral. Bilateral hydronephrosis can cause kidney failure.',
      whyItMatters: 'Hydronephrosis indicates ketamine damage has progressed beyond bladder to affect kidneys. Represents medical emergency requiring urgent evaluation. Bilateral hydronephrosis can cause acute kidney injury and require dialysis. May need surgical intervention (ureteral stents, nephrostomy tubes, or bladder surgery).',
      prevalenceData: 'Occurs in severe ketamine uropathy cases. More common with very high-dose chronic use. Can develop silently - some patients unaware until kidney function severely impaired. Requires imaging (ultrasound or CT) for diagnosis.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - KIDNEY DAMAGE',
          details: 'Hydronephrosis indicates severe ketamine-induced urological damage affecting kidneys. ANY further ketamine could cause irreversible kidney failure requiring dialysis.',
          citations: ['chu_2008', 'middela_2010']
        }
      ],
      harmReduction: [
        { name: 'NEVER use ketamine - permanent contraindication', link: null },
        { name: 'Urgent nephrology and urology consultation', link: null },
        { name: 'Imaging (ultrasound/CT) to assess severity', link: null },
        { name: 'Monitor renal function (creatinine, GFR)', link: null },
        { name: 'May require surgical intervention', link: null }
      ],
      clinicalGuidance: 'Hydronephrosis related to ketamine uropathy is an ABSOLUTE contraindication to any ketamine use. Represents progression to kidney involvement and potential kidney failure. Requires urgent urological and nephrology evaluation. May need surgical intervention (stents, nephrostomy tubes). Monitor kidney function closely. Alternative psychedelics safe but condition requires medical management.',
      citations: ['chu_2008', 'middela_2010', 'shahani_2007']
    },
    paranoid_personality: {
      name: 'Paranoid Personality Disorder',
      overallSeverity: 'high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses or uncontrolled settings'],
      keyActions: [
        'Comprehensive psychiatric screening',
        'Establish trust and therapeutic alliance first',
        'Controlled setting with trusted support essential',
        'Lower doses if proceeding'
      ],
      description: 'Pervasive distrust and suspiciousness of others, interpreting others\' motives as malevolent. Characterized by guardedness, hypervigilance, inability to trust, and perception of hidden threats.',
      whyItMatters: 'Psychedelics increase psychological openness and can intensify paranoid thoughts. In vulnerable individuals, this can trigger severe paranoid reactions, panic, or aggressive behavior driven by perceived threats. The therapeutic benefit requires trust - difficult to establish with paranoid personality.',
      prevalenceData: 'Paranoid personality disorder affects 2-4% of population. More common in men. Can be exacerbated by psychedelics. Challenging to treat due to difficulty establishing therapeutic trust.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative Contraindication - Requires Caution',
          details: 'Can intensify paranoid thoughts. Requires established trust, controlled setting, and psychiatric support. Lower doses recommended.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative Contraindication - Higher Risk',
          details: 'Longer duration increases risk of prolonged paranoid reactions. Requires careful consideration.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Potential Exception',
          details: 'MDMA reduces threat perception and increases trust. May be better tolerated than classical psychedelics for paranoid personality.',
          citations: ['mithoefer_2018']
        },
        {
          substance: 'Cannabis',
          riskLevel: 'High Risk',
          details: 'Cannabis commonly worsens paranoia. Should be avoided by those with paranoid personality.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric evaluation', link: 'hrp_screening_comprehensive_001' },
        { name: 'Establish therapeutic trust before proceeding', link: null },
        { name: 'Controlled setting with trusted support person', link: null },
        { name: 'Lower doses (50-75% of standard)', link: null },
        { name: 'MDMA may be better tolerated than classical psychedelics', link: null }
      ],
      clinicalGuidance: 'Paranoid personality disorder is a relative contraindication requiring careful evaluation. Success depends on establishing trust first. Controlled therapeutic setting essential. MDMA may be better tolerated than classical psychedelics due to prosocial and trust-enhancing effects. Lower doses recommended. Without proper support, can trigger severe paranoid reactions.',
      citations: ['mithoefer_2018']
    },
    suicidality: {
      name: 'Active Suicidal Ideation',
      overallSeverity: 'critical',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Uncontrolled settings or without psychiatric support'],
      keyActions: [
        'Psychiatric evaluation and safety planning essential',
        'ONLY in controlled therapeutic setting with psychiatric oversight',
        'Remove access to lethal means',
        '24/7 supervision during and after session'
      ],
      description: 'Current thoughts of suicide ranging from passive death wishes to active plans and intent. Indicates severe psychological distress and risk of self-harm.',
      whyItMatters: 'Psychedelics can intensify emotions and bring painful material to consciousness. Without proper support, this can worsen suicidal thoughts. However, emerging evidence shows ketamine, psilocybin, and MDMA may rapidly reduce suicidal ideation in controlled medical settings. The context and support determine whether psychedelics help or harm.',
      prevalenceData: 'Ketamine shows rapid anti-suicidal effects in studies - effects within hours. Psilocybin being studied for treatment-resistant depression with suicidal ideation. MDMA-PTSD trials included suicidal participants with positive outcomes. But unsupervised use can worsen crisis.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'Therapeutic Potential - Medical Setting ONLY',
          details: 'Ketamine shows rapid anti-suicidal effects in clinical studies. Reduction in suicidal ideation within hours. ONLY in medical setting with psychiatric oversight.',
          citations: ['wilkinson_2018', 'ballard_2014']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Therapeutic Potential - Controlled Setting ONLY',
          details: 'Being studied for treatment-resistant depression including suicidal patients. Requires comprehensive psychiatric support and controlled setting.',
          citations: ['carhart-harris_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Therapeutic Potential - Protocol Required',
          details: 'PTSD trials included suicidal participants with good outcomes. Requires MDMA-assisted psychotherapy protocol.',
          citations: ['mithoefer_2018']
        },
        {
          substance: 'LSD',
          riskLevel: 'HIGH RISK in Uncontrolled Setting',
          details: 'Can intensify suicidal thoughts without proper support. Requires controlled therapeutic setting if considered.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric evaluation and safety planning', link: 'hrp_screening_comprehensive_001' },
        { name: 'ONLY in controlled medical/therapeutic setting', link: null },
        { name: 'Remove access to lethal means', link: null },
        { name: '24/7 supervision during and after session', link: null },
        { name: 'Emergency psychiatric protocols in place', link: null },
        { name: 'Integration therapy essential', link: 'hrp_integration_therapy_001' }
      ],
      clinicalGuidance: 'Active suicidal ideation is NOT an absolute contraindication but requires CONTROLLED THERAPEUTIC SETTING with psychiatric oversight. Ketamine shows rapid anti-suicidal effects in studies. Psilocybin and MDMA being studied for depression/PTSD with suicidal patients. NEVER in uncontrolled recreational setting - high risk. Requires comprehensive safety planning, removal of lethal means, and 24/7 supervision.',
      citations: ['wilkinson_2018', 'ballard_2014', 'carhart-harris_2016']
    },
    family_bipolar: {
      name: 'Family History of Bipolar Disorder',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses without psychiatric screening'],
      keyActions: [
        'Comprehensive psychiatric screening',
        'Assess personal mood stability history',
        'Lower doses if proceeding',
        'Monitor for manic symptoms after use'
      ],
      description: 'Family history of bipolar disorder (mania/hypomania) in first-degree relatives (parents, siblings) or multiple second-degree relatives. Indicates elevated genetic risk for mood instability and mania induction.',
      whyItMatters: 'Bipolar disorder has strong genetic component (heritability 60-85%). Psychedelics can induce mania in susceptible individuals. Family history increases risk of mania induction from 1.1-4.3% baseline. First episode mania can be triggered by psychedelics in genetically vulnerable people.',
      prevalenceData: 'Manic episodes induced by psychedelics in 1.1-4.3% of people. Higher risk with family history. First-degree relatives have 5-10x higher bipolar risk. Multiple affected relatives indicates higher genetic load.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative Contraindication - Screening Required',
          details: 'Can induce mania in vulnerable individuals. Family history increases risk. Requires psychiatric screening and lower doses.',
          citations: ['dos_santos_2021', 'johnson_2008']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative Contraindication - Higher Risk',
          details: 'Longer duration than psilocybin. Can trigger manic episodes. Family history warrants caution.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative Contraindication',
          details: 'Stimulant properties can contribute to mania induction. Family history increases risk.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Moderate Risk',
          details: 'Can cause transient mood elevation. Lower mania risk than classical psychedelics but screening advised.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive psychiatric screening', link: 'hrp_screening_comprehensive_001' },
        { name: 'Evaluate personal mood history carefully', link: null },
        { name: 'Lower doses (50-75% of standard)', link: null },
        { name: 'Monitor for manic symptoms after use', link: null },
        { name: 'Educate on early warning signs of mania', link: null }
      ],
      clinicalGuidance: 'Family history of bipolar is a relative contraindication requiring psychiatric screening. Risk stratification: (1) degree of relationship, (2) number of affected relatives, (3) personal history of mood instability. One second-degree relative = lower risk. Multiple first-degree relatives = higher risk. Lower doses recommended. Monitor for manic symptoms after use (decreased sleep need, increased energy, impulsivity).',
      citations: ['dos_santos_2021', 'johnson_2008', 'breeksema_2022']
    },
    hppd_history: {
      name: 'History of HPPD',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Further psychedelic use may worsen symptoms'],
      keyActions: [
        'Avoid further psychedelic use if possible',
        'HPPD may worsen with additional exposures',
        'Consider non-psychedelic alternatives',
        'Lower doses if proceeding'
      ],
      description: 'Previous hallucinogen persisting perception disorder (HPPD) - persistent visual disturbances after psychedelic use. Symptoms include visual snow, trails, halos, geometric patterns, or objects appearing to move. Can last months to years.',
      whyItMatters: 'HPPD indicates vulnerability to persistent perceptual changes. Further psychedelic use can worsen symptoms, prolong duration, or cause recurrence. While not dangerous, HPPD can be distressing and impact quality of life. Some cases are permanent.',
      prevalenceData: 'HPPD affects 1-4% of psychedelic users. More common with LSD and high doses. Type 1 (brief flashbacks) more common than Type 2 (persistent symptoms). Risk factors: high doses, frequent use, personal anxiety/visual processing differences.',
      substanceInteractions: [
        {
          substance: 'LSD',
          riskLevel: 'HIGH RISK - May Worsen HPPD',
          details: 'LSD most associated with HPPD. Previous HPPD strongly suggests avoiding LSD to prevent worsening or recurrence.',
          citations: ['halpern_2018']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Moderate-High Risk',
          details: 'Can worsen HPPD symptoms. Lower risk than LSD but caution warranted with HPPD history.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Moderate Risk',
          details: 'Less visual than classical psychedelics but can still affect HPPD. Caution advised.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Lower Risk',
          details: 'Different mechanism (dissociative vs psychedelic). May be lower risk for HPPD worsening but data limited.',
          citations: []
        },
        {
          substance: 'Cannabis',
          riskLevel: 'HIGH RISK',
          details: 'Cannabis commonly worsens HPPD symptoms. Should be avoided by those with HPPD history.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Consider avoiding further psychedelic use', link: null },
        { name: 'AVOID LSD especially if previous HPPD from LSD', link: null },
        { name: 'AVOID cannabis - commonly worsens HPPD', link: null },
        { name: 'Lower doses if proceeding with psychedelics', link: null },
        { name: 'Consider non-psychedelic alternatives (ketamine, therapy)', link: null }
      ],
      clinicalGuidance: 'HPPD history is a relative contraindication. Ideal approach: avoid further psychedelic use to prevent worsening. If proceeding: (1) AVOID LSD - highest HPPD risk, (2) AVOID cannabis - worsens symptoms, (3) Use lower doses, (4) Consider ketamine as lower-risk alternative. HPPD not dangerous but can be distressing. Monitor for symptom changes.',
      citations: ['halpern_2018', 'martinotti_2018']
    },
    cad: {
      name: 'Coronary Artery Disease',
      overallSeverity: 'high',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['MDMA', 'Ketamine', 'Psilocybin', 'LSD'],
      keyActions: [
        'Cardiology clearance required before any consideration',
        'Stress test and cardiac imaging to assess severity',
        'Medical supervision mandatory if proceeding',
        'Continuous cardiac monitoring required'
      ],
      description: 'Narrowed or blocked coronary arteries due to atherosclerotic plaque buildup, reducing blood flow to the heart muscle. May present as angina (chest pain), previous heart attack, or positive stress test.',
      whyItMatters: 'Psychedelics increase heart rate, blood pressure, and cardiac workload. In coronary artery disease, this increased demand may exceed the heart\'s compromised blood supply, potentially triggering angina, myocardial infarction, or arrhythmias.',
      prevalenceData: 'Cardiovascular adverse events occurred in 7-10% of psychedelic trials. Those with CAD are at significantly elevated risk for serious cardiac events during sessions.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Increases heart rate and BP, creating cardiac demand that may exceed supply in CAD.',
          citations: ['anderson_2020']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'Similar cardiovascular effects to psilocybin with longer duration of risk.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Strongest cardiovascular effects. Can significantly increase myocardial oxygen demand.',
          citations: ['papaseit_2018']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'Increases BP and cardiac workload. Risk of myocardial ischemia.',
          citations: ['li_2016']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'MAOI component plus psychedelic effects create significant cardiac stress.',
          citations: ['dos_santos_2016']
        }
      ],
      harmReduction: [
        { name: 'Comprehensive Medical Screening with ECG', link: 'hrp_screening_comprehensive_001' },
        { name: 'Cardiology evaluation and stress testing', link: null },
        { name: 'Medical supervision with cardiac monitoring', link: 'hrp_continuous_monitoring_001' },
        { name: 'Emergency cardiac medications available', link: null }
      ],
      clinicalGuidance: 'CAD is an absolute contraindication in most contexts. If consideration is given with stable, well-controlled CAD: (1) Cardiology clearance mandatory, (2) Recent stress test showing good functional capacity, (3) Full medical supervision with continuous cardiac monitoring, (4) Emergency cardiac care immediately available. Generally not recommended.',
      citations: ['anderson_2020', 'wsol_2023']
    },
    arrhythmia: {
      name: 'Heart Arrhythmias',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['MDMA', 'Ketamine', 'Psilocybin', 'LSD'],
      keyActions: [
        'Cardiology clearance required',
        'Arrhythmia must be controlled before any consideration',
        'Medical supervision with continuous cardiac monitoring mandatory',
        'Emergency defibrillator and medications available'
      ],
      description: 'Irregular heart rhythms including atrial fibrillation, ventricular tachycardia, premature ventricular contractions, sick sinus syndrome, or heart block. May be paroxysmal (episodic) or persistent.',
      whyItMatters: 'Psychedelics can trigger or worsen arrhythmias through sympathomimetic effects, direct cardiac effects, and electrolyte shifts. Life-threatening arrhythmias possible, especially with MDMA and substances affecting cardiac ion channels.',
      prevalenceData: 'Psychedelics caused arrhythmias in 2-5% of clinical trial participants without known heart disease. Risk substantially higher with pre-existing arrhythmias.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Can trigger or worsen arrhythmias through sympathomimetic effects and 5-HT2B receptor activation.',
          citations: ['anderson_2020', 'bender_2022']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication',
          details: 'Similar mechanism to psilocybin with longer duration of cardiac risk.',
          citations: ['nichols_2016']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication - Highest Risk',
          details: 'Strong arrhythmogenic potential. Multiple case reports of MDMA-induced fatal arrhythmias.',
          citations: ['papaseit_2018', 'baggott_2016']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication',
          details: 'Can trigger arrhythmias, especially in those with pre-existing conduction abnormalities.',
          citations: ['li_2016']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Combined effects of MAOI and DMT create arrhythmia risk.',
          citations: ['dos_santos_2016']
        }
      ],
      harmReduction: [
        { name: 'Comprehensive Medical Screening with ECG', link: 'hrp_screening_comprehensive_001' },
        { name: 'Cardiology evaluation - arrhythmia must be controlled', link: null },
        { name: 'Continuous cardiac telemetry monitoring', link: 'hrp_continuous_monitoring_001' },
        { name: 'Defibrillator and antiarrhythmic medications immediately available', link: null }
      ],
      clinicalGuidance: 'Arrhythmias are an absolute contraindication. If proceeding with well-controlled arrhythmia: (1) Cardiology clearance mandatory, (2) Recent Holter monitor showing good control, (3) Full medical setting with continuous telemetry, (4) Emergency cardiac care immediately available, (5) AVOID MDMA - highest risk. Generally not recommended.',
      citations: ['anderson_2020', 'wsol_2023', 'marazziti_2024']
    },
    recent_mi: {
      name: 'Recent Myocardial Infarction',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics - absolute contraindication within 6 months'],
      keyActions: [
        'Absolute contraindication within 6 months of MI',
        'After 6 months: cardiology clearance required',
        'Cardiac function assessment and stress testing needed',
        'Medical supervision with continuous monitoring if proceeding after 6+ months'
      ],
      description: 'Heart attack (myocardial infarction) within the past 6 months. Heart muscle has died due to blocked blood flow, leaving the heart weakened and at risk for complications.',
      whyItMatters: 'The heart is vulnerable after MI. Psychedelics increase cardiac workload and may trigger arrhythmias, re-infarction, or heart failure in the healing heart. Risk highest in first 6 months but remains elevated for a year.',
      prevalenceData: 'Post-MI patients excluded from all psychedelic clinical trials due to high risk. No safety data exists for this population.',
      substanceInteractions: [
        {
          substance: 'All Psychedelics',
          riskLevel: 'Absolute Contraindication <6 months',
          details: 'Increased cardiac workload may trigger re-infarction, arrhythmias, or heart failure in healing heart.',
          citations: ['anderson_2020', 'wsol_2023']
        }
      ],
      harmReduction: [
        { name: 'AVOID all psychedelics for minimum 6 months post-MI', link: null },
        { name: 'After 6 months: cardiology clearance with ejection fraction >50%', link: null },
        { name: 'Stress test showing good functional capacity', link: null },
        { name: 'Medical supervision with continuous cardiac monitoring', link: 'hrp_continuous_monitoring_001' }
      ],
      clinicalGuidance: 'Recent MI is an absolute contraindication. Minimum 6-month waiting period mandatory. After 6 months with cardiology clearance showing: (1) Ejection fraction >50%, (2) No significant residual ischemia on stress test, (3) No arrhythmias, (4) Good functional capacity - may consider with full medical supervision. Generally discouraged even after 6 months.',
      citations: ['anderson_2020', 'wsol_2023']
    },
    bipolar: {
      name: 'Bipolar Disorder',
      overallSeverity: 'high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['LSD (psychosis risk)', 'Cannabis (mania trigger)', 'Any during manic episode'],
      keyActions: [
        'Assess current mood state - avoid during mania or mixed states',
        'Psychiatric consultation recommended',
        'Continue mood stabilizers (do not discontinue)',
        'Monitor closely for mood destabilization in weeks following'
      ],
      description: 'A mood disorder characterized by episodes of mania (elevated mood, decreased need for sleep, impulsivity) and depression. Type I includes full manic episodes; Type II includes hypomania.',
      whyItMatters: 'Psychedelics can trigger manic episodes, destabilize mood, or precipitate psychosis in bipolar disorder. Risk varies by mood state, medication status, and psychotic features. Some individuals report therapeutic benefit but must weigh against destabilization risk.',
      prevalenceData: 'Psychedelics triggered mania in 2-4% of users in some surveys. Bipolar patients typically excluded from psychedelic trials, limiting safety data.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Mood Destabilization Risk',
          details: 'May trigger manic episode or psychosis. Some bipolar patients report therapeutic effects but risk substantial.',
          citations: ['dos_santos_2018']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Higher Psychosis Risk',
          details: 'Higher risk of psychosis and prolonged destabilization than psilocybin.',
          citations: ['krebs_2013']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative - Can Trigger Mania',
          details: 'Stimulant properties may trigger manic episode. Some use in bipolar PTSD research.',
          citations: ['wagner_2017']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Rapidly Acting Antidepressant',
          details: 'Used clinically for bipolar depression. Lower mania risk than classical psychedelics.',
          citations: ['wilkinson_2018']
        },
        {
          substance: 'Cannabis',
          riskLevel: 'High Risk - Mania Trigger',
          details: 'Strong association with triggering manic episodes in bipolar disorder.',
          citations: ['gibbs_2015']
        }
      ],
      harmReduction: [
        { name: 'AVOID during active mania or mixed states', link: null },
        { name: 'Continue mood stabilizers - do not discontinue', link: null },
        { name: 'Psychiatric consultation and monitoring', link: null },
        { name: 'Lower doses to reduce destabilization risk', link: null },
        { name: 'Monitor mood closely for 2-4 weeks after session', link: null }
      ],
      clinicalGuidance: 'Bipolar disorder is a relative contraindication. If proceeding: (1) ONLY when euthymic (stable mood) - NEVER during mania/mixed states, (2) Continue mood stabilizers, (3) Psychiatric consultation, (4) Lower doses, (5) Close monitoring for weeks after. Ketamine may be safer option. Higher risk with psychotic features. Consider family history of bipolar in risk assessment.',
      citations: ['dos_santos_2018', 'krebs_2013']
    },
    personality: {
      name: 'Personality Disorders',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses without therapeutic support', 'Cluster A (Paranoid/Schizotypal) - psychosis risk'],
      keyActions: [
        'Requires therapeutic support and structure',
        'Avoid high doses in unsupported settings',
        'Higher risk for Cluster A (paranoid, schizoid, schizotypal)',
        'Integration therapy critical for processing experiences'
      ],
      description: 'Enduring patterns of inner experience and behavior that deviate from cultural expectations. Includes Cluster A (odd/eccentric), Cluster B (dramatic/emotional), and Cluster C (anxious/fearful) personality disorders.',
      whyItMatters: 'Personality disorders may increase risk of difficult psychological experiences, destabilization, or psychotic reactions. However, psychedelics show promise for some personality disorders (especially with therapy). Risk varies significantly by cluster and individual factors.',
      prevalenceData: 'Cluster A personality disorders associated with higher psychosis risk. Some evidence for therapeutic benefit in borderline personality disorder with proper support.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Requires Support',
          details: 'May be therapeutic with proper therapeutic structure. Higher psychosis risk with Cluster A.',
          citations: ['carhart-harris_2018']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Cluster A Higher Risk',
          details: 'Similar to psilocybin but longer duration may be more challenging.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative - Therapeutic Potential',
          details: 'Shows promise for borderline personality disorder in therapeutic contexts.',
          citations: ['wagner_2017']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Lower Psychosis Risk',
          details: 'Dissociative effects may be better tolerated. Used clinically in some personality disorders.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Therapeutic setting with trained support', link: null },
        { name: 'AVOID high doses, especially without support', link: null },
        { name: 'Cluster A (paranoid, schizotypal): higher caution - psychosis risk', link: null },
        { name: 'Integration therapy to process experiences', link: null },
        { name: 'Start with lower doses to assess response', link: null }
      ],
      clinicalGuidance: 'Personality disorders are a relative contraindication with significant variability. Cluster A (paranoid, schizoid, schizotypal): Higher psychosis risk - greater caution. Cluster B (borderline, narcissistic): May benefit from therapy-assisted psychedelics. Cluster C (avoidant, dependent): Moderate risk. All clusters: Therapeutic support strongly recommended, avoid high doses in unsupported settings, integration therapy critical.',
      citations: ['carhart-harris_2018', 'dos_santos_2018']
    },
    depression: {
      name: 'Major Depression',
      overallSeverity: 'low_to_moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses when actively suicidal', 'MDMA with SSRIs (reduced efficacy)'],
      keyActions: [
        'May be therapeutic - active research area',
        'If suicidal: crisis support and safety planning essential',
        'Consider interaction with antidepressant medications',
        'Integration therapy enhances therapeutic benefit'
      ],
      description: 'Persistent low mood, anhedonia (loss of pleasure), hopelessness, changes in sleep/appetite, and potentially suicidal thoughts. Ranges from mild to severe.',
      whyItMatters: 'Depression is actually a primary therapeutic target for psychedelic research. Psilocybin, ketamine, and MDMA show significant antidepressant effects. Main risks are suicidality during acute effects and medication interactions.',
      prevalenceData: 'Psilocybin and ketamine show 50-70% response rates in treatment-resistant depression trials. Effects can last months after single sessions.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Therapeutic - Active Research',
          details: 'FDA Breakthrough Therapy for depression. Large effect sizes in clinical trials.',
          citations: ['davis_2021', 'carhart-harris_2018']
        },
        {
          substance: 'LSD',
          riskLevel: 'Therapeutic Potential',
          details: 'Limited but promising research for depression. Similar mechanism to psilocybin.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Therapeutic (especially with trauma)',
          details: 'Effective for depression, especially when comorbid with PTSD or trauma.',
          citations: ['mithoefer_2018']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'FDA-Approved (esketamine)',
          details: 'Rapid-acting antidepressant. Esketamine (Spravato) FDA-approved for treatment-resistant depression.',
          citations: ['wilkinson_2018', 'daly_2018']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Therapeutic Potential',
          details: 'Emerging research showing antidepressant effects, especially in ceremonial contexts.',
          citations: ['palhano-fontes_2019']
        }
      ],
      harmReduction: [
        { name: 'If suicidal: Crisis support and safety planning', link: null },
        { name: 'Integration therapy enhances therapeutic benefit', link: null },
        { name: 'Consider medication interactions (SSRIs reduce effects)', link: null },
        { name: 'Supportive setting to process difficult emotions', link: null }
      ],
      clinicalGuidance: 'Depression is generally NOT a contraindication - it is a therapeutic target. Considerations: (1) Suicidality: Ensure crisis support available, (2) Medications: SSRIs reduce psychedelic effects (may need washout), (3) Integration: Therapy significantly enhances benefit, (4) Ketamine fastest-acting for acute suicidality. Depression is one of the strongest evidence-based indications for psychedelic therapy.',
      citations: ['davis_2021', 'carhart-harris_2018', 'wilkinson_2018']
    },
    anxiety: {
      name: 'Anxiety Disorders',
      overallSeverity: 'low_to_moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses without support (may worsen anxiety)', 'LSD (longer duration harder to tolerate)'],
      keyActions: [
        'May be therapeutic with proper support',
        'Anticipatory anxiety common but often resolves during session',
        'Grounding techniques and supportive setting important',
        'Integration therapy helps process anxiety-related insights'
      ],
      description: 'Excessive worry, fear, or anxiety that interferes with daily functioning. Includes generalized anxiety disorder, panic disorder, social anxiety, and specific phobias.',
      whyItMatters: 'Psychedelics can temporarily increase anxiety during onset but often result in significant anxiety reduction after the session. With proper support, anxiety disorders may actually benefit from psychedelic experiences. Unsupported high doses carry risk of panic.',
      prevalenceData: 'Clinical trials show 60-80% of cancer patients with anxiety experienced significant reduction after psilocybin therapy. Effects maintained at 6-month follow-up.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Therapeutic - Active Research',
          details: 'Significant anxiety reduction in clinical trials, especially for existential anxiety and cancer-related anxiety.',
          citations: ['ross_2016', 'grob_2011']
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Longer Duration',
          details: 'May be therapeutic but 12-hour duration can be challenging for anxious individuals.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Therapeutic - Anxiolytic Effects',
          details: 'Acute anxiety reduction. Used therapeutically for social anxiety and PTSD-related anxiety.',
          citations: ['mithoefer_2018']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Therapeutic - Rapid Effects',
          details: 'Rapid anxiolytic effects. Shorter duration may be preferable for anxious individuals.',
          citations: ['glue_2017']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Relative - Ceremonial Context',
          details: 'Can be therapeutic but purging may increase anxiety for some. Ceremonial support important.',
          citations: ['osorio_2015']
        }
      ],
      harmReduction: [
        { name: 'Preparation to address anticipatory anxiety', link: null },
        { name: 'Supportive setting with grounding techniques available', link: null },
        { name: 'Lower doses for first experience if very anxious', link: null },
        { name: 'Integration therapy to process anxiety-related insights', link: null },
        { name: 'Shorter-acting substances (ketamine) may be easier to tolerate', link: null }
      ],
      clinicalGuidance: 'Anxiety disorders are generally NOT a contraindication and may be therapeutic targets. Considerations: (1) Anticipatory anxiety is normal and often resolves during session, (2) Supportive setting crucial, (3) Lower doses reasonable for first experience, (4) Therapeutic benefit enhanced with preparation and integration, (5) Shorter-acting options (ketamine) may be less intimidating. Panic during onset usually manageable with support.',
      citations: ['ross_2016', 'grob_2011']
    },
    ocd: {
      name: 'Obsessive-Compulsive Disorder',
      overallSeverity: 'low_to_moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses without therapeutic support'],
      keyActions: [
        'May be therapeutic - emerging research',
        'Therapeutic setting enhances benefit',
        'May temporarily increase obsessions during session',
        'Integration therapy to process insights about compulsive patterns'
      ],
      description: 'Characterized by unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce anxiety.',
      whyItMatters: 'Emerging research suggests psilocybin may have significant therapeutic effects for OCD. The psychedelic experience may provide new perspective on obsessive thought patterns. Some individuals report temporary increase in obsessions during sessions.',
      prevalenceData: 'Preliminary research shows 23-100% reduction in OCD symptoms after psilocybin treatment. Early-stage research but promising results.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Therapeutic Potential - Active Research',
          details: 'Emerging evidence for significant OCD symptom reduction. May interrupt compulsive thought patterns.',
          citations: ['moreno_2006']
        },
        {
          substance: 'LSD',
          riskLevel: 'Therapeutic Potential - Limited Data',
          details: 'Historical use for OCD. Limited modern research but similar mechanism to psilocybin.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Limited Evidence',
          details: 'Less research for OCD specifically. May help if OCD related to trauma.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Some Evidence',
          details: 'Some case reports of benefit. Different mechanism than serotonergic psychedelics.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Therapeutic setting recommended to maximize benefit', link: null },
        { name: 'Obsessions may temporarily increase during session - normal', link: null },
        { name: 'Integration therapy to process insights about patterns', link: null },
        { name: 'Consider interaction with SSRIs (often prescribed for OCD)', link: null }
      ],
      clinicalGuidance: 'OCD is generally not a contraindication and may be a therapeutic target. Considerations: (1) Emerging research shows promise for significant symptom reduction, (2) Obsessions may temporarily intensify during session - this is normal and part of process, (3) Therapeutic support enhances benefit, (4) Integration crucial to translate insights into behavior change, (5) Many OCD patients on SSRIs - may reduce psychedelic effects.',
      citations: ['moreno_2006']
    },
    maoi: {
      name: 'MAOI Medications',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['MDMA (serotonin syndrome - potentially fatal)', 'Psilocybin/LSD (serotonin syndrome risk)'],
      keyActions: [
        'ABSOLUTE contraindication with MDMA - potentially fatal',
        'Requires 2-week washout minimum before any serotonergic psychedelic',
        'Exception: MAOIs are intentionally combined with DMT in ayahuasca',
        'Medical supervision mandatory if combining'
      ],
      description: 'Monoamine oxidase inhibitor medications including phenelzine (Nardil), tranylcypromine (Parnate), isocarboxazid (Marplan), selegiline (Emsam). Prescribed for depression, anxiety, and Parkinson\'s disease.',
      whyItMatters: 'MAOIs block the breakdown of serotonin and other neurotransmitters. Combining with serotonergic psychedelics (especially MDMA) can cause life-threatening serotonin syndrome: hyperthermia, seizures, cardiovascular collapse, death.',
      prevalenceData: 'Serotonin syndrome from MDMA + MAOI combinations has caused multiple deaths. MAOI + MDMA is one of the most dangerous drug combinations.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - POTENTIALLY FATAL',
          details: 'MDMA + MAOI = severe serotonin syndrome risk. Multiple deaths reported. Never combine.',
          citations: ['baggott_2016', 'vanderwal_2021']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication - Serotonin Syndrome Risk',
          details: 'Can cause serotonin syndrome. Requires minimum 2-week washout from MAOI.',
          citations: ['johnson_2018']
        },
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication - Serotonin Syndrome Risk',
          details: 'Serotonin syndrome risk. Requires 2-week washout from MAOI.',
          citations: []
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'INTENTIONAL Combination',
          details: 'Ayahuasca intentionally combines MAOI (harmala alkaloids) with DMT. Traditional use but requires proper preparation and diet restrictions.',
          citations: ['dos_santos_2016']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Generally Safe',
          details: 'Ketamine not serotonergic. No serotonin syndrome risk with MAOIs.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'NEVER combine MDMA with MAOIs - potentially fatal', link: null },
        { name: 'Minimum 2-week washout before serotonergic psychedelics', link: null },
        { name: 'Ayahuasca is intentional MAOI+DMT but requires dietary restrictions', link: null },
        { name: 'Ketamine safe option for those on MAOIs', link: null },
        { name: 'Know serotonin syndrome symptoms: agitation, confusion, rapid heart rate, high BP, dilated pupils, muscle rigidity, sweating', link: null }
      ],
      clinicalGuidance: 'MAOIs are an ABSOLUTE contraindication for MDMA and serotonergic psychedelics. MDMA + MAOI is potentially fatal - multiple deaths reported. For psilocybin/LSD: Minimum 2-week washout required (longer safer). Exception: Ayahuasca intentionally combines MAOI with DMT - traditional practice but requires strict dietary restrictions and preparation. Ketamine is safe option for those on MAOIs. Do NOT discontinue MAOIs without medical supervision.',
      citations: ['baggott_2016', 'vanderwal_2021', 'johnson_2018']
    },
    ssri: {
      name: 'SSRI/SNRI Antidepressants',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA (reduced efficacy + serotonin syndrome risk)', 'High doses with serotonergic psychedelics (serotonin syndrome)'],
      keyActions: [
        'SSRIs significantly reduce or block effects of psilocybin and LSD',
        'MDMA efficacy severely reduced - may not work at all',
        'If discontinuing for psychedelic use: medical supervision required',
        'Ketamine unaffected by SSRIs - works normally'
      ],
      description: 'Selective serotonin reuptake inhibitors (SSRIs) and serotonin-norepinephrine reuptake inhibitors (SNRIs) including fluoxetine (Prozac), sertraline (Zoloft), escitalopram (Lexapro), citalopram (Celexa), paroxetine (Paxil), venlafaxine (Effexor), duloxetine (Cymbalta).',
      whyItMatters: 'SSRIs block serotonin reuptake and downregulate serotonin receptors, significantly reducing or blocking the effects of psilocybin, LSD, and especially MDMA. Discontinuing SSRIs has risks and must be done carefully with medical supervision.',
      prevalenceData: 'Studies show 30-70% reduction in psychedelic effects with SSRIs. MDMA effects almost completely blocked in many users on SSRIs.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Reduced Efficacy',
          details: 'SSRIs reduce psilocybin effects by 30-50%. May need higher doses (not recommended) or taper off SSRIs.',
          citations: ['bonson_1996', 'preller_2017']
        },
        {
          substance: 'LSD',
          riskLevel: 'Reduced Efficacy',
          details: 'SSRIs significantly reduce LSD effects through receptor downregulation.',
          citations: ['preller_2017']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Severely Reduced Efficacy + Serotonin Syndrome Risk',
          details: 'SSRIs may completely block MDMA effects. Some serotonin syndrome risk. Generally not recommended to combine.',
          citations: ['hysek_2012', 'liechti_2000']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'No Interaction - Works Normally',
          details: 'Ketamine not serotonergic. SSRIs do not reduce ketamine effects. Good option for those on antidepressants.',
          citations: ['wilkinson_2018']
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Reduced Efficacy + Serotonin Syndrome Risk',
          details: 'SSRIs reduce effects and create serotonin syndrome risk with MAOI component.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'SSRIs reduce psychedelic effects - may not work or need higher doses', link: null },
        { name: 'If tapering off SSRIs: Medical supervision REQUIRED - can cause withdrawal', link: null },
        { name: 'Typical taper: 2-4 weeks for short half-life, 4-6 weeks for long half-life', link: null },
        { name: 'Ketamine unaffected by SSRIs - good alternative', link: null },
        { name: 'Do not increase psychedelic dose to overcome SSRI - increases risks without guaranteed benefit', link: null }
      ],
      clinicalGuidance: 'SSRIs are a relative contraindication due to interaction, not safety. Main issue: Reduced efficacy. SSRIs block 30-70% of psychedelic effects. Options: (1) Stay on SSRIs, use ketamine instead (unaffected), (2) Taper off SSRIs with medical supervision (2-6 weeks depending on half-life), then try psychedelics, (3) Attempt psychedelics on SSRIs knowing effects will be reduced. NEVER abruptly stop SSRIs - dangerous withdrawal. MDMA least likely to work on SSRIs.',
      citations: ['bonson_1996', 'preller_2017', 'hysek_2012']
    },
    lithium: {
      name: 'Lithium',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['LSD (seizure risk)', 'Psilocybin (seizure risk)', 'All psychedelics (increased risk)'],
      keyActions: [
        'Absolute contraindication - significantly increased seizure risk',
        'Multiple case reports of psychedelic + lithium seizures',
        'Do NOT discontinue lithium without psychiatric supervision',
        'Ketamine may be safer alternative but still requires caution'
      ],
      description: 'Mood stabilizing medication used primarily for bipolar disorder. Narrow therapeutic window requiring regular blood level monitoring.',
      whyItMatters: 'Lithium combined with psychedelics (especially LSD and psilocybin) has been associated with seizures in multiple case reports. The mechanism is unclear but risk is well-documented. This is one of the most concerning psychedelic drug interactions.',
      prevalenceData: 'Multiple case reports document seizures from LSD + lithium and psilocybin + lithium combinations. Exact prevalence unknown but risk considered serious.',
      substanceInteractions: [
        {
          substance: 'LSD',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - SEIZURE RISK',
          details: 'Multiple case reports of seizures from LSD + lithium. Well-documented dangerous combination.',
          citations: ['abraham_1996']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - SEIZURE RISK',
          details: 'Case reports of seizures with psilocybin + lithium. Same risk as LSD.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication',
          details: 'Likely similar seizure risk though less documented. Not recommended.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Use with Caution',
          details: 'Different mechanism. Some use in clinical settings with lithium but requires monitoring.',
          citations: []
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Absolute Contraindication',
          details: 'Same seizure risk as other serotonergic psychedelics.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'AVOID LSD and psilocybin entirely while on lithium - seizure risk', link: null },
        { name: 'Do NOT discontinue lithium without psychiatric supervision', link: null },
        { name: 'Ketamine may be considered with medical supervision', link: null },
        { name: 'Know seizure first aid if someone combines despite warnings', link: null }
      ],
      clinicalGuidance: 'Lithium is an ABSOLUTE contraindication for LSD, psilocybin, and likely all classical psychedelics due to documented seizure risk. Multiple case reports confirm this danger. Do NOT discontinue lithium to use psychedelics - lithium discontinuation can trigger manic episodes and requires psychiatric supervision. Ketamine may be a safer alternative but still requires caution and medical consultation. This is one of the most serious psychedelic drug interactions.',
      citations: ['abraham_1996']
    },
    antipsychotics: {
      name: 'Antipsychotic Medications',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Any psychedelic (antipsychotics block psychedelic effects)'],
      keyActions: [
        'Antipsychotics block or significantly reduce psychedelic effects',
        'Used as "trip killers" to terminate difficult experiences',
        'Do NOT discontinue antipsychotics without psychiatric supervision',
        'Ketamine may work better than classical psychedelics'
      ],
      description: 'Medications that block dopamine and/or serotonin receptors, including typical antipsychotics (haloperidol, chlorpromazine) and atypical antipsychotics (risperidone, olanzapine, quetiapine, aripiprazole). Used for schizophrenia, bipolar disorder, and other conditions.',
      whyItMatters: 'Antipsychotics block the serotonin 5-HT2A receptor that psychedelics activate. This means antipsychotics will reduce or completely block psychedelic effects. The primary issue is not safety but ineffectiveness. Antipsychotics are actually used clinically to terminate psychedelic experiences.',
      prevalenceData: 'Antipsychotics reduce psychedelic effects by 50-100% depending on dose and timing. Commonly used in emergency settings to end difficult trips.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Blocked Effects',
          details: 'Antipsychotics block 5-HT2A receptor, preventing psilocybin from working. May have no effect.',
          citations: ['vollenweider_1998']
        },
        {
          substance: 'LSD',
          riskLevel: 'Blocked Effects',
          details: 'Same mechanism as psilocybin - antipsychotics block LSD effects.',
          citations: ['vollenweider_1998']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Reduced Effects',
          details: 'Antipsychotics reduce but may not completely block MDMA due to its complex mechanism.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Minimal Interaction',
          details: 'Ketamine works through different receptors (NMDA). Less affected by antipsychotics.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Psychedelics likely will not work on antipsychotics', link: null },
        { name: 'Do NOT discontinue antipsychotics without psychiatric supervision - risk of psychosis', link: null },
        { name: 'Ketamine may be better option if on antipsychotics', link: null },
        { name: 'If discontinuing for psychedelic use: Requires weeks of tapering and medical monitoring', link: null },
        { name: 'Antipsychotics used clinically as "trip killers" for difficult experiences', link: null }
      ],
      clinicalGuidance: 'Antipsychotics are a relative contraindication due to pharmacological blockade. Main issue: Psychedelics likely will not work. Antipsychotics block the 5-HT2A receptor needed for psychedelic effects. Options: (1) Accept psychedelics will not work while on antipsychotics, (2) Ketamine may work better (different mechanism), (3) Discuss slow taper with psychiatrist if wanting to try psychedelics. NEVER abruptly stop antipsychotics - risk of psychotic relapse. May need weeks of tapering.',
      citations: ['vollenweider_1998']
    },
    antiretrovirals: {
      name: 'Antiretroviral Medications (HIV)',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA (complex metabolic interactions)', 'Ketamine (case reports of adverse reactions)'],
      keyActions: [
        'Continue antiretrovirals - do not discontinue',
        'MDMA has complex interactions with some ARVs',
        'Start with lower doses due to potential metabolic interactions',
        'Medical consultation recommended'
      ],
      description: 'Medications for HIV treatment including protease inhibitors (ritonavir, lopinavir), NRTIs, NNRTIs, and integrase inhibitors. Many ARVs affect liver enzyme systems that metabolize drugs.',
      whyItMatters: 'Many antiretrovirals affect cytochrome P450 enzymes that metabolize psychedelics. This can lead to higher drug levels, prolonged effects, or increased side effects. MDMA in particular has concerning interactions with ritonavir and other protease inhibitors.',
      prevalenceData: 'Limited research on psychedelic-ARV interactions. Case reports suggest increased risk of adverse effects, particularly with MDMA and protease inhibitors.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'Moderate Risk - Complex Interaction',
          details: 'Protease inhibitors (ritonavir) increase MDMA levels, potentially leading to toxicity. Use with caution and lower doses.',
          citations: ['antoniou_2002']
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Some Adverse Reactions',
          details: 'Case reports of adverse reactions. Mechanism unclear. Lower doses recommended.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Likely Safe - Limited Data',
          details: 'No major interaction expected but limited research. Start with lower doses.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Likely Safe - Limited Data',
          details: 'No major interaction expected but limited research.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Continue antiretrovirals - NEVER discontinue', link: null },
        { name: 'Start with lower doses due to potential metabolic interactions', link: null },
        { name: 'MDMA: Especially cautious with protease inhibitors - higher risk', link: null },
        { name: 'Medical consultation to review specific ARV regimen', link: null },
        { name: 'Monitor for increased or prolonged effects', link: null }
      ],
      clinicalGuidance: 'Antiretrovirals are a relative contraindication requiring caution. NEVER discontinue ARVs - HIV treatment is life-saving. Considerations: (1) Protease inhibitors (ritonavir, lopinavir) most likely to interact - especially with MDMA, (2) Start with 50-75% of typical dose, (3) Monitor for increased/prolonged effects, (4) Psilocybin and LSD likely safer than MDMA, (5) Medical consultation to review specific regimen. Limited research - proceed cautiously.',
      citations: ['antoniou_2002']
    },
    epilepsy: {
      name: 'Epilepsy / Seizure Disorder',
      overallSeverity: 'high',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['LSD (seizure reports)', 'MDMA (seizure risk)', 'High doses of any psychedelic'],
      keyActions: [
        'Seizures must be well-controlled before any consideration',
        'Medical supervision mandatory if proceeding',
        'Continue anti-seizure medications',
        'Emergency seizure protocol in place'
      ],
      description: 'A neurological disorder characterized by recurrent seizures. Includes various types: generalized tonic-clonic, absence, focal, etc. May be controlled with medication or refractory to treatment.',
      whyItMatters: 'Psychedelics can lower seizure threshold in susceptible individuals. Multiple case reports of psychedelic-induced seizures, particularly with LSD, MDMA, and when combined with certain medications (especially lithium). Risk higher with poorly controlled epilepsy.',
      prevalenceData: 'Seizures reported in <1% of psychedelic users in general population but significantly higher risk in those with epilepsy. MDMA and LSD have most seizure case reports.',
      substanceInteractions: [
        {
          substance: 'LSD',
          riskLevel: 'Absolute Contraindication - Seizure Risk',
          details: 'Multiple case reports of LSD-induced seizures, especially with lithium co-administration.',
          citations: ['abraham_1996']
        },
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication - Seizure Risk',
          details: 'Well-documented seizure risk. MDMA can lower seizure threshold.',
          citations: ['baggott_2016']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Absolute Contraindication',
          details: 'Less documented than LSD/MDMA but similar mechanism. Contraindicated in epilepsy.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Complex Effects',
          details: 'Can have both pro-convulsant and anti-convulsant effects. Requires medical supervision.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Seizures must be well-controlled (seizure-free for extended period)', link: null },
        { name: 'Continue anti-seizure medications - never discontinue', link: null },
        { name: 'Medical supervision with seizure emergency protocol', link: null },
        { name: 'AVOID lithium + psychedelic combinations (severe seizure risk)', link: null },
        { name: 'Benzodiazepines available as seizure abortive', link: null }
      ],
      clinicalGuidance: 'Epilepsy is an absolute contraindication in most contexts. If seizures are exceptionally well-controlled and consideration given: (1) Seizure-free for minimum 1+ years on stable medication, (2) Neurology clearance, (3) Continue anti-seizure medications, (4) Medical supervision with seizure emergency protocol, (5) Benzodiazepines immediately available, (6) AVOID LSD and MDMA - highest risk. Generally not recommended even with well-controlled epilepsy.',
      citations: ['abraham_1996', 'baggott_2016']
    },
    tbi: {
      name: 'Traumatic Brain Injury',
      overallSeverity: 'moderate_to_high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses', 'Recent TBI (<6 months)', 'TBI with ongoing symptoms'],
      keyActions: [
        'Severity of TBI determines risk level',
        'Recent TBI (<6 months): higher caution',
        'Post-concussion symptoms should be resolved',
        'May worsen post-TBI headaches, cognitive issues, or emotional dysregulation'
      ],
      description: 'History of head injury ranging from mild concussion to severe traumatic brain injury. May have ongoing symptoms including headaches, cognitive difficulties, mood changes, or be fully recovered.',
      whyItMatters: 'TBI can alter brain chemistry and increase vulnerability to adverse psychological effects. Some evidence psychedelics may be therapeutic for TBI, but also risk of worsening symptoms. Recent TBI (<6 months) carries higher risk. Post-TBI seizure disorder is absolute contraindication.',
      prevalenceData: 'Emerging research on psychedelics for TBI symptoms, particularly in veteran populations. Both therapeutic potential and adverse effect risk documented.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Emerging Therapeutic Research',
          details: 'Research exploring psilocybin for TBI-related depression and PTSD. Requires careful assessment.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative - PTSD Research Includes TBI',
          details: 'PTSD trials include many with TBI. May be therapeutic but requires screening.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Limited Data',
          details: 'Less research for TBI specifically. Similar considerations to psilocybin.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Used Clinically Post-TBI',
          details: 'Ketamine used in emergency medicine post-TBI. May be better tolerated.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Recent TBI (<6 months): Wait for symptom resolution', link: null },
        { name: 'If post-TBI seizures: Absolute contraindication', link: null },
        { name: 'Start with lower doses to assess tolerance', link: null },
        { name: 'Post-TBI cognitive issues may affect ability to navigate experience', link: null },
        { name: 'Therapeutic support recommended', link: null }
      ],
      clinicalGuidance: 'TBI is a relative contraindication with risk based on severity, recency, and symptoms. Recent TBI (<6 months): Wait for symptom resolution before considering. Mild TBI (concussion), fully recovered: Lower risk. Moderate-severe TBI: Higher caution. Post-TBI seizures: Absolute contraindication. Post-TBI PTSD/depression: May be therapeutic target. Assessment should include: Time since injury, symptom resolution, seizure history, cognitive function, emotional regulation.',
      citations: []
    },
    liver: {
      name: 'Liver Disease',
      overallSeverity: 'moderate_to_high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA (hepatotoxic)', 'High doses requiring extensive metabolism'],
      keyActions: [
        'Severity of liver disease determines risk',
        'MDMA particularly risky with liver disease',
        'Drugs metabolized by liver may have prolonged effects',
        'Lower doses recommended due to reduced clearance'
      ],
      description: 'Liver dysfunction ranging from mild hepatitis to cirrhosis. Includes alcoholic liver disease, hepatitis B/C, fatty liver disease, and other causes of hepatic impairment.',
      whyItMatters: 'The liver metabolizes most psychedelics. Liver disease can lead to drug accumulation, prolonged effects, and increased toxicity risk. MDMA in particular is hepatotoxic and has caused liver failure, especially when combined with pre-existing liver disease.',
      prevalenceData: 'MDMA-related liver failure documented in multiple cases. Risk significantly higher with pre-existing liver disease. Other psychedelics less hepatotoxic but metabolism still affected.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'Absolute Contraindication with Significant Liver Disease',
          details: 'MDMA is hepatotoxic. Case reports of acute liver failure. Contraindicated in moderate-severe liver disease.',
          citations: ['andreu_1998', 'ellis_1996']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Lower Doses',
          details: 'Metabolized by liver. Reduced clearance may prolong effects. Lower doses recommended.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Lower Doses',
          details: 'Metabolized by liver. May have prolonged effects with hepatic impairment.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Hepatotoxicity with Chronic Use',
          details: 'Chronic ketamine can cause liver damage but single doses lower risk. Requires caution.',
          citations: []
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'Relative - Limited Data',
          details: 'MAOIs and DMT both metabolized by liver. Limited data on safety in liver disease.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Assess liver function (LFTs, bilirubin, INR, albumin)', link: null },
        { name: 'AVOID MDMA with moderate-severe liver disease', link: null },
        { name: 'Use 50-75% of typical dose due to reduced clearance', link: null },
        { name: 'Expect prolonged effects', link: null },
        { name: 'Medical supervision for moderate-severe liver disease', link: null }
      ],
      clinicalGuidance: 'Liver disease is a relative contraindication with risk based on severity. Mild liver disease (elevated LFTs): Use lower doses, avoid MDMA. Moderate liver disease (cirrhosis Child-Pugh A-B): AVOID MDMA entirely, significantly reduce doses of other substances, medical supervision recommended. Severe liver disease (Child-Pugh C, decompensated cirrhosis): Contraindicated. MDMA carries highest risk - multiple cases of acute liver failure. Psilocybin likely safest option.',
      citations: ['andreu_1998', 'ellis_1996']
    },
    kidney: {
      name: 'Kidney Disease',
      overallSeverity: 'moderate_to_high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Ketamine (nephrotoxic with chronic use)', 'MDMA (hyponatremia risk)'],
      keyActions: [
        'Severity of kidney disease determines risk',
        'AVOID ketamine with kidney disease - nephrotoxic',
        'MDMA increases hyponatremia risk with renal impairment',
        'Monitor hydration carefully - kidney disease affects fluid balance'
      ],
      description: 'Impaired kidney function ranging from mild chronic kidney disease (CKD stage 1-2) to end-stage renal disease requiring dialysis. Includes diabetic nephropathy, hypertensive nephropathy, and other causes.',
      whyItMatters: 'Kidneys eliminate many drugs and their metabolites. Kidney disease can lead to drug accumulation and toxicity. Ketamine is particularly concerning as it causes bladder and kidney damage with chronic use. MDMA affects fluid/electrolyte balance, increasing hyponatremia risk in kidney disease.',
      prevalenceData: 'Ketamine causes kidney damage in chronic users, especially those with pre-existing kidney disease. MDMA-related hyponatremia more severe with renal impairment.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'Absolute Contraindication with Moderate-Severe CKD',
          details: 'Ketamine is nephrotoxic with chronic use. Contraindicated in significant kidney disease.',
          citations: ['morgan_2012']
        },
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Hyponatremia',
          details: 'MDMA causes hyponatremia (low sodium). Kidney disease impairs sodium regulation, increasing risk.',
          citations: ['rosenson_2007']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Monitor Hydration',
          details: 'Renally excreted. May accumulate with severe kidney disease. Ensure adequate hydration.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Lower Risk',
          details: 'Primarily hepatic metabolism. Less renal involvement. Likely safer option.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Assess kidney function (creatinine, GFR, BUN)', link: null },
        { name: 'AVOID ketamine with CKD stage 3+ (GFR <60)', link: null },
        { name: 'MDMA: Monitor sodium levels and hydration carefully', link: null },
        { name: 'Psilocybin/LSD likely safer than ketamine/MDMA', link: null },
        { name: 'Medical consultation for moderate-severe kidney disease', link: null }
      ],
      clinicalGuidance: 'Kidney disease is a relative contraindication with risk based on severity. Mild CKD (stage 1-2, GFR >60): Lower risk, avoid ketamine. Moderate CKD (stage 3, GFR 30-60): AVOID ketamine and MDMA, psilocybin/LSD with caution. Severe CKD (stage 4-5, GFR <30): Generally contraindicated. Dialysis patients: Case-by-case with nephrology consultation. Ketamine carries highest risk due to nephrotoxicity. MDMA second-highest due to hyponatremia risk.',
      citations: ['morgan_2012', 'rosenson_2007']
    },
    diabetes: {
      name: 'Diabetes',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Long sessions without blood sugar monitoring', 'MDMA (affects eating/drinking)'],
      keyActions: [
        'Monitor blood glucose before, during, and after session',
        'Have fast-acting glucose and diabetic medications available',
        'Plan for reduced food intake during session',
        'Companion should know diabetes management'
      ],
      description: 'Type 1 or Type 2 diabetes mellitus requiring medication management. Blood sugar may be well-controlled or poorly controlled.',
      whyItMatters: 'Psychedelic sessions often involve fasting or reduced food intake, potentially causing hypoglycemia. The psychedelic state may make it difficult to recognize or respond to blood sugar changes. Stress of the experience may affect glucose levels. Proper monitoring is critical.',
      prevalenceData: 'No specific psychedelic-diabetes interaction studies but blood sugar dysregulation during sessions documented. Risk manageable with proper monitoring.',
      substanceInteractions: [
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Monitor Blood Sugar',
          details: '4-6 hour duration. Monitor glucose at baseline, 2 hours, 4 hours, and after. Fast-acting glucose available.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Relative - Extended Monitoring Needed',
          details: '8-12 hour duration requires extended blood sugar monitoring. Higher logistics challenge.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative - Dehydration + Appetite Suppression',
          details: 'MDMA suppresses appetite and affects hydration. Careful glucose and hydration monitoring needed.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Relative - Shorter Duration Easier',
          details: '1-2 hour duration makes blood sugar management easier. May be better option.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Check blood glucose before session - should be well-controlled', link: null },
        { name: 'Monitor blood glucose every 2-3 hours during session', link: null },
        { name: 'Have fast-acting glucose (juice, glucose tablets) immediately available', link: null },
        { name: 'Companion trained in diabetes management and symptom recognition', link: null },
        { name: 'Continue insulin/medications but adjust for reduced food intake', link: null },
        { name: 'Medical consultation to plan insulin dosing', link: null }
      ],
      clinicalGuidance: 'Diabetes is a relative contraindication requiring preparation. Well-controlled diabetes: Manageable with proper monitoring. Poorly controlled diabetes: Should optimize control first. Protocol: (1) Medical consultation to plan medication dosing, (2) Blood glucose monitoring every 2-3 hours, (3) Fast-acting glucose and diabetic medications available, (4) Companion knows diabetes management, (5) Shorter-acting substances (ketamine) may be easier to manage. Type 1 generally higher risk than Type 2.',
      citations: []
    },
    ureteral_stenosis: {
      name: 'Ureteral Stenosis / Hydronephrosis',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Any ketamine exposure'],
      keyActions: [
        'Absolute permanent contraindication to ketamine',
        'Represents progression to kidney involvement',
        'Requires urgent urological and nephrology care',
        'Alternative psychedelics safe but condition requires medical management'
      ],
      description: 'Narrowing of the ureter(s) causing backup of urine into the kidney (hydronephrosis). In ketamine users, caused by chronic ketamine-induced inflammation and fibrosis of the urinary tract.',
      whyItMatters: 'Ureteral stenosis with hydronephrosis represents severe progression of ketamine uropathy to kidney involvement. Risk of kidney failure. Any further ketamine exposure could cause irreversible kidney damage. This is a medical emergency requiring urological intervention.',
      prevalenceData: 'Occurs in severe chronic ketamine uropathy cases, typically with very high-dose prolonged use (>3-5g/week for years). May require surgical intervention (stents, nephrostomy tubes).',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'ABSOLUTE PERMANENT CONTRAINDICATION',
          details: 'ANY ketamine exposure risks kidney failure. Ureteral stenosis indicates severe damage requiring cessation.',
          citations: ['morgan_2012']
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Safe for Urinary System',
          details: 'Psilocybin, LSD, MDMA do not cause bladder or kidney damage. Safe alternatives.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'NEVER use ketamine again - permanent contraindication', link: null },
        { name: 'Urgent urological and nephrology evaluation', link: null },
        { name: 'May require surgical intervention (ureteral stents, nephrostomy)', link: null },
        { name: 'Monitor kidney function (creatinine, GFR) closely', link: null },
        { name: 'Alternative psychedelics (psilocybin, LSD, MDMA) do not harm bladder/kidneys', link: null }
      ],
      clinicalGuidance: 'Ureteral stenosis/hydronephrosis is an ABSOLUTE PERMANENT contraindication to ketamine. Represents severe progression of ketamine uropathy with kidney involvement. Risk of kidney failure. Requires: (1) Immediate and permanent ketamine cessation, (2) Urgent urological and nephrology care, (3) Imaging to assess degree of hydronephrosis, (4) May need surgical intervention, (5) Long-term kidney function monitoring. Alternative psychedelics safe but individual requires ongoing medical management for this serious condition.',
      citations: ['morgan_2012']
    },
    age_young: {
      name: 'Young Age (18-25)',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['High doses', 'Frequent use', 'LSD (HPPD risk higher)'],
      keyActions: [
        'Brain still developing until mid-20s',
        'Higher risk of HPPD and psychological destabilization',
        'Lower doses recommended',
        'Longer intervals between uses'
      ],
      description: 'Young adults aged 18-25 whose brains are still undergoing development, particularly in prefrontal cortex and executive function areas.',
      whyItMatters: 'The brain continues developing into the mid-20s. Psychedelic use during this period may affect development, though evidence is limited. Young adults show higher rates of HPPD, psychotic reactions, and psychological destabilization. The prefrontal cortex (judgment, impulse control) is last to mature.',
      prevalenceData: 'HPPD occurs more frequently in younger users (under 25). Psychotic reactions also more common in this age group.',
      substanceInteractions: [
        {
          substance: 'LSD',
          riskLevel: 'Relative - Higher HPPD Risk',
          details: 'Young adults show higher rates of LSD-related HPPD. Use with caution.',
          citations: ['halpern_2018']
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Moderate Risk',
          details: 'Emerging adult brain may be more vulnerable. Lower doses and less frequent use recommended.',
          citations: []
        },
        {
          substance: 'MDMA',
          riskLevel: 'Relative - Neurotoxicity Concerns',
          details: 'Potential neurotoxicity may be more significant in developing brain. Limit frequency.',
          citations: []
        },
        {
          substance: 'Cannabis',
          riskLevel: 'Higher Risk in Adolescence/Young Adulthood',
          details: 'Strong evidence for cognitive effects with heavy use during brain development.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Use lower doses - developing brain may be more vulnerable', link: null },
        { name: 'Longer intervals between uses (minimum 3-6 months)', link: null },
        { name: 'Avoid frequent use - impacts on developing brain unknown', link: null },
        { name: 'Higher risk of HPPD - especially with LSD', link: null },
        { name: 'Therapeutic support helps process experiences', link: null }
      ],
      clinicalGuidance: 'Age 18-25 is a relative contraindication due to ongoing brain development. While not an absolute prohibition, young adults should: (1) Use lower doses, (2) Allow longer intervals between uses (3-6+ months), (3) Avoid frequent use, (4) Be aware of higher HPPD risk, (5) Have therapeutic support. LSD carries highest HPPD risk in this age group. Unknown if psychedelic use affects brain development - precautionary approach warranted.',
      citations: ['halpern_2018']
    },
    age_adolescent: {
      name: 'Adolescence (Under 18)',
      overallSeverity: 'high',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics in unsupervised contexts'],
      keyActions: [
        'Generally not recommended under age 18',
        'Brain in critical developmental period',
        'Exception: Supervised clinical research or therapy',
        'If proceeding: Medical/therapeutic supervision mandatory'
      ],
      description: 'Individuals under age 18 whose brains are undergoing rapid development, particularly in areas related to emotional regulation, impulse control, and risk assessment.',
      whyItMatters: 'Adolescent brain development is a critical period. Psychedelic effects on developing brains are largely unknown. Adolescents have higher rates of adverse psychological reactions and less capacity for integration. However, some clinical research explores psychedelics for adolescent treatment-resistant conditions.',
      prevalenceData: 'Most psychedelic research excludes individuals under 18. Limited data on safety in adolescents. Higher rates of psychotic reactions and HPPD when adolescents do use psychedelics.',
      substanceInteractions: [
        {
          substance: 'All Classical Psychedelics',
          riskLevel: 'Generally Not Recommended Under 18',
          details: 'Effects on adolescent brain development unknown. Higher risk of adverse reactions. Clinical research only.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Used Clinically in Adolescents',
          details: 'Ketamine used medically in adolescents for anesthesia and depression. More safety data than classical psychedelics.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Generally not recommended under age 18', link: null },
        { name: 'Exception: Supervised clinical trials or therapy for severe treatment-resistant conditions', link: null },
        { name: 'If use occurs: Medical/therapeutic supervision mandatory', link: null },
        { name: 'Parents/guardians should be involved in decision for medical use', link: null },
        { name: 'Lower doses if proceeding', link: null },
        { name: 'Integration support critical for adolescent development', link: null }
      ],
      clinicalGuidance: 'Age under 18 is generally an absolute contraindication outside clinical research. Adolescent brain in critical developmental period with unknown effects of psychedelics. Exceptions: (1) Supervised clinical trials for severe treatment-resistant conditions (depression, OCD, PTSD), (2) Therapeutic contexts with parental involvement, (3) Medical necessity after conventional treatment failure. If proceeding: Medical/therapeutic supervision mandatory, informed consent process including parents, integration support, lower doses. Ketamine has most safety data in adolescents.',
      citations: []
    },
    glaucoma: {
      name: 'Glaucoma',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Ketamine'],
      keyActions: [
        'Ophthalmology consultation before ketamine use',
        'Monitor intraocular pressure',
        'Avoid ketamine with uncontrolled glaucoma',
        'Other psychedelics likely safer alternatives'
      ],
      description: 'Glaucoma is a group of eye conditions characterized by increased intraocular pressure that damages the optic nerve, potentially leading to vision loss and blindness if untreated.',
      whyItMatters: 'Ketamine can increase intraocular pressure, potentially worsening optic nerve damage in individuals with glaucoma. This can accelerate vision loss and progression of the disease.',
      prevalenceData: 'Ketamine consistently increases intraocular pressure in both animal and human studies. The magnitude and duration of pressure elevation varies but is clinically significant in glaucoma patients.',
      substanceInteractions: [
        {
          substance: 'Ketamine',
          riskLevel: 'Relative Contraindication',
          details: 'Increases intraocular pressure through mydriasis and effects on aqueous humor dynamics. Avoid with uncontrolled glaucoma.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Generally Safe',
          details: 'Psilocybin, LSD, MDMA do not have significant effects on intraocular pressure. Likely safe alternatives.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Ophthalmology consultation before ketamine use', link: null },
        { name: 'Glaucoma must be well-controlled', link: null },
        { name: 'Consider psilocybin/LSD/MDMA as safer alternatives', link: null },
        { name: 'Monitor vision changes after use', link: null }
      ],
      clinicalGuidance: 'Glaucoma is a relative contraindication for ketamine specifically. Well-controlled glaucoma: May consider with ophthalmology clearance. Uncontrolled or advanced glaucoma: Avoid ketamine. Angle-closure glaucoma: Higher risk due to mydriasis. Other psychedelics (psilocybin, LSD, MDMA) do not affect intraocular pressure and are safer alternatives for those with glaucoma.',
      citations: []
    },
    dementia: {
      name: 'Dementia or Delirium',
      overallSeverity: 'high',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics'],
      keyActions: [
        'Cannot provide informed consent',
        'Severe worsening of confusion likely',
        'Extreme distress and behavioral disturbances possible',
        'Medical management extremely difficult'
      ],
      description: 'Dementia involves progressive cognitive decline affecting memory, thinking, and daily functioning. Delirium is acute confusion with fluctuating consciousness. Both involve compromised cognitive function and orientation.',
      whyItMatters: 'Individuals with dementia or delirium cannot understand or consent to psychedelic experiences. The profound cognitive and perceptual effects of psychedelics would cause severe distress, worsening confusion, and potentially dangerous behaviors in those unable to comprehend what is happening.',
      prevalenceData: 'No research exists on psychedelics in dementia/delirium populations. These individuals are universally excluded from psychedelic research due to ethical concerns and inability to consent.',
      substanceInteractions: [
        {
          substance: 'All Psychedelics',
          riskLevel: 'Absolute Contraindication',
          details: 'Cannot provide informed consent. Would cause severe distress, extreme confusion, dangerous behaviors. No therapeutic benefit possible.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Absolute contraindication - do not use', link: null },
        { name: 'Cannot provide informed consent', link: null },
        { name: 'Would cause extreme distress and confusion', link: null },
        { name: 'Caregiver protection if accidental exposure occurs', link: null }
      ],
      clinicalGuidance: 'Dementia and delirium are absolute contraindications to all psychedelics. Individuals cannot: (1) Provide informed consent, (2) Understand the experience, (3) Navigate psychological challenges, (4) Benefit therapeutically. Use would be unethical and dangerous, causing severe distress and potentially accelerating cognitive decline. If accidental exposure: Supportive care, minimize stimulation, benzodiazepines for severe agitation, medical monitoring.',
      citations: []
    },
    malnourishment: {
      name: 'Malnourishment',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['All psychedelics without medical optimization'],
      keyActions: [
        'Medical evaluation including bloodwork',
        'Correct electrolyte imbalances before use',
        'Optimize nutritional status first',
        'Medical supervision recommended'
      ],
      description: 'Severe nutritional deficiency resulting from inadequate food intake, malabsorption, or eating disorders. Leads to electrolyte imbalances, weakened physiological reserves, and compromised organ function.',
      whyItMatters: 'Malnourishment creates multiple vulnerabilities during psychedelic experiences: electrolyte imbalances affecting cardiac function, reduced metabolic capacity, impaired drug metabolism, increased dehydration risk, and reduced ability to handle physiological stress.',
      prevalenceData: 'No specific research on psychedelics in malnourished populations. Electrolyte imbalances are known risk factors for complications, particularly with MDMA (hyponatremia) and ibogaine (cardiac arrhythmias).',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'High Risk',
          details: 'Electrolyte imbalances increase hyponatremia risk. Dehydration compounds risks. Requires medical evaluation.',
          citations: []
        },
        {
          substance: 'Ibogaine',
          riskLevel: 'Absolute Contraindication',
          details: 'Hypokalemia and hypomagnesemia dramatically increase cardiac arrhythmia risk. Must correct before use.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Relative - Requires Optimization',
          details: 'Reduced physiological reserves and unpredictable metabolism. Optimize nutrition and correct imbalances first.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Medical evaluation with comprehensive metabolic panel', link: null },
        { name: 'Correct electrolyte imbalances (especially K, Mg, Na)', link: null },
        { name: 'Optimize nutritional status over weeks before use', link: null },
        { name: 'Medical supervision during session', link: null },
        { name: 'Ensure adequate hydration', link: null }
      ],
      clinicalGuidance: 'Malnourishment is a relative contraindication requiring medical optimization. Pre-session: (1) Comprehensive metabolic panel, (2) Correct electrolyte abnormalities, (3) Nutritional rehabilitation, (4) Medical clearance. Severe malnourishment: Delay psychedelic use until nutritional status improved. Eating disorders: Address underlying condition and ensure medical/psychological support. MDMA and ibogaine carry highest risks.',
      citations: []
    },
    organic_brain_disorder: {
      name: 'Organic-Toxic Cerebral Disorder',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['All psychedelics'],
      keyActions: [
        'Absolute contraindication',
        'Unpredictable and dangerous neurological reactions',
        'Risk of severe confusion, delirium, seizures',
        'Potential for permanent worsening'
      ],
      description: 'Organic brain disorders involve structural or metabolic brain dysfunction from toxins, infections, trauma, degenerative diseases, or other physical causes. Includes toxic encephalopathy, post-infection syndromes, and metabolic brain disorders.',
      whyItMatters: 'The brain is already compromised by structural or metabolic dysfunction. Psychedelics\' complex neurochemical effects on damaged neural tissue create unpredictable and potentially catastrophic outcomes including severe confusion, seizures, permanent cognitive decline, and medical emergencies.',
      prevalenceData: 'No research exists in this population due to ethical concerns and exclusion from all psychedelic studies. Case reports suggest severe adverse reactions when individuals with organic brain disorders use psychedelics.',
      substanceInteractions: [
        {
          substance: 'All Psychedelics',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Compromised brain cannot process psychedelic effects. Risk of severe delirium, seizures, permanent damage, medical emergencies.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'ABSOLUTE CONTRAINDICATION - do not use', link: null },
        { name: 'Compromised brain cannot safely process psychedelics', link: null },
        { name: 'Risk of permanent worsening', link: null },
        { name: 'If accidental exposure: Emergency medical care immediately', link: null }
      ],
      clinicalGuidance: 'Organic-toxic cerebral disorders are an ABSOLUTE contraindication to all psychedelics. The structurally or metabolically compromised brain cannot safely process psychedelic effects. Risks: Severe delirium, uncontrollable confusion, seizures, cardiovascular instability, permanent neurological damage, death. There are no circumstances under which psychedelic use is appropriate in this population. If accidental exposure: Emergency medical evaluation, supportive care, seizure precautions.',
      citations: []
    },
    low_bmi: {
      name: 'Low BMI (Underweight)',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA (particularly in females)'],
      keyActions: [
        'Higher plasma drug concentrations per kg body weight',
        'Increased hyponatremia risk with MDMA',
        'Consider dose adjustment',
        'Monitor fluid/electrolyte balance closely'
      ],
      description: 'Body mass index (BMI) below 18.5, indicating underweight status. May result from eating disorders, malnutrition, or constitutional factors.',
      whyItMatters: 'Lower body weight leads to higher drug concentrations per kilogram. With MDMA specifically, lower BMI (particularly in females) is associated with significantly higher risk of life-threatening hyponatremia (low sodium) due to higher plasma MDMA concentrations and smaller total body water volume.',
      prevalenceData: 'Studies show lower BMI, especially in females, associated with higher incidence of MDMA-related hyponatremia. Women with lower BMI reach higher plasma MDMA concentrations at equivalent doses.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Especially in Females',
          details: 'Higher plasma concentrations lead to increased hyponatremia risk. Females with low BMI particularly vulnerable to fatal hyponatremia.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Relative - Dose Consideration',
          details: 'Higher drug concentrations at standard doses. May consider dose adjustment based on body weight.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'MDMA: Reduce dose to account for body weight', link: null },
        { name: 'Strict fluid restriction with MDMA (no more than 250-500ml per hour)', link: null },
        { name: 'Monitor for hyponatremia symptoms (confusion, headache, nausea)', link: null },
        { name: 'Medical evaluation if BMI <17 or eating disorder present', link: null },
        { name: 'Consider weight-based dosing for all substances', link: null }
      ],
      clinicalGuidance: 'Low BMI is a relative contraindication, particularly for MDMA. BMI <18.5: Reduce MDMA dose by 20-30%, strict fluid restriction, monitor closely. BMI <17 or eating disorder: Medical evaluation first, optimize nutritional status. Females with low BMI: Highest hyponatremia risk - consider avoiding MDMA or using lowest doses with strict monitoring. Other psychedelics: Consider weight-based dosing but lower risk than MDMA.',
      citations: []
    },
    cyp2d6_poor: {
      name: 'CYP2D6 Poor Metabolizer',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA at standard doses'],
      keyActions: [
        'Genetic testing can identify poor metabolizer status',
        'MDMA reaches much higher levels - requires major dose reduction',
        'Prolonged effects and increased toxicity risk',
        'Consider alternative substances'
      ],
      description: 'Genetic polymorphism in the CYP2D6 enzyme that metabolizes MDMA and other drugs. Poor metabolizers (5-10% of Caucasians, varies by ethnicity) have greatly reduced enzyme activity.',
      whyItMatters: 'CYP2D6 is the primary enzyme that breaks down MDMA. Poor metabolizers cannot efficiently metabolize MDMA, leading to dramatically higher plasma concentrations, prolonged effects, and greatly increased risk of toxicity including hyperthermia, serotonin syndrome, and neurotoxicity even at "normal" doses.',
      prevalenceData: 'Approximately 5-10% of Caucasians are CYP2D6 poor metabolizers. Prevalence varies by ethnicity. Poor metabolizers reach 2-3 times higher MDMA concentrations than normal metabolizers at the same dose.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Requires Major Dose Reduction or Avoidance',
          details: 'Poor metabolizers reach 2-3x higher MDMA levels. Greatly increased toxicity risk. Require 50-70% dose reduction or should avoid entirely.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Generally Safe',
          details: 'Most psychedelics not primarily metabolized by CYP2D6. Less concern with psilocybin, LSD, ketamine.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Consider genetic testing before MDMA use', link: null },
        { name: 'If poor metabolizer: Reduce MDMA dose by 50-70% or avoid entirely', link: null },
        { name: 'Increased monitoring for hyperthermia and toxicity', link: null },
        { name: 'Be aware of drug interactions that inhibit CYP2D6', link: null },
        { name: 'Consider alternative psychedelics (psilocybin, LSD)', link: null }
      ],
      clinicalGuidance: 'CYP2D6 poor metabolizer status is a relative contraindication for MDMA specifically. Genetic testing available through commercial services. If poor metabolizer: (1) Safest option: Avoid MDMA entirely, (2) If proceeding: Reduce dose by 50-70%, monitor closely for hyperthermia and serotonin syndrome, (3) Be aware many medications inhibit CYP2D6 creating similar effect. Other psychedelics generally safe as not primarily metabolized by CYP2D6.',
      citations: []
    },
    older_adult: {
      name: 'Older Adults (Over 65)',
      overallSeverity: 'moderate',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['Polypharmacy interactions', 'Undiagnosed cardiovascular disease'],
      keyActions: [
        'Comprehensive medical evaluation essential',
        'Review all medications for interactions',
        'Cardiovascular screening important',
        'Limited research in this age group',
        'Lower doses may be appropriate'
      ],
      description: 'Individuals over age 65 face unique vulnerabilities including higher prevalence of medical conditions, age-related changes in drug metabolism, multiple medications, and less physiological reserve.',
      whyItMatters: 'Older adults have higher rates of cardiovascular disease, take more medications (increasing interaction risks), metabolize drugs differently, have reduced physiological reserves, and are under-studied in psychedelic research making safety profile less certain.',
      prevalenceData: 'Most psychedelic research excludes individuals over 65. Limited data suggests possible benefits but also higher medical complication rates. First ayahuasca use at older age increases risk of adverse physical effects.',
      substanceInteractions: [
        {
          substance: 'All Psychedelics',
          riskLevel: 'Relative - Requires Medical Evaluation',
          details: 'Higher cardiovascular risk, polypharmacy interactions, altered metabolism. Comprehensive screening essential.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Comprehensive medical evaluation including cardiac screening', link: null },
        { name: 'Review all medications for interactions', link: null },
        { name: 'Blood pressure and cardiovascular monitoring during session', link: null },
        { name: 'Consider lower doses due to altered metabolism', link: null },
        { name: 'Fall prevention measures during altered states', link: null },
        { name: 'Medical supervision strongly recommended', link: null }
      ],
      clinicalGuidance: 'Age over 65 is a relative contraindication requiring careful evaluation. Pre-session assessment: (1) Comprehensive medical history and examination, (2) ECG and cardiovascular evaluation, (3) Review of all medications for interactions, (4) Cognitive assessment, (5) Discussion of goals and expectations. Lower doses may be appropriate. Medical supervision during sessions strongly recommended. Higher risk individuals: Those with multiple medical conditions, polypharmacy, cardiovascular disease. Limited research means safety profile less established.',
      citations: []
    },
    snri: {
      name: 'SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors)',
      overallSeverity: 'high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA (serotonin syndrome risk)', 'High doses of serotonergic psychedelics'],
      keyActions: [
        'SNRIs reduce or block psychedelic effects',
        'Higher serotonin syndrome risk than SSRIs',
        'Severe hypertension possible',
        'Medical supervision required if combining',
        'Taper off SNRIs with medical supervision before psychedelic use'
      ],
      description: 'SNRIs (venlafaxine/Effexor, duloxetine/Cymbalta, desvenlafaxine/Pristiq) block reuptake of both serotonin and norepinephrine, used for depression, anxiety, and chronic pain.',
      whyItMatters: 'SNRIs create dual risks: (1) Blocking serotonin reuptake increases serotonin syndrome risk when combined with psychedelics, (2) Norepinephrine effects increase hypertension risk, (3) May reduce or block psychedelic therapeutic effects. The dual mechanism creates more cardiovascular concern than SSRIs alone.',
      prevalenceData: 'Similar to SSRIs, SNRIs reduce psychedelic effects by 30-70%. Serotonin syndrome risk appears higher than with SSRIs due to additional norepinephrine effects. Severe hypertensive responses documented.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Serotonin Syndrome + Hypertension',
          details: 'Significant serotonin syndrome risk. Severe hypertension from dual serotonergic and noradrenergic effects. Generally should not combine.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Reduced Efficacy + Serotonin Syndrome Risk',
          details: 'SNRIs reduce psilocybin effects significantly. Serotonin syndrome possible. Severe blood pressure spikes reported.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Reduced Efficacy + Serotonin Syndrome Risk',
          details: 'SNRIs block LSD effects. Serotonin syndrome and hypertension risks.',
          citations: []
        },
        {
          substance: 'Ayahuasca',
          riskLevel: 'High Risk',
          details: 'MAOI component of ayahuasca creates very high serotonin syndrome risk with SNRIs. Contraindicated.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Minimal Interaction',
          details: 'Ketamine not serotonergic. SNRIs do not significantly interact. Safe alternative.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'SNRIs reduce psychedelic effects while increasing risks', link: null },
        { name: 'If tapering: Medical supervision REQUIRED - withdrawal can be severe', link: null },
        { name: 'Taper timeframe: 4-8 weeks depending on dose and duration of use', link: null },
        { name: 'Higher serotonin syndrome risk than SSRIs', link: null },
        { name: 'Monitor blood pressure closely if combining', link: null },
        { name: 'Ketamine unaffected - good alternative for those on SNRIs', link: null }
      ],
      clinicalGuidance: 'SNRIs are a relative contraindication with higher risk than SSRIs. Main issues: (1) Block psychedelic effects, (2) Higher serotonin syndrome risk, (3) Severe hypertension possible from norepinephrine effects. Options: (1) Stay on SNRIs, use ketamine (unaffected), (2) Slow taper with medical supervision (4-8 weeks), (3) Attempt psychedelics knowing effects reduced and risks increased. NEVER abruptly stop SNRIs. AVOID combining with MDMA or ayahuasca. More dangerous than SSRIs.',
      citations: []
    },
    triptans: {
      name: 'Triptans (Migraine Medications)',
      overallSeverity: 'high',
      contraindicationType: 'relative',
      mostDangerousCombinations: ['MDMA', 'Psilocybin', 'LSD'],
      keyActions: [
        'Discontinue triptans before psychedelic use',
        'Allow washout period (24-48 hours minimum)',
        'Serotonin syndrome risk',
        'Severe vasoconstriction possible',
        'Medical consultation recommended'
      ],
      description: 'Triptans (sumatriptan/Imitrex, rizatriptan/Maxalt, zolmitriptan, etc.) are serotonin 5-HT1B/1D receptor agonists used for acute migraine treatment.',
      whyItMatters: 'Triptans are serotonergic drugs that when combined with psychedelics create risk of serotonin syndrome. Additionally, the combination of vasoconstriction from triptans plus psychedelic cardiovascular effects creates concern for severe vascular complications.',
      prevalenceData: 'Limited research on triptan-psychedelic interactions. Theoretical risk of serotonin syndrome based on mechanism. Case reports of adverse reactions when combined.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'High Risk - Serotonin Syndrome',
          details: 'MDMA plus triptan increases serotonin syndrome risk. Severe vasoconstriction possible. Should not combine.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Moderate Risk',
          details: 'Both serotonergic. Risk of serotonin syndrome. Discontinue triptan 24-48 hours before use.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Moderate Risk',
          details: 'Serotonin syndrome risk. Unpredictable receptor interactions. Avoid combination.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Likely Safe',
          details: 'Different mechanism. No expected interaction. Likely safe alternative.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Discontinue triptans 24-48 hours before psychedelic use', link: null },
        { name: 'Do not take triptan for migraine during psychedelic session', link: null },
        { name: 'If severe migraine: Delay psychedelic use', link: null },
        { name: 'Medical consultation about safe washout period', link: null },
        { name: 'Alternative migraine treatments during sessions (ibuprofen, caffeine)', link: null }
      ],
      clinicalGuidance: 'Triptans are a relative contraindication requiring washout before psychedelic use. Protocol: (1) Discontinue triptan 24-48 hours before session (varies by triptan half-life), (2) Do not use triptan during or immediately after session, (3) If prone to migraines during psychedelic sessions: Use non-serotonergic alternatives (NSAIDs, caffeine, magnesium). Chronic daily triptan use: Medical consultation required. Ketamine likely safe alternative. Highest risk with MDMA.',
      citations: []
    },
    stimulants: {
      name: 'Stimulants (Cocaine, Methamphetamine)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['MDMA + stimulants', 'Any psychedelic + stimulants'],
      keyActions: [
        'ABSOLUTE CONTRAINDICATION',
        'Severe cardiovascular stress',
        'Extreme hyperthermia risk',
        'Neurotoxicity greatly increased',
        'Multiple fatalities documented'
      ],
      description: 'Concurrent use of stimulant drugs including cocaine, methamphetamine, or prescription stimulants with psychedelics.',
      whyItMatters: 'Combining psychedelics with stimulants creates catastrophic physiological stress: extreme tachycardia and hypertension, severe hyperthermia (especially with MDMA), dramatically increased neurotoxicity, risk of cardiac arrest, stroke, seizures, and death. This is one of the most dangerous drug combinations.',
      prevalenceData: 'Polysubstance use with stimulants is leading cause of psychedelic-related fatalities. MDMA + stimulant combinations have caused multiple deaths from cardiovascular collapse and hyperthermia.',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'EXTREMELY DANGEROUS - POTENTIALLY FATAL',
          details: 'MDMA + cocaine or meth = severe hyperthermia, cardiac events, neurotoxicity, death. Multiple fatalities documented.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Dangerous - Severe Cardiovascular Stress',
          details: 'Combined sympathetic activation causes dangerous tachycardia and hypertension. Risk of cardiac events.',
          citations: []
        },
        {
          substance: 'LSD',
          riskLevel: 'Dangerous - Cardiovascular + Psychological',
          details: 'Cardiovascular stress plus unpredictable psychological interactions. Severe anxiety and panic possible.',
          citations: []
        },
        {
          substance: 'Ketamine',
          riskLevel: 'Very Dangerous',
          details: 'Ketamine + stimulants increases lethal effects. Severe cardiovascular strain.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'NEVER combine psychedelics with stimulants', link: null },
        { name: 'If stimulant use disorder: Address before psychedelic use', link: null },
        { name: 'Allow minimum 24-48 hours after stimulant use', link: null },
        { name: 'If accidental combination: Emergency medical care immediately', link: null },
        { name: 'Recognize symptoms: Severe chest pain, extreme anxiety, hyperthermia', link: null }
      ],
      clinicalGuidance: 'Stimulant combinations are an ABSOLUTE contraindication to all psychedelics. Mechanisms of harm: (1) Extreme cardiovascular stress from dual sympathetic activation, (2) Severe hyperthermia especially with MDMA, (3) Dramatically increased neurotoxicity, (4) Risk of cardiac arrest, stroke, seizures. If active stimulant use disorder: Must address before considering psychedelics. Minimum 24-48 hour gap if recent use. If combination occurs: Emergency medical evaluation immediately. This is one of the most lethal drug combinations.',
      citations: []
    },
    opioids: {
      name: 'Opioids',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Ibogaine + methadone (FATAL)', 'Ibogaine + any long-acting opioids'],
      keyActions: [
        'ABSOLUTE contraindication with ibogaine',
        'Complete opioid detoxification required before ibogaine',
        'Methadone specifically dangerous - inhibits ibogaine metabolism',
        'Risk of precipitated withdrawal and cardiac events',
        'Other psychedelics: relative contraindication'
      ],
      description: 'Concurrent use of opioid medications or drugs including heroin, fentanyl, methadone, buprenorphine, oxycodone, hydrocodone.',
      whyItMatters: 'Ibogaine has deadly interactions with opioids, especially methadone. Methadone inhibits CYP2D6 enzyme that metabolizes ibogaine, causing dangerous accumulation and cardiac toxicity. Ibogaine can also precipitate severe opioid withdrawal during the vulnerable psychedelic state.',
      prevalenceData: 'Multiple fatalities documented from ibogaine + opioid combinations, particularly methadone. Ibogaine-related deaths often involve concurrent opioid use.',
      substanceInteractions: [
        {
          substance: 'Ibogaine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION - FATAL RISK',
          details: 'Methadone inhibits ibogaine metabolism causing toxic accumulation. Cardiac arrhythmias, QT prolongation, death. Complete opioid detox required.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Relative Contraindication',
          details: 'Respiratory depression risk. Altered consciousness during opioid use. Generally not recommended to combine.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'NEVER use ibogaine with any opioids - FATAL', link: null },
        { name: 'Ibogaine requires complete opioid detoxification first', link: null },
        { name: 'Methadone: Minimum 3-7 days washout before ibogaine', link: null },
        { name: 'Short-acting opioids: Minimum 24-48 hours before ibogaine', link: null },
        { name: 'Medical supervision mandatory for opioid detox before ibogaine', link: null },
        { name: 'Other psychedelics: Avoid combining with opioid use', link: null }
      ],
      clinicalGuidance: 'Opioids are an ABSOLUTE contraindication for ibogaine. Methadone specifically inhibits CYP2D6, causing ibogaine accumulation and fatal cardiac toxicity. Complete opioid detoxification required before ibogaine: Methadone requires 3-7+ days, short-acting opioids 24-48 hours, medical supervision essential. Ibogaine can precipitate severe withdrawal. Other psychedelics: Relative contraindication. Concurrent opioid use during psychedelic sessions not recommended due to respiratory depression risk and altered consciousness. If treating opioid use disorder: Ibogaine requires specialized medical protocol.',
      citations: []
    },
    qt_prolonging_meds: {
      name: 'QT-Prolonging Medications',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Ibogaine + any QT-prolonging drug'],
      keyActions: [
        'ABSOLUTE contraindication with ibogaine',
        'Review all medications for QT effects',
        'ECG required before ibogaine use',
        'Many common medications prolong QT',
        'Other psychedelics: relative concern'
      ],
      description: 'Medications that prolong the QT interval on ECG, affecting cardiac repolarization. Includes certain antibiotics, antipsychotics, antidepressants, antihistamines, anti-arrhythmics, and others.',
      whyItMatters: 'QT prolongation creates vulnerability to Torsades de Pointes, a potentially fatal arrhythmia. When multiple QT-prolonging agents are combined, effects are additive or synergistic. Ibogaine significantly prolongs QT; adding other QT-prolonging drugs creates extreme arrhythmia risk.',
      prevalenceData: 'Ibogaine causes QT prolongation in nearly all users, with 50% reaching clinically significant levels (>500ms). Combining with other QT-prolonging agents dramatically increases fatal arrhythmia risk.',
      substanceInteractions: [
        {
          substance: 'Ibogaine',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Ibogaine causes significant QT prolongation. Adding other QT-prolonging drugs creates extreme Torsades risk. Fatal arrhythmias documented.',
          citations: []
        },
        {
          substance: 'Psilocybin',
          riskLevel: 'Relative - Mild QT Effects',
          details: 'Psilocybin shows mild QT effects. Those on QT-prolonging meds should have ECG monitoring.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Generally Lower Risk',
          details: 'Most other psychedelics do not significantly affect QT interval.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'NEVER combine ibogaine with QT-prolonging medications', link: null },
        { name: 'Review medication list for QT effects before psychedelic use', link: null },
        { name: 'Common QT-prolonging drugs: Macrolide antibiotics, azole antifungals, fluoroquinolones, antipsychotics, some antidepressants', link: null },
        { name: 'ECG required before ibogaine - baseline QTc must be <450ms', link: null },
        { name: 'Medical consultation to review medication alternatives', link: null }
      ],
      clinicalGuidance: 'QT-prolonging medications are an ABSOLUTE contraindication for ibogaine. Common QT-prolonging drugs: Antibiotics (azithromycin, ciprofloxacin), antipsychotics (haloperidol, quetiapine, ziprasidone), antidepressants (citalopram), antihistamines (diphenhydramine in high doses), anti-arrhythmics (amiodarone, sotalol). Ibogaine requires: (1) Review of all medications, (2) Baseline ECG with QTc <450ms, (3) Discontinuation of QT-prolonging drugs if possible. Psilocybin: Relative concern with ECG monitoring recommended. Consultation with cardiologist or pharmacist to review medications.',
      citations: []
    },
    high_temperature: {
      name: 'High Temperature Environments',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['MDMA in hot clubs/festivals with dancing'],
      keyActions: [
        'ABSOLUTE contraindication for MDMA in hot environments',
        'Severe hyperthermia - leading cause of MDMA deaths',
        'Avoid dancing/exertion in heat on MDMA',
        'Ambient temperature control essential',
        'Immediate cooling if hyperthermia occurs'
      ],
      description: 'Use of MDMA in high-temperature environments such as crowded clubs, music festivals, or hot ambient conditions, especially combined with physical exertion like dancing.',
      whyItMatters: 'MDMA impairs the body\'s ability to regulate temperature while simultaneously increasing metabolic heat production. In hot environments with exertion, this leads to severe hyperthermia (body temperature >40°C/104°F), a medical emergency causing organ failure and death. This is the leading cause of MDMA-related fatalities.',
      prevalenceData: 'Hyperthermia is one of the most common causes of MDMA-related emergency room visits and deaths. Risk dramatically elevated in hot, crowded environments with dancing. Core temperatures can reach fatal levels (>42°C).',
      substanceInteractions: [
        {
          substance: 'MDMA',
          riskLevel: 'ABSOLUTE CONTRAINDICATION in Hot Environments',
          details: 'MDMA in heat with exertion = severe hyperthermia, organ failure, DIC, rhabdomyolysis, death. Leading cause of MDMA fatalities.',
          citations: []
        },
        {
          substance: 'Other Psychedelics',
          riskLevel: 'Lower Risk but Still Caution',
          details: 'Other psychedelics have less thermoregulatory impact but heat still concerning. Hydration and cooling important.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'AVOID MDMA in hot clubs, festivals, or high ambient temperature', link: null },
        { name: 'If using MDMA: Climate-controlled environment only', link: null },
        { name: 'Limit physical exertion and dancing on MDMA', link: null },
        { name: 'Take cooling breaks every 30 minutes', link: null },
        { name: 'Moderate fluid intake (250-500ml per hour - not excessive)', link: null },
        { name: 'Recognize hyperthermia: confusion, hot dry skin, rapid pulse', link: null },
        { name: 'If hyperthermia: Stop activity, cool environment, wet towels, emergency services', link: null }
      ],
      clinicalGuidance: 'High temperature environments are an ABSOLUTE contraindication for MDMA use. MDMA impairs hypothalamic temperature regulation while increasing metabolic heat. In hot environments with dancing: (1) Core temperature rises uncontrollably, (2) Risk of severe hyperthermia >40-42°C, (3) Complications: DIC, rhabdomyolysis, acute kidney injury, liver failure, seizures, cerebral edema, death. This is the primary mechanism of MDMA-related deaths at raves and festivals. MDMA should only be used in climate-controlled environments with minimal exertion. If hyperthermia develops: Medical emergency - immediate cooling and emergency services.',
      citations: []
    },
    tyramine_foods: {
      name: 'Tyramine-Rich Foods (with MAOIs)',
      overallSeverity: 'critical',
      contraindicationType: 'absolute',
      mostDangerousCombinations: ['Aged cheese, cured meats, fermented foods while on MAOIs/ayahuasca'],
      keyActions: [
        'ABSOLUTE contraindication when on MAOIs',
        'Causes hypertensive crisis',
        'Strict dietary restrictions required with ayahuasca',
        'Avoid aged, fermented, or spoiled foods',
        'Medical emergency if hypertensive crisis occurs'
      ],
      description: 'Consumption of tyramine-rich foods (aged cheeses, cured/processed meats, fermented foods, aged/spoiled foods, certain alcohols) while using ayahuasca or other MAOI-containing substances.',
      whyItMatters: 'MAOIs (including harmala alkaloids in ayahuasca) prevent breakdown of tyramine. Dietary tyramine normally metabolized in gut by MAO cannot be broken down, reaches systemic circulation, and triggers massive norepinephrine release causing severe, life-threatening hypertension (hypertensive crisis) that can lead to stroke, intracranial hemorrhage, or cardiac events.',
      prevalenceData: 'Hypertensive crises from tyramine + MAOI combinations are well-documented in psychiatric medication literature. Risk applies equally to ayahuasca\'s natural MAOIs. Strokes and deaths have occurred from dietary non-compliance.',
      substanceInteractions: [
        {
          substance: 'Ayahuasca',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Harmala alkaloids in ayahuasca are MAOIs. Tyramine causes hypertensive crisis, stroke risk. Strict diet required.',
          citations: []
        },
        {
          substance: 'Pharmaceutical MAOIs',
          riskLevel: 'ABSOLUTE CONTRAINDICATION',
          details: 'Same mechanism as ayahuasca. Tyramine causes dangerous hypertension. Well-known drug-food interaction.',
          citations: []
        }
      ],
      harmReduction: [
        { name: 'Strict tyramine-free diet required with ayahuasca/MAOIs', link: null },
        { name: 'AVOID: Aged cheeses, cured meats, fermented foods (sauerkraut, soy sauce, miso), aged/spoiled foods, tap beer, red wine', link: null },
        { name: 'Start diet 24-48 hours before ayahuasca ceremony', link: null },
        { name: 'Continue diet for 12-24 hours after ceremony', link: null },
        { name: 'Recognize hypertensive crisis: Severe headache, chest pain, rapid pulse, sweating, nausea', link: null },
        { name: 'If hypertensive crisis: Emergency medical services immediately', link: null }
      ],
      clinicalGuidance: 'Tyramine-rich foods are an ABSOLUTE contraindication when using MAOIs (ayahuasca, pharmaceutical MAOIs). Mechanism: MAOIs prevent tyramine breakdown → systemic tyramine accumulation → massive norepinephrine release → hypertensive crisis. Required diet: AVOID aged cheeses (aged >2 months), cured/processed meats (salami, pepperoni, aged sausage), fermented foods (sauerkraut, kimchi, soy sauce, miso), aged/spoiled/improperly stored foods, broad beans, tap beer, red wine, Chianti. Start 24-48 hours before ceremony, continue 12-24 hours after. If hypertensive crisis: Medical emergency - requires rapid blood pressure lowering to prevent stroke.',
      citations: []
    }
  };

  const filteredCategories = useMemo(() => {
    let categories = conditionCategories;
    
    if (selectedCategory !== 'all') {
      categories = categories.filter(cat => cat.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      categories = categories.map(category => ({
        ...category,
        conditions: category.conditions.filter(condition => {
          const nameMatch = condition.name.toLowerCase().includes(lowerQuery);
          const descMatch = condition.shortDesc.toLowerCase().includes(lowerQuery);
          const searchTermsMatch = condition.searchTerms.some(term => 
            term.toLowerCase().includes(lowerQuery)
          );
          return nameMatch || descMatch || searchTermsMatch;
        })
      })).filter(category => category.conditions.length > 0);
    }
    
    return categories;
  }, [searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'critical': return <AlertCircle className="w-5 h-5" />;
      case 'high': return <Zap className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const getSeverityBadgeColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const ConditionBrowser = () => {
    const hasSearchResults = filteredCategories.length > 0;
    const isSearching = searchQuery.trim().length > 0;
    const totalConditions = conditionCategories.reduce((acc, cat) => acc + cat.conditions.length, 0);

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-[#F4B63A] text-white rounded-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.1)] p-8 md:p-12">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'Satoshi, sans-serif'}}>
                Medical Condition Explorer
              </h1>
              <p className="text-xl md:text-2xl text-[#8B6914]" style={{fontFamily: 'Inter, sans-serif'}}>
                Find drug interactions and contraindications for psychedelic substances
              </p>
            </div>
            <button
              onClick={() => openFeedbackModal('Medical Conditions - Propose Addition or Edit')}
              className="px-6 py-4 bg-white hover:bg-[#FFF9F5] text-[#F4B63A] rounded-[12px] font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              <Edit3 className="w-5 h-5" />
              <span className="hidden sm:inline">Propose Addition or Edit</span>
              <span className="sm:hidden">Suggest Edit</span>
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4E4E4E] w-6 h-6" />
            <input
              type="text"
              placeholder="Try: 'SSRI', 'high blood pressure', 'pregnancy', 'bipolar'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-white text-[#2C1B11] rounded-[12px] text-lg focus:ring-4 focus:ring-[#FFD480] focus:outline-none shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              style={{fontFamily: 'Inter, sans-serif'}}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4E4E4E] hover:text-[#6C3000] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Sticky Category Tabs */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E8D9C8] overflow-hidden sticky top-0 z-10">
          <div className="border-b border-[#E8D9C8] overflow-x-auto">
            <div className="flex px-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  selectedCategory === 'all'
                    ? 'border-[#FCA300] text-[#D26600] bg-[#FEEAD8]'
                    : 'border-transparent text-[#4E4E4E] hover:text-[#2C1B11] hover:bg-[#FFF9F5]'
                }`}
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                All ({totalConditions})
              </button>
              {conditionCategories.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    selectedCategory === cat.category
                      ? 'border-[#FCA300] text-[#D26600] bg-[#FEEAD8]'
                      : 'border-transparent text-[#4E4E4E] hover:text-[#2C1B11] hover:bg-[#FFF9F5]'
                  }`}
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  <span className="text-xl mr-2">{cat.icon}</span>
                  {cat.category} ({cat.conditions.length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {isSearching && !hasSearchResults && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-[24px] p-6 text-center">
            <p className="text-[#2C1B11] mb-2" style={{fontFamily: 'Inter, sans-serif'}}>No conditions found for "{searchQuery}"</p>
            <button
              onClick={clearSearch}
              className="text-[#D26600] hover:text-[#FCA300] font-medium text-sm"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Clear search
            </button>
          </div>
        )}

        {/* Conditions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCategories.map((cat) =>
            cat.conditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => setSelectedCondition(condition.id)}
                className="text-left p-6 bg-white border-2 border-[#E8D9C8] rounded-[24px] hover:border-[#FCA300] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-all duration-200 group relative overflow-hidden"
              >
                {/* Category Color Accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${
                  cat.category === 'Cardiovascular' ? 'bg-red-500' :
                  cat.category === 'Psychiatric' ? 'bg-[#0D4038]' :
                  cat.category === 'Medications' ? 'bg-[#FCA300]' :
                  cat.category === 'Neurological' ? 'bg-yellow-500' :
                  cat.category === 'Other Medical' ? 'bg-[#0D4038]' :
                  'bg-[#4E4E4E]'
                }`}></div>
                
                {/* Risk Badge - Prominent */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border-2 flex-shrink-0 ${getSeverityBadgeColor(condition.severity)}`}>
                    {getSeverityIcon(condition.severity)}
                    <span className="uppercase tracking-wide">{condition.severity}</span>
                  </div>
                </div>

                <div className="flex items-start mb-3 pl-2">
                  <span className="text-3xl mr-3 flex-shrink-0">{cat.icon}</span>
                  <h4 className="font-bold text-xl text-[#2C1B11] group-hover:text-[#D26600] leading-tight transition-colors flex-1" style={{fontFamily: 'Satoshi, sans-serif'}}>
                    {condition.name}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openFeedbackModal(`Condition: ${condition.name}`);
                    }}
                    className="p-1.5 hover:bg-[#E6F7F4] rounded-[8px] transition-colors text-[#007F6E] flex-shrink-0"
                    title="Suggest edit for this condition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-sm text-[#4E4E4E] leading-relaxed mb-4 pl-2" style={{fontFamily: 'Inter, sans-serif'}}>{condition.shortDesc}</p>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-xs text-[#4E4E4E] mb-3 pl-2" style={{fontFamily: 'Inter, sans-serif'}}>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-semibold">{condition.contraindications} contraindications</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Info className="w-4 h-4 text-[#D26600]" />
                    <span>{condition.substancesAffected} substances</span>
                  </div>
                </div>

                {/* Critical Interaction Preview */}
                <div className="bg-red-50 border border-red-200 rounded-[12px] p-3 mb-3 pl-2">
                  <div className="text-xs font-semibold text-red-900 mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Most Critical:</div>
                  <div className="text-xs text-red-800" style={{fontFamily: 'Inter, sans-serif'}}>{condition.criticalInteraction}</div>
                </div>

                <div className="text-[#D26600] text-sm font-medium flex items-center group-hover:text-[#FCA300] transition-colors pl-2" style={{fontFamily: 'Inter, sans-serif'}}>
                  View full details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  const ConditionDetail = () => {
    const details = conditionDetails[selectedCondition];
    if (!details) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto pt-12"
        onClick={() => setSelectedCondition(null)}
      >
        <div
          className="bg-white rounded-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.1)] max-w-5xl w-full my-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={() => setSelectedCondition(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:bg-[#FFF9F5] transition-colors border-2 border-[#E8D9C8]"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-[#2C1B11]" />
          </button>

          {/* Modal Header */}
          <div className="bg-[#F4B63A] text-white p-6 rounded-t-[24px]">
            <div className="pr-12">
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border-2 bg-white/20 border-white/40`} style={{fontFamily: 'Inter, sans-serif'}}>
                  {getSeverityIcon(details.overallSeverity)}
                  <span className="uppercase tracking-wide">{details.overallSeverity.replace(/_/g, ' ')}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>{details.name}</h2>
              <p className="text-lg opacity-90" style={{fontFamily: 'Inter, sans-serif'}}>{details.description}</p>
            </div>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="p-6 space-y-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
            {/* Risk at a Glance */}
            <div className="bg-red-50 border-2 border-red-200 rounded-[24px] p-6">
              <h3 className="text-xl font-bold mb-4 text-red-900 flex items-center gap-2" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <AlertCircle className="w-6 h-6" />
                Risk at a Glance
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs font-semibold text-red-900 mb-2" style={{fontFamily: 'Inter, sans-serif'}}>Overall Severity</div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[12px] font-bold ${getSeverityBadgeColor(details.overallSeverity)}`} style={{fontFamily: 'Inter, sans-serif'}}>
                    {getSeverityIcon(details.overallSeverity)}
                    <span className="uppercase text-sm">{details.overallSeverity.replace(/_/g, ' ')}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-red-900 mb-2" style={{fontFamily: 'Inter, sans-serif'}}>Contraindication Type</div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[12px] font-bold ${
                    details.contraindicationType === 'absolute'
                      ? 'bg-red-100 text-red-900 border-2 border-red-300'
                      : 'bg-orange-100 text-orange-900 border-2 border-orange-300'
                  }`} style={{fontFamily: 'Inter, sans-serif'}}>
                    {details.contraindicationType === 'absolute' ? <X className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    <span className="uppercase text-sm">{details.contraindicationType}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-red-900 mb-2" style={{fontFamily: 'Inter, sans-serif'}}>Most Dangerous Combinations</div>
                <div className="flex flex-wrap gap-2">
                  {details.mostDangerousCombinations.map((combo, idx) => (
                    <span key={idx} className="bg-white border-2 border-red-300 text-red-900 px-3 py-1.5 rounded-[12px] font-semibold text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                      {combo}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-red-900 mb-2" style={{fontFamily: 'Inter, sans-serif'}}>Key Actions Required</div>
                <ul className="space-y-1.5">
                  {details.keyActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-red-900 text-sm" style={{fontFamily: 'Inter, sans-serif'}}>
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why This Matters */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E8D9C8] p-5">
              <h3 className="font-bold text-lg mb-3 flex items-center text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <Info className="w-5 h-5 text-[#D26600] mr-2" />
                Why This Condition Matters
              </h3>
              <p className="text-[#4E4E4E] mb-3 leading-relaxed text-sm" style={{fontFamily: 'Inter, sans-serif'}}>{details.whyItMatters}</p>
              {details.prevalenceData && (
                <div className="bg-[#FEEAD8] border border-[#E8D9C8] p-3 rounded-[12px] text-sm text-[#6C3000]" style={{fontFamily: 'Inter, sans-serif'}}>
                  <strong>Research Data:</strong> {details.prevalenceData}
                </div>
              )}
            </div>

            {/* Substance Interactions */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E8D9C8] p-5">
              <h3 className="font-bold text-lg mb-4 flex items-center text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                Interactions by Substance
              </h3>
              <div className="space-y-3">
                {details.substanceInteractions.map((interaction, idx) => (
                  <div key={idx} className="border-l-4 border-[#FCA300] pl-4 py-3 bg-[#FFF9F5] rounded-r-[12px]">
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-bold text-base text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>{interaction.substance}</h4>
                      <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-semibold ${
                        interaction.riskLevel.includes('Absolute') ? 'bg-red-100 text-red-800 border border-red-300' :
                        interaction.riskLevel.includes('Relative') ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                        interaction.riskLevel.includes('Therapeutic') ? 'bg-green-100 text-green-800 border border-green-300' :
                        'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      }`} style={{fontFamily: 'Inter, sans-serif'}}>
                        {interaction.riskLevel}
                      </span>
                    </div>
                    <p className="text-sm text-[#4E4E4E] mb-2 leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>{interaction.details}</p>
                    {interaction.citations && interaction.citations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {interaction.citations.map((citation, cidx) => (
                          <button
                            key={cidx}
                            className="text-xs bg-[#FEEAD8] hover:bg-[#FFD480] text-[#6C3000] px-2 py-1 rounded-[12px] transition-colors"
                            title="Click to view full reference"
                            style={{fontFamily: 'Inter, sans-serif'}}
                          >
                            📚 {citation}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Harm Reduction */}
            <div className="bg-green-50 border-2 border-green-200 rounded-[24px] p-5">
              <h3 className="font-bold text-lg mb-3 flex items-center text-green-900" style={{fontFamily: 'Satoshi, sans-serif'}}>
                <Shield className="w-5 h-5 mr-2" />
                Harm Reduction Strategies
              </h3>
              <ul className="space-y-2">
                {details.harmReduction.map((hr, idx) => (
                  <li key={idx} className="flex items-start text-sm text-green-900" style={{fontFamily: 'Inter, sans-serif'}}>
                    <ChevronRight className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      {hr.link ? (
                        <button className="hover:underline font-semibold">{hr.name}</button>
                      ) : (
                        <span className="font-medium">{hr.name}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Guidance */}
            <div className="bg-[#FEEAD8] border-2 border-[#E8D9C8] rounded-[24px] p-5">
              <h3 className="font-bold text-lg mb-3 text-[#6C3000]" style={{fontFamily: 'Satoshi, sans-serif'}}>Clinical Guidance</h3>
              <p className="text-sm text-[#6C3000] mb-3 leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>{details.clinicalGuidance}</p>
              <div className="flex flex-wrap gap-1">
                {details.citations.map((citation, idx) => (
                  <button
                    key={idx}
                    className="text-xs bg-[#FFD480] hover:bg-[#FCA300] text-[#6C3000] px-2 py-1 rounded-[12px] transition-colors"
                    title="Click to view full reference"
                    style={{fontFamily: 'Inter, sans-serif'}}
                  >
                    📚 {citation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-4">
      <div className="max-w-6xl mx-auto">
        <ConditionBrowser />
      </div>
      {selectedCondition && <ConditionDetail />}
    </div>
  );
};

export default ConditionExplorer;