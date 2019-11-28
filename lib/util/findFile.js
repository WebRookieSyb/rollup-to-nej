const globby = require("globby")
const findFiles = async (file) => {
	return await globby.sync(file, {
		expandDirectories: {
			files: ['**.vue', '**.js'],
		}
	});
};

module.exports = {
  findFiles
}