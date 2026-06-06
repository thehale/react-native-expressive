// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Text as NativeText } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

import type { MaterialTheme } from '../theme/material/types';
import { useMaterialTheme } from '../theme/material/useMaterialTheme';
import { createStyleCache } from '../utils/createStyleCache';

type TextVariant = keyof MaterialTheme['fonts'];
type TextSize = keyof MaterialTheme['fonts'][TextVariant];

export interface TextProps {
  variant?: TextVariant | `${TextVariant} ${TextSize}`;
  children: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const { cachedStyle } = createStyleCache();

export default function Text(props: TextProps) {
  const { theme } = useMaterialTheme();
  return (
    <NativeText style={[textStyle(theme, props.variant), props.style]}>
      {props.children}
    </NativeText>
  );
}

function textStyle(
  theme: MaterialTheme,
  variant: TextProps['variant']
): TextStyle {
  return cachedStyle(
    `${theme.name}:${theme.scheme}:${variant ?? 'body'}`,
    () => {
      const [_variant, size] = (variant ?? 'body').split(' ') as [
        TextVariant,
        TextSize | undefined,
      ];
      return {
        ...theme.fonts[_variant][size ?? 'medium'],
        color: theme.colors.onSurface,
      };
    }
  );
}
