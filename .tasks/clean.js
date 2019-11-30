import del from 'del';

export const cleanDist = () => {
	return del('./dist')
};

export const cleanAssets = () => {
	return del('./dist/assets')
};

module.exports = {
	cleanDist,
	cleanAssets,
};