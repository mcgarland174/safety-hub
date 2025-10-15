// Import all JSON data files
import schemaRegistry from '../data/schema_registry.json';
import generalRisks from '../data/general_risks_schema.json';
import harmReduction from '../data/harm_reduction_schema.json';
import substancePsilocybin from '../data/substance_psilocybin_schema.json';
import substanceLSD from '../data/substance_lsd_schema.json';
import substanceMDMA from '../data/substance_MDMA_schema.json';
import substanceDMT from '../data/substance_dmt_schema.json';
import substance5MeoDMT from '../data/substance_5meo_dmt_schema.json';
import substanceAyahuasca from '../data/substance_ayahuasca_schema.json';
import substanceKetamine from '../data/substance_ketamine_schema.json';
import substanceIbogaine from '../data/substance_ibogane-iboga_schema.json';
import substance2cx from '../data/substance_2cx_schema.json';

// Export all data
export const data = {
  schemaRegistry,
  generalRisks,
  harmReduction,
  substances: {
    psilocybin: substancePsilocybin,
    lsd: substanceLSD,
    mdma: substanceMDMA,
    dmt: substanceDMT,
    '5meo_dmt': substance5MeoDMT,
    ayahuasca: substanceAyahuasca,
    ketamine: substanceKetamine,
    ibogaine: substanceIbogaine,
    '2cx': substance2cx,
  }
};

// Helper function to get substance data by ID
export const getSubstanceById = (id: string) => {
  const substanceMap: { [key: string]: any } = {
    'psilocybin': substancePsilocybin,
    'lsd': substanceLSD,
    'mdma': substanceMDMA,
    'dmt': substanceDMT,
    '5meodmt': substance5MeoDMT,
    '5meo_dmt': substance5MeoDMT,
    'ayahuasca': substanceAyahuasca,
    'ketamine': substanceKetamine,
    'ibogaine': substanceIbogaine,
    'iboga': substanceIbogaine,
    '2cb': substance2cx,
    '2cx': substance2cx,
  };

  return substanceMap[id] || null;
};

// Helper to get all substance names
export const getAllSubstances = () => {
  return [
    { id: 'psilocybin', name: 'Psilocybin', aliases: ['Magic Mushrooms', 'Shrooms'] },
    { id: 'lsd', name: 'LSD', aliases: ['Acid'] },
    { id: 'mdma', name: 'MDMA', aliases: ['Ecstasy', 'Molly'] },
    { id: 'dmt', name: 'DMT', aliases: ['Dimitri', 'Spirit Molecule'] },
    { id: '5meodmt', name: '5-MeO-DMT', aliases: ['The Toad', 'Bufo'] },
    { id: 'ayahuasca', name: 'Ayahuasca', aliases: ['Yagé', 'Aya'] },
    { id: 'ketamine', name: 'Ketamine', aliases: ['Special K', 'K'] },
    { id: 'ibogaine', name: 'Iboga / Ibogaine', aliases: ['Iboga'] },
    { id: '2cb', name: '2C-B / 2C-x', aliases: ['Nexus', '2C Family'] },
  ];
};

export default data;
