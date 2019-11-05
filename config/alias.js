const path = require("path");

const alias = {
	"~": path.join(__dirname, "../src"),
	"Textures": path.join(__dirname, "../src/assets/img/Textures"),
	"Styles": path.join(__dirname, "../src/assets/scss"),
	"GlobalStyles": path.join(__dirname, "../src/assets/scss/app.scss"), 
	"Helpers": path.join(__dirname, "../src/Helpers")
};

module.exports = alias;
