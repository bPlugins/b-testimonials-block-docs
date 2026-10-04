const fs = require('fs');
const path = require('path');

const trimWidth = 8.5;
const trimHeight = 11;
const pages = 72;
const bleed = 0.125;
const spine = pages * 0.002252; // KDP standard color on white paper
const coverWidth = bleed + trimWidth + spine + trimWidth + bleed;
const coverHeight = bleed + trimHeight + bleed;
const px = inches => inches * 96;

const title = 'The Portion-Smart GLP-1 High-Protein Eating Guide';
const subtitle = 'Small-Plate Meal Frameworks, Flexible Food Ideas, Shopping Lists, and a 14-Day Plan for Smaller Appetites';
const author = 'Himangsu Roy';
const coverImageA = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2400&q=90';
const coverImageB = 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=2400&q=90';

const backLeft = bleed;
const spineLeft = bleed + trimWidth;
const frontLeft = bleed + trimWidth + spine;

const cover = `<!doctype html><html><head><meta charset="utf-8"><title>${title} - Full Cover</title><style>
@page{size:${coverWidth.toFixed(6)}in ${coverHeight.toFixed(6)}in;margin:0}*{box-sizing:border-box}html,body{margin:0;width:${coverWidth.toFixed(6)}in;height:${coverHeight.toFixed(6)}in;font-family:Arial,Helvetica,sans-serif;color:#17251c}.cover{position:relative;width:100%;height:100%;background:#193f2a;overflow:hidden}.back,.front{position:absolute;top:${bleed}in;width:${trimWidth}in;height:${trimHeight}in}.back{left:${backLeft}in;background:#193f2a;color:#fff;padding:.72in .62in}.spine{position:absolute;left:${spineLeft}in;top:${bleed}in;width:${spine}in;height:${trimHeight}in;background:#193f2a;border-left:1px solid rgba(255,255,255,.18);border-right:1px solid rgba(255,255,255,.18)}.front{left:${frontLeft}in;background:#fff}.front-photos{height:5.3in;background:#dfe9dd;position:relative}.front-photos img{position:absolute;object-fit:cover;border-radius:.06in}.front-photos img:first-child{width:3.5in;height:4.4in;left:.68in;top:.42in}.front-photos img:last-child{width:3.1in;height:4.1in;right:.55in;top:1.02in}.badge{position:absolute;left:.52in;top:4.35in;width:1.3in;height:1.3in;border-radius:50%;background:#e2583e;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.badge b{font-size:.39in;line-height:1}.badge span{font-size:.09in;font-weight:bold}.front-copy{padding:.36in .62in}.eyebrow{font-size:.11in;font-weight:bold;letter-spacing:.02in;color:#3e704c;margin:0 0 .14in}.front h1{font-size:.44in;line-height:1.01;margin:0 0 .15in}.front h1 em{font-style:normal;color:#3e704c}.front .subtitle{font-size:.145in;line-height:1.38;color:#56655b;margin:0 0 .2in}.front .author{font-size:.125in;font-weight:bold;letter-spacing:.015in}.back .eyebrow{color:#bad1bf}.back h2{font-size:.48in;line-height:1.02;margin:.35in 0}.back p,.back li{font-size:.155in;line-height:1.5}.back ul{padding-left:.2in;margin-top:.28in}.back-footer{position:absolute;left:.62in;right:.62in;bottom:.55in;border-top:1px solid #708c78;padding-top:.16in;font-size:.11in}.barcode{position:absolute;right:.35in;bottom:.35in;width:2in;height:1.2in;background:#fff}.fold{position:absolute;top:0;height:100%;width:1px;background:rgba(255,0,0,.18)}.fold.a{left:${spineLeft}in}.fold.b{left:${frontLeft}in}@media print{.fold{display:none}}
</style></head><body><main class="cover"><section class="back"><p class="eyebrow">A FLEXIBLE GUIDE FOR SMALLER APPETITES</p><h2>Build a meal<br>that fits the day.</h2><p><i>${title}</i> replaces rigid menus with practical combinations you can adapt to appetite, tolerance, schedule, and professional guidance.</p><ul><li>48 high-protein meal frameworks</li><li>Gentler texture and portion options</li><li>14-day flexible planning map</li><li>Shopping, preparation, and tracking tools</li></ul><div class="back-footer"><b>${author.toUpperCase()}</b><br>Educational guide - not medical advice</div><div class="barcode"></div></section><div class="spine"></div><section class="front"><div class="front-photos"><img src="${coverImageA}"><img src="${coverImageB}"></div><div class="badge"><b>48</b><span>MEAL<br>FRAMEWORKS</span></div><div class="front-copy"><p class="eyebrow">PORTION-SMART EATING</p><h1>The Portion-Smart<br><em>GLP-1 High-Protein</em><br>Eating Guide</h1><p class="subtitle">${subtitle}</p><p class="author">${author.toUpperCase()}</p></div></section><div class="fold a"></div><div class="fold b"></div></main></body></html>`;

const canvaReadyCover = cover.replace(
  '<main class="cover">',
  '<main class="cover" data-document-role="page" data-label="Full Wrap Cover">'
);
fs.writeFileSync(path.join(__dirname, 'kdp-full-wrap-cover.html'), canvaReadyCover, 'utf8');

