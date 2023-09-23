import PRESETS_METADATA from './presets-metadata';

import type { ThemeJson, CssVariableAggregatorItem } from '../types';

function wpThemeJson( themeJson: ThemeJson ) {
    const { settings } = themeJson;
    const cssVariableAggregatorItems: CssVariableAggregatorItem[] = [];

    PRESETS_METADATA.forEach( ( preset ) => {
        // @todo: Work on this type.
        // @ts-ignore
        const setting = preset.path.reduce( ( settingsObject, path ) => {
            return settingsObject?.[ path ] ?? {};
        }, settings );

        if ( Array.isArray( setting ) && setting.length ) {
            setting.forEach( ( settingObj ) => {
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
        }
    } );

    return {
        cssVariableAggregatorItems,
    };
}

export default wpThemeJson;