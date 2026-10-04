const fs = require('fs');
const path = require('path');

const book = {
  title: 'The Portion-Smart GLP-1 High-Protein Cookbook for Weight Loss',
  author: 'Himangsu Roy',
};

const chapters = [
  ['High-Protein Breakfasts', [
    ['Spinach-Feta Egg Cups','eggs and egg whites','spinach','feta','bake',210,24,6,10,2,410],
    ['Blueberry-Lemon Protein Oats','Greek yogurt and oats','blueberries','lemon zest','oats',310,27,39,6,7,180],
    ['Cottage Cheese Herb Scramble','eggs and cottage cheese','chives','baby tomatoes','scramble',260,29,9,12,2,480],
    ['Turkey Sweet Potato Breakfast Skillet','lean ground turkey','sweet potato','smoked paprika','skillet',340,32,31,10,6,520],
    ['Apple-Cinnamon Overnight Oats','Greek yogurt and oats','apple','cinnamon','oats',320,26,43,6,7,170],
    ['Smoked Salmon Cucumber Egg Plate','smoked salmon and eggs','cucumber','dill','plate',285,28,10,15,3,610],
    ['Banana-Oat Protein Pancakes','eggs and Greek yogurt','banana','vanilla','pancakes',330,28,42,7,6,290],
    ['Southwest Egg-White Breakfast Bowl','egg whites and black beans','bell pepper','cumin','bowl',305,31,32,6,9,500],
    ['Ricotta Berry Breakfast Toast','part-skim ricotta','mixed berries','whole-grain toast','toast',295,22,36,8,6,330],
    ['Chicken Sausage Quinoa Breakfast Bowl','chicken sausage','quinoa','zucchini','bowl',355,30,36,11,6,560],
    ['Pumpkin Spice Yogurt Crunch','nonfat Greek yogurt','pumpkin puree','pumpkin spice','yogurt',270,27,32,5,6,210],
    ['Mushroom-Swiss Mini Frittatas','eggs and egg whites','mushrooms','reduced-fat Swiss','bake',225,25,7,11,2,430],
  ]],
  ['Smoothies and Light Starts', [
    ['Strawberry Cheesecake Smoothie','nonfat Greek yogurt','strawberries','vanilla and lemon',260,30,30,3,5,190],
    ['Chocolate Peanut Butter Protein Shake','Greek yogurt','banana','cocoa and peanut butter powder',300,32,34,5,6,250],
    ['Peach-Ginger Kefir Smoothie','low-fat kefir','peaches','fresh ginger',250,24,34,3,4,180],
    ['Mango Protein Lassi','nonfat Greek yogurt','mango','cardamom',275,28,36,2,4,170],
    ['Blueberry-Oat Breakfast Smoothie','Greek yogurt','blueberries','rolled oats',315,29,43,4,7,210],
    ['Mocha-Banana Protein Shake','low-fat milk','banana','espresso and cocoa',290,31,38,3,5,240],
    ['Raspberry-Lemon Kefir Cooler','low-fat kefir','raspberries','lemon',235,23,29,3,7,175],
    ['Pineapple-Spinach Protein Smoothie','Greek yogurt','pineapple','baby spinach',255,27,33,2,5,185],
    ['Cherry-Cacao Recovery Smoothie','Greek yogurt','frozen cherries','cacao',280,30,35,3,5,205],
    ['Vanilla-Chai Pear Smoothie','low-fat cottage cheese','pear','chai spice',285,29,37,3,6,360],
    ['Cucumber-Avocado Yogurt Shake','Greek yogurt','cucumber','avocado and lime',245,25,18,9,6,260],
    ['Orange Creamsicle Protein Smoothie','Greek yogurt','orange','vanilla',250,28,31,2,4,190],
  ]],
  ['Soups and Comfort Bowls', [
    ['Lemon Chicken Orzo Soup','cooked chicken breast','carrots and celery','orzo and lemon',330,35,34,7,5,590],
    ['Turkey White Bean Chili','lean ground turkey','white beans and peppers','cumin and oregano',390,40,39,9,10,620],
    ['Light Salmon Corn Chowder','skinless salmon','corn and potato','dill and milk',370,36,35,10,5,600],
    ['Lean Beef and Barley Soup','lean beef','mushrooms and carrots','barley and thyme',395,38,40,9,8,610],
    ['Red Lentil Turkey Soup','lean ground turkey','red lentils and spinach','coriander and lemon',380,39,38,8,10,580],
    ['Tofu-Miso Vegetable Bowl','extra-firm tofu','bok choy and mushrooms','miso and ginger',300,25,28,11,7,650],
    ['Chicken Tortilla Soup','cooked chicken breast','tomatoes and black beans','lime and cumin',360,39,38,7,10,640],
    ['Shrimp and Corn Soup','peeled shrimp','corn and zucchini','smoked paprika',315,34,30,7,5,570],
    ['Cauliflower-Cheddar Chicken Soup','cooked chicken breast','cauliflower','reduced-fat cheddar',350,40,20,12,6,620],
    ['Turkey Meatball Minestrone','lean turkey meatballs','zucchini and tomatoes','white beans and basil',375,38,36,9,9,630],
    ['Creamy Tomato Cottage Cheese Soup','low-fat cottage cheese','crushed tomatoes','basil and garlic',290,28,28,7,6,560],
    ['Ginger Chicken Rice Soup','cooked chicken breast','carrots and spinach','brown rice and ginger',345,37,36,6,5,590],
  ]],
  ['Salads and Fresh Plates', [
    ['Grilled Chicken Yogurt-Ranch Salad','grilled chicken breast','romaine and tomatoes','yogurt ranch',355,42,20,12,7,520],
    ['Salmon Nicoise-Inspired Salad','cooked salmon','green beans and tomatoes','egg and mustard vinaigrette',410,38,25,18,7,590],
    ['Turkey Taco Crunch Salad','lean ground turkey','romaine and peppers','black beans and salsa',385,40,34,11,10,610],
    ['Shrimp-Avocado Citrus Salad','peeled shrimp','greens and orange','avocado and lime',350,35,26,13,8,520],
    ['Steak and Cucumber Herb Salad','lean flank steak','cucumber and tomatoes','parsley and lemon',390,39,18,18,5,560],
    ['Tuna White Bean Salad','water-packed tuna','white beans and arugula','lemon and capers',360,38,34,8,10,610],
    ['Chicken Apple Walnut Salad','cooked chicken breast','apple and celery','Greek yogurt and walnuts',370,40,25,13,6,500],
    ['Greek Chickpea Chicken Salad','grilled chicken breast','chickpeas and cucumber','feta and oregano',405,43,32,12,9,620],
    ['Cottage Cheese Garden Plate','low-fat cottage cheese','cucumber and tomatoes','everything seasoning',300,31,22,9,6,540],
    ['Sesame Tofu Edamame Salad','extra-firm tofu','edamame and cabbage','sesame and ginger',390,29,30,18,10,580],
    ['Buffalo Chicken Slaw Bowl','cooked chicken breast','cabbage slaw','buffalo yogurt dressing',345,41,20,10,6,650],
    ['Egg and Lentil Garden Salad','eggs and egg whites','lentils and greens','Dijon vinaigrette',380,31,34,14,11,540],
  ]],
  ['Chicken and Turkey', [
    ['Lemon-Herb Chicken with Broccoli','chicken breast','broccoli','lemon and oregano','roast',390,49,22,12,7,520],
    ['Turkey-Zucchini Meatballs','lean ground turkey','zucchini','marinara and basil','bake',410,45,25,14,6,590],
    ['Sheet-Pan Chicken Fajitas','chicken breast','peppers and onions','lime and cumin','roast',405,47,28,12,7,610],
    ['Honey-Mustard Turkey Tenderloin','turkey tenderloin','green beans','honey and Dijon','roast',395,48,26,10,6,570],
    ['Pesto Chicken Stuffed Peppers','ground chicken','bell peppers','pesto and quinoa','bake',430,44,32,14,7,620],
    ['Ginger-Sesame Turkey Lettuce Cups','lean ground turkey','carrots and lettuce','ginger and sesame','skillet',360,41,24,11,6,640],
    ['Paprika Chicken with Cauliflower Mash','chicken breast','cauliflower','paprika and garlic','skillet',400,50,22,13,7,560],
    ['Turkey Burger Power Bowls','lean turkey patties','greens and tomatoes','yogurt burger sauce','skillet',420,46,27,15,8,610],
    ['Tomato-Basil Chicken Skillet','chicken breast','tomatoes and spinach','basil and balsamic','skillet',385,48,20,12,6,540],
    ['BBQ Chicken Stuffed Sweet Potatoes','cooked chicken breast','sweet potato and slaw','lower-sugar barbecue sauce','bake',445,44,48,9,9,650],
    ['Garlic-Parmesan Turkey Meatloaf Minis','lean ground turkey','grated zucchini','Parmesan and garlic','bake',415,46,23,14,6,620],
    ['Light Chicken Piccata with Green Beans','chicken breast','green beans','lemon and capers','skillet',400,49,21,13,6,600],
  ]],
  ['Fish and Seafood', [
    ['Dill Salmon with Roasted Asparagus','salmon fillets','asparagus','dill and lemon','roast',430,42,16,23,6,480],
    ['Tomato-Olive Baked Cod','cod fillets','tomatoes and zucchini','olives and oregano','bake',350,44,20,10,6,570],
    ['Shrimp Scampi Zucchini Noodles','peeled shrimp','zucchini noodles','lemon and garlic','skillet',340,39,18,13,6,520],
    ['Herbed Tuna Patties','water-packed tuna','celery and greens','Dijon and parsley','skillet',365,41,22,13,6,610],
    ['Tilapia Tacos with Lime Slaw','tilapia fillets','cabbage slaw','corn tortillas and lime','skillet',420,40,42,11,8,620],
    ['Miso Salmon with Bok Choy','salmon fillets','bok choy','miso and ginger','roast',440,43,22,22,6,650],
    ['Crab Cake Salad Bowls','lump crabmeat','greens and cucumber','Old Bay yogurt sauce','skillet',370,38,25,13,6,640],
    ['Haddock Cauliflower Gratin','haddock fillets','cauliflower','milk and reduced-fat cheddar','bake',390,45,23,14,7,610],
    ['Shrimp Fried Cauliflower Rice','peeled shrimp','cauliflower rice and peas','egg and tamari','skillet',355,39,24,11,7,650],
    ['Almond Trout with Green Beans','trout fillets','green beans','almonds and lemon','skillet',445,42,20,24,7,520],
    ['Seared Scallops with Pea Puree','sea scallops','green peas','mint and lemon','skillet',380,38,33,10,9,500],
    ['Salmon-Quinoa Patties','cooked salmon','quinoa and greens','dill yogurt sauce','skillet',430,39,35,16,7,590],
  ]],
  ['Lean Beef and Pork', [
    ['Light Beef and Broccoli','lean sirloin strips','broccoli','ginger and reduced-sodium soy','skillet',420,44,30,14,7,640],
    ['Apple-Herb Pork Tenderloin','pork tenderloin','apple and green beans','sage and mustard','roast',410,45,29,13,7,560],
    ['Lean Beef Meatballs Marinara','93% lean ground beef','zucchini noodles','marinara and basil','bake',430,43,25,18,7,620],
    ['Ginger Pork Lettuce Cups','lean ground pork','carrots and lettuce','ginger and lime','skillet',385,39,25,14,6,630],
    ['Steak Fajita Cauliflower Bowl','lean flank steak','peppers and cauliflower rice','lime and cumin','skillet',415,43,27,15,8,600],
    ['Mustard Pork Chops with Cabbage','center-cut pork chops','cabbage and apple','Dijon and thyme','skillet',425,45,28,15,7,590],
    ['Beef and Quinoa Stuffed Peppers','93% lean ground beef','bell peppers','quinoa and tomatoes','bake',445,42,38,14,9,620],
    ['Sesame Pork Meatballs','lean ground pork','broccoli slaw','sesame and ginger','bake',430,42,29,16,7,640],
    ['Yogurt Beef-Mushroom Stroganoff','lean sirloin strips','mushrooms','Greek yogurt and noodles','skillet',450,44,41,13,6,610],
    ['Salsa Verde Pork Loin','pork loin','zucchini and beans','salsa verde and lime','roast',420,46,31,12,9,650],
    ['Beef and Cabbage Skillet','93% lean ground beef','cabbage and carrots','tomato and paprika','skillet',400,41,26,15,8,580],
    ['Balsamic Steak with Burst Tomatoes','lean sirloin steak','tomatoes and spinach','balsamic and garlic','skillet',420,45,22,17,6,560],
  ]],
  ['Vegetarian Protein Meals', [
    ['Peanut Tofu Broccoli Bowls','extra-firm tofu','broccoli and brown rice','peanut-lime sauce','skillet',440,29,48,17,10,620],
    ['Lentil Cottage Cheese Bake','lentils and cottage cheese','spinach and tomatoes','Italian herbs','bake',415,35,45,11,14,590],
    ['Tempeh Fajita Bowls','tempeh','peppers and black beans','lime and cumin','skillet',450,32,47,17,13,630],
    ['Chickpea-Spinach Yogurt Curry','chickpeas and Greek yogurt','spinach and tomatoes','curry spice','skillet',420,29,52,11,14,620],
    ['Edamame-Quinoa Vegetable Fried Rice','shelled edamame','quinoa and mixed vegetables','egg and tamari','skillet',430,30,49,13,11,640],
    ['Black Bean Eggplant Chili','black beans','eggplant and tomatoes','chili powder and cumin','simmer',390,24,58,8,18,590],
    ['High-Protein Baked Ziti','cottage cheese and mozzarella','whole-wheat ziti and spinach','marinara and basil','bake',455,36,52,12,10,650],
    ['Tofu Tikka with Cauliflower','extra-firm tofu','cauliflower and peas','tikka spices and yogurt','roast',410,30,38,16,11,620],
    ['Lentil-Mushroom Patties','lentils','mushrooms and oats','thyme and Dijon','skillet',400,27,51,10,15,570],
    ['Cottage Cheese Stuffed Shells','cottage cheese','whole-wheat shells and spinach','marinara and oregano','bake',450,37,50,12,9,650],
    ['White Bean Cauliflower Bake','white beans','cauliflower and tomatoes','Parmesan and rosemary','bake',405,28,50,10,15,610],
    ['Eggplant-Tofu Parmesan','extra-firm tofu','eggplant and tomatoes','mozzarella and basil','bake',430,32,38,17,12,640],
  ]],
  ['Snacks and Mini Meals', [
    ['Chicken-Cucumber Crunch Bites','cooked chicken breast','cucumber','Greek yogurt and dill',190,25,8,6,2,390],
    ['Tuna Sweet Pepper Boats','water-packed tuna','mini sweet peppers','Greek yogurt and mustard',205,27,10,6,3,440],
    ['Cottage Cheese Ranch Cups','low-fat cottage cheese','carrots and cucumber','ranch herbs',180,24,12,4,3,410],
    ['Egg Salad Lettuce Wraps','eggs and egg whites','celery and lettuce','Greek yogurt and Dijon',215,24,9,10,3,430],
    ['Turkey Pickle Roll-Ups','sliced turkey breast','pickle and lettuce','light cream cheese',195,26,8,7,2,590],
    ['Edamame Hummus Snack Cups','shelled edamame','cucumber and carrots','tahini and lemon',220,18,20,9,7,390],
    ['Mini Salmon Cakes','cooked salmon','celery and greens','dill and Dijon',230,25,12,10,3,430],
    ['Greek Yogurt Herb Dip Plate','nonfat Greek yogurt','snap peas and peppers','parsley and lemon',175,22,17,2,5,330],
    ['Crispy Tofu Bites','extra-firm tofu','broccoli florets','paprika and tamari',225,20,18,9,5,450],
    ['Portion-Smart Protein Snack Box','hard-boiled eggs','berries and almonds','cottage cheese',260,24,19,11,5,420],
    ['Buffalo Chicken Mini Peppers','cooked chicken breast','mini sweet peppers','buffalo sauce and yogurt',215,28,11,7,3,510],
    ['Chocolate Chia Yogurt Cup','nonfat Greek yogurt','chia seeds and berries','cocoa and vanilla',235,24,25,6,8,190],
  ]],
  ['Portion-Smart Desserts', [
    ['Berry Cheesecake Yogurt Cups','Greek yogurt and cottage cheese','mixed berries','vanilla and lemon',210,22,24,4,4,190],
    ['Chocolate Peanut Butter Protein Pudding','Greek yogurt','banana','cocoa and peanut butter powder',230,24,27,4,5,220],
    ['Cinnamon Baked Apples with Cottage Cheese','low-fat cottage cheese','apple','cinnamon and walnuts',245,20,31,6,5,250],
    ['Lemon Yogurt Mousse','Greek yogurt','lemon','vanilla and gelatin',190,22,19,2,1,170],
    ['Berry Protein Pops','Greek yogurt','mixed berries','vanilla',150,18,18,1,3,120],
    ['Banana-Oat Protein Mini Muffins','eggs and Greek yogurt','banana and oats','cinnamon and vanilla',220,18,31,5,5,230],
    ['Pumpkin Protein Custard','eggs and Greek yogurt','pumpkin puree','pumpkin spice',205,21,21,4,4,210],
    ['Black Bean Cocoa Brownie Bites','black beans and eggs','cocoa','vanilla and mini chocolate chips',230,16,32,6,8,240],
    ['Peach Yogurt Crisp','Greek yogurt','peaches and oats','cinnamon and almonds',240,20,30,6,5,190],
    ['Strawberry Shortcake Yogurt Jars','Greek yogurt','strawberries','whole-grain crumble',235,22,29,4,4,210],
    ['Mocha Chia Protein Pudding','Greek yogurt','chia seeds','espresso and cocoa',225,22,21,7,8,200],
    ['Carrot Cake Overnight Dessert Jars','Greek yogurt and oats','carrot and pineapple','cinnamon and walnuts',255,21,34,6,6,220],
  ]],
];

