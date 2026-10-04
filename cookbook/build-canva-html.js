const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, 'the-portion-smart-glp1-cookbook.md'), 'utf8');
const escapeHtml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const recipeMatches = [...source.matchAll(/^### (\d+)\. (.+?)\n\n(.*?)(?=^---$|^# Chapter|^# 14-Day)/gms)];
const chapterNames = [
  'High-Protein Breakfasts','Smoothies and Light Starts','Soups and Comfort Bowls','Salads and Fresh Plates','Chicken and Turkey',
  'Fish and Seafood','Lean Beef and Pork','Vegetarian Protein Meals','Snacks and Mini Meals','Portion-Smart Desserts',
];
const chapterImages = [
  'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85',
];

function field(body, label) {
  return body.match(new RegExp(`\\*\\*${label}:\\*\\* ([^\\n]+)`))?.[1]?.trim() || '';
}

function section(body, heading, nextHeading) {
  const end = nextHeading ? `(?=\\n\\n\\*\\*${nextHeading})` : '(?=\\n\\n\\*\\*)';
  return body.match(new RegExp(`\\*\\*${heading}\\*\\*\\n\\n([\\s\\S]*?)${end}`))?.[1]?.trim() || '';
}

function listItems(block, type) {
  const prefix = type === 'numbered' ? /^\d+\.\s+/ : /^-\s+/;
  return block.split('\n').map(line => line.replace(prefix, '').trim()).filter(Boolean);
}

function page(label, className, body) {
  return `<section class="page ${className}" data-document-role="page" data-label="${escapeHtml(label)}">${body}</section>`;
}

const pages = [];
pages.push(page('Front Cover','cover',`
  <div class="cover-photos">
    <img src="${chapterImages[3]}" alt="Colorful high-protein meal" />
    <img src="${chapterImages[4]}" alt="Portion-smart chicken meal" />
  </div>
  <div class="count-badge"><strong>120</strong><span>RECIPES</span></div>
  <div class="cover-copy">
    <p class="eyebrow">PORTION-SMART EATING</p>
    <h1>The Portion-Smart<br><em>GLP-1 High-Protein</em><br>Cookbook</h1>
    <p class="subtitle">Practical meals for weight-loss support, smaller appetites, and everyday life</p>
    <p class="author">HIMANGSU ROY</p>
  </div>`));

pages.push(page('Title Page','title-page',`
  <p class="eyebrow">THE PORTION-SMART SERIES</p>
  <h1>The Portion-Smart<br><span>GLP-1 High-Protein</span><br>Cookbook for Weight Loss</h1>
  <div class="rule"></div>
  <p class="subtitle">120 protein-forward recipes with estimated nutrition, portion guidance, and a 14-day meal plan</p>
  <p class="author">Himangsu Roy</p>`));

pages.push(page('Copyright and Disclaimer','text-page',`
  <h2>Copyright &amp; Disclaimer</h2>
  <p>Copyright (c) 2026 by Himangsu Roy. All rights reserved.</p>
  <h3>Medical and nutrition disclaimer</h3>
  <p>This cookbook provides general educational information and recipes. It is not medical advice and is not a substitute for care from a physician, registered dietitian, pharmacist, or other qualified professional.</p>
  <p>GLP-1 medications can affect appetite, digestion, hydration, and food tolerance. Follow your prescribing clinician's guidance, particularly during dose changes or when symptoms occur. The recipes do not treat, cure, or prevent any condition and do not guarantee weight loss.</p>
  <p>Nutrition figures are estimates. Brands, substitutions, preparation methods, and serving sizes will change the results. Professional recipe testing and nutrition analysis are recommended before commercial publication.</p>`));

pages.push(page('Introduction','text-page intro-page',`
  <p class="eyebrow">WELCOME</p><h2>Smaller meals can still feel complete.</h2>
  <p>Protein-forward meals can help make modest portions feel more satisfying. This book combines familiar American grocery ingredients, moderate preparation times, and flexible serving sizes.</p>
  <p>The repeatable pattern is simple: begin with protein, add produce, include a measured source of carbohydrate or fat, eat slowly, and stop when comfortably satisfied.</p>
  <h3>How to use this book</h3>
  <ol><li>Choose a recipe that fits your current appetite and tolerance.</li><li>Treat the serving as a starting point, not a requirement.</li><li>Eat slowly and pause between bites.</li><li>Store the remaining portion promptly.</li><li>Adjust spice, fat, fiber, and texture as needed.</li></ol>`));

pages.push(page('Contents','contents',`
  <p class="eyebrow">CONTENTS</p><h2>Ten practical chapters</h2>
  <div class="toc-grid">${chapterNames.map((name,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><strong>${escapeHtml(name)}</strong><small>Recipes ${i*12+1}-${i*12+12}</small></div>`).join('')}</div>
  <div class="toc-footer">14-Day Meal Plan &nbsp; / &nbsp; Shopping Framework &nbsp; / &nbsp; Conversions &nbsp; / &nbsp; Recipe Index</div>`));

const recipes = recipeMatches.map(match => {
  const number = Number(match[1]);
  const title = match[2].trim();
  const body = match[3];
  const intro = body.split('\n\n')[0].trim();
  return {
    number,title,intro,
    prep: field(body,'Prep time'), cook: field(body,'Cook time'), total: field(body,'Total time'), servings: field(body,'Servings'), servingSize: field(body,'Serving size'),
    ingredients: listItems(section(body,'Ingredients','Directions'),'bulleted'),
    directions: listItems(section(body,'Directions','Estimated nutrition per serving:'),'numbered'),
    nutrition: field(body,'Estimated nutrition per serving'), storage: field(body,'Storage'), variation: field(body,'Variation'),
  };
});

recipes.forEach((recipe, index) => {
  if (index % 12 === 0) {
    const chapter = index / 12;
    pages.push(page(`Chapter ${chapter + 1}: ${chapterNames[chapter]}`,'chapter',`
      <img src="${chapterImages[chapter]}" alt="${escapeHtml(chapterNames[chapter])}" />
      <div class="chapter-overlay"><span>CHAPTER ${String(chapter+1).padStart(2,'0')}</span><h2>${escapeHtml(chapterNames[chapter])}</h2><p>12 portion-smart recipes</p></div>`));
  }
  const chapter = Math.floor(index / 12);
  const nutrition = recipe.nutrition.split(' | ').map(item => {
    const pieces = item.split(' ');
    return `<div><strong>${escapeHtml(pieces[0])}</strong><span>${escapeHtml(pieces.slice(1).join(' '))}</span></div>`;
  }).join('');
  pages.push(page(`Recipe ${recipe.number}: ${recipe.title}`,'recipe',`
    <header><div><p class="eyebrow">CHAPTER ${String(chapter+1).padStart(2,'0')} &nbsp; / &nbsp; RECIPE ${String(recipe.number).padStart(3,'0')}</p><h2>${escapeHtml(recipe.title)}</h2><p class="recipe-intro">${escapeHtml(recipe.intro)}</p></div><div class="recipe-number">${recipe.number}</div></header>
    <div class="time-strip"><span><b>PREP</b>${escapeHtml(recipe.prep)}</span><span><b>COOK</b>${escapeHtml(recipe.cook)}</span><span><b>TOTAL</b>${escapeHtml(recipe.total)}</span><span><b>SERVES</b>${escapeHtml(recipe.servings)}</span><span><b>PORTION</b>${escapeHtml(recipe.servingSize)}</span></div>
    <main><aside><h3>Ingredients</h3><ul>${recipe.ingredients.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></aside><article><h3>Directions</h3><ol>${recipe.directions.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ol><div class="notes"><p><b>Storage</b> ${escapeHtml(recipe.storage)}</p><p><b>Variation</b> ${escapeHtml(recipe.variation)}</p></div></article></main>
    <footer><div class="nutrition">${nutrition}</div><p>Estimated nutrition per serving</p></footer>`));
});

pages.push(page('14-Day Meal Plan','text-page meal-plan',`
  <p class="eyebrow">BONUS PLAN</p><h2>14-Day Portion-Smart Meal Plan</h2>
  <p>Use this as a flexible example. Snacks are optional, and leftovers can replace any meal.</p>
  <table><thead><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th><th>Mini meal</th></tr></thead><tbody>${Array.from({length:14},(_,i)=>`<tr><td>${i+1}</td><td>Recipe ${i+1}</td><td>Recipe ${[37,25,39,28,42,31,43,26,40,32,44,29,41,36][i]}</td><td>Recipe ${[49,61,73,50,62,85,74,51,63,86,75,52,64,87][i]}</td><td>Recipe ${[97,109,98,110,99,111,100,112,101,113,102,114,103,115][i]}</td></tr>`).join('')}</tbody></table>`));

pages.push(page('Shopping Framework','text-page shopping',`
  <p class="eyebrow">PLAN AHEAD</p><h2>Shopping Framework</h2>
  <div class="shopping-grid"><section><h3>Proteins</h3><p>Chicken breast, lean turkey, salmon, white fish, shrimp, tuna, lean beef, pork tenderloin, eggs, Greek yogurt, cottage cheese, tofu, tempeh, lentils, beans, and edamame.</p></section><section><h3>Produce</h3><p>Leafy greens, broccoli, cauliflower, zucchini, peppers, onions, carrots, mushrooms, tomatoes, cucumbers, green beans, sweet potatoes, citrus, berries, apples, bananas, peaches, and herbs.</p></section><section><h3>Pantry</h3><p>Oats, quinoa, brown rice, barley, whole-grain bread, pasta, tortillas, reduced-sodium broth, tomatoes, olive oil, mustard, vinegar, spices, chia seeds, nuts, and protein powder.</p></section><section><h3>Prep once</h3><p>Cook two proteins, wash produce, portion snacks, mix one yogurt sauce, and prepare one grain for easy meals throughout the week.</p></section></div>`));

pages.push(page('Conversions','text-page conversions',`
  <p class="eyebrow">KITCHEN REFERENCE</p><h2>Measurement Conversions</h2>
  <div class="conversion-grid"><div><b>1 teaspoon</b><span>5 mL</span></div><div><b>1 tablespoon</b><span>15 mL</span></div><div><b>1 fluid ounce</b><span>30 mL</span></div><div><b>1/4 cup</b><span>60 mL</span></div><div><b>1/2 cup</b><span>120 mL</span></div><div><b>1 cup</b><span>240 mL</span></div><div><b>1 ounce</b><span>28 g</span></div><div><b>4 ounces</b><span>113 g</span></div><div><b>1 pound</b><span>454 g</span></div><div><b>350 F</b><span>175 C</span></div><div><b>400 F</b><span>200 C</span></div></div>`));

pages.push(page('About the Author','about',`
  <div><p class="eyebrow">ABOUT THE AUTHOR</p><h2>Himangsu Roy</h2><p>Himangsu Roy writes practical food and wellness resources designed to make everyday choices easier to understand and repeat.</p><p>This cookbook was developed as an educational food resource. Readers should use individualized medical and nutrition guidance when needed.</p></div><div class="author-mark">HR</div>`));

pages.push(page('Back Cover','back-cover',`
  <p class="eyebrow">120 PROTEIN-FORWARD RECIPES</p><h2>Smaller meals.<br>Bigger confidence.</h2><p><i>The Portion-Smart GLP-1 High-Protein Cookbook for Weight Loss</i> brings together familiar ingredients, clear portions, estimated nutrition, practical storage guidance, and flexible substitutions.</p><ul><li>Ten recipe chapters</li><li>Breakfasts through desserts</li><li>14-day meal plan</li><li>Shopping and conversion guides</li></ul><div class="back-footer"><strong>HIMANGSU ROY</strong><span>Educational cookbook - not medical advice</span></div>`));

const css = `
  *{box-sizing:border-box} body{margin:0;background:#dfe5df;font-family:Arial,Helvetica,sans-serif;color:#17241c} .page{width:768px;height:960px;margin:0;overflow:hidden;background:#fff;position:relative;padding:52px} .eyebrow{font-size:11px;font-weight:700;letter-spacing:1.8px;color:#3f6f4d;margin:0 0 14px} h1,h2,h3,p{margin-top:0} h1,h2{letter-spacing:0} .cover{padding:0}.cover-photos{height:520px;position:relative;background:#dfe8d8}.cover-photos img{position:absolute;object-fit:cover;border-radius:8px}.cover-photos img:first-child{width:330px;height:430px;left:70px;top:40px}.cover-photos img:last-child{width:300px;height:400px;right:55px;top:105px}.count-badge{position:absolute;left:54px;top:425px;width:116px;height:116px;border-radius:50%;background:#e4573d;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}.count-badge strong{font-size:40px;line-height:1}.count-badge span{font-size:11px;font-weight:700}.cover-copy{padding:36px 60px}.cover h1{font-size:43px;line-height:1.02;margin:0 0 18px}.cover h1 em{font-style:normal;color:#3f6f4d}.subtitle{font-size:16px;line-height:1.45;color:#516157;max-width:560px}.author{font-size:13px;font-weight:700;letter-spacing:1.4px;margin-top:24px}.title-page{display:flex;flex-direction:column;justify-content:center}.title-page h1{font-size:52px;line-height:1.08}.title-page h1 span{color:#3f6f4d}.rule{width:90px;height:7px;background:#e4573d;margin:18px 0 28px}.text-page h2,.contents h2,.about h2{font-size:38px;line-height:1.08;margin-bottom:28px}.text-page h3{font-size:19px;margin-top:30px}.text-page p,.text-page li,.about p{font-size:16px;line-height:1.55;color:#34463a}.contents{background:#f7f8f4}.toc-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 34px}.toc-grid div{display:grid;grid-template-columns:42px 1fr;grid-template-rows:auto auto;border-top:1px solid #b8c7bb;padding:16px 0}.toc-grid span{grid-row:1/3;color:#e4573d;font-size:20px;font-weight:700}.toc-grid strong{font-size:15px}.toc-grid small{font-size:11px;color:#68766c;margin-top:4px}.toc-footer{position:absolute;bottom:45px;font-size:11px;font-weight:700;color:#3f6f4d}.chapter{padding:0;background:#173d29;color:#fff}.chapter img{width:100%;height:100%;object-fit:cover}.chapter:after{content:'';position:absolute;inset:0;background:rgba(11,44,27,.52)}.chapter-overlay{position:absolute;left:58px;right:58px;bottom:70px;z-index:1}.chapter-overlay span{font-size:12px;font-weight:700;letter-spacing:2px}.chapter-overlay h2{font-size:58px;line-height:1;margin:14px 0}.chapter-overlay p{font-size:17px}.recipe{padding:36px 42px 30px}.recipe header{display:grid;grid-template-columns:1fr 58px;gap:20px;border-bottom:4px solid #315e3c;padding-bottom:16px}.recipe h2{font-size:30px;line-height:1.06;margin:0 0 8px}.recipe-intro{font-size:12px;line-height:1.4;color:#59685e;margin:0;max-width:570px}.recipe-number{width:54px;height:54px;border-radius:50%;background:#e4573d;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px}.time-strip{height:60px;display:grid;grid-template-columns:repeat(5,1fr);background:#edf2eb;margin:18px 0}.time-strip span{display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;border-right:1px solid #ccd7cc;text-align:center;padding:3px}.time-strip b{font-size:9px;color:#3f6f4d;margin-bottom:4px}.recipe main{display:grid;grid-template-columns:40% 60%;min-height:570px}.recipe aside{padding:16px 24px 0 0;border-right:1px solid #ccd7cc}.recipe article{padding:16px 0 0 28px}.recipe h3{font-size:16px;color:#315e3c;margin-bottom:12px}.recipe ul,.recipe ol{padding-left:18px;margin:0}.recipe li{font-size:11.5px;line-height:1.38;margin-bottom:7px}.recipe .notes{margin-top:18px;border-top:1px solid #ccd7cc;padding-top:10px}.recipe .notes p{font-size:10px;line-height:1.35;margin-bottom:8px}.recipe footer{position:absolute;left:42px;right:42px;bottom:28px;border-top:3px solid #e4573d;padding-top:10px}.nutrition{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}.nutrition div{text-align:center}.nutrition strong{display:block;font-size:15px}.nutrition span{font-size:8px;color:#637167}.recipe footer>p{text-align:right;font-size:8px;color:#718076;margin:5px 0 0}.meal-plan table{width:100%;border-collapse:collapse;font-size:11px;margin-top:24px}.meal-plan th{background:#315e3c;color:#fff;padding:9px}.meal-plan td{padding:9px;border-bottom:1px solid #d8e0d8;text-align:center}.shopping-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.shopping-grid section{border-top:5px solid #e4573d;padding-top:16px}.shopping-grid h3{margin:0 0 8px}.conversion-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 32px}.conversion-grid div{display:flex;justify-content:space-between;padding:17px 0;border-bottom:1px solid #cbd6cb}.about{display:grid;grid-template-columns:2fr 1fr;align-items:center;background:#f1f5ef}.author-mark{width:190px;height:190px;border-radius:50%;background:#315e3c;color:#fff;display:flex;align-items:center;justify-content:center;font-size:58px;font-weight:700}.back-cover{background:#173d29;color:#fff;padding:90px 65px}.back-cover .eyebrow{color:#b7d3bd}.back-cover h2{font-size:50px;line-height:1.02;margin:35px 0}.back-cover p,.back-cover li{font-size:16px;line-height:1.55}.back-cover ul{padding-left:20px;margin-top:28px}.back-footer{position:absolute;left:65px;right:65px;bottom:65px;display:flex;justify-content:space-between;border-top:1px solid #6b8974;padding-top:18px}.back-footer span{font-size:10px;color:#b7c6ba}
`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>The Portion-Smart GLP-1 High-Protein Cookbook</title><style>${css}</style></head><body>${pages.join('\n')}</body></html>`;
const outPath = path.join(__dirname, 'the-portion-smart-canva-import.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`Wrote ${outPath}`);
console.log(`Pages: ${pages.length}`);
console.log(`Recipes: ${recipes.length}`);
