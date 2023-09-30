export interface FontSizesPreset {
	name?: string;
	slug?: string;
	size?: string | number | null;
	fluid?:
		| {
				min?: string;
				max?: string;
		  }
		| boolean
		| null;
}
