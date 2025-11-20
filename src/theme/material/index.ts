// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export type {
  MaterialTheme,
  MaterialThemeDefinition,
  MaterialThemeColors,
} from './types';

export { initMaterialTheme, useMaterialTheme } from './useMaterialTheme';

import * as MaterialColors from './MaterialColors';
export { MaterialColors };

export { default as MaterialBlue } from './MaterialBlue';
export { default as MaterialCyan } from './MaterialCyan';
export { default as MaterialGreen } from './MaterialGreen';
export { default as MaterialOrange } from './MaterialOrange';
export { default as MaterialPink } from './MaterialPink';
export { default as MaterialRed } from './MaterialRed';
export { default as MaterialYellow } from './MaterialYellow';
