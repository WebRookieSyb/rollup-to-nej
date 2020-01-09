const globby = require("globby")
const findFiles = async (file) => {
	return await globby(file, {
		expandDirectories: {
			files: ['**.js'],
		}
	});
};

const checkOption = (option) => {
	let isOk = false
	if(Object.prototype.toString.call(option) === "[object Object]"){
		if(option.input && typeof option.input === "string" && option.output && typeof option.output === "string") {
			isOk = true;
		}
	}
	return isOk;
}

module.exports = {
	findFiles,
	checkOption
}