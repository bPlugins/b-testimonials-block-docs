const fs = require('fs');
const path = require('path');

const manuscript = fs.readFileSync(path.join(__dirname, 'the-portion-smart-glp1-cookbook.md'), 'utf8');
const recipeHeadings = [...manuscript.matchAll(/^### (\d+)\. (.+)$/gm)];
const chapters = [...manuscript.matchAll(/^# Chapter (\d+): (.+)$/gm)];
const requiredLabels = ['**Prep time:**','**Cook time:**','**Total time:**','**Servings:**','**Serving size:**','**Ingredients**','**Directions**','**Estimated nutrition per serving:**','**Storage:**','**Variation:**'];

const errors = [];
if (recipeHeadings.length !== 120) errors.push(`Expected 120 recipes, found ${recipeHeadings.length}.`);
if (chapters.length !== 10) errors.push(`Expected 10 chapters, found ${chapters.length}.`);
if (/^\+/m.test(manuscript)) errors.push('Found accidental leading plus signs in manuscript lines.');
if (/undefined|NaN/.test(manuscript)) errors.push('Found undefined or NaN generated values.');
if (/[^\x00-\x7F]/.test(manuscript)) errors.push('Found non-ASCII characters in the generated manuscript.');
if (/cooked oats|1 lemon zest/i.test(manuscript)) errors.push('Found a suspicious generated ingredient amount.');

recipeHeadings.forEach((match, index) => {
  const expected = index + 1;
  if (Number(match[1]) !== expected) errors.push(`Recipe numbering breaks at ${match[1]}; expected ${expected}.`);
  const start = match.index;
  const end = recipeHeadings[index + 1]?.index ?? manuscript.indexOf('# 14-Day Portion-Smart Meal Plan');
  const section = manuscript.slice(start, end);
  requiredLabels.forEach(label => {
    if (!section.includes(label)) errors.push(`Recipe ${expected} is missing ${label}`);
  });
  const ingredientCount = (section.match(/^- /gm) || []).length;
  const directionCount = (section.match(/^\d+\. /gm) || []).length;
  if (ingredientCount < 5) errors.push(`Recipe ${expected} has only ${ingredientCount} ingredients.`);
  if (directionCount < 3) errors.push(`Recipe ${expected} has only ${directionCount} directions.`);
  if (!/Estimated nutrition per serving:\*\* \d+ calories \| \d+ g protein \| \d+ g carbohydrate \| \d+ g fat \| \d+ g fiber \| \d+ mg sodium/.test(section)) {
    errors.push(`Recipe ${expected} has malformed nutrition data.`);
  }
});

const duplicateTitles = recipeHeadings.map(x => x[2]).filter((title, i, all) => all.indexOf(title) !== i);
if (duplicateTitles.length) errors.push(`Duplicate recipe titles: ${duplicateTitles.join(', ')}`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Validation passed.');
console.log(`Chapters: ${chapters.length}`);
console.log(`Recipes: ${recipeHeadings.length}`);
console.log(`Required fields checked per recipe: ${requiredLabels.length}`);
