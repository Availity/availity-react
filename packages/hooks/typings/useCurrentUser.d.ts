export type CurrentUser = {
  akaname: string;
  createDate: string;
  currentRegion: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  jobTitle: string;
  userHasSecurityException: boolean;
  userId: string;
  userValidated: boolean;
};

declare function useCurrentUser(): {
  data: CurrentUser;
  Status: string;
  Error: object;
};

export default useCurrentUser;
