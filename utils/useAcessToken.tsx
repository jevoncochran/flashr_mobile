import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

export const useAcessToken = () => {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const authHeader = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return authHeader;
};
