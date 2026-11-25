import { useLocation, useNavigate } from "react-router";
import ApiError from "../api/api-error";
import PanelMessage from "../components/PanelMessage/PanelMessage";
import useQuestion from "../hooks/useQuestion";
import useSelectedQuestionId from "../hooks/useSelectedQuestionId";
import QuestionHeader from "../components/QuestionHeader/QuestionHeader";
import MarkdownContent from "../components/MarkdownContent/MarkdownContent";
import QuestionNav from "../components/QuestionNav/QuestionNav";
import useQuestionNeighbours from "../hooks/useQuestionNeighbours";
import styles from "./QuestionDetail.module.css";

const QuestionDetail = () => {
  const id = useSelectedQuestionId();
  const question = useQuestion(id);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { previous, next } = useQuestionNeighbours(id);
  const isNotFound =
    id === undefined ||
    (question.error instanceof ApiError && question.error.isNotFound);

  if (isNotFound)
    return (
      <PanelMessage
        title="This question doesn't exist"
        text="It may have been removed, or the link is wrong."
        actionLabel="See all questions"
        onAction={() => navigate({ pathname: "/", search })}
      />
    );
  if (question.data)
    return (
      <article className={styles.article}>
        <QuestionHeader question={question.data} />
        <p className={styles.lead}>{question.data.lead}</p>
        {question.data.body && (
          <MarkdownContent markdown={question.data.body} />
        )}
        {(previous || next) && <QuestionNav previous={previous} next={next} />}
      </article>
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
