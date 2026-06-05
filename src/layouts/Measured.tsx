// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import { filled } from '../styles';

/**
 * Children of this component can `useMeasurements` to get the
 * dimensions of this layout.
 *
 * Use sparingly, as it requires an extra layout pass.
 *
 * @example
 * ```tsx
 * import { Measured, useMeasurements } from 'react-native-expressive';
 *
 * function Parent() {
 *   return (
 *     <Measured>
 *       <Child />
 *     </Measured>
 *   );
 * }
 *
 * function Child() {
 *   const { x, y, width, height } = useMeasurements();
 *   // ...
 * }
 * ```
 */
export default function Measured({ children }: { children: React.ReactNode }) {
  const [measurements, setMeasurements] = useState(UNMEASURED);
  const measure: OnLayout = ({ nativeEvent }) => {
    setMeasurements({ ...nativeEvent.layout, timestamp: Date.now() });
  };

  return (
    <View style={filled} onLayout={measure}>
      {measurements.width > 0 && measurements.height > 0 && (
        <MeasurementsContext value={measurements}>
          {children}
        </MeasurementsContext>
      )}
    </View>
  );
}

export function useMeasurements() {
  return useContext(MeasurementsContext);
}

const UNMEASURED = Object.freeze({
  x: -1,
  y: -1,
  width: -1,
  height: -1,
  timestamp: -1,
} satisfies Measurements);
const MeasurementsContext = createContext<Measurements>(UNMEASURED);

type Measurements = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
  timestamp: number;
}>;
type OnLayout = NonNullable<React.ComponentProps<typeof View>['onLayout']>;
