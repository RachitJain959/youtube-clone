import Image from "next/image";

export default function Home() {
	return (
		<div>
			<Image src="/logo.svg" width={50} height={50} alt="logo" />
			<p className="text-xl tracking-tight font-semibold">YouTube</p>
		</div>
	);
}
