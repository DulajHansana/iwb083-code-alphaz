"use client";

import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

export default function LoadingScreen({ progress: progressProp, state: loadingState }) {
	const [progress, setProgress] = useState(0);
	const [state, setState] = useState(null);

	useEffect(() => {
		if (progressProp >= 100) {
			setProgress(100);
		} else if (progressProp < 0) {
			setProgress(0);
		} else if (progressProp !== undefined) {
			setProgress(progressProp);
		}
	}, [progressProp]);

	useEffect(() => {
		setState(loadingState);
	}, [loadingState]);

	return (
		<div className="w-full h-screen bg-white flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center items-center width-full">
				<img
					src="/images/App Logo.png"
					alt="SparkChat Logo"
					className="w-40 h-40"
				/>
				<h2 className="mt-4 text-3xl font-bold text-customPurple">SparkChat</h2>
			</div>
			<Box sx={{ width: '25%', maxWidth: 500, mt: 5 }}>
				<LinearProgress
					variant={state === "loading" ? "determinate" : "indeterminate"}
					color="secondary"
					thickness={4}
					value={state === "loading" ? progress : undefined}
				/>
			</Box>
		</div>
	);
}
