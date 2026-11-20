export interface ProfileResponse {
  id: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | null;
  country?: string | null;
  city?: string | null;
  aboutMe?: string | null;
  avatarUrl?: string | null;
}