function amountFor(primary) {
  if (/fillets|breast|tenderloin|loin|chops|steak|sirloin|pork|turkey patties/i.test(primary)) return `1 lb (454 g) ${primary}`;
  if (/ground|strips|meatballs/i.test(primary)) return `1 lb (454 g) ${primary}`;
  if (/shrimp|scallops|crabmeat/i.test(primary)) return `1 lb (454 g) ${primary}`;
  if (/tofu|tempeh/i.test(primary)) return `14 oz (397 g) ${primary}`;
  if (/chicken breast|salmon|tuna/i.test(primary)) return `12 oz (340 g) ${primary}`;
  return `2 cups (about 400 g) ${primary}`;
}

function recipeFor(chapterIndex, spec, number) {
  const [title, primary, produce, flavor, method='mix', calories, protein, carbs, fat, fiber, sodium] = spec;
  const servings = chapterIndex === 1 || chapterIndex === 8 || chapterIndex === 9 ? 2 : 4;
  const prep = chapterIndex === 1 ? 5 : 15;
  const cook = ['plate','oats','yogurt'].includes(method) || chapterIndex === 1 || chapterIndex === 3 || chapterIndex === 8 || chapterIndex === 9 ? 0 : (['bake','roast'].includes(method) ? 25 : 18);
  const intros = [
    `A balanced, protein-forward dish that pairs ${primary} with ${produce} and ${flavor}.`,
    `This portion-smart recipe uses ${primary}, ${produce}, and ${flavor} for satisfying flavor without an oversized serving.`,
    `Simple ingredients turn ${primary} and ${produce} into an approachable meal finished with ${flavor}.`,
  ];

  let ingredients;
  let directions;
  if (chapterIndex === 1) {
    ingredients = [`1 cup (240 g) ${primary}`,`1 cup (150 g) ${produce}`,`1 cup (240 ml) unsweetened milk or cold water`,`1 scoop (25-30 g) unflavored or vanilla protein powder`,`1 teaspoon ${flavor}`,`1 cup ice`,`Pinch of fine salt`];
    directions = [`Add the ${primary}, ${produce}, liquid, protein powder, ${flavor}, ice, and salt to a blender.`,`Blend on low for 20 seconds, then on high until completely smooth, 30 to 45 seconds.`,`Add 1 to 2 tablespoons water if needed for a thinner, easier-to-sip consistency.`,`Divide between two small glasses and serve immediately.`];
  } else if (chapterIndex === 2) {
    ingredients = [amountFor(primary),`2 cups (about 250 g) ${produce}`,`4 cups (960 ml) reduced-sodium chicken or vegetable broth`,`1 cup (180 g) ${flavor}`,`1 small yellow onion, diced`,`2 teaspoons olive oil`,`1/2 teaspoon fine salt, plus more to taste`,`1/4 teaspoon black pepper`];
    directions = [`Warm the oil in a Dutch oven over medium heat. Add the onion and cook until softened, about 4 minutes.`,`Add the ${primary} and cook or warm as appropriate until lightly browned and safe to eat.`,`Stir in the ${produce}, broth, ${flavor}, salt, and pepper. Bring to a gentle simmer.`,`Cook until the vegetables are tender and the flavors have blended, 12 to 18 minutes.`,`Cool for 3 minutes, portion into four bowls, and serve slowly.`];
  } else if (chapterIndex === 3) {
    ingredients = [amountFor(primary),`4 cups (about 200 g) ${produce}`,`1 cup (about 170 g) ${flavor}`,`2 tablespoons lemon juice or vinegar`,`1 tablespoon extra-virgin olive oil`,`1 teaspoon Dijon mustard`,`1/4 teaspoon fine salt`,`1/4 teaspoon black pepper`];
    directions = [`Prepare the ${primary} so it is fully cooked, then let it cool for 5 minutes and slice or flake it.`,`Arrange the ${produce} and ${flavor} in four shallow bowls.`,`Whisk the lemon juice, olive oil, mustard, salt, and pepper in a small bowl.`,`Top each bowl with an equal portion of ${primary}, drizzle with dressing, and serve.`];
  } else if (chapterIndex === 0) {
    ingredients = [amountFor(primary),`1 cup (about 150 g) ${produce}`,`1/2 cup (about 80 g) ${flavor}`,`1 teaspoon olive oil or nonstick spray`,`1/2 teaspoon fine salt`,`1/4 teaspoon black pepper`,`Optional: 2 tablespoons chopped fresh herbs`];
    directions = [`Prepare the ${produce} and measure all ingredients before heating or assembling the dish.`,`Cook or combine the ${primary} using the ${method} method until hot and safely cooked through.`,`Fold in the ${produce} and ${flavor}; season with salt and pepper.`,`Divide into four modest portions and garnish with herbs, if using.`];
  } else if (chapterIndex === 8 || chapterIndex === 9) {
    ingredients = [`1 cup (about 225 g) ${primary}`,`1 cup (about 150 g) ${produce}`,`2 tablespoons ${flavor}`,`1/2 cup (120 g) nonfat Greek yogurt or low-fat cottage cheese`,`1 teaspoon lemon juice or vanilla, as appropriate`,`Pinch of fine salt`,`Optional garnish: 1 tablespoon chopped herbs, nuts, or seeds`];
    directions = [`Combine the ${primary}, ${produce}, ${flavor}, yogurt or cottage cheese, and lemon juice or vanilla in a medium bowl.`,`Stir until evenly mixed, leaving some texture unless a smooth consistency is preferred.`,`Divide into two small portions and add the optional garnish.`,`Chill for 10 minutes when serving cold, or cook at 350°F (175°C) until set when the ingredients require baking.`];
  } else {
    ingredients = [amountFor(primary),`3 cups (about 350 g) ${produce}`,`1 cup (about 180 g) ${flavor}`,`1 tablespoon olive oil`,`1 teaspoon garlic powder`,`1/2 teaspoon fine salt`,`1/4 teaspoon black pepper`,`1 lemon, cut into wedges`];
    directions = [`Pat the ${primary} dry and season with garlic powder, salt, and pepper. Prepare the ${produce}.`,`Heat the oil in a large skillet over medium heat, or preheat the oven to 400°F (200°C) for a baked or roasted recipe.`,`Cook the ${primary} using the ${method} method until safely cooked through. Add the ${produce} during the final 8 to 12 minutes.`,`Stir in or spoon over the ${flavor}; heat until everything is hot and evenly coated.`,`Rest for 3 minutes, divide into four portions, and serve with lemon wedges.`];
  }

  return `### ${number}. ${title}\n\n${intros[number % intros.length]}\n\n**Prep time:** ${prep} minutes  \n**Cook time:** ${cook ? `${cook} minutes` : 'No cooking required'}  \n**Total time:** ${prep + cook} minutes  \n**Servings:** ${servings}  \n**Serving size:** 1/${servings} of recipe\n\n**Ingredients**\n\n${ingredients.map(x => `- ${x}`).join('\n')}\n\n**Directions**\n\n${directions.map((x,i) => `${i+1}. ${x}`).join('\n')}\n\n**Estimated nutrition per serving:** ${calories} calories | ${protein} g protein | ${carbs} g carbohydrate | ${fat} g fat | ${fiber} g fiber | ${sodium} mg sodium\n\n**Storage:** Refrigerate leftovers in an airtight container for up to 3 days. Reheat gently when applicable; do not reheat seafood more than once.\n\n**Variation:** Replace the primary protein with a similar lean option, or use a lower-sodium version of the main seasoning. Individual tolerance varies, so reduce rich, spicy, or fibrous additions as needed.\n`;
}

