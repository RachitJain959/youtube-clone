import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<Button variant="new">Clic</Button>
			<Image src="/logo.svg" width={50} height={50} alt="logo" />
			<p>YouTube</p>
		</div>
	);
}
