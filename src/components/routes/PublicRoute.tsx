import type { PropsWithChildren } from "react";
import { Redirect } from "react-router";
import { useUser } from "../../modules/users/hooks/useUser";

export const PublicRoute = ({ children }: PropsWithChildren) => {
	const { user } = useUser();

	if (user.isLoading) {
		return <div>Loading...</div>;
	}

	if (user.isError) {
		return <div>Error</div>;
	}

	if (user.data) {
		return <Redirect to="/home" />;
	}

	return children;
};
