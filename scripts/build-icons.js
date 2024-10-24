const fs = require("fs");
const path = require("path");
const svgr = require("@svgr/core").default;

const iconsDir = path.join(__dirname, "../icons");
const outputDir = path.join(__dirname, "../src/components/icons");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error("Error reading icons directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(iconsDir, file);
    const fileName = path.basename(file, path.extname(file));

    fs.readFile(filePath, "utf8", (err, svgContent) => {
      if (err) {
        console.error("Error reading SVG file:", err);
        return;
      }

      svgr(svgContent, { icon: true }, { componentName: fileName })
        .then((jsCode) => {
          const outputFilePath = path.join(outputDir, `${fileName}.js`);
          fs.writeFile(outputFilePath, jsCode, (err) => {
            if (err) {
              console.error("Error writing React component file:", err);
            } else {
              console.log(`Successfully created ${fileName}.js`);
            }
          });
        })
        .catch((err) => {
          console.error("Error converting SVG to React component:", err);
        });
    });
  });
});
