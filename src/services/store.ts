let imageUri: string | null = null;

export const setImageUri = (uri: string) => {
	imageUri = uri;
};

export const getImageUri = () => imageUri;

export const clearImageUri = () => {
	imageUri = null;
};
