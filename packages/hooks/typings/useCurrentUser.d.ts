<<<<<<< HEAD
=======
import { QueryOptions } from 'react-query';

>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
<<<<<<< HEAD
  userValidated: boolean
};

declare function useCurrentUser(): [CurrentUser, boolean, object];

export default useCurrentUser;
=======
  userValidated: boolean;
};

declare function useCurrentUser(
  options: QueryOptions<CurrentUser, object>
): {
  data: CurrentUser;
  Status: string;
  Error: object;
};

export default useCurrentUser;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
