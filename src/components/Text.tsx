// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Text as NativeText } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

import type { MaterialTheme } from '../theme/material/types';
import { useMaterialTheme } from '../theme/material/useMaterialTheme';

type TextVariant = keyof MaterialTheme['fonts'];
type TextSize = keyof MaterialTheme['fonts'][TextVariant];

export interface TextProps {
  variant?: TextVariant | `${TextVariant} ${TextSize}`;
  children: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function Text(props: TextProps) {
  const { theme } = useMaterialTheme();
  const colors: TextStyle = { color: theme.colors.onSurface };
  const [variant, size] = (props.variant ?? 'body').split(' ') as [
    TextVariant,
    TextSize | undefined,
  ];
  return (
    <NativeText
      style={[theme.fonts[variant][size ?? 'medium'], colors, props.style]}
    >
      {props.children}
    </NativeText>
  );
}
