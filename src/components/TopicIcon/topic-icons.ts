import {
  siJavascript,
  siReact,
  siPostgresql,
  siNodedotjs,
  siPrisma,
} from "simple-icons";
import type { Tag } from "../../api/types";
import { lineIcons } from "../../assets/icons/line-icons";

export type TopicIconDefinition = {
  label: string;
  path: string;
  kind: "brand" | "line";
  size: number;
};

const mapSlugToIcon: Record<string, TopicIconDefinition> = {
  javascript: {
    label: siJavascript.title,
    path: siJavascript.path,
    kind: "brand",
    size: 28,
  },
  react: {
    label: siReact.title,
    path: siReact.path,
    kind: "brand",
    size: 30,
  },
  sql: {
    label: siPostgresql.title,
    path: siPostgresql.path,
    kind: "brand",
    size: 30,
  },
  node: {
    label: siNodedotjs.title,
    path: siNodedotjs.path,
    kind: "brand",
    size: 30,
  },
  prisma: {
    label: siPrisma.title,
    path: siPrisma.path,
    kind: "brand",
    size: 28,
  },
  security: {
    label: lineIcons.security.label,
    path: lineIcons.security.path,
    kind: "line",
    size: 26,
  },
  api: {
    label: lineIcons.api.label,
    path: lineIcons.api.path,
    kind: "line",
    size: 26,
  },
  networking: {
    label: lineIcons.networking.label,
    path: lineIcons.networking.path,
    kind: "line",
    size: 26,
  },
};

const fallbackIcon: TopicIconDefinition = {
  label: lineIcons.topic.label,
  path: lineIcons.topic.path,
  kind: "line",
  size: 26,
};

export const getTopicIcon = (tags: Tag[]) => {
  for (const topic of tags) {
    if (Object.hasOwn(mapSlugToIcon, topic.slug)) {
      return mapSlugToIcon[topic.slug];
    }
  }
  return fallbackIcon;
};
