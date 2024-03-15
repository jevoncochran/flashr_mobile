import { useEffect } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import { api } from "../utils/api";
import { useAcessToken } from "../utils/useAcessToken";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

const PracticeScreen = () => {
  const accessToken = useAcessToken();

  const deckId = useAppSelector(
    (state: RootState) => state.deck.selectedDeck?.id
  );

  useEffect(() => {
    api
      .post(`/views`, { deckId }, accessToken)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <ScreenTemplate>
      <BackButton />
    </ScreenTemplate>
  );
};

export default PracticeScreen;
