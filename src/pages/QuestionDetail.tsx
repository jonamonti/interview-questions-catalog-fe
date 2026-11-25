import { useNavigate } from "react-router";
import ApiError from "../api/api-error";
import PanelMessage from "../components/PanelMessage/PanelMessage";
import useQuestion from "../hooks/useQuestion";
import useSelectedQuestionId from "../hooks/useSelectedQuestionId";
import QuestionHeader from "../components/QuestionHeader/QuestionHeader";

const QuestionDetail = () => {
  const id = useSelectedQuestionId();
  const question = useQuestion(id);
  const navigate = useNavigate();
  const isNotFound =
    id === undefined ||
    (question.error instanceof ApiError && question.error.isNotFound);

  if (isNotFound)
    return (
      <PanelMessage
        title="This question doesn't exist"
        text="It may have been removed, or the link is wrong."
        actionLabel="See all questions"
        onAction={() => navigate("/")}
      />
    );
  if (question.data)
    return (
      <>
        <QuestionHeader question={question.data} />
        <p>{question.data.lead}</p>
      </>
    );
  if (question.isError)
    return (
      <PanelMessage
        title="This answer didn't load"
        text="The list is fine, only this answer failed. Try again, or pick another question."
        actionLabel="Try again"
        onAction={() => question.refetch()}
      />
    );

  return <p>Loading…</p>;
};

export default QuestionDetail;
