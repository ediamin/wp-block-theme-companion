import PRESETS_METADATA from './presets-metadata';

import type { ThemeJson, CssVariableAggregatorItem, PresetMetadata } from '../types';

function aggregateAutoCompletionItems(presetMetadata: PresetMetadata, presets: Record<string, any>[], cssVariableAggregatorItems: CssVariableAggregatorItem[]): CssVariableAggregatorItem[] {
    presets.forEach( ( preset: Record<string, any> ) => {
        let value = '';

        if ( presetMetadata.valueKey ) {
            value = preset[ presetMetadata.valueKey ];
        }

        if ( presetMetadata.valueFunc ) {
            value = presetMetadata.valueFunc( preset );
        }

        cssVariableAggregatorItems.push( {
            variable: presetMetadata.cssVars.replace( '$slug', preset.slug ),
            value,
            kind: presetMetadata.kind,
            detail: presetMetadata.detail,
        } );
    } );

    return cssVariableAggregatorItems;
};

async function wpThemeJson( themeJson: ThemeJson ) {
    const { settings } = themeJson;
    let cssVariableAggregatorItems: CssVariableAggregatorItem[] = [];

    const coreThemeJson = await import( './theme.json' ) as ThemeJson;
    const { settings: coreSettings } = coreThemeJson;

    PRESETS_METADATA.forEach( ( presetMetadata ) => {
        // @todo: Work on this type.
        // @ts-ignore
        const { corePresets, presets } = presetMetadata.path.reduce( ( settingsObjects, path ) => {
            return {
                corePresets: settingsObjects.corePresets?.[path] ?? [],
                presets: settingsObjects.presets?.[path] ?? [],
            };
        }, {corePresets: coreSettings, presets: settings} );

        cssVariableAggregatorItems = aggregateAutoCompletionItems( presetMetadata, corePresets, cssVariableAggregatorItems );
        cssVariableAggregatorItems = aggregateAutoCompletionItems( presetMetadata, presets, cssVariableAggregatorItems );
    } );

    return {
        cssVariableAggregatorItems,
    };
}

export default wpThemeJson;