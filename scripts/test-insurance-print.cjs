/**
 * Finance Brunch - Insurance Planning Checklist Print Regression Test
 * Validates print layout scoping, DOM structures, exclusions, and CSS rules
 */

const fs = require('fs');
const assert = require('assert');

function runInsurancePrintTests() {
  console.log('--- Testing Insurance Checklist Print Layout & Exclusions ---');

  // 1. Verify InsuranceChecklists.tsx
  const checklistPath = './src/components/insurance/InsuranceChecklists.tsx';
  assert(fs.existsSync(checklistPath), 'InsuranceChecklists.tsx must exist');
  const checklistContent = fs.readFileSync(checklistPath, 'utf8');

  // Verify CSS import
  assert(checklistContent.includes("import './insurance-print.css';"), 'Must import insurance-print.css');

  // Verify dedicated print container class
  assert(checklistContent.includes('insurance-checklists-print'), 'Must have .insurance-checklists-print container');

  // Verify header and action toolbar are hidden in print
  assert(checklistContent.includes('className="max-w-3xl mx-auto text-center mb-10 md:mb-14 print:hidden"'), 'Checklist header must have print:hidden');
  assert(checklistContent.includes('flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden'), 'Action toolbar must have print:hidden');

  // Verify chevrons are hidden in print
  const chevronCount = (checklistContent.match(/print:hidden/g) || []).length;
  assert(chevronCount >= 4, 'Must have print:hidden on toolbar, header, and collapse buttons');

  // Verify items container is preserved in DOM even if collapsed (hidden print:block)
  assert(checklistContent.includes('!healthExpanded && "hidden print:block"'), 'Health checklist must use hidden print:block when collapsed');
  assert(checklistContent.includes('!termExpanded && "hidden print:block"'), 'Term checklist must use hidden print:block when collapsed');

  // Verify semantic card and item classes
  assert(checklistContent.includes('insurance-checklist-card'), 'Must contain .insurance-checklist-card');
  assert(checklistContent.includes('insurance-checklist-card-header'), 'Must contain .insurance-checklist-card-header');
  assert(checklistContent.includes('insurance-card-title'), 'Must contain .insurance-card-title');
  assert(checklistContent.includes('insurance-checklist-item'), 'Must contain .insurance-checklist-item');
  assert(checklistContent.includes('insurance-checkbox-box'), 'Must contain .insurance-checkbox-box');
  assert(checklistContent.includes('insurance-item-title'), 'Must contain .insurance-item-title');
  assert(checklistContent.includes('insurance-item-badge-crucial'), 'Must contain .insurance-item-badge-crucial');
  assert(checklistContent.includes('insurance-item-desc'), 'Must contain .insurance-item-desc');

  console.log('✓ PASS: InsuranceChecklists.tsx structure, print container, and items verified');

  // 2. Verify InsurancePlanning.tsx exclusions
  const planningPath = './src/pages/InsurancePlanning.tsx';
  assert(fs.existsSync(planningPath), 'InsurancePlanning.tsx must exist');
  const planningContent = fs.readFileSync(planningPath, 'utf8');

  assert(planningContent.includes('insurance-planning-page'), 'InsurancePlanning must have .insurance-planning-page class');
  assert(planningContent.includes('Sections above checklist (Excluded from Print)'), 'Sections above checklist must be grouped');
  assert(planningContent.includes('Sections below checklist (Excluded from Print)'), 'Sections below checklist must be grouped');
  assert((planningContent.match(/<div className="print:hidden">/g) || []).length >= 2, 'Unrelated sections must be wrapped in print:hidden');

  console.log('✓ PASS: InsurancePlanning.tsx non-checklist sections excluded via print:hidden');

  // 3. Verify Site Shell Components exclusions
  const navbarContent = fs.readFileSync('./src/components/layout/Navbar.tsx', 'utf8');
  assert(navbarContent.includes('print:hidden'), 'Navbar must be hidden in print');

  const footerContent = fs.readFileSync('./src/components/layout/Footer.tsx', 'utf8');
  assert(footerContent.includes('print:hidden'), 'Footer must be hidden in print');

  const ambientContent = fs.readFileSync('./src/components/layout/GlobalAmbientBackground.tsx', 'utf8');
  assert(ambientContent.includes('print:hidden') && ambientContent.includes('global-ambient-background'), 'Global watermark background must be hidden in print');

  const scrollProgressContent = fs.readFileSync('./src/components/layout/ScrollProgress.tsx', 'utf8');
  assert(scrollProgressContent.includes('print:hidden'), 'Scroll progress must be hidden in print');

  const scrollTopContent = fs.readFileSync('./src/components/ui/ScrollToTop.tsx', 'utf8');
  assert(scrollTopContent.includes('print:hidden'), 'ScrollToTop button must be hidden in print');

  console.log('✓ PASS: All shell components (Navbar, Footer, Watermark, ScrollToTop, ScrollProgress) excluded in print');

  // 4. Verify insurance-print.css rules
  const cssPath = './src/components/insurance/insurance-print.css';
  assert(fs.existsSync(cssPath), 'insurance-print.css must exist');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  assert(cssContent.includes('@media print'), 'Must contain @media print');
  assert(cssContent.includes('size: A4 portrait;'), 'Must specify A4 portrait size');
  assert(cssContent.includes('header,') && cssContent.includes('display: none !important;'), 'Must hide header in print');
  assert(cssContent.includes('.insurance-checklists-print'), 'Must style .insurance-checklists-print');
  assert(cssContent.includes('.insurance-checkbox-box'), 'Must style checkboxes');
  assert(cssContent.includes('.insurance-item-badge-crucial'), 'Must retain Crucial badge in print');
  assert(cssContent.includes('page-break-inside: avoid') || cssContent.includes('break-inside: avoid'), 'Must avoid breaking inside checklist items');

  console.log('✓ PASS: insurance-print.css media rules, A4 formatting, and checkbox styles verified');

  console.log('\n======================================================');
  console.log('🎉 ALL INSURANCE CHECKLIST PRINT TESTS PASSED (100%)');
  console.log('======================================================\n');
}

runInsurancePrintTests();