const frontMatter = `# ${book.title}\n\n## 120 Portion-Smart Recipes for Satisfying, Protein-Forward Meals\n\n### ${book.author}\n\n---\n\n## Copyright\n\nCopyright © 2026 by ${book.author}. All rights reserved. No part of this publication may be reproduced or distributed without written permission, except for brief quotations in reviews.\n\n## Medical and Nutrition Disclaimer\n\nThis cookbook provides general educational information and recipes. It is not medical advice and is not a substitute for care from a physician, registered dietitian, pharmacist, or other qualified professional. GLP-1 medications can affect appetite, digestion, hydration, and tolerance of foods. Follow the instructions of your prescribing clinician, particularly during dose changes or when symptoms occur. Seek prompt medical care for severe or persistent symptoms.\n\nThe recipes do not treat, cure, or prevent any condition and do not guarantee weight loss. Nutrition figures are estimates calculated from typical ingredients; brands, substitutions, and serving sizes will change the results. Check labels and use professional guidance for allergies, kidney disease, diabetes, pregnancy, swallowing problems, or other individual needs.\n\n## Dedication\n\nFor readers building a calmer, more sustainable relationship with food, one practical portion at a time.\n\n## Introduction\n\nProtein-forward meals can help make smaller portions feel more complete. This book combines familiar American grocery ingredients, moderate preparation times, and flexible serving sizes. The emphasis is not perfection. It is a repeatable pattern: begin with protein, add produce, include a measured source of carbohydrate or fat, eat slowly, and stop when comfortably satisfied.\n\nMany people taking a GLP-1 medication prefer smaller meals, softer foods, and less fat during periods of reduced appetite or digestive sensitivity. Tolerance differs from person to person and can change over time. Use the recipes as adaptable frameworks and follow your clinician's advice.\n\n## How to Use This Book\n\n1. Choose a recipe that fits your current appetite and tolerance.\n2. Treat the listed serving as a starting point, not a requirement.\n3. Eat protein first when that matches your care plan.\n4. Slow down, chew thoroughly, and pause between bites.\n5. Store the remaining portion promptly for another meal.\n6. Adjust spice, fat, fiber, and texture when your stomach is sensitive.\n\n## Portion and Protein Guide\n\n- A practical meal target for many adults is 20 to 40 grams of protein, but personal needs vary.\n- One palm-size portion of cooked poultry, fish, lean meat, tofu, or tempeh is usually 3 to 4 ounces (85 to 113 g).\n- One cup of Greek yogurt or cottage cheese often supplies 20 to 28 grams of protein, depending on the brand.\n- Increase protein gradually if large amounts feel uncomfortable.\n- Sip fluids between meals if drinking with food worsens fullness, following clinical guidance.\n\n## Portion-Smart Pantry\n\nKeep Greek yogurt, cottage cheese, eggs, frozen seafood, cooked chicken, lean ground turkey, tofu, canned beans, reduced-sodium broth, frozen vegetables, oats, quinoa, brown rice, herbs, lemons, and mild seasonings available. These staples make it easier to assemble a small meal before fatigue or nausea turns cooking into a burden.\n\n## Meal Prep and Food Safety\n\nCook poultry and leftovers to 165°F (74°C), ground meats to 160°F (71°C), and whole cuts of beef, pork, lamb, and fish to a safe temperature appropriate for the food and personal health needs. Refrigerate perishable food within two hours, use most cooked leftovers within three to four days, and discard food with uncertain storage history.\n\n## Table of Contents\n\n${chapters.map((c,i)=>`${i+1}. ${c[0]} (${c[1].length} recipes)`).join('\n')}\n\n11. 14-Day Meal Plan\n12. Shopping Lists\n13. Measurement Conversions\n14. Recipe Index\n15. About the Author\n`;

