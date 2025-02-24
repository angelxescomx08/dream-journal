import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

export const CardDreamSkeleton = () => {
	return (
		<Card>
			<CardContent>
				<Skeleton className="w-full" />
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</CardContent>
			<CardActions>
				<Skeleton className="w-10" />
			</CardActions>
		</Card>
	);
};
