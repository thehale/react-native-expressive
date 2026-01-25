// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import Column from "./Column";
import Row from "./Row";
import { range } from "../utils/iteration";

export interface FlowDefinition {
	origin: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	direction: 'row' | 'column';
}

export interface FlowProps {
	rows: number;
	columns: number;
	children: React.ReactNode[];
	flow: FlowDefinition;
}

export interface FlowDirectionProps {
	rows: number;
	columns: number;
	children: React.ReactNode[];
	origin: FlowDefinition['origin'];
}

function Flow(props: FlowProps) {
	if (props.flow.direction === 'column') {
		return (
			<ColumnFlow {...props} origin={props.flow.origin}>
				{props.children}
			</ColumnFlow>
		)
	} else if (props.flow.direction === 'row') {
		return (
			<RowFlow {...props} origin={props.flow.origin}>
				{props.children}
			</RowFlow>
		)
	} else {
		throw new Error(`Invalid flow direction: ${props.flow.direction}`);
	}
}

function ColumnFlow(props: FlowDirectionProps) {
	const { rows, columns, children, origin } = props;

	return (
		<Row reverse={origin.endsWith("right")}>
			{range(0, columns).map((column) => (
				<Column key={column} reverse={origin.startsWith("bottom")}>
					{range(0, rows).map((row) => children[column * rows + row])}
				</Column>
			))}
		</Row>
	)
}

function RowFlow(props: FlowDirectionProps) {
	const { rows, columns, children, origin } = props;

	return (
		<Column reverse={origin.startsWith("bottom")}>
			{range(0, rows).map((row) => (
				<Row key={row} reverse={origin.endsWith("right")}>
					{range(0, columns).map((column) => children[row * columns + column])}
				</Row>
			))}
		</Column>
	)
}

interface FlowComponent extends React.FC<FlowProps> {
	Column: typeof ColumnFlow;
	Row: typeof RowFlow;
}

const _Flow = Flow as FlowComponent;
_Flow.Column = ColumnFlow;
_Flow.Row = RowFlow;
export default _Flow;