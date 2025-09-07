"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { videoUpdateSchema } from "@/db/schema";

interface FormSectionProps {
	videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
	return (
		<Suspense fallback={<FormSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error</p>}>
				<FormSectionSuspense videoId={videoId} />
			</ErrorBoundary>
		</Suspense>
	);
};

const FormSectionSkeleton = () => {
	return <p>Loading...</p>;
};

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
	const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });

	// Check note
	// creates a form that is typed against Zod schema, validates using that schema, and is pre-filled with existing video data.
	const form = useForm<z.infer<typeof videoUpdateSchema>>({
		resolver: zodResolver(videoUpdateSchema),
		defaultValues: video,
	});

	const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between mb-6 w-full">
					<div>
						<h1 className="text-2xl font-bold">Video Details</h1>
						<p className="text-xs text-muted-foreground">
							Manage your video details
						</p>
					</div>
					<div className="flex items-center gap-x-2">
						<Button type="submit" disabled={false}>
							Save
						</Button>
						<DropdownMenu>
							{/* asChild: MenuTrigger is a button in itself, adding another button is buggy. asChild makes it the child element instead */}
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreVerticalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<TrashIcon className="size-4 mr-2" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</form>
		</Form>
	);
};
