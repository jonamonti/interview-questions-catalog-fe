import { isValidElement, type ComponentProps, type ReactNode } from "react";
import styles from "./CodeBlock.module.css";

type Props = ComponentProps<"pre">;

// the <code> that arrives in children has the class, for instance, language-ts.
// isValidElement checks that children is a real element (and tells TypeScript it has props.className),
// then a small regular expression pulls out the name after language-.
const getLanguage = (children: ReactNode): string | undefined => {
  if (!isValidElement<{ className?: string }>(children)) return undefined;
  return /language-([\w-]+)/.exec(children.props.className ?? "")?.[1];
};

const CodeBlock = (props: Props) => {
  const language = getLanguage(props.children);
  return (
    // figure and figcaption are the semantic HTML elements for
    // "a piece of content with a caption",
    <figure className={styles.figure}>
      {language && (
        <figcaption className={styles.language}>{language}</figcaption>
      )}
      <pre>{props.children}</pre>
    </figure>
  );
};

export default CodeBlock;
