# The Portion-Smart KDP package

Final publication candidate: **The Portion-Smart GLP-1 High-Protein Eating Guide** by Himangsu Roy.

## Production files

- `portion-smart-glp1-eating-guide-canva.html` - 72 fixed 8.625 x 11.25 inch pages with bleed for Canva import
- `kdp-interior-8x10-standard-color.pdf` - previous 8 x 10 interior; do not use after the resize
- `kdp-full-wrap-cover.html` - full-wrap cover source
- `kdp-full-wrap-cover-72-pages.pdf` - full-wrap paperback cover
- `amazon-kdp-listing.md` - description, keywords, categories, pricing direction, and AI disclosure
- `kdp-production-spec.md` - trim, margins, page count, spine, and cover dimensions
- `image-license-record.md` - stock-image sources and pre-publication verification checklist
- `canva-final-links.md` - final Canva edit/view links and KDP upload sequence

## Build

From the repository root:

```powershell
node cookbook/build-eating-guide.js
node cookbook/build-kdp-package.js
```

The guide contains 48 flexible meal frameworks, a 14-day planning map, shopping and preparation tools, and four worksheets. It deliberately avoids tested-recipe, exact-nutrition, and guaranteed weight-loss claims.

Before publishing, review the exported files in KDP Print Previewer, confirm every stock-image source and license record, order a physical proof, and correct any issue found in the proof.