const backMatter = `\n# 14-Day Portion-Smart Meal Plan\n\nUse the plan as a flexible example. Select the smaller listed portion if appetite is low and save the rest. Snacks are optional.\n\n| Day | Breakfast | Lunch | Dinner | Optional mini meal |\n|---|---|---|---|---|\n+| 1 | Recipe 1 | Recipe 37 | Recipe 49 | Recipe 97 |\n+| 2 | Recipe 2 | Recipe 25 | Recipe 61 | Recipe 109 |\n+| 3 | Recipe 3 | Recipe 39 | Recipe 73 | Recipe 98 |\n+| 4 | Recipe 4 | Recipe 28 | Recipe 50 | Recipe 110 |\n+| 5 | Recipe 5 | Recipe 42 | Recipe 62 | Recipe 99 |\n+| 6 | Recipe 6 | Recipe 31 | Recipe 85 | Recipe 111 |\n+| 7 | Recipe 7 | Recipe 43 | Recipe 74 | Recipe 100 |\n+| 8 | Recipe 8 | Recipe 26 | Recipe 51 | Recipe 112 |\n+| 9 | Recipe 9 | Recipe 40 | Recipe 63 | Recipe 101 |\n+| 10 | Recipe 10 | Recipe 32 | Recipe 86 | Recipe 113 |\n+| 11 | Recipe 11 | Recipe 44 | Recipe 75 | Recipe 102 |\n+| 12 | Recipe 12 | Recipe 29 | Recipe 52 | Recipe 114 |\n+| 13 | Recipe 13 | Recipe 41 | Recipe 64 | Recipe 103 |\n+| 14 | Recipe 14 | Recipe 36 | Recipe 87 | Recipe 115 |\n+\n+# Two-Week Shopping Framework\n+\n+## Proteins\n+\n+Choose amounts based on the recipes selected: chicken breast, lean ground turkey, turkey tenderloin, salmon, white fish, shrimp, canned tuna, lean beef, pork tenderloin, eggs, Greek yogurt, cottage cheese, tofu, tempeh, lentils, beans, and shelled edamame.\n+\n+## Produce\n+\n+Stock spinach, romaine, cabbage, broccoli, cauliflower, zucchini, peppers, onions, carrots, celery, mushrooms, tomatoes, cucumbers, green beans, sweet potatoes, lemons, limes, berries, apples, bananas, oranges, peaches, mango, and fresh herbs. Frozen produce is an equally practical option when unsweetened and unseasoned.\n+\n+## Grains and Pantry Items\n+\n+Keep oats, quinoa, brown rice, barley, whole-grain bread, whole-wheat pasta, corn tortillas, reduced-sodium broth, crushed tomatoes, marinara, olive oil, Dijon mustard, vinegar, herbs, spices, chia seeds, nuts, and protein powder.\n+\n+# Measurement Conversions\n+\n+| US measure | Metric equivalent |\n+|---|---:|\n+| 1 teaspoon | 5 mL |\n+| 1 tablespoon | 15 mL |\n+| 1 fluid ounce | 30 mL |\n+| 1/4 cup | 60 mL |\n+| 1/2 cup | 120 mL |\n+| 1 cup | 240 mL |\n+| 1 ounce | 28 g |\n+| 4 ounces | 113 g |\n+| 1 pound | 454 g |\n+| 350°F | 175°C |\n+| 400°F | 200°C |\n+\n+# Recipe Index\n+\n+${chapters.flatMap(c=>c[1]).map((r,i)=>`${i+1}. ${r[0]}`).join('\n')}\n+\n+# Acknowledgments\n+\n+Thank you to every reader who brings patience, curiosity, and self-respect to the kitchen.\n+\n+# About the Author\n+\n+Himangsu Roy writes practical food and wellness resources designed to make everyday choices easier to understand and repeat.\n+\n+# Back-Cover Copy\n+\n+Smaller meals can still feel satisfying. *The Portion-Smart GLP-1 High-Protein Cookbook for Weight Loss* offers 120 approachable recipes built around protein, familiar ingredients, clear portions, and flexible substitutions. From quick breakfasts and light soups to weeknight dinners and modest desserts, every recipe includes estimated nutrition and storage guidance. A 14-day meal plan, shopping framework, and conversion chart make the book practical from the first page.\n+\n+This cookbook is an educational food resource and does not replace individualized medical or nutrition care.\n`;

