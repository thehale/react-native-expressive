// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import React from 'react';
import { View } from 'react-native';

export interface ColumnProps extends React.ComponentProps<typeof View> {
  reverse?: boolean;
}

export default function Column(props: ColumnProps) {
  const direction = props.reverse ? 'column-reverse' : 'column';
  return (
    <View {...props} style={[props.style, { flexDirection: direction }]}>
      {props.children}
    </View>
  );
}
