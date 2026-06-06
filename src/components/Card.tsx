// Copyright (c) 2025 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Text from './Text';

import React from 'react';
import { createStyleCache } from '../utils/createStyleCache';
import { useMaterialTheme } from '../theme/material/useMaterialTheme';
import type { MaterialTheme } from '../theme/material/types';
import { radius, size, space } from '../styles';

export interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  content?: string | React.ReactNode;
  actions?: React.ReactNode;
}

const { cachedStyle } = createStyleCache();

export default function Card(props: CardProps) {
  const { theme } = useMaterialTheme();
  return (
    <View style={[styles.container, cardStyles(theme)]}>
      {props.title && <Title>{props.title}</Title>}
      {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
      {props.content && <Content>{props.content}</Content>}
      {props.actions instanceof Actions ? (
        props.actions
      ) : (
        <Actions>{props.actions}</Actions>
      )}
    </View>
  );
}

function cardStyles(theme: MaterialTheme): ViewStyle {
  return cachedStyle(`${theme.name}:${theme.scheme}`, () => ({
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outlineVariant,
    borderWidth: size.outline,
  }));
}

function Title(props: { children: string | React.ReactNode }) {
  return (
    <View style={styles.title}>
      {typeof props.children === 'string'
        ? <Text variant="title">{props.children}</Text>
        : props.children}
    </View>
  );
}

function Subtitle(props: { children: string | React.ReactNode }) {
  return (
    <View style={styles.subtitle}>
      {typeof props.children === 'string'
        ? <Text variant="title small">{props.children}</Text>
        : props.children}
    </View>
  );
}

function Content(props: { children: string | React.ReactNode }) {
  return (
    <View style={styles.content}>
      {typeof props.children === 'string'
        ? <Text>{props.children}</Text>
        : props.children}
    </View>
  );
}

function Actions(props: { children: React.ReactNode }) {
  if (!props.children) {
    return null;
  } else {
    return <View style={styles.actions}>{props.children}</View>;
  }
}

Card.Actions = Actions;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: space.double,
    borderRadius: radius.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { marginBottom: space.default },
  subtitle: { marginBottom: space.default },
  content: { marginBottom: space.default },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: space.default,
  },
});
