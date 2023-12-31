/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type SettingsProperties = SettingsPropertiesAppearanceTools &
  SettingsPropertiesBackground &
  SettingsPropertiesBehaviors &
  SettingsPropertiesBorder &
  SettingsPropertiesColor &
  SettingsPropertiesDimensions &
  SettingsPropertiesShadow &
  SettingsPropertiesLayout &
  SettingsPropertiesPosition &
  SettingsPropertiesSpacing &
  SettingsPropertiesTypography &
  SettingsPropertiesCustom;
export type SettingsPropertiesComplete = SettingsProperties & {
  appearanceTools?: unknown;
  background?: unknown;
  behaviors?: unknown;
  border?: unknown;
  color?: unknown;
  dimensions?: unknown;
  layout?: unknown;
  position?: unknown;
  shadow?: unknown;
  spacing?: unknown;
  typography?: unknown;
  custom?: unknown;
};
/**
 * This interface was referenced by `StylesVariationPropertiesComplete`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z0-9-]*$".
 */
export type StylesPropertiesComplete = StylesProperties & {
  border?: unknown;
  color?: unknown;
  dimensions?: unknown;
  spacing?: unknown;
  typography?: unknown;
  filter?: unknown;
  shadow?: unknown;
  outline?: unknown;
  css?: unknown;
};
export type StylesPropertiesAndElementsComplete = StylesProperties & {
  border?: unknown;
  color?: unknown;
  dimensions?: unknown;
  spacing?: unknown;
  typography?: unknown;
  filter?: unknown;
  shadow?: unknown;
  outline?: unknown;
  css?: unknown;
  elements?: StylesElementsPropertiesComplete1;
  variations?: StylesVariationPropertiesComplete;
};

