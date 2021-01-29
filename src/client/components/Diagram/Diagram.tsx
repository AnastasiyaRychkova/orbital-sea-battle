import React from 'react';
import { observer } from "mobx-react";
import CounterStore from "./Counter";

const Diagram = observer(props => {
		const { count, increase, decrease } = CounterStore

		return (
			<div>
				<h1>{count}</h1>
				<button onClick={increase}>increment</button>
				<button onClick={decrease}>decrement</button>
			</div>
		)
})

export default Diagram;