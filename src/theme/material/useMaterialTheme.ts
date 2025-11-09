// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { MaterialThemeColors } from './types';
import { createTheme } from '../createTheme';
import MaterialGreen from './MaterialGreen';

const { initTheme, useTheme } = createTheme<MaterialThemeColors>(MaterialGreen);

export { initTheme as initMaterialTheme, useTheme as useMaterialTheme };
