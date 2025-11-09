// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { ThemeFonts } from './fonts/types';

export interface ThemeColors extends Record<string, string | ThemeColors> {}

export type Theme<C extends ThemeColors> = {
  fonts: ThemeFonts;
  colors: C;
};

export type ThemeDefinition<C extends ThemeColors> = {
  name: string;
  fonts: ThemeFonts;
  dark: C;
  light: C;
};
