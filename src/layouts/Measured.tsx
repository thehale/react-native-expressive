// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import React, { createContext, useCallback, useContext, useRef, useState, type ComponentRef } from "react";
import { View } from "react-native";

type Measurements = Readonly<{
	x: number;
	y: number;
	width: number;
	height: number;
}>

const UNMEASURED = Object.freeze({ x: -1, y: -1, width: -1, height: -1 } satisfies Measurements);

const MeasurementsContext = createContext<Measurements>(UNMEASURED);

export function useMeasurements() {
	return useContext(MeasurementsContext);
}

type OnLayout = NonNullable<React.ComponentProps<typeof View>['onLayout']>;

export default function Measured({ children }: { children: React.ReactNode }) {
	const ref = useRef<ComponentRef<View>>(null);
	const [measurements, setMeasurements] = useState(UNMEASURED);
	const saveMeasurements = useCallback<OnLayout>(
		({ nativeEvent }) => { setMeasurements(nativeEvent.layout) },
		[setMeasurements]
	);
	return (
		<View ref={ref} onLayout={saveMeasurements}>
			<MeasurementsContext.Provider value={measurements}>
				{children}
			</MeasurementsContext.Provider>
		</View>
	);
}