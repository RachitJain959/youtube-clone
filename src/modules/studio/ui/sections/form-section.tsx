"use client";
import { trpc } from "@/trpc/client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
	CopyCheckIcon,
	CopyIcon,
	Globe2Icon,
	LockIcon,
	MoreVerticalIcon,
	TrashIcon,
} from "lucide-react";

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
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { SnakeCaseToTitle } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
	const router = useRouter();
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

	const remove = trpc.videos.remove.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			toast.success("Video Removed");
			router.push("/studio");
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

	const fullUrl = `${process.env.VERCEL_URL || "https://localhost:3000"}/video/${videoId}`;

	const [isCopied, setIsCopied] = useState(false);

	const onCopy = async () => {
		await navigator.clipboard.writeText(fullUrl);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between mb-6">
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
								<DropdownMenuItem
									onClick={() =>
										remove.mutate({ id: videoId })
									}
								>
									<TrashIcon className="size-4 mr-2" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Category
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
					<div className="flex flex-col gap-y-8 lg:col-span-2">
						<div className="flex flex-col gap-4  h-fit rounded-xl bg-[#F9F9F9] overflow-hidden">
							<div className="aspect-video overflow-hidden relative">
								<VideoPlayer
									playbackId={video.muxPlaybackId}
									thumbnailUrl={video.thumbnailUrl}
								/>
							</div>
							<div className="p-4 flex flex-col gap-y-6">
								<div className="flex justify-between items-center gap-x-2">
									<div className="flex flex-col gap-y-1">
										<p className="text-muted-foreground text-xs">
											Video Link
										</p>
										<div className="flex items-center gap-x-2">
											<Link href={`/video/${video.id}`}>
												<p className="line-clamp-1 text-sm text-blue-500">
													{fullUrl}
												</p>
											</Link>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="shrink-0"
												onClick={onCopy}
												disabled={isCopied}
											>
												{isCopied ? (
													<CopyCheckIcon />
												) : (
													<CopyIcon />
												)}
											</Button>
										</div>
									</div>
								</div>

								<div className="flex flex-col justify-between">
									<div className="flex flex-col gap-y-1">
										<p className="text-muted-foreground text-xs">
											Video Status
										</p>
										<p className="text-sm">
											{SnakeCaseToTitle(
												video.muxStatus || "preparing",
											)}
										</p>
									</div>
								</div>
								<div className="flex flex-col justify-between">
									<div className="flex flex-col gap-y-1">
										<p className="text-muted-foreground text-xs">
											Track Status
										</p>
										<p className="text-sm">
											{SnakeCaseToTitle(
												video.muxTrackStatus ||
													"preparing",
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
						<FormField
							control={form.control}
							name="visibility"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Visibility
										{/* TODO: Generate AI labels */}
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value ?? undefined}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select visibility" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="public">
												<div className="flex items-center">
													<Globe2Icon className="size-4 mr-2" />
													Public
												</div>
											</SelectItem>
											<SelectItem value="private">
												<div className="flex items-center">
													<LockIcon className="size-4 mr-2" />
													Private
												</div>
											</SelectItem>
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
