"use client";
import { trpc } from "@/trpc/client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { videoUpdateSchema } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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
	const utils = trpc.useUtils();
	const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const update = trpc.videos.update.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: videoId });
			toast.success("Video Updated");
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});

	// Check note
	// creates a form that is typed against Zod schema, validates using that schema, and is pre-filled with existing video data.
	const form = useForm<z.infer<typeof videoUpdateSchema>>({
		resolver: zodResolver(videoUpdateSchema),
		defaultValues: video,
	});

	const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
		update.mutate(data);
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
						<Button type="submit" disabled={update.isPending}>
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
				<div className="grip grid-cols-1 lg:grid-cols-5 gap-6">
					<div className="space-y-8 lg:col-span-3">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Title
										{/* TODO: Generate AI labels */}
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Add a title to your video"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Description
										{/* TODO: Generate AI labels */}
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											value={field.value ?? ""}
											rows={10}
											className="resize-none pr-10"
											placeholder="Add a description to your video"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Description
										{/* TODO: Generate AI labels */}
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value ?? undefined}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													value={category.id}
													key={category.id}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</form>
		</Form>
	);
};
