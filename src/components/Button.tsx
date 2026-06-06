// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/*
 * KNOWN BUGS:
 *   `mode="elevated" disabled`: The text is highlighted lighter than the rest of the button
 */

import {
  Pressable,
  StyleSheet,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import type { Optional } from '../utils/typing';
import { createStyleCache } from '../utils/createStyleCache';
import Text from './Text';
import type {
  MaterialTheme,
  MaterialThemeColors,
} from '../theme/material/types';
import { useMaterialTheme } from '../theme/material/useMaterialTheme';
import { radius, size, space } from '../styles';

type ButtonMode = 'text' | 'contained' | 'outlined' | 'tonal' | 'elevated';
type ButtonIntent = 'normal' | 'danger';

export interface ButtonProps {
  children: string;
  mode: ButtonMode;
  intent: ButtonIntent;
  disabled: boolean;
  onPress: () => void;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

type PropsWithDefaults = 'mode' | 'intent' | 'disabled' | 'onPress';

const propDefaults: Pick<ButtonProps, PropsWithDefaults> = {
  mode: 'text',
  intent: 'normal',
  disabled: false,
  onPress: () => {
    /* no-op */
  },
};

export default function Button(args: Optional<ButtonProps, PropsWithDefaults>) {
  const { theme } = useMaterialTheme();
  const props: ButtonProps = { ...propDefaults, ...args };
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.container, containerStyles(theme, props)]}
    >
      <View style={styles.contents}>
        {props.before}
        <Text style={textStyles(theme, props)}>{props.children}</Text>
        {props.after}
      </View>
    </Pressable>
  );
}

const { cachedStyle } = createStyleCache();

function containerStyles(theme: MaterialTheme, props: ButtonProps): ViewStyle {
  const key = `${theme.name}:${theme.scheme}:${props.mode}:${props.intent}:${props.disabled}:container`;
  return cachedStyle(key, () => {
    const mode = modeStyles(theme.colors, props.mode);
    const disabled = props.disabled
      ? disabledStyles(theme.colors, props.mode)
      : null;
    const danger =
      props.intent === 'danger' ? dangerStyles(theme.colors, props.mode) : null;
    return {
      backgroundColor:
        disabled?.backgroundColor ??
        danger?.backgroundColor ??
        mode.backgroundColor,
      borderColor:
        disabled?.borderColor ?? danger?.borderColor ?? mode.borderColor,
      borderWidth:
        disabled?.borderWidth ?? danger?.borderWidth ?? mode.borderWidth,
      elevation: disabled?.elevation ?? danger?.elevation ?? mode.elevation,
    };
  });
}

function textStyles(theme: MaterialTheme, props: ButtonProps): TextStyle {
  const key = `${theme.name}:${theme.scheme}:${props.mode}:${props.intent}:${props.disabled}:text`;
  return cachedStyle(key, () => {
    const mode = modeTextColor(theme.colors, props.mode);
    const disabled =
      props.disabled && disabledTextColor(theme.colors, props.mode);
    const danger =
      props.intent === 'danger' && dangerTextColor(theme.colors, props.mode);
    return { color: disabled || danger || mode };
  });
}

type ButtonStyles = {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  elevation?: number;
};

function modeStyles(
  colors: MaterialThemeColors,
  mode: ButtonMode
): ButtonStyles {
  switch (mode) {
    case 'text':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'contained':
      return {
        backgroundColor: colors.primary,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: colors.outline,
        borderWidth: size.outline,
      };
    case 'tonal':
      return {
        backgroundColor: colors.secondaryContainer,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'elevated':
      return {
        backgroundColor: colors.elevation.level2,
        borderColor: 'transparent',
        borderWidth: 0,
        elevation: 2,
      };
  }
}

function dangerStyles(
  colors: MaterialThemeColors,
  mode: ButtonMode
): ButtonStyles {
  switch (mode) {
    case 'text':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'contained':
      return {
        backgroundColor: colors.error,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: colors.error,
        borderWidth: size.outline,
      };
    case 'tonal':
      return {
        backgroundColor: colors.errorContainer,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'elevated':
      return {
        backgroundColor: colors.errorContainer,
        borderColor: 'transparent',
        borderWidth: 0,
        elevation: 2,
      };
  }
}

function disabledStyles(
  colors: MaterialThemeColors,
  mode: ButtonMode
): ButtonStyles {
  switch (mode) {
    case 'text':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'contained':
      return {
        backgroundColor: colors.surfaceDisabled,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: colors.surfaceDisabled,
        borderWidth: size.outline,
      };
    case 'tonal':
      return {
        backgroundColor: colors.surfaceDisabled,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'elevated':
      return {
        backgroundColor: colors.surfaceDisabled,
        borderColor: 'transparent',
        borderWidth: 0,
      };
  }
}

function modeTextColor(colors: MaterialThemeColors, mode: ButtonMode): string {
  switch (mode) {
    case 'text':
      return colors.primary;
    case 'contained':
      return colors.onPrimary;
    case 'outlined':
      return colors.primary;
    case 'tonal':
      return colors.onSecondaryContainer;
    case 'elevated':
      return colors.primary;
  }
}

function dangerTextColor(
  colors: MaterialThemeColors,
  mode: ButtonMode
): string {
  switch (mode) {
    case 'text':
      return colors.error;
    case 'contained':
      return colors.onError;
    case 'outlined':
      return colors.error;
    case 'tonal':
      return colors.onErrorContainer;
    case 'elevated':
      return colors.onErrorContainer;
  }
}

function disabledTextColor(
  colors: MaterialThemeColors,
  mode: ButtonMode
): string {
  switch (mode) {
    case 'text':
      return colors.onSurfaceDisabled;
    case 'contained':
      return colors.onSurfaceDisabled;
    case 'outlined':
      return colors.onSurfaceDisabled;
    case 'tonal':
      return colors.onSurfaceDisabled;
    case 'elevated':
      return colors.onSurfaceDisabled;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: space.quarter,
    padding: space.default,
    borderRadius: radius.default,
  },
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: space.default,
  },
});