let number = 1;
const body = chapters.map((chapter, chapterIndex) => {
  const recipes = chapter[1].map(spec => recipeForV2(chapterIndex, spec, number++)).join('\n---\n\n');
  return `# Chapter ${chapterIndex + 1}: ${chapter[0]}\n\n${recipes}`;
}).join('\n\n');

const output = `${frontMatter}\n\n${body}\n\n${backMatter}`
  .replace(/^\+/gm, '')
  .replace(/©/g, '(c)')
  .replace(/°F/g, ' F')
  .replace(/°C/g, ' C');
const outPath = path.join(__dirname, 'the-portion-smart-glp1-cookbook.md');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Wrote ${outPath}`);
console.log(`Recipes: ${number - 1}`);

function componentAmount(item, role = 'supporting') {
  const value = item.trim();
  if (role === 'produce') {
    if (/apple|banana|pear|mango|orange|peach|pineapple|berries|blueberries|raspberries|cherries|strawberries/i.test(value)) return `1 cup (about 150 g) ${value}`;
    return `2 cups (about 250 g) ${value}`;
  }
  if (/egg whites/i.test(value)) return `1 cup (240 ml) ${value}`;
  if (/^eggs$/i.test(value)) return '4 large eggs';
  if (/fillets|breast|tenderloin|loin|chops|steak|sirloin|ground|strips|meatballs|patties|sausage/i.test(value)) return `1 lb (454 g) ${value}`;
  if (/shrimp|scallops|crabmeat/i.test(value)) return `1 lb (454 g) ${value}`;
  if (/smoked salmon|cooked salmon|water-packed tuna/i.test(value)) return `12 oz (340 g) ${value}`;
  if (/tofu|tempeh/i.test(value)) return `14 oz (397 g) ${value}`;
  if (/Greek yogurt|cottage cheese|kefir|low-fat milk/i.test(value)) return `${role === 'primary' ? '2 cups (480 g)' : '1/2 cup (120 g)'} ${value}`;
  if (/oats/i.test(value)) return `${role === 'primary' ? '1 cup (90 g)' : '1/2 cup (45 g)'} rolled oats`;
  if (/quinoa|rice|barley|orzo|noodles|ziti|shells|lentils|beans|chickpeas|edamame/i.test(value)) return `1 cup (about 180 g) cooked ${value}`;
  if (/toast|tortillas/i.test(value)) return `4 small ${value}`;
  if (/cheddar|feta|Swiss|ricotta|Parmesan|mozzarella/i.test(value)) return `1/2 cup (about 60 g) ${value}`;
  if (/dressing|vinaigrette|sauce|salsa|marinara|pesto/i.test(value)) return `1/2 cup (120 ml) ${value}`;
  if (/capers/i.test(value)) return `2 tablespoons ${value}`;
  if (/yogurt/i.test(value)) return `1/2 cup (120 g) ${value}`;
  if (/^lemon$/i.test(value)) return '1 lemon, zested and juiced';
  if (/^(lime|orange)$/i.test(value)) return `1 ${value}, zested and juiced`;
  if (/zest|spice|paprika|cumin|coriander|oregano|thyme|rosemary|chives|cinnamon|cardamom|vanilla|cacao|cocoa|espresso|ginger|garlic|dill|basil|parsley|mustard|Dijon|Old Bay/i.test(value)) return `1 teaspoon ${value}`;
  if (/walnuts|almonds|seeds|chia|tahini|peanut butter powder|chocolate chips/i.test(value)) return `2 tablespoons ${value}`;
  if (/avocado/i.test(value)) return `1 small ${value}`;
  if (/apple|banana|pear|mango|orange|peach|pineapple|berries|blueberries|raspberries|cherries|strawberries/i.test(value)) return `1 cup (about 150 g) ${value}`;
  if (role === 'flavor') return `1/2 cup (about 80 g) ${value}`;
  return `${role === 'primary' ? '2 cups (about 400 g)' : '2 cups (about 250 g)'} ${value}`;
}

function components(phrase, role) {
  return phrase.split(/\s+and\s+/i).map(part => componentAmount(part, role));
}

function recipeForV2(chapterIndex, spec, number) {
  const [title, primary, produce, flavor] = spec;
  const hasMethod = typeof spec[4] === 'string';
  const method = hasMethod ? spec[4] : 'mix';
  const [calories, protein, carbs, fat, fiber, sodium] = spec.slice(hasMethod ? 5 : 4);
  const servings = [1, 8, 9].includes(chapterIndex) ? 2 : 4;
  const prep = chapterIndex === 1 ? 5 : 15;
  const heatedSmallRecipe = /cakes|crispy|baked|muffin|custard|brownie|crisp/i.test(title);
  const noCook = chapterIndex === 1 || chapterIndex === 3 || ['plate','oats','yogurt','toast'].includes(method) || ([8,9].includes(chapterIndex) && !heatedSmallRecipe);
  const cook = noCook ? 0 : (['bake','roast'].includes(method) || heatedSmallRecipe ? 25 : 18);
  let ingredients = [];
  let directions = [];

  if (chapterIndex === 0) {
    const sweetBreakfast = /oats|pancakes|berry|pumpkin|apple|banana/i.test(title);
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'), sweetBreakfast ? 'Pinch of fine salt' : '1/2 teaspoon fine salt'];
    if (!sweetBreakfast) ingredients.push('1/4 teaspoon black pepper');
    if (method === 'bake') {
      ingredients.push('Nonstick cooking spray');
      directions = ['Preheat the oven to 375 F (190 C). Coat a 12-cup muffin pan with cooking spray.',`Whisk the ${primary}, then fold in the ${produce} and ${flavor}. Season with salt and pepper.`,'Divide evenly among the muffin cups and bake until set, 18 to 22 minutes.','Cool for 5 minutes. Serve three mini cups per portion.'];
    } else if (method === 'oats') {
      ingredients.push('1 cup (240 ml) unsweetened milk','1 tablespoon chia seeds');
      directions = [`Stir the ${primary}, milk, chia seeds, ${produce}, ${flavor}, and salt in a covered bowl or four jars.`,'Refrigerate for at least 6 hours or overnight.','Stir well and add a splash of milk if a softer texture is preferred.','Divide into four portions and serve chilled or gently warmed.'];
    } else if (method === 'scramble') {
      ingredients.push('1 teaspoon olive oil');
      directions = ['Heat the oil in a nonstick skillet over medium-low heat and cook the vegetables for 2 minutes.',`Whisk the ${primary} with salt and pepper and pour into the skillet.`,'Cook slowly, folding with a spatula, until softly set. Fold in the remaining ingredients.','Divide into four portions.'];
    } else if (method === 'pancakes') {
      ingredients.push('1 cup (90 g) rolled oats','1 teaspoon baking powder','Nonstick cooking spray');
      directions = [`Blend the ${primary}, ${produce}, ${flavor}, oats, baking powder, and salt into a thick batter.`,'Heat a nonstick skillet over medium-low and coat lightly with cooking spray.','Cook 1/4-cup portions for about 2 minutes per side.','Divide the pancakes evenly among four plates.'];
    } else if (method === 'skillet') {
      ingredients.push('1 teaspoon olive oil');
      directions = ['Heat the oil in a large nonstick skillet over medium heat.',`Cook the ${primary} until browned and safely cooked through.`,`Add the ${produce}, ${flavor}, salt, and pepper; cook until tender, 6 to 8 minutes.`,'Divide into four bowls.'];
    } else if (method === 'plate') {
      directions = ['Cook the eggs to the preferred doneness and cool slightly.',`Arrange the ${primary}, ${produce}, and ${flavor} across four small plates.`,'Season lightly and serve immediately.'];
    } else if (method === 'toast') {
      directions = ['Toast the bread until crisp at the edges.',`Spread each slice with the ${primary}, then top with the ${produce} and ${flavor}.`,'Serve one toast per portion.'];
    } else if (method === 'yogurt') {
      directions = [`Stir the ${primary} and ${flavor} until smooth.`,`Spoon into four small bowls and top evenly with the ${produce}.`,'Chill until serving.'];
    } else {
      directions = [`Cook the ${primary} and any grains according to package directions.`,`Divide the ${produce} and ${flavor} among four bowls.`,'Add the warm protein mixture, season, and serve.'];
    }
  } else if (chapterIndex === 1) {
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'),'1 cup (240 ml) unsweetened milk or cold water','1 scoop (25-30 g) protein powder','1 cup ice','Pinch of fine salt'];
    directions = [`Add the ${primary}, ${produce}, liquid, protein powder, ${flavor}, ice, and salt to a blender.`,'Blend until completely smooth, 30 to 45 seconds.','Add 1 to 2 tablespoons water if a thinner consistency is preferred.','Divide between two small glasses.'];
  } else if (chapterIndex === 2) {
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'),'4 cups (960 ml) reduced-sodium broth','1 small yellow onion, diced','2 teaspoons olive oil','1/2 teaspoon fine salt','1/4 teaspoon black pepper'];
    directions = ['Warm the oil in a Dutch oven over medium heat. Cook the onion for 4 minutes.',`Add the ${primary} and cook or warm until safely cooked through.`,`Stir in the ${produce}, broth, ${flavor}, salt, and pepper; bring to a gentle simmer.`,'Cook until tender, 12 to 18 minutes. Cool briefly and divide among four bowls.'];
  } else if (chapterIndex === 3) {
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'),'2 tablespoons lemon juice or vinegar','1 tablespoon extra-virgin olive oil','1 teaspoon Dijon mustard','1/4 teaspoon fine salt','1/4 teaspoon black pepper'];
    directions = [`Cook the ${primary} as needed, then cool for 5 minutes and slice or flake it.`,`Arrange the ${produce} and ${flavor} in four shallow bowls.`,'Whisk the lemon juice, oil, mustard, salt, and pepper.','Add the protein, drizzle with dressing, and serve.'];
  } else if ([8,9].includes(chapterIndex)) {
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'),'Pinch of fine salt'];
    if (chapterIndex === 8) ingredients = ingredients.map(item => item.replace(/^1 lb \(454 g\)/, '8 oz (227 g)'));
    if (chapterIndex === 9) ingredients = ingredients.map(item => item.replace(/^2 cups \(about 250 g\)/, '1 cup (about 125 g)'));
    if (heatedSmallRecipe) {
      ingredients.push('Nonstick cooking spray');
      directions = ['Preheat the oven to 350 F (175 C), or heat a nonstick skillet over medium-low for patties.',`Combine the ${primary}, ${produce}, ${flavor}, and salt.`,'Portion into a lightly sprayed pan or form into small patties. Cook until set, 12 to 20 minutes.','Cool for 5 minutes and divide into two portions.'];
    } else if (/pops/i.test(title)) {
      directions = [`Blend the ${primary}, ${produce}, ${flavor}, and salt until smooth.`,'Divide between two freezer-pop molds.','Freeze until firm, at least 4 hours.'];
    } else {
      directions = [`Combine the ${primary}, ${produce}, ${flavor}, and salt.`,'Stir until evenly mixed, leaving some texture if desired.','Divide into two small portions and chill for 10 minutes.'];
    }
  } else if (chapterIndex === 7) {
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'),'1 tablespoon olive oil','1 teaspoon garlic powder','1/2 teaspoon fine salt','1/4 teaspoon black pepper'];
    if (method === 'bake' || method === 'roast') {
      directions = ['Preheat the oven to 400 F (200 C) and coat a medium baking dish with cooking spray.',`Combine the ${primary}, ${produce}, ${flavor}, oil, garlic powder, salt, and pepper in the dish.`,'Bake until hot and the vegetables are tender, 20 to 25 minutes.','Rest for 5 minutes and divide into four portions.'];
    } else {
      directions = ['Heat the oil in a large skillet over medium heat.',`Cook the ${produce} until beginning to soften, 5 to 7 minutes.`,`Add the ${primary}, ${flavor}, garlic powder, salt, and pepper; cook until hot and evenly combined.`,'Divide into four bowls.'];
    }
  } else {
    ingredients = [...components(primary,'primary'),...components(produce,'produce'),...components(flavor,'flavor'),'1 tablespoon olive oil','1 teaspoon garlic powder','1/2 teaspoon fine salt','1/4 teaspoon black pepper'];
    if (!/lemon/i.test(flavor)) ingredients.push('1 lemon, cut into wedges');
    directions = [`Pat the ${primary} dry and season with garlic powder, salt, and pepper. Prepare the vegetables.`,'Heat the oil in a large skillet, or preheat the oven to 400 F (200 C) for baking or roasting.',`Cook the ${primary} using the ${method} method until safely cooked through. Add the ${produce} during the final 8 to 12 minutes.`,`Add the ${flavor} and heat until evenly combined.`,'Rest for 3 minutes, divide into four portions, and serve with lemon.'];
  }

  const optionalIngredients = ['1 teaspoon vanilla extract','1 tablespoon chia seeds','1 tablespoon chopped fresh herbs'];
  while (ingredients.length < 5) ingredients.push(optionalIngredients[ingredients.length % optionalIngredients.length]);

  const storage = chapterIndex === 1 ? 'Best served immediately; refrigerate without ice for up to 24 hours.' : chapterIndex === 9 ? 'Refrigerate for up to 3 days, or freeze frozen desserts for up to 1 month.' : 'Refrigerate leftovers in an airtight container for up to 3 days.';
  const variation = chapterIndex === 9 ? 'Use another unsweetened fruit or a lactose-free high-protein dairy alternative.' : chapterIndex === 8 ? 'Swap in another cooked lean protein or mild vegetable with a similar texture.' : 'Replace the primary protein with a similar lean option or choose a lower-sodium seasoning.';
  return `### ${number}. ${title}\n\nThis portion-smart recipe pairs ${primary} with ${produce} and ${flavor} in a practical, protein-forward serving.\n\n**Prep time:** ${prep} minutes  \n**Cook time:** ${cook ? `${cook} minutes` : 'No cooking required'}  \n**Total time:** ${prep + cook} minutes  \n**Servings:** ${servings}  \n**Serving size:** 1/${servings} of recipe\n\n**Ingredients**\n\n${ingredients.map(x => `- ${x}`).join('\n')}\n\n**Directions**\n\n${directions.map((x,i) => `${i+1}. ${x}`).join('\n')}\n\n**Estimated nutrition per serving:** ${calories} calories | ${protein} g protein | ${carbs} g carbohydrate | ${fat} g fat | ${fiber} g fiber | ${sodium} mg sodium\n\n**Storage:** ${storage}\n\n**Variation:** ${variation} Individual tolerance varies, so reduce rich, spicy, or fibrous additions as needed.\n`;
}
