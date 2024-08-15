"use client";

import { useEffect, useId, useRef } from "react";
import { clsx } from "clsx";
import { type TimelineSegment, animate, timeline } from "motion";

type StarType = [x: number, y: number, dim?: boolean, blur?: boolean];

const stars: StarType[] = [
	[4, 4, true, true],
	[4, 44, true],
	[36, 22],
	[50, 146, true, true],
	[64, 43, true, true],
	[76, 30, true],
	[101, 116],
	[140, 36, true],
	[149, 134],
	[162, 74, true],
	[171, 96, true, true],
	[210, 56, true, true],
	[235, 90],
	[275, 82, true, true],
	[306, 6],
	[307, 64, true, true],
	[380, 68, true],
	[380, 108, true, true],
	[391, 148, true, true],
	[405, 18, true],
	[412, 86, true, true],
	[426, 210, true, true],
	[427, 56, true, true],
	[538, 138],
	[563, 88, true, true],
	[611, 154, true, true],
	[637, 150],
	[651, 146, true],
	[682, 70, true, true],
	[683, 128],
	[781, 82, true, true],
	[785, 158, true],
	[832, 146, true, true],
	[852, 89],
];

const constellations: StarType[][] = [
	[
		[247, 103],
		[261, 86],
		[307, 104],
		[357, 36],
	],
	[
		[586, 120],
		[516, 100],
		[491, 62],
		[440, 107],
		[477, 180],
		[516, 100],
	],
	[
		[733, 100],
		[803, 120],
		[879, 113],
		[823, 164],
		[803, 120],
	],
];

function Star({
	blurId,
	point: [cx, cy, dim, blur],
}: {
	blurId: string;
	point: StarType;
}): JSX.Element {
	const groupRef = useRef<React.ElementRef<"g">>(null);
	const ref = useRef<React.ElementRef<"circle">>(null);

	useEffect(() => {
		if (!groupRef.current || !ref.current) {
			return;
		}

		const delay = Math.random() * 2;

		const animations = [
			animate(groupRef.current, { opacity: 1 }, { duration: 4, delay }),
			animate(
				ref.current,
				{
					opacity: dim ? [0.2, 0.5] : [1, 0.6],
					scale: dim ? [1, 1.2] : [1.2, 1],
				},
				{
					delay,
					duration: Math.random() * 2 + 2,
					direction: "alternate",
					repeat: Infinity,
				}
			),
		];

		return () => {
			for (const animation of animations) {
				animation.cancel();
			}
		};
	}, [dim]);

	return (
		<g ref={groupRef} className="opacity-0">
			<circle
				ref={ref}
				cx={cx}
				cy={cy}
				r={1}
				style={{
					transformOrigin: `${String(cx / 16)}rem ${String(cy / 16)}rem`,
					opacity: dim ? 0.2 : 1,
					transform: `scale(${String(dim ? 1 : 1.2)})`,
				}}
				filter={blur ? `url(#${blurId})` : undefined}
			/>
		</g>
	);
}

function Constellation({ points, blurId }: { points: StarType[]; blurId: string }): JSX.Element {
	const ref = useRef<React.ElementRef<"path">>(null);
	const uniquePoints = points.filter(
		(point, pointIndex) => points.findIndex(p => String(p) === String(point)) === pointIndex
	);
	const isFilled = uniquePoints.length !== points.length;

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const sequence: TimelineSegment[] = [
			[
				ref.current,
				{ strokeDashoffset: 0, visibility: "visible" },
				{ duration: 5, delay: Math.random() * 3 + 2 },
			],
		];

		if (isFilled) {
			sequence.push([ref.current, { fill: "rgb(255 255 255 / 0.02)" }, { duration: 1 }]);
		}

		const animation = timeline(sequence);

		return () => {
			animation.cancel();
		};
	}, [isFilled]);

	return (
		<>
			<path
				ref={ref}
				stroke="white"
				strokeOpacity="0.3"
				strokeDasharray={1}
				strokeDashoffset={1}
				pathLength={1}
				fill="transparent"
				d={`M ${points.join("L")}`}
				className="invisible"
			/>
			{uniquePoints.map((point, cpi) => (
				<Star key={`constellation-point-${String(cpi)}`} point={point} blurId={blurId} />
			))}
		</>
	);
}

export function StarField({ className }: { className?: string }): JSX.Element {
	const blurId = useId();

	return (
		<svg
			viewBox="0 0 881 211"
			fill="white"
			aria-hidden="true"
			className={clsx(
				"pointer-events-none w-full rotate-[30deg] overflow-visible opacity-80 -mb-40",
				className
			)}
		>
			<defs>
				<filter id={blurId}>
					<feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
				</filter>
			</defs>
			{constellations.map((points, ci) => (
				<Constellation key={`constellation-${String(ci)}`} points={points} blurId={blurId} />
			))}
			{stars.map((point, pi) => (
				<Star key={`point-${String(pi)}`} point={point} blurId={blurId} />
			))}
		</svg>
	);
}
