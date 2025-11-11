// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import DefaultFonts from '../fonts/DefaultFonts';
import type { ThemeColors, ThemeDefinition } from '../types';
import { createTheme } from '../createTheme';
import { act, renderHook } from '@testing-library/react-native';

describe('useTheme', () => {
  it('provides the default theme', () => {
    const { useTheme } = createTheme<BasicColors>(basicTheme);

    const { result } = renderHook(() => useTheme());
    const { theme } = result.current;

    expect(theme.colors.primary).toBe(basicTheme.light.primary);
    expect(theme.colors.background).toBe(basicTheme.light.background);
  });

  it('can initialize a default theme/scheme', () => {
    const { initTheme, useTheme } = createTheme<BasicColors>(altTheme);
    initTheme(altTheme, 'dark');

    const { result } = renderHook(() => useTheme());
    const { theme } = result.current;

    expect(theme.colors.primary).toBe(altTheme.dark.primary);
    expect(theme.colors.background).toBe(altTheme.dark.background);
  });

  it('reacts to theme changes', () => {
    const { useTheme } = createTheme<BasicColors>(basicTheme);

    const { result } = renderHook(() => useTheme());
    const { setTheme } = result.current;
    act(() => setTheme(altTheme));
    const { theme } = result.current;

    expect(theme.colors.primary).toBe(altTheme.light.primary);
    expect(theme.colors.background).toBe(altTheme.light.background);
  });

  it('reacts to color scheme changes', () => {
    const { useTheme } = createTheme<BasicColors>(basicTheme);

    const { result } = renderHook(() => useTheme());
    const { setScheme } = result.current;
    act(() => setScheme('dark'));
    const { theme } = result.current;

    expect(theme.colors.primary).toBe(basicTheme.dark.primary);
    expect(theme.colors.background).toBe(basicTheme.dark.background);
  });

  it('can reset to default theme and scheme', () => {
    const { initTheme, useTheme } = createTheme<BasicColors>(basicTheme);
    initTheme(altTheme, 'dark');

    const { result } = renderHook(() => useTheme());
    const { resetTheme } = result.current;
    act(() => resetTheme());
    const { theme } = result.current;

    expect(theme.colors.primary).toBe(basicTheme.light.primary);
    expect(theme.colors.background).toBe(basicTheme.light.background);
  });
});

interface BasicColors extends ThemeColors {
  primary: string;
  background: string;
}

const basicTheme: ThemeDefinition<BasicColors> = {
  name: 'basic',
  fonts: DefaultFonts,
  light: {
    primary: 'basic-light-primary',
    background: 'basic-light-background',
  } satisfies BasicColors,
  dark: {
    primary: 'basic-dark-primary',
    background: 'basic-dark-background',
  } satisfies BasicColors,
};

const altTheme: ThemeDefinition<BasicColors> = {
  name: 'basic-alt',
  fonts: DefaultFonts,
  light: {
    primary: 'alt-light-primary',
    background: 'alt-light-background',
  },
  dark: {
    primary: 'alt-dark-primary',
    background: 'alt-dark-background',
  },
};
