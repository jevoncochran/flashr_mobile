import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

export const useAccessToken = () => {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const authHeader = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return authHeader;
};
