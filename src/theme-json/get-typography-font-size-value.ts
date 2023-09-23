// Mimics the WP core `wp_get_typography_font_size_value` function.
function getTypographyFontSizeValue( preset: any ): any {
    return preset.size;
}

export default getTypographyFontSizeValue;