const description = `Smaller appetites call for a more flexible way to plan meals.\n\nThe Portion-Smart GLP-1 High-Protein Eating Guide helps readers build simple meals around a protein anchor, produce, an optional energy food, and an easy flavor element. Instead of rigid recipes or one-size-fits-all portions, the guide offers adaptable combinations that can be adjusted to appetite, texture preference, schedule, food labels, and professional guidance.\n\nInside you will find:\n\n- 48 flexible high-protein meal frameworks\n- Breakfast, smoothie, soup, fresh-plate, dinner, vegetarian, snack, and dessert ideas\n- Gentler texture and smaller-portion adaptations\n- A flexible 14-day planning map\n- Shopping and weekly preparation systems\n- Eating, tolerance, and care-team worksheets\n\nThis is an educational meal-planning guide, not a medical treatment plan or a book of tested recipes. Readers should follow the guidance of their prescribing clinician and other qualified professionals.`;

const metadata = `# Amazon KDP Listing Package\n\n## Book details\n\n**Language:** English  \n**Title:** ${title}  \n**Subtitle:** ${subtitle}  \n**Author:** ${author}  \n**Edition:** First edition  \n**Publication date:** Leave blank and let KDP assign it at publication  \n\n## Description\n\n${description}\n\n## Seven keyword phrases\n\n1. GLP-1 meal planning for smaller appetites\n2. high protein small plate meal ideas\n3. flexible eating guide for weight loss support\n4. easy protein meal builder\n5. gentle food ideas during appetite changes\n6. portion smart meal planning\n7. 14 day high protein eating plan\n\n## Category direction\n\nSelect the closest available KDP categories; category names can change by marketplace. Prioritize:\n\n1. Health, Fitness & Dieting / Diets & Weight Loss / Weight Loss\n2. Health, Fitness & Dieting / Nutrition\n3. Cookbooks, Food & Wine / Special Diet, only if KDP offers a suitable meal-planning or high-protein subcategory\n\nDo not categorize it as a medical treatment reference or claim professional credentials the author does not hold.\n\n## Paperback production choices\n\n- Trim: 8 x 10 inches\n- Interior: Standard color on white paper\n- Bleed: No bleed\n- Page count: 72\n- Cover finish: Matte\n- Reading direction: Left to right\n- ISBN: KDP free ISBN is acceptable unless an author-owned imprint is required\n- Suggested initial US list price: $12.99-$14.99; confirm printing cost and royalty in KDP before choosing\n\n## AI disclosure\n\nWhen KDP asks about AI-generated content, answer accurately:\n\n- Text: AI-generated, then reviewed and edited\n- Images: No AI-generated images in this edition; stock photography is used\n- Translations: No, unless a translated edition is later produced with AI\n\n## Rights\n\nChoose: I own the copyright and hold the necessary publishing rights. Keep the stock-image source and license record with the project files.\n`;
fs.writeFileSync(path.join(__dirname, 'amazon-kdp-listing.md'), metadata, 'utf8');

const production = `# KDP Production Specification\n\n- Paperback, 8 x 10 inch trim\n- 72 pages\n- Standard color interior on white paper\n- No bleed interior\n- Minimum inside/gutter margin for 24-150 pages: 0.375 inch\n- Minimum outside margin without bleed: 0.25 inch\n- Interior design uses approximately 0.47-0.54 inch content margins\n- Cover bleed: 0.125 inch on all outside edges\n- Standard-color spine width: 72 x 0.002252 = ${spine.toFixed(6)} inch\n- Full cover size: ${coverWidth.toFixed(6)} x ${coverHeight.toFixed(6)} inches\n- No spine text: KDP prints spine text only above 79 pages\n- Barcode reserve: 2 x 1.2 inches on lower-right back cover\n\nOfficial references:\n\n- https://kdp.amazon.com/en_US/help/topic/GVBQ3CMEQW3W2VL6\n- https://kdp.amazon.com/en_US/help/topic/G201953020\n- https://kdp.amazon.com/en_US/cover-calculator\n`;
fs.writeFileSync(path.join(__dirname, 'kdp-production-spec.md'), production, 'utf8');

const imageSources = [coverImageA,coverImageB,
  'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
  'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
  'https://images.unsplash.com/photo-1547592180-85f173990554',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999',
  'https://images.unsplash.com/photo-1543362906-acfc16c67564',
  'https://images.unsplash.com/photo-1551024506-0bccd828d307',
];
const license = `# Image Source and License Record\n\nThe design uses images retrieved from Unsplash image URLs. Unsplash states that images may be downloaded and used for free for commercial and non-commercial purposes, subject to its license terms and restrictions. Review the current license again immediately before publication.\n\nLicense: https://unsplash.com/license\nTerms: https://unsplash.com/terms\n\n## Source URLs\n\n${[...new Set(imageSources)].map(url=>`- ${url}`).join('\n')}\n\n## Publication record\n\n- [ ] Open every source page and record photographer name\n- [ ] Confirm the image remains available under the Unsplash license\n- [ ] Save a PDF or screenshot of the license page with the publication records\n- [ ] Ensure no visible trademarks, private-property restrictions, or recognizable-person issues require additional permission\n- [ ] Replace any image that cannot be fully documented\n`;
fs.writeFileSync(path.join(__dirname, 'image-license-record.md'), license, 'utf8');

console.log(`Cover: ${coverWidth.toFixed(6)} x ${coverHeight.toFixed(6)} inches`);
console.log(`Spine: ${spine.toFixed(6)} inches`);
console.log(`Cover pixels at 96 CSS px/in: ${Math.round(px(coverWidth))} x ${Math.round(px(coverHeight))}`);
