import { Button, Card, CardActions, CardContent } from "@mui/material";
import { formatDate } from "../../../lib/dates/format";

type Props = {
	title: string;
	content: string;
	created_at: string;
};

export const DreamCard = ({ title, content, created_at }: Props) => {
	return (
		<Card>
			<CardContent>
				<h2 className="line-clamp-2 text-pretty">{title}</h2>
				<p className="text-sm font-bold text-black/75">
					{formatDate(created_at)}
				</p>
				<p className="line-clamp-6 text-pretty">{content}</p>
			</CardContent>
			<CardActions>
				<Button size="small">Ver sueño</Button>
			</CardActions>
		</Card>
	);
};
