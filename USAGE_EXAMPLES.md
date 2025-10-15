# Usage Examples

This document shows how to use the data loader in your components.

## Importing Data

```typescript
// Import the data loader
import { data, getSubstanceById, getAllSubstances } from '../utils/dataLoader';
```

## Example 1: Load All Substances

```typescript
import { getAllSubstances } from '../utils/dataLoader';

function SubstanceList() {
  const substances = getAllSubstances();

  return (
    <div>
      {substances.map(substance => (
        <div key={substance.id}>
          <h3>{substance.name}</h3>
          <p>{substance.aliases.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
```

## Example 2: Load Specific Substance Data

```typescript
import { getSubstanceById } from '../utils/dataLoader';

function SubstanceDetail() {
  const [selectedId, setSelectedId] = useState('psilocybin');
  const substanceData = getSubstanceById(selectedId);

  // Access the substance information
  const substance = substanceData?.substances?.[0];

  return (
    <div>
      <h2>{substance?.name}</h2>
      <p>Classification: {substance?.classification?.primary}</p>
      <p>Mechanism: {substance?.classification?.mechanism}</p>

      {/* Dosing information */}
      <div>
        <h3>Dosing</h3>
        <p>Threshold: {substance?.dosing?.threshold?.value} {substance?.dosing?.threshold?.unit}</p>
        <p>Common: {substance?.dosing?.common?.min}-{substance?.dosing?.common?.max} {substance?.dosing?.common?.unit}</p>
      </div>

      {/* Pharmacokinetics */}
      <div>
        <h3>Pharmacokinetics</h3>
        <p>Onset: {substance?.pharmacokinetics?.onset?.min}-{substance?.pharmacokinetics?.onset?.max} {substance?.pharmacokinetics?.onset?.unit}</p>
        <p>Duration: {substance?.pharmacokinetics?.duration?.min}-{substance?.pharmacokinetics?.duration?.max} {substance?.pharmacokinetics?.duration?.unit}</p>
      </div>
    </div>
  );
}
```

## Example 3: Load Harm Reduction Data

```typescript
import { data } from '../utils/dataLoader';

function HarmReductionPractices() {
  const harmReduction = data.harmReduction;

  // Access different categories
  const screeningPractices = harmReduction.screeningAndConsentMeasures;
  const settingOptimization = harmReduction.settingOptimizationMeasures;

  return (
    <div>
      <h2>Harm Reduction Practices</h2>

      {screeningPractices?.map((practice: any) => (
        <div key={practice.id}>
          <h3>{practice.name}</h3>
          <p>Criticality: {practice.criticality}</p>
          <p>Effectiveness: {practice.effectiveness}</p>
          <p>{practice.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Example 4: Load General Risks

```typescript
import { data } from '../utils/dataLoader';

function RiskFactors() {
  const generalRisks = data.generalRisks;

  // Access cardiovascular risks
  const cardioRisks = generalRisks.riskFactorsByCategory?.individual
    ?.filter((risk: any) => risk.category === 'cardiovascular');

  return (
    <div>
      <h2>Cardiovascular Risk Factors</h2>

      {cardioRisks?.map((risk: any) => (
        <div key={risk.id}>
          <h3>{risk.name}</h3>
          <p>Severity: {risk.severity}</p>
          <p>Type: {risk.contraindicationType}</p>
          <p>{risk.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Example 5: Compare Substances

```typescript
import { getSubstanceById } from '../utils/dataLoader';

function SubstanceComparison() {
  const psilocybin = getSubstanceById('psilocybin');
  const lsd = getSubstanceById('lsd');

  const psilocybinData = psilocybin?.substances?.[0];
  const lsdData = lsd?.substances?.[0];

  return (
    <div>
      <h2>Comparison: Psilocybin vs LSD</h2>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Psilocybin</th>
            <th>LSD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Duration</td>
            <td>
              {psilocybinData?.pharmacokinetics?.duration?.min}-
              {psilocybinData?.pharmacokinetics?.duration?.max} hours
            </td>
            <td>
              {lsdData?.pharmacokinetics?.duration?.min}-
              {lsdData?.pharmacokinetics?.duration?.max} hours
            </td>
          </tr>
          <tr>
            <td>Onset</td>
            <td>
              {psilocybinData?.pharmacokinetics?.onset?.min}-
              {psilocybinData?.pharmacokinetics?.onset?.max} min
            </td>
            <td>
              {lsdData?.pharmacokinetics?.onset?.min}-
              {lsdData?.pharmacokinetics?.onset?.max} min
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

## Example 6: Schema Registry

```typescript
import { data } from '../utils/dataLoader';

function DataInfo() {
  const registry = data.schemaRegistry;

  return (
    <div>
      <h2>Data Information</h2>
      <p>Version: {registry.registryVersion}</p>
      <p>Last Updated: {registry.lastUpdated}</p>

      <h3>Available Schemas:</h3>
      <ul>
        {registry.schemas?.map((schema: any) => (
          <li key={schema.schemaId}>
            <strong>{schema.schemaId}</strong>: {schema.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Data Structure Overview

The main data object contains:

```typescript
data = {
  schemaRegistry: {...},      // Registry information and metadata
  generalRisks: {...},         // Universal risk factors
  harmReduction: {...},        // Harm reduction strategies
  substances: {
    psilocybin: {...},
    lsd: {...},
    mdma: {...},
    dmt: {...},
    '5meo_dmt': {...},
    ayahuasca: {...},
    ketamine: {...},
    ibogaine: {...},
    '2cx': {...}
  }
}
```

## TypeScript Tips

Since the JSON files don't have TypeScript type definitions, you may want to use:

```typescript
// Use optional chaining and nullish coalescing
const duration = substance?.pharmacokinetics?.duration?.max ?? 'Unknown';

// Type assertions when you know the structure
const substanceData = getSubstanceById('psilocybin') as any;
```

For a fully-typed experience, consider creating TypeScript interfaces based on the JSON schema structure.

## Best Practices

1. **Always use optional chaining** (`?.`) when accessing nested data
2. **Provide fallback values** with nullish coalescing (`??`)
3. **Check for data existence** before rendering
4. **Cache data** if using the same dataset multiple times in a component
5. **Use useMemo** for expensive data transformations

Example with error handling:

```typescript
function SafeDataAccess() {
  const substanceData = getSubstanceById('psilocybin');

  if (!substanceData) {
    return <div>Substance data not found</div>;
  }

  const substance = substanceData.substances?.[0];

  if (!substance) {
    return <div>Substance information unavailable</div>;
  }

  return <div>{substance.name}</div>;
}
```
