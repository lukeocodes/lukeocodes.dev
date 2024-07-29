"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export interface AuthContextInterface {
	isLoggedIn: boolean;
	user: User | null;
}

export interface AuthState {
	isLoggedIn: boolean;
	user: User | null;
}

export const initialAuthState: AuthState = {
	isLoggedIn: false,
	user: null,
};

interface AuthProviderInterface {
	children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextInterface);

function AuthProvider({ children }: AuthProviderInterface): JSX.Element {
	const [state, setState] = useState(initialAuthState);
	const supabase = createClient();

	useEffect(() => {
		void (async () => {
			const {
				data: { session: activeSession },
			} = await supabase.auth.getSession();
			setState({ isLoggedIn: Boolean(activeSession), user: activeSession?.user ?? null });
		})();

		const {
			data: { subscription: authListener },
		} = supabase.auth.onAuthStateChange((event, currentSession) => {
			setState({ isLoggedIn: Boolean(currentSession), user: currentSession?.user ?? null });
		});

		return () => {
			authListener.unsubscribe();
		};
		// ...
		// eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this once
	}, []);

	useEffect(() => {
		void (async () => {
			const {
				data: { session: activeSession },
			} = await supabase.auth.getSession();
			setState({ isLoggedIn: Boolean(activeSession), user: activeSession?.user ?? null });
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this once
	}, [state]);

	const value = useMemo(() => {
		return {
			...state,
		};
	}, [state]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextInterface {
	return useContext(AuthContext);
}

export { AuthProvider, useAuth };
