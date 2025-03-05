import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
	// TODO: Add differernt auth states
	return (
		<Button
			variant="outline"
			className="px-4 py-2 text-sm font-medium hover:text-blue-500 text-blue-600 
            border-blue-500/20 rounded-full"
		>
			<UserCircleIcon />
			Sign in
		</Button>
	);
};
