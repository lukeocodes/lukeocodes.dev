export function Box({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="group relative max-w-7xl mx-auto">
			<div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
			<div className="px-7 py-6 bg-white ring-1 ring-slate-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
				{children}
			</div>
		</div>
	);
}
