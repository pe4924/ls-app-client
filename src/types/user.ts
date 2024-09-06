import { z } from "zod";

export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string(),
	avatarUrl: z.string().url().optional().nullable(),
	locationId: z.number().nullable(),
	teamId: z.number().nullable(),
	userRoles: z.enum(["staff", "admin"]),
	locationRel: z
		.object({
			id: z.number(),
			name: z.string(),
		})
		.nullable()
		.optional(),
	teamRel: z
		.object({
			id: z.number(),
			name: z.string(),
		})
		.nullable()
		.optional(),
});

export type User = z.infer<typeof UserSchema>;

export type RawUser = {
	id: string;
	email: string;
	name: string;
	avatarUrl?: string | null;
	locationId: number | null;
	teamId: number | null;
	userRoles: "staff" | "admin";
	locationRel?: {
		id: number;
		name: string;
	} | null;
	teamRel?: {
		id: number;
		name: string;
	} | null;
};

export type UserState = {
	user: User | null;
	setUser: (user: User | null) => void;
	userList: User[];
	setUserList: (users: User[]) => void;
	fetchUserList: () => Promise<void>;
	fetchUserDetails: (userId: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
};
