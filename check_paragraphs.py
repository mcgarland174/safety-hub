import json

data = json.load(open('src/data/case_studies_schema.json'))
case = [c for c in data['caseStudies'] if 'Accidental High-Dose' in c['title']][0]
parts = case['fullText'].split('\n\n')
print(f'Number of paragraphs: {len(parts)}')
print('\nFirst 3 paragraphs:')
for i, p in enumerate(parts[:3]):
    print(f'\n--- Paragraph {i+1} ---')
    print(p[:200] + '...' if len(p) > 200 else p)
