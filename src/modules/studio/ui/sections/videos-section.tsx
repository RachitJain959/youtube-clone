"use client";
import { trpc } from "@/trpc/client";

import { DEFAULT_LIMIT } from "@/constants";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { SnakeCaseToTitle } from "@/lib/utils";
import { format } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";

export const VideosSection = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ErrorBoundary fallback={<p>Error</p>}>
				<VideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};

const VideosSectionSuspense = () => {
	const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
		{
			limit: DEFAULT_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
	return (
		<div>
			<div className="border-y">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6 w-[510px]">
								Video
							</TableHead>
							<TableHead>Visibility</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Views</TableHead>
							<TableHead className="text-right">
								Comments
							</TableHead>
							<TableHead className="text-right pr-6">
								Likes
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{videos.pages
							.flatMap((page) => page.items)
							.map((video) => (
								<Link
									href={`/studio/video/${video.id}`}
									key={video.id}
									legacyBehavior // if this does not work, use useRouter
								>
									<TableRow className="cursor-pointer">
										<TableCell>
											<div className="flex items-center gap-4">
												<div className="relative w-36 shrink-0 aspect-video">
													<VideoThumbnail
														imageUrl={
															video.thumbnailUrl
														}
														previewUrl={
															video.previewUrl
														}
														title={video.title}
														duration={
															video.duration || 0
														}
													/>
												</div>
												<div className="flex flex-col overflow-hidden gap-y-1">
													<span className="text-sm line-clamp-1">
														{video.title}
													</span>
													<span className="text-sm line-clamp-1 text-muted-foreground">
														{video.description ||
															"No Description"}
													</span>
												</div>
											</div>
										</TableCell>
										<TableCell>{video.title}</TableCell>
										<TableCell>
											<div className="flex items-center">
												{video.visibility ===
												"private" ? (
													<LockIcon className="size-2 mr-2" />
												) : (
													<Globe2Icon className="size-2 mr-2" />
												)}
												{SnakeCaseToTitle(
													video.visibility,
												)}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center">
												{/* "video_ready", "video_error","asset_ready"====> "Video Ready" */}
												{SnakeCaseToTitle(
													video.muxStatus || "error",
												)}
											</div>
										</TableCell>
										<TableCell className="text-sm truncate">
											{format(
												new Date(video.createdAt),
												"d MMM yyyy",
											)}
										</TableCell>
										<TableCell>Views</TableCell>
										<TableCell>Comments</TableCell>
										<TableCell>Likes</TableCell>
									</TableRow>
								</Link>
							))}
					</TableBody>
				</Table>
			</div>
			<InfiniteScroll
				isManual
				hasNextPage={query.hasNextPage}
				fetchNextPage={query.fetchNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
			/>
		</div>
	);
};
