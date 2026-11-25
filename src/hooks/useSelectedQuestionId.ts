import { useParams } from "react-router";

const useSelectedQuestionId = (): number | undefined => {
  const { id } = useParams();
  if (id === undefined || !/^[1-9]\d*$/.test(id)) return undefined;
  return Number(id);
};

export default useSelectedQuestionId;
