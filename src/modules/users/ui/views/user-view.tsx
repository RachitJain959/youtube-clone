interface UserViewProps {
	userId: string;
}

export const UserView = ({ userId }: UserViewProps) => {
	return (
		<div className="flex flex-col mx-auto mb-10 gap-y-6 pt-2.5 px-4 max-w-[1300px]">
			<Usersection userId={userId} />
		</div>
	);
};