export interface ThemeJson {
  /**
   * JSON schema URI for theme.json.
   */
  $schema?: string;
  /**
   * Version of theme.json to use.
   */
  version: 2;
  /**
   * Title of the global styles variation. If not defined, the file name will be used.
   */
  title?: string;
  /**
   * Description of the global styles variation.
   */
  description?: string;
  /**
   * A list of blocks that have behaviors. This setting controls the display of the Behaviors UI in the block editor.
   */
  behaviors?: {
    blocks?: {
      "core/image"?: BehaviorsBlocksPropertiesComplete;
    };
    [k: string]: unknown;
  };
  /**
   * Settings for the block editor and individual blocks. These include things like:
   * - Which customization options should be available to the user.
   * - The default colors, font sizes... available to the user.
   * - CSS custom properties and class names used in styles.
   * - And the default layout of the editor (widths and available alignments).
   */
  settings?: SettingsProperties & {
    appearanceTools?: unknown;
    /**
     * _**Note:** Since WordPress 6.1._
     *
     * Enables root padding (the values from `styles.spacing.padding`) to be applied to the contents of full-width blocks instead of the root block.
     *
     * Please note that when using this setting, `styles.spacing.padding` should always be set as an object with `top`, `right`, `bottom`, `left` values declared separately.
     */
    useRootPaddingAwareAlignments?: boolean;
    background?: unknown;
    color?: unknown;
    layout?: unknown;
    spacing?: unknown;
    typography?: unknown;
    border?: unknown;
    shadow?: unknown;
    position?: unknown;
    dimensions?: unknown;
    custom?: unknown;
    blocks?: SettingsBlocksPropertiesComplete;
  };
  /**
   * Organized way to set CSS properties. Styles in the top-level will be added in the `body` selector.
   */
  styles?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    spacing?: unknown;
    typography?: unknown;
    filter?: unknown;
    shadow?: unknown;
    outline?: unknown;
    css?: unknown;
    elements?: StylesElementsPropertiesComplete;
    blocks?: StylesBlocksPropertiesComplete;
  };
  /**
   * Additional metadata for custom templates defined in the templates folder.
   */
  customTemplates?: {
    /**
     * Filename, without extension, of the template in the templates folder.
     */
    name: string;
    /**
     * Title of the template, translatable.
     */
    title: string;
    /**
     * List of post types that can use this custom template.
     */
    postTypes?: string[];
  }[];
  /**
   * Additional metadata for template parts defined in the parts folder.
   */
  templateParts?: {
    /**
     * Filename, without extension, of the template in the parts folder.
     */
    name: string;
    /**
     * Title of the template, translatable.
     */
    title?: string;
    /**
     * The area the template part is used for. Block variations for `header` and `footer` values exist and will be used when the area is set to one of those.
     */
    area?: string;
  }[];
  /**
   * An array of pattern slugs to be registered from the Pattern Directory.
   */
  patterns?: string[];
}
export interface BehaviorsBlocksPropertiesComplete {
  /**
   * Settings related to the lightbox behavior.
   */
  lightbox?: {
    /**
     * Allow users to enable the lightbox behavior.
     */
    enabled?: boolean;
    /**
     * Set lightbox animation. Possible values: `fade`, `zoom`, `''` (empty string).
     */
    animation?: "fade" | "zoom" | "";
  };
}
export interface SettingsPropertiesAppearanceTools {
  /**
   * Setting that enables the following UI tools:
   *
   * - background: backgroundImage
   * - border: color, radius, style, width
   * - color: link
   * - dimensions: minHeight
   * - position: sticky
   * - spacing: blockGap, margin, padding
   * - typography: lineHeight
   */
  appearanceTools?: boolean;
  [k: string]: unknown;
}
export interface SettingsPropertiesBackground {
  /**
   * Settings related to background.
   */
  background?: {
    /**
     * Allow users to set a background image.
     */
    backgroundImage?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesBehaviors {
  /**
   * Settings related to behaviors.
   */
  behaviors?: {
    /**
     * Allow users to enable/disable lightbox.
     */
    lightbox?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesBorder {
  /**
   * Settings related to borders.
   */
  border?: {
    /**
     * Allow users to set custom border colors.
     */
    color?: boolean;
    /**
     * Allow users to set custom border radius.
     */
    radius?: boolean;
    /**
     * Allow users to set custom border styles.
     */
    style?: boolean;
    /**
     * Allow users to set custom border widths.
     */
    width?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesColor {
  /**
   * Settings related to colors.
   */
  color?: {
    /**
     * Allow users to set background colors.
     */
    background?: boolean;
    /**
     * Allow users to select custom colors.
     */
    custom?: boolean;
    /**
     * Allow users to create custom duotone filters.
     */
    customDuotone?: boolean;
    /**
     * Allow users to create custom gradients.
     */
    customGradient?: boolean;
    /**
     * Allow users to choose filters from the default duotone filter presets.
     */
    defaultDuotone?: boolean;
    /**
     * Allow users to choose colors from the default gradients.
     */
    defaultGradients?: boolean;
    /**
     * Allow users to choose colors from the default palette.
     */
    defaultPalette?: boolean;
    /**
     * Duotone presets for the duotone picker.
     * Doesn't generate classes or properties.
     */
    duotone?: {
      /**
       * Name of the duotone preset, translatable.
       */
      name: string;
      /**
       * Kebab-case unique identifier for the duotone preset.
       */
      slug: string;
      /**
       * List of colors from dark to light.
       */
      colors: string[];
    }[];
    /**
     * Gradient presets for the gradient picker.
     * Generates a single class (`.has-{slug}-background`) and custom property (`--wp--preset--gradient--{slug}`) per preset value.
     */
    gradients?: {
      /**
       * Name of the gradient preset, translatable.
       */
      name: string;
      /**
       * Kebab-case unique identifier for the gradient preset.
       */
      slug: string;
      /**
       * CSS gradient string.
       */
      gradient: string;
    }[];
    /**
     * Allow users to set link colors.
     */
    link?: boolean;
    /**
     * Color palette presets for the color picker.
     * Generates three classes (`.has-{slug}-color`, `.has-{slug}-background-color`, and `.has-{slug}-border-color`) and a single custom property (`--wp--preset--color--{slug}`) per preset value.
     */
    palette?: {
      /**
       * Name of the color preset, translatable.
       */
      name: string;
      /**
       * Kebab-case unique identifier for the color preset.
       */
      slug: string;
      /**
       * CSS hex or rgb(a) string.
       */
      color: string;
    }[];
    /**
     * Allow users to set text colors.
     */
    text?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesDimensions {
  /**
   * Settings related to dimensions.
   */
  dimensions?: {
    /**
     * Allow users to set custom minimum height.
     */
    minHeight?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesShadow {
  /**
   * Settings related to shadows.
   */
  shadow?: {
    /**
     * Allow users to choose shadows from the default shadow presets.
     */
    defaultPresets?: boolean;
    /**
     * Shadow presets for the shadow picker.
     * Generates a single custom property (`--wp--preset--shadow--{slug}`) per preset value.
     */
    presets?: {
      /**
       * Name of the shadow preset, translatable.
       */
      name: string;
      /**
       * Kebab-case unique identifier for the shadow preset.
       */
      slug: string;
      /**
       * CSS box-shadow value
       */
      shadow: string;
    }[];
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesLayout {
  /**
   * Settings related to layout.
   */
  layout?: {
    /**
     * Sets the max-width of the content.
     */
    contentSize?: string;
    /**
     * Sets the max-width of wide (`.alignwide`) content. Also used as the maximum viewport when calculating fluid font sizes
     */
    wideSize?: string;
    /**
     * Disable the layout UI controls.
     */
    allowEditing?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesPosition {
  /**
   * Settings related to position.
   */
  position?: {
    /**
     * Allow users to set sticky position.
     */
    sticky?: boolean;
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesSpacing {
  /**
   * Settings related to spacing.
   */
  spacing?: {
    /**
     * Enables `--wp--style--block-gap` to be generated from styles.spacing.blockGap.
     * A value of `null` instead of `false` further disables layout styles from being generated.
     */
    blockGap?: boolean | null;
    /**
     * Allow users to set a custom margin.
     */
    margin?: boolean;
    /**
     * Allow users to set a custom padding.
     */
    padding?: boolean;
    /**
     * List of units the user can use for spacing values.
     */
    units?: string[];
    /**
     * Allow users to set custom space sizes.
     */
    customSpacingSize?: boolean;
    /**
     * Space size presets for the space size selector.
     * Generates a custom property (`--wp--preset--spacing--{slug}`) per preset value.
     */
    spacingSizes?: {
      /**
       * Name of the space size preset, translatable.
       */
      name?: string;
      /**
       * Unique identifier for the space size preset. For best cross theme compatibility these should be in the form '10','20','30','40','50','60', etc. with '50' representing the 'Medium' size step.
       */
      slug?: string;
      /**
       * CSS space-size value, including units.
       */
      size?: string;
    }[];
    /**
     * Settings to auto-generate space size presets for the space size selector.
     * Generates a custom property (--wp--preset--spacing--{slug}`) per preset value.
     */
    spacingScale?: {
      /**
       * With + or * depending on whether scale is generated by increment or multiplier.
       */
      operator?: "+" | "*";
      /**
       * The amount to increment each step by.
       */
      increment?: number;
      /**
       * Number of steps to generate in scale.
       */
      steps?: number;
      /**
       * The value to medium setting in the scale.
       */
      mediumStep?: number;
      /**
       * Unit that the scale uses, eg. rem, em, px.
       */
      unit?: "px" | "em" | "rem" | "vh" | "vw" | "%";
    };
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesTypography {
  /**
   * Settings related to typography.
   */
  typography?: {
    /**
     * Allow users to set custom font sizes.
     */
    customFontSize?: boolean;
    /**
     * Allow users to set custom font styles.
     */
    fontStyle?: boolean;
    /**
     * Allow users to set custom font weights.
     */
    fontWeight?: boolean;
    /**
     * Enables fluid typography and allows users to set global fluid typography parameters.
     */
    fluid?:
      | {
          /**
           * Allow users to set a global minimum font size boundary in px, rem or em. Custom font sizes below this value will not be clamped, and all calculated minimum font sizes will be, at a minimum, this value.
           */
          minFontSize?: string;
          /**
           * Allow users to set custom a max viewport width in px, rem or em, used to set the maximum size boundary of a fluid font size.
           */
          maxViewportWidth?: string;
          /**
           * Allow users to set a custom min viewport width in px, rem or em, used to set the minimum size boundary of a fluid font size.
           */
          minViewportWidth?: string;
        }
      | boolean;
    /**
     * Allow users to set custom letter spacing.
     */
    letterSpacing?: boolean;
    /**
     * Allow users to set custom line height.
     */
    lineHeight?: boolean;
    /**
     * Allow users to set the number of text columns.
     */
    textColumns?: boolean;
    /**
     * Allow users to set custom text decorations.
     */
    textDecoration?: boolean;
    /**
     * Allow users to set the writing mode.
     */
    writingMode?: boolean;
    /**
     * Allow users to set custom text transforms.
     */
    textTransform?: boolean;
    /**
     * Enable drop cap.
     */
    dropCap?: boolean;
    /**
     * Font size presets for the font size selector.
     * Generates a single class (`.has-{slug}-color`) and custom property (`--wp--preset--font-size--{slug}`) per preset value.
     */
    fontSizes?: {
      /**
       * Name of the font size preset, translatable.
       */
      name?: string;
      /**
       * Kebab-case unique identifier for the font size preset.
       */
      slug?: string;
      /**
       * CSS font-size value, including units.
       */
      size?: string;
      /**
       * Specifies the minimum and maximum font size value of a fluid font size. Set to `false` to bypass fluid calculations and use the static `size` value.
       */
      fluid?:
        | {
            /**
             * A min font size for fluid font size calculations in px, rem or em.
             */
            min?: string;
            /**
             * A max font size for fluid font size calculations in px, rem or em.
             */
            max?: string;
          }
        | boolean;
    }[];
    /**
     * Font family presets for the font family selector.
     * Generates a single custom property (`--wp--preset--font-family--{slug}`) per preset value.
     */
    fontFamilies?: {
      /**
       * Name of the font family preset, translatable.
       */
      name?: string;
      /**
       * Kebab-case unique identifier for the font family preset.
       */
      slug?: string;
      /**
       * CSS font-family value.
       */
      fontFamily?: string;
      /**
       * Array of font-face declarations.
       */
      fontFace?: {
        /**
         * CSS font-family value.
         */
        fontFamily: string;
        /**
         * CSS font-style value.
         */
        fontStyle?: string;
        /**
         * List of available font weights, separated by a space.
         */
        fontWeight?: string | number;
        /**
         * CSS font-display value.
         */
        fontDisplay?: "auto" | "block" | "fallback" | "swap" | "optional";
        /**
         * Paths or URLs to the font files.
         */
        src: string | string[];
        /**
         * CSS font-stretch value.
         */
        fontStretch?: string;
        /**
         * CSS ascent-override value.
         */
        ascentOverride?: string;
        /**
         * CSS descent-override value.
         */
        descentOverride?: string;
        /**
         * CSS font-variant value.
         */
        fontVariant?: string;
        /**
         * CSS font-feature-settings value.
         */
        fontFeatureSettings?: string;
        /**
         * CSS font-variation-settings value.
         */
        fontVariationSettings?: string;
        /**
         * CSS line-gap-override value.
         */
        lineGapOverride?: string;
        /**
         * CSS size-adjust value.
         */
        sizeAdjust?: string;
        /**
         * CSS unicode-range value.
         */
        unicodeRange?: string;
      }[];
    }[];
  };
  [k: string]: unknown;
}
export interface SettingsPropertiesCustom {
  custom?: SettingsCustomAdditionalProperties;
  [k: string]: unknown;
}
/**
 * Generate custom CSS custom properties of the form `--wp--custom--{key}--{nested-key}: {value};`. `camelCased` keys are transformed to `kebab-case` as to follow the CSS property naming schema. Keys at different depth levels are separated by `--`, so keys should not include `--` in the name.
 */
export interface SettingsCustomAdditionalProperties {
  [k: string]: string | number | SettingsCustomAdditionalProperties1;
}
export interface SettingsCustomAdditionalProperties1 {
  [k: string]: string | number | SettingsCustomAdditionalProperties1;
}
/**
 * Settings defined on a per-block basis.
 */
export interface SettingsBlocksPropertiesComplete {
  "core/archives"?: SettingsPropertiesComplete;
  "core/audio"?: SettingsPropertiesComplete;
  "core/avatar"?: SettingsPropertiesComplete;
  "core/block"?: SettingsPropertiesComplete;
  "core/button"?: SettingsPropertiesComplete;
  "core/buttons"?: SettingsPropertiesComplete;
  "core/calendar"?: SettingsPropertiesComplete;
  "core/categories"?: SettingsPropertiesComplete;
  "core/code"?: SettingsPropertiesComplete;
  "core/column"?: SettingsPropertiesComplete;
  "core/columns"?: SettingsPropertiesComplete;
  "core/comment-author-avatar"?: SettingsPropertiesComplete;
  "core/comment-author-name"?: SettingsPropertiesComplete;
  "core/comment-content"?: SettingsPropertiesComplete;
  "core/comment-date"?: SettingsPropertiesComplete;
  "core/comment-edit-link"?: SettingsPropertiesComplete;
  "core/comment-reply-link"?: SettingsPropertiesComplete;
  "core/comments"?: SettingsPropertiesComplete;
  "core/comments-pagination"?: SettingsPropertiesComplete;
  "core/comments-pagination-next"?: SettingsPropertiesComplete;
  "core/comments-pagination-numbers"?: SettingsPropertiesComplete;
  "core/comments-pagination-previous"?: SettingsPropertiesComplete;
  "core/comments-title"?: SettingsPropertiesComplete;
  "core/comment-template"?: SettingsPropertiesComplete;
  "core/cover"?: SettingsPropertiesComplete;
  "core/details"?: SettingsPropertiesComplete;
  "core/embed"?: SettingsPropertiesComplete;
  "core/file"?: SettingsPropertiesComplete;
  "core/freeform"?: SettingsPropertiesComplete;
  "core/gallery"?: SettingsPropertiesComplete;
  "core/group"?: SettingsPropertiesComplete;
  "core/heading"?: SettingsPropertiesComplete;
  "core/home-link"?: SettingsPropertiesComplete;
  "core/html"?: SettingsPropertiesComplete;
  "core/image"?: SettingsPropertiesComplete;
  "core/latest-comments"?: SettingsPropertiesComplete;
  "core/latest-posts"?: SettingsPropertiesComplete;
  "core/list"?: SettingsPropertiesComplete;
  "core/list-item"?: SettingsPropertiesComplete;
  "core/loginout"?: SettingsPropertiesComplete;
  "core/media-text"?: SettingsPropertiesComplete;
  "core/missing"?: SettingsPropertiesComplete;
  "core/more"?: SettingsPropertiesComplete;
  "core/navigation"?: SettingsPropertiesComplete;
  "core/navigation-link"?: SettingsPropertiesComplete;
  "core/navigation-submenu"?: SettingsPropertiesComplete;
  "core/nextpage"?: SettingsPropertiesComplete;
  "core/page-list"?: SettingsPropertiesComplete;
  "core/page-list-item"?: SettingsPropertiesComplete;
  "core/paragraph"?: SettingsPropertiesComplete;
  "core/post-author"?: SettingsPropertiesComplete;
  "core/post-author-biography"?: SettingsPropertiesComplete;
  "core/post-author-name"?: SettingsPropertiesComplete;
  "core/post-comment"?: SettingsPropertiesComplete;
  "core/post-comments-count"?: SettingsPropertiesComplete;
  "core/post-comments-form"?: SettingsPropertiesComplete;
  "core/post-comments-link"?: SettingsPropertiesComplete;
  "core/post-content"?: SettingsPropertiesComplete;
  "core/post-date"?: SettingsPropertiesComplete;
  "core/post-excerpt"?: SettingsPropertiesComplete;
  "core/post-featured-image"?: SettingsPropertiesComplete;
  "core/post-navigation-link"?: SettingsPropertiesComplete;
  "core/post-template"?: SettingsPropertiesComplete;
  "core/post-terms"?: SettingsPropertiesComplete;
  "core/post-time-to-read"?: SettingsPropertiesComplete;
  "core/post-title"?: SettingsPropertiesComplete;
  "core/preformatted"?: SettingsPropertiesComplete;
  "core/pullquote"?: SettingsPropertiesComplete;
  "core/query"?: SettingsPropertiesComplete;
  "core/query-no-results"?: SettingsPropertiesComplete;
  "core/query-pagination"?: SettingsPropertiesComplete;
  "core/query-pagination-next"?: SettingsPropertiesComplete;
  "core/query-pagination-numbers"?: SettingsPropertiesComplete;
  "core/query-pagination-previous"?: SettingsPropertiesComplete;
  "core/query-title"?: SettingsPropertiesComplete;
  "core/quote"?: SettingsPropertiesComplete;
  "core/read-more"?: SettingsPropertiesComplete;
  "core/rss"?: SettingsPropertiesComplete;
  "core/search"?: SettingsPropertiesComplete;
  "core/separator"?: SettingsPropertiesComplete;
  "core/shortcode"?: SettingsPropertiesComplete;
  "core/site-logo"?: SettingsPropertiesComplete;
  "core/site-tagline"?: SettingsPropertiesComplete;
  "core/site-title"?: SettingsPropertiesComplete;
  "core/social-link"?: SettingsPropertiesComplete;
  "core/social-links"?: SettingsPropertiesComplete;
  "core/spacer"?: SettingsPropertiesComplete;
  "core/table"?: SettingsPropertiesComplete;
  "core/table-of-contents"?: SettingsPropertiesComplete;
  "core/tag-cloud"?: SettingsPropertiesComplete;
  "core/template-part"?: SettingsPropertiesComplete;
  "core/term-description"?: SettingsPropertiesComplete;
  "core/text-columns"?: SettingsPropertiesComplete;
  "core/verse"?: SettingsPropertiesComplete;
  "core/video"?: SettingsPropertiesComplete;
  "core/widget-area"?: SettingsPropertiesComplete;
  "core/legacy-widget"?: SettingsPropertiesComplete;
  "core/widget-group"?: SettingsPropertiesComplete;
}
export interface StylesProperties {
  /**
   * Border styles.
   */
  border?: {
    /**
     * Sets the `border-color` CSS property.
     */
    color?: string | RefComplete;
    /**
     * Sets the `border-radius` CSS property.
     */
    radius?:
      | string
      | RefComplete
      | {
          /**
           * Sets the `border-top-left-radius` CSS property.
           */
          topLeft?: string | RefComplete;
          /**
           * Sets the `border-top-right-radius` CSS property.
           */
          topRight?: string | RefComplete;
          /**
           * Sets the `border-bottom-left-radius` CSS property.
           */
          bottomLeft?: string | RefComplete;
          /**
           * Sets the `border-bottom-right-radius` CSS property.
           */
          bottomRight?: string | RefComplete;
          [k: string]: unknown;
        };
    /**
     * Sets the `border-style` CSS property.
     */
    style?: string | RefComplete;
    /**
     * Sets the `border-width` CSS property.
     */
    width?: string | RefComplete;
    top?: {
      /**
       * Sets the `border-top-color` CSS property.
       */
      color?: string | RefComplete;
      /**
       * Sets the `border-top-style` CSS property.
       */
      style?: string | RefComplete;
      /**
       * Sets the `border-top-width` CSS property.
       */
      width?: string | RefComplete;
    };
    right?: {
      /**
       * Sets the `border-right-color` CSS property.
       */
      color?: string | RefComplete;
      /**
       * Sets the `border-right-style` CSS property.
       */
      style?: string | RefComplete;
      /**
       * Sets the `border-right-width` CSS property.
       */
      width?: string | RefComplete;
    };
    bottom?: {
      /**
       * Sets the `border-bottom-color` CSS property.
       */
      color?: string | RefComplete;
      /**
       * Sets the `border-bottom-style` CSS property.
       */
      style?: string | RefComplete;
      /**
       * Sets the `border-bottom-width` CSS property.
       */
      width?: string | RefComplete;
    };
    left?: {
      /**
       * Sets the `border-left-color` CSS property.
       */
      color?: string | RefComplete;
      /**
       * Sets the `border-left-style` CSS property.
       */
      style?: string | RefComplete;
      /**
       * Sets the `border-left-width` CSS property.
       */
      width?: string | RefComplete;
    };
  };
  /**
   * Color styles.
   */
  color?: {
    /**
     * Sets the `background-color` CSS property.
     */
    background?: string | RefComplete;
    /**
     * Sets the `background` CSS property.
     */
    gradient?: string | RefComplete;
    /**
     * Sets the `color` CSS property.
     */
    text?: string | RefComplete;
  };
  /**
   * Dimensions styles
   */
  dimensions?: {
    /**
     * Sets the `min-height` CSS property.
     */
    minHeight?: string | RefComplete;
    [k: string]: unknown;
  };
  /**
   * Spacing styles.
   */
  spacing?: {
    /**
     * Sets the `--wp--style--block-gap` CSS custom property when settings.spacing.blockGap is true.
     */
    blockGap?: string | RefComplete;
    /**
     * Margin styles.
     */
    margin?: {
      /**
       * Sets the `margin-top` CSS property.
       */
      top?: string | RefComplete;
      /**
       * Sets the `margin-right` CSS property.
       */
      right?: string | RefComplete;
      /**
       * Sets the `margin-bottom` CSS property.
       */
      bottom?: string | RefComplete;
      /**
       * Sets the `margin-left` CSS property.
       */
      left?: string | RefComplete;
    };
    /**
     * Padding styles.
     */
    padding?: {
      /**
       * Sets the `padding-top` CSS property.
       */
      top?: string | RefComplete;
      /**
       * Sets the `padding-right` CSS property.
       */
      right?: string | RefComplete;
      /**
       * Sets the `padding-bottom` CSS property.
       */
      bottom?: string | RefComplete;
      /**
       * Sets the `padding-left` CSS property.
       */
      left?: string | RefComplete;
    };
  };
  /**
   * Typography styles.
   */
  typography?: {
    /**
     * Sets the `font-family` CSS property.
     */
    fontFamily?: string | RefComplete;
    /**
     * Sets the `font-size` CSS property.
     */
    fontSize?: string | RefComplete;
    /**
     * Sets the `font-style` CSS property.
     */
    fontStyle?: string | RefComplete;
    /**
     * Sets the `font-weight` CSS property.
     */
    fontWeight?: string | RefComplete;
    /**
     * Sets the `letter-spacing` CSS property.
     */
    letterSpacing?: string | RefComplete;
    /**
     * Sets the `line-height` CSS property.
     */
    lineHeight?: string | RefComplete;
    /**
     * Sets the `column-count` CSS property.
     */
    textColumns?: string;
    /**
     * Sets the `text-decoration` CSS property.
     */
    textDecoration?: string | RefComplete;
    /**
     * Sets the `writing-mode` CSS property.
     */
    writingMode?: string | RefComplete;
    /**
     * Sets the `text-transform` CSS property.
     */
    textTransform?: string | RefComplete;
  };
  /**
   * CSS and SVG filter styles.
   */
  filter?: {
    /**
     * Sets the duotone filter.
     */
    duotone?: string | RefComplete;
  };
  /**
   * Box shadow styles.
   */
  shadow?: string | RefComplete;
  /**
   * Outline styles.
   */
  outline?: {
    /**
     * Sets the `outline-color` CSS property.
     */
    color?: string | RefComplete;
    /**
     * Sets the `outline-offset` CSS property.
     */
    offset?: string | RefComplete;
    /**
     * Sets the `outline-style` CSS property.
     */
    style?: string | RefComplete;
    /**
     * Sets the `outline-width` CSS property.
     */
    width?: string | RefComplete;
  };
  /**
   * Sets custom CSS to apply styling not covered by other theme.json properties.
   */
  css?: string;
  [k: string]: unknown;
}
export interface RefComplete {
  /**
   * A reference to another property value. e.g. `styles.color.text`
   */
  ref?: string;
  [k: string]: unknown;
}
/**
 * Styles defined on a per-element basis using the element's selector.
 */
export interface StylesElementsPropertiesComplete {
  button?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    filter?: unknown;
    shadow?: unknown;
    outline?: unknown;
    spacing?: unknown;
    typography?: unknown;
    css?: unknown;
    ":hover"?: StylesPropertiesComplete;
    ":focus"?: StylesPropertiesComplete;
    ":active"?: StylesPropertiesComplete;
    ":visited"?: StylesPropertiesComplete;
    ":link"?: StylesPropertiesComplete;
    ":any-link"?: StylesPropertiesComplete;
  };
  link?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    spacing?: unknown;
    typography?: unknown;
    ":hover"?: StylesPropertiesComplete;
    ":focus"?: StylesPropertiesComplete;
    ":active"?: StylesPropertiesComplete;
    ":visited"?: StylesPropertiesComplete;
    ":link"?: StylesPropertiesComplete;
    ":any-link"?: StylesPropertiesComplete;
  };
  heading?: StylesPropertiesComplete;
  h1?: StylesPropertiesComplete;
  h2?: StylesPropertiesComplete;
  h3?: StylesPropertiesComplete;
  h4?: StylesPropertiesComplete;
  h5?: StylesPropertiesComplete;
  h6?: StylesPropertiesComplete;
  caption?: StylesPropertiesComplete;
  cite?: StylesPropertiesComplete;
}
/**
 * Styles defined on a per-block basis using the block's selector.
 */
export interface StylesBlocksPropertiesComplete {
  "core/archives"?: StylesPropertiesAndElementsComplete;
  "core/audio"?: StylesPropertiesAndElementsComplete;
  "core/avatar"?: StylesPropertiesAndElementsComplete;
  "core/block"?: StylesPropertiesAndElementsComplete;
  "core/button"?: StylesPropertiesAndElementsComplete;
  "core/buttons"?: StylesPropertiesAndElementsComplete;
  "core/calendar"?: StylesPropertiesAndElementsComplete;
  "core/categories"?: StylesPropertiesAndElementsComplete;
  "core/code"?: StylesPropertiesAndElementsComplete;
  "core/column"?: StylesPropertiesAndElementsComplete;
  "core/columns"?: StylesPropertiesAndElementsComplete;
  "core/comment-author-avatar"?: StylesPropertiesAndElementsComplete;
  "core/comment-author-name"?: StylesPropertiesAndElementsComplete;
  "core/comment-content"?: StylesPropertiesAndElementsComplete;
  "core/comment-date"?: StylesPropertiesAndElementsComplete;
  "core/comment-edit-link"?: StylesPropertiesAndElementsComplete;
  "core/comment-reply-link"?: StylesPropertiesAndElementsComplete;
  "core/comments"?: StylesPropertiesAndElementsComplete;
  "core/comments-pagination"?: StylesPropertiesAndElementsComplete;
  "core/comments-pagination-next"?: StylesPropertiesAndElementsComplete;
  "core/comments-pagination-numbers"?: StylesPropertiesAndElementsComplete;
  "core/comments-pagination-previous"?: StylesPropertiesAndElementsComplete;
  "core/comments-title"?: StylesPropertiesAndElementsComplete;
  "core/comment-template"?: StylesPropertiesAndElementsComplete;
  "core/cover"?: StylesPropertiesAndElementsComplete;
  "core/details"?: StylesPropertiesAndElementsComplete;
  "core/embed"?: StylesPropertiesAndElementsComplete;
  "core/file"?: StylesPropertiesAndElementsComplete;
  "core/freeform"?: StylesPropertiesAndElementsComplete;
  "core/gallery"?: StylesPropertiesAndElementsComplete;
  "core/group"?: StylesPropertiesAndElementsComplete;
  "core/heading"?: StylesPropertiesAndElementsComplete;
  "core/home-link"?: StylesPropertiesAndElementsComplete;
  "core/html"?: StylesPropertiesAndElementsComplete;
  "core/image"?: StylesPropertiesAndElementsComplete;
  "core/latest-comments"?: StylesPropertiesAndElementsComplete;
  "core/latest-posts"?: StylesPropertiesAndElementsComplete;
  "core/list"?: StylesPropertiesAndElementsComplete;
  "core/list-item"?: StylesPropertiesAndElementsComplete;
  "core/loginout"?: StylesPropertiesAndElementsComplete;
  "core/media-text"?: StylesPropertiesAndElementsComplete;
  "core/missing"?: StylesPropertiesAndElementsComplete;
  "core/more"?: StylesPropertiesAndElementsComplete;
  "core/navigation"?: StylesPropertiesAndElementsComplete;
  "core/navigation-link"?: StylesPropertiesAndElementsComplete;
  "core/navigation-submenu"?: StylesPropertiesAndElementsComplete;
  "core/nextpage"?: StylesPropertiesAndElementsComplete;
  "core/page-list"?: StylesPropertiesAndElementsComplete;
  "core/page-list-item"?: StylesPropertiesAndElementsComplete;
  "core/paragraph"?: StylesPropertiesAndElementsComplete;
  "core/post-author"?: StylesPropertiesAndElementsComplete;
  "core/post-author-biography"?: StylesPropertiesAndElementsComplete;
  "core/post-author-name"?: StylesPropertiesAndElementsComplete;
  "core/post-comment"?: StylesPropertiesAndElementsComplete;
  "core/post-comments-count"?: StylesPropertiesAndElementsComplete;
  "core/post-comments-form"?: StylesPropertiesAndElementsComplete;
  "core/post-comments-link"?: StylesPropertiesAndElementsComplete;
  "core/post-content"?: StylesPropertiesAndElementsComplete;
  "core/post-date"?: StylesPropertiesAndElementsComplete;
  "core/post-excerpt"?: StylesPropertiesAndElementsComplete;
  "core/post-featured-image"?: StylesPropertiesAndElementsComplete;
  "core/post-navigation-link"?: StylesPropertiesAndElementsComplete;
  "core/post-template"?: StylesPropertiesAndElementsComplete;
  "core/post-terms"?: StylesPropertiesAndElementsComplete;
  "core/post-time-to-read"?: StylesPropertiesAndElementsComplete;
  "core/post-title"?: StylesPropertiesAndElementsComplete;
  "core/preformatted"?: StylesPropertiesAndElementsComplete;
  "core/pullquote"?: StylesPropertiesAndElementsComplete;
  "core/query"?: StylesPropertiesAndElementsComplete;
  "core/query-no-results"?: StylesPropertiesAndElementsComplete;
  "core/query-pagination"?: StylesPropertiesAndElementsComplete;
  "core/query-pagination-next"?: StylesPropertiesAndElementsComplete;
  "core/query-pagination-numbers"?: StylesPropertiesAndElementsComplete;
  "core/query-pagination-previous"?: StylesPropertiesAndElementsComplete;
  "core/query-title"?: StylesPropertiesAndElementsComplete;
  "core/quote"?: StylesPropertiesAndElementsComplete;
  "core/read-more"?: StylesPropertiesAndElementsComplete;
  "core/rss"?: StylesPropertiesAndElementsComplete;
  "core/search"?: StylesPropertiesAndElementsComplete;
  "core/separator"?: StylesPropertiesAndElementsComplete;
  "core/shortcode"?: StylesPropertiesAndElementsComplete;
  "core/site-logo"?: StylesPropertiesAndElementsComplete;
  "core/site-tagline"?: StylesPropertiesAndElementsComplete;
  "core/site-title"?: StylesPropertiesAndElementsComplete;
  "core/social-link"?: StylesPropertiesAndElementsComplete;
  "core/social-links"?: StylesPropertiesAndElementsComplete;
  "core/spacer"?: StylesPropertiesAndElementsComplete;
  "core/table"?: StylesPropertiesAndElementsComplete;
  "core/table-of-contents"?: StylesPropertiesAndElementsComplete;
  "core/tag-cloud"?: StylesPropertiesAndElementsComplete;
  "core/template-part"?: StylesPropertiesAndElementsComplete;
  "core/term-description"?: StylesPropertiesAndElementsComplete;
  "core/text-columns"?: StylesPropertiesAndElementsComplete;
  "core/verse"?: StylesPropertiesAndElementsComplete;
  "core/video"?: StylesPropertiesAndElementsComplete;
  "core/widget-area"?: StylesPropertiesAndElementsComplete;
  "core/legacy-widget"?: StylesPropertiesAndElementsComplete;
  "core/widget-group"?: StylesPropertiesAndElementsComplete;
}
export interface StylesElementsPropertiesComplete1 {
  button?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    filter?: unknown;
    shadow?: unknown;
    outline?: unknown;
    spacing?: unknown;
    typography?: unknown;
    css?: unknown;
    ":hover"?: StylesPropertiesComplete;
    ":focus"?: StylesPropertiesComplete;
    ":active"?: StylesPropertiesComplete;
    ":visited"?: StylesPropertiesComplete;
    ":link"?: StylesPropertiesComplete;
    ":any-link"?: StylesPropertiesComplete;
  };
  link?: StylesProperties & {
    border?: unknown;
    color?: unknown;
    spacing?: unknown;
    typography?: unknown;
    ":hover"?: StylesPropertiesComplete;
    ":focus"?: StylesPropertiesComplete;
    ":active"?: StylesPropertiesComplete;
    ":visited"?: StylesPropertiesComplete;
    ":link"?: StylesPropertiesComplete;
    ":any-link"?: StylesPropertiesComplete;
  };
  heading?: StylesPropertiesComplete;
  h1?: StylesPropertiesComplete;
  h2?: StylesPropertiesComplete;
  h3?: StylesPropertiesComplete;
  h4?: StylesPropertiesComplete;
  h5?: StylesPropertiesComplete;
  h6?: StylesPropertiesComplete;
  caption?: StylesPropertiesComplete;
  cite?: StylesPropertiesComplete;
}
export interface StylesVariationPropertiesComplete {
  [k: string]: StylesPropertiesComplete;
}
