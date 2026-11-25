import ReactMarkdown from "react-markdown";
import styles from "./MarkdownContent.module.css";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "../CodeBlock/CodeBlock";

type Props = {
  markdown: string;
};

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];
const components = { pre: CodeBlock };

const MarkdownContent = (props: Props) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {props.markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
