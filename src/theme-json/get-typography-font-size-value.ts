import type { ThemeJson } from '../types';

// Mimics the WP core `wp_get_typography_font_size_value` function.
function getTypographyFontSizeValue( preset: any, themeJson: ThemeJson ): any {
    return preset.size;
}

export default getTypographyFontSizeValue;