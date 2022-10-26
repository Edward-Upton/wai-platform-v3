import { Attribute, AttributeType, Element, User } from "@prisma/client";
import { useMemo } from "react";
import MarkdownAttribute from "../attributes/Markdown";

export const TextRequiredAttributes: {
  name: string;
  type: AttributeType;
  value: object | string;
}[] = [{ name: "Markdown", type: "Markdown", value: "**Some Test Markdown**" }];

type TextElementProps = {
  element: Element & {
    user: User;
    atts: Attribute[];
  };
  edit: boolean;
  page?: boolean;
};

const TextElement = ({ element, edit }: TextElementProps) => {
  const markdownAttribute = useMemo(() => {
    return element.atts.find((attribute) => attribute.name === "Markdown");
  }, [element]);

  return markdownAttribute ? (
    <MarkdownAttribute attribute={markdownAttribute} edit={edit} />
  ) : (
    <p>loading text...</p>
  );
};

export default TextElement;
