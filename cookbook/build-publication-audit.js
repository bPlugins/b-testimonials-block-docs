const fs = require('fs');
const path = require('path');

const manuscriptPath = path.join(__dirname, 'the-portion-smart-glp1-cookbook.md');
const manuscript = fs.readFileSync(manuscriptPath, 'utf8');
const recipeMatches = [...manuscript.matchAll(/^### (\d+)\. (.+?)\n\n(.*?)(?=^---$|^# Chapter|^# 14-Day)/gms)];

function field(body, label) {
  return body.match(new RegExp(`\\*\\*${label}:\\*\\* ([^\\n]+)`))?.[1]?.trim() || '';
}

function section(body, heading, nextHeading) {
  return body.match(new RegExp(`\\*\\*${heading}\\*\\*\\n\\n([\\s\\S]*?)(?=\\n\\n\\*\\*${nextHeading})`))?.[1]?.trim() || '';
}

function csv(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

const recipes = recipeMatches.map(match => {
  const number = Number(match[1]);
  const title = match[2].trim();
  const body = match[3];
  const ingredients = section(body, 'Ingredients', 'Directions').split('\n').filter(line => line.startsWith('- ')).map(line => line.slice(2));
  const directions = section(body, 'Directions', 'Estimated nutrition per serving:').split('\n').filter(line => /^\d+\. /.test(line)).map(line => line.replace(/^\d+\. /, ''));
  const nutrition = field(body, 'Estimated nutrition per serving');
  const nutritionMatch = nutrition.match(/(\d+) calories \| (\d+) g protein \| (\d+) g carbohydrate \| (\d+) g fat \| (\d+) g fiber \| (\d+) mg sodium/);
  const issues = [];

  if (directions.some(line => /using the (bake|roast|skillet|mix) method/i.test(line))) issues.push('Generic cooking-method wording requires recipe-specific rewrite');
  if (directions.some(line => /cook or warm until safely cooked through/i.test(line))) issues.push('Cooking endpoint needs a specific time, texture, or internal temperature');
  if (directions.some(line => /combine the .* and .* and .* and salt/i.test(line))) issues.push('Awkward compound instruction needs copy edit');
  if (body.includes('in a practical, protein-forward serving')) issues.push('Repeated template introduction needs unique copy');
  if (ingredients.some(line => /^1 lb \(454 g\) cooked/i.test(line))) issues.push('Cooked protein quantity may not match listed calories or yield');
  if (ingredients.some(line => /^2 cups \(about 250 g\) (herbs|dill|basil|parsley|rosemary|chives|capers)/i.test(line))) issues.push('Suspicious herb or condiment quantity');
  if (ingredients.some(line => /protein powder/i.test(line)) && ingredients.some(line => /2 cups \(480 g\) .*yogurt/i.test(line))) issues.push('Protein level and serving volume require tolerance and nutrition review');
  if (directions.length < 4) issues.push('Directions may be too brief for an inexperienced cook');
  if (!nutritionMatch) issues.push('Nutrition line is malformed');
  if (nutritionMatch) {
    const [,calories,protein,carbs,fat,fiber,sodium] = nutritionMatch.map(Number);
    const macroCalories = protein * 4 + carbs * 4 + fat * 9;
    if (Math.abs(macroCalories - calories) > 80) issues.push('Calories do not closely reconcile with listed macronutrients');
    if (fiber > carbs) issues.push('Fiber exceeds total carbohydrate');
    if (protein * 4 > calories) issues.push('Protein calories exceed total calories');
    if (sodium > 650) issues.push('Sodium exceeds the manuscript target of 650 mg per serving');
  }

  return {
    number,title,
    chapter: Math.ceil(number / 12),
    prep: field(body,'Prep time'),cook: field(body,'Cook time'),total: field(body,'Total time'),servings: field(body,'Servings'),servingSize: field(body,'Serving size'),
    ingredients,directions,nutrition,issues,
  };
});

const auditHeader = ['Recipe #','Chapter','Title','Desk audit status','Detected issues','Physical test status','Tester','Test date','Actual yield','Actual serving weight','Taste/texture result','Directions result','Revision required','Nutrition verification status','Nutrition analyst','Proofreading status','Final approval'];
const auditRows = recipes.map(recipe => [
  recipe.number,recipe.chapter,recipe.title,recipe.issues.length ? 'REVISION REQUIRED' : 'DESK CHECK PASSED',recipe.issues.join('; '),
  'NOT TESTED','','','','','','','YES','UNVERIFIED','','NOT PROOFREAD','BLOCKED',
]);
fs.writeFileSync(path.join(__dirname,'publication-readiness-tracker.csv'), [auditHeader,...auditRows].map(row=>row.map(csv).join(',')).join('\n'), 'utf8');

const nutritionHeader = ['Recipe #','Title','Current calories estimate','Current protein g','Current carbohydrate g','Current fat g','Current fiber g','Current sodium mg','Final tested yield g','Final serving weight g','Verified calories','Verified protein g','Verified carbohydrate g','Verified fat g','Verified fiber g','Verified sodium mg','Database/software','Analyst','Verification date','Status'];
const nutritionRows = recipes.map(recipe => {
  const values = recipe.nutrition.match(/(\d+) calories \| (\d+) g protein \| (\d+) g carbohydrate \| (\d+) g fat \| (\d+) g fiber \| (\d+) mg sodium/)?.slice(1) || Array(6).fill('');
  return [recipe.number,recipe.title,...values,'','','','','','','','','','','UNVERIFIED'];
});
fs.writeFileSync(path.join(__dirname,'nutrition-verification-workbook.csv'), [nutritionHeader,...nutritionRows].map(row=>row.map(csv).join(',')).join('\n'), 'utf8');

const testingPages = recipes.map(recipe => `## ${recipe.number}. ${recipe.title}\n\n**Tester:** ____________________  **Date:** __________  **Test number:** 1 / 2\n\n**Ingredient checks**\n\n- [ ] Every ingredient was available and clearly specified\n- [ ] US and metric quantities were weighed or measured\n- [ ] No ingredient was missing from the directions\n- [ ] No unlisted ingredient appeared in the directions\n\n**Cooking results**\n\n- Actual prep time: __________\n- Actual cook time: __________\n- Actual finished yield: __________ g\n- Number of realistic servings: __________\n- Weight per serving: __________ g\n- Final internal temperature where relevant: __________\n\n**Sensory score (1-5)**\n\n- Flavor: ____  Texture: ____  Appearance: ____  Portion satisfaction: ____\n- GLP-1 tolerance considerations observed: ________________________________________\n\n**Directions**\n\n- [ ] A first-time cook could follow every step\n- [ ] Times and doneness cues were accurate\n- [ ] Equipment and pan size were clear\n- [ ] Storage/reheating guidance worked\n\n**Required corrections**\n\n______________________________________________________________________________\n\n**Tester decision:** [ ] Pass  [ ] Retest  [ ] Remove from book\n\n---\n`);
fs.writeFileSync(path.join(__dirname,'recipe-testing-workbook.md'), `# Recipe Testing Workbook\n\nNo recipe is approved for publication until it has passed at least one complete physical test; two independent tests are preferred. Record final yield before nutrition calculation.\n\n${testingPages.join('\n')}`, 'utf8');

const issueCounts = new Map();
for (const recipe of recipes) for (const issue of recipe.issues) issueCounts.set(issue,(issueCounts.get(issue)||0)+1);
const summary = [...issueCounts.entries()].sort((a,b)=>b[1]-a[1]).map(([issue,count])=>`- ${count} recipes: ${issue}`).join('\n');
const blocked = recipes.filter(recipe=>recipe.issues.length).length;
fs.writeFileSync(path.join(__dirname,'publication-readiness-report.md'), `# Publication Readiness Report\n\n## Current decision\n\n**BLOCKED FOR AMAZON PUBLICATION**\n\nThe manuscript contains 120 structurally complete recipe drafts, but none has been physically tested and none has professionally verified nutrition. Automated desk review found recipe-specific or systemic editorial issues in ${blocked} recipes. Current Canva and Markdown files must be treated as development proofs, not final consumer files.\n\n## Automated audit summary\n\n${summary || '- No automated issues detected.'}\n\n## Required approval gates\n\n1. Culinary edit: rewrite every flagged recipe with recipe-specific quantities, equipment, method, timing, and doneness cues.\n2. Physical testing: record actual yield and serving weight for every recipe; retest failed recipes.\n3. Nutrition analysis: calculate from the final tested ingredient weights and yield using USDA data or professional software.\n4. Medical/legal review: review all GLP-1, weight-loss, tolerance, and disclaimer language.\n5. Copy edit and proofread: US English, measurement style, ingredient-direction cross-check, index, and page references.\n6. Canva/KDP proof: update the design, export print PDF, run KDP Previewer, and inspect a physical proof copy.\n\n## Files\n\n- publication-readiness-tracker.csv\n- nutrition-verification-workbook.csv\n- recipe-testing-workbook.md\n\n`, 'utf8');

console.log(`Audited ${recipes.length} recipes.`);
console.log(`Recipes with automated issues: ${blocked}`);
console.log(`Issue categories: ${issueCounts.size}`);

