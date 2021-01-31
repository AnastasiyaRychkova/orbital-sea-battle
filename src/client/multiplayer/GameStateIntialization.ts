const initializer = {
	initial: 'vestibule',
	states: {
		vestibule: {
			on: {
				FOUND: 'acquaintance'
			}
		},
		acquaintance: {
			delay: {
				after: 4000,
				to: 'preparing',
			}
		},
		preparing: {
			invoke: {
				initial: 'elementSelection',
				states: {
					elementSelection: {
						on: {
							SELECTED: 'diagramFilling',
						}
					},
					diagramFilling: {
						invoke: {
							initial: 'filling',
							states: {
								filling: {
									on: {
										CHECKED: 'success',
										FAILURE: 'error',
									}
								},
								success: {
									delay: {
										to: '__END__',
										after: 4000,
									}
								},
								error: {
									delay: {
										to: 'filling',
										after: 4000,
									}
								},
							}
						}
					}
				},
				onDone: 'match',
			},
			on: {
				READY: 'match',
			}
		}
	}
};

export default initializer;