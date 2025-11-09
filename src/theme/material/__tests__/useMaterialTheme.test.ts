// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { act, renderHook } from '@testing-library/react-native';
import { initMaterialTheme, useMaterialTheme } from '../useMaterialTheme';

import MaterialGreen from '../MaterialGreen';
import MaterialPink from '../MaterialPink';

describe('useMaterialTheme', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useMaterialTheme());
    act(() => result.current.resetTheme());
  });

  it('defaults to the Green theme', () => {
    const { result } = renderHook(() => useMaterialTheme());
    const { theme } = result.current;

    expect(theme.colors).toEqual(MaterialGreen.light);
  });

  it('can initialize a custom theme', () => {
    act(() => initMaterialTheme(MaterialPink));
    const { result } = renderHook(() => useMaterialTheme());
    const { theme } = result.current;

    expect(theme.colors).toEqual(MaterialPink.light);
  });

  it('reacts to theme changes', () => {
    const { result } = renderHook(() => useMaterialTheme());
    const { setTheme } = result.current;

    act(() => setTheme(MaterialPink));

    const { theme } = result.current;
    expect(theme.colors).toEqual(MaterialPink.light);
  });

  it('reacts to color scheme changes', () => {
    const { result } = renderHook(() => useMaterialTheme());
    const { setScheme } = result.current;

    act(() => setScheme('dark'));

    const { theme } = result.current;
    expect(theme.colors).toEqual(MaterialGreen.dark);
  });

  it('can reset to default theme and scheme', () => {
    act(() => initMaterialTheme(MaterialPink, 'dark'));

    const { result } = renderHook(() => useMaterialTheme());
    const { resetTheme } = result.current;
    act(() => resetTheme());
    const { theme } = result.current;

    expect(theme.colors).toEqual(MaterialGreen.light);
  });
});
