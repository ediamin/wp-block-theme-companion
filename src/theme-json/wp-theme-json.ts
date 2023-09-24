import PRESETS_METADATA from './presets-metadata';

import type { ThemeJson, CssVariableAggregatorItem, PresetMetadata } from '../types';

function aggregateAutoCompletionItems(preset: PresetMetadata, presetData: Record<string, any>, cssVariableAggregatorItems: CssVariableAggregatorItem[]): CssVariableAggregatorItem[] {
    presetData.forEach( ( settingObj: any ) => {
        let value = '';

        if ( preset.valueKey ) {
            value = settingObj[ preset.valueKey ];
        }

        if ( preset.valueFunc ) {
            value = preset.valueFunc( settingObj );
        }

        cssVariableAggregatorItems.push( {
            variable: preset.cssVars.replace( '$slug', settingObj.slug ),
            value,
            kind: preset.kind,
            detail: preset.detail,
        } );
    } );

    return cssVariableAggregatorItems;
};

async function wpThemeJson( themeJson: ThemeJson ) {
    const { settings } = themeJson;
    let cssVariableAggregatorItems: CssVariableAggregatorItem[] = [];

    const coreThemeJson = await import( './theme.json' ) as ThemeJson;
    const { settings: coreSettings } = coreThemeJson;

    PRESETS_METADATA.forEach( ( preset ) => {
        // @todo: Work on this type.
        // @ts-ignore
        const { corePresetData, presetData } = preset.path.reduce( ( settingsObjects, path ) => {
            return {
                corePresetData: settingsObjects.corePresetData?.[path] ?? [],
                presetData: settingsObjects.presetData?.[path] ?? [],
            };
        }, {corePresetData: coreSettings, presetData: settings} );

        cssVariableAggregatorItems = aggregateAutoCompletionItems( preset, corePresetData, cssVariableAggregatorItems );
        cssVariableAggregatorItems = aggregateAutoCompletionItems( preset, presetData, cssVariableAggregatorItems );
    } );

    return {
        cssVariableAggregatorItems,
    };
}

export default wpThemeJson;