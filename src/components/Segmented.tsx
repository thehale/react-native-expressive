// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createContext, useContext } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Text from './Text';
import Row from '../layouts/Row';
import { centered, radius, size, space } from '../styles';
import { useMaterialTheme } from '../theme';

export interface SegmentedProps {
  children: React.ReactElement<typeof Segment>[];
  value?: string;
  onChange?: (value: string) => void;
}
export function Segmented(props: SegmentedProps) {
  return (
    <Row>
      {props.children.map((child, index) => (
        <SegmentsContext
          key={index}
          value={{
            style: positionStyle(index, props.children.length),
            selection: props.value,
            onPress: (value) => props.onChange?.(value),
          }}
        >
          {child}
        </SegmentsContext>
      ))}
    </Row>
  );
}

export interface SegmentProps {
  value: string;
  children: string;
}
export function Segment(props: SegmentProps) {
  const { style, selection, onPress } = useContext(SegmentsContext);
  const { theme } = useMaterialTheme();

  const selected = props.value === selection;
  const backgroundColor = selected
    ? theme.colors.secondaryContainer
    : 'transparent';
  const fontWeight = selected ? 'bold' : 'normal';

  return (
    <Pressable
      onPress={() => onPress?.(props.value)}
      style={[
        styles.segment,
        centered,
        {
          borderColor: theme.colors.outline,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text style={{ fontWeight }}>{props.children}</Text>
    </Pressable>
  );
}

interface SegmentsContextValue {
  style?: ViewStyle;
  selection?: string;
  onPress?: (value: string) => void;
}
const SegmentsContext = createContext<SegmentsContextValue>({});

function positionStyle(index: number, length: number): ViewStyle {
  if (index === 0) {
    return styles.first;
  } else if (index === length - 1) {
    return styles.last;
  } else {
    return styles.inner;
  }
}

const styles = StyleSheet.create({
  segment: {
    flex: 1,
    padding: space.half,
    borderTopWidth: size.outline,
    borderBottomWidth: size.outline,
  },
  first: {
    borderTopLeftRadius: radius.default,
    borderBottomLeftRadius: radius.default,
    borderLeftWidth: size.outline,
    borderRightWidth: size.outline,
  },
  inner: {
    borderRightWidth: size.outline,
  },
  last: {
    borderTopRightRadius: radius.default,
    borderBottomRightRadius: radius.default,
    borderRightWidth: size.outline,
  },
});
