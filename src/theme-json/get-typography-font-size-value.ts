import type { ThemeJson, FontSizesPreset } from '../types';

// Mimics the WP core `wp_get_typography_font_size_value` function.
function getTypographyFontSizeValue(
    themeJson: ThemeJson,
    preset: FontSizesPreset,
    shouldUseFluidTypography: boolean = false
): string | null {
    return 'foo';
}

export default getTypographyFontSizeValue;