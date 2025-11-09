// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createSettings } from '../settings/createSettings';
import type { Settings, Setting } from '../settings/types';
import KeyValueStore from '../stores/KeyValueStore';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import type { Theme, ThemeColors, ThemeDefinition } from './types';

type ColorScheme = 'light' | 'dark' | 'system';
const COLOR_SCHEMES = ['light', 'dark', 'system'] as const;
const DEFAULT_COLOR_SCHEME = 'system';
const DEFAULT_SYSTEM_COLOR_SCHEME = 'light';

export function createTheme<
  C extends ThemeColors,
  T extends ThemeDefinition<C> = ThemeDefinition<C>,
>(defaultTheme: T) {
  const themeStore = new KeyValueStore();
  const keys = { theme: 'theme', scheme: 'scheme' };

  const stringifiedDefaultTheme = JSON.stringify(defaultTheme);

  const definitions = {
    theme: {
      default: defaultTheme,
      validate: (_value: T) => true, // If it passes TypeScript, it's valid
      update: async (value: T) =>
        await themeStore.put(keys.theme, JSON.stringify(value)),
      read: async () =>
        JSON.parse(
          await themeStore.read(keys.theme, stringifiedDefaultTheme)
        ) as T,
    } satisfies Setting<T>,
    scheme: {
      default: DEFAULT_COLOR_SCHEME as ColorScheme,
      validate: (value: ColorScheme) => COLOR_SCHEMES.includes(value),
      update: async (value: ColorScheme) =>
        await themeStore.put(keys.scheme, value),
      read: async () =>
        (await themeStore.read(
          keys.scheme,
          DEFAULT_COLOR_SCHEME
        )) as ColorScheme,
    } satisfies Setting<ColorScheme>,
  } satisfies Settings;

  const { useSettings, settingsStore } = createSettings(definitions);

  function initTheme(theme: T, scheme: ColorScheme = DEFAULT_COLOR_SCHEME) {
    settingsStore.update({ theme, scheme });
  }

  function useTheme() {
    const [settings, updateSettings, resetSettings] = useSettings('useTheme');
    const systemColorScheme = useSystemColorScheme();

    const currentScheme =
      settings.scheme === 'system'
        ? (systemColorScheme ?? DEFAULT_SYSTEM_COLOR_SCHEME)
        : settings.scheme;
    const colors =
      currentScheme === 'dark' ? settings.theme.dark : settings.theme.light;

    return {
      theme: { fonts: settings.theme.fonts, colors } as Theme<C>,
      setTheme: (theme: T) => updateSettings({ theme }),
      setScheme: (scheme: ColorScheme) => updateSettings({ scheme }),
      resetTheme: resetSettings,
    };
  }

  return { initTheme, useTheme };
}
