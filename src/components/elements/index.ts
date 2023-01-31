import {
  CalendarIcon,
  CheckBadgeIcon,
  CircleStackIcon,
  DocumentIcon,
  PencilIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { ElementType } from "@prisma/client";
import { SVGProps } from "react";
import TextElement, { TextRequiredAttributes } from "./Text";
import PageElement, { PageRequiredAttributes } from "./Page";
import {
  ElementProps,
  RequiredAttribute,
  PreAttributeEditFn,
  ElementCreateCheckPermsFn,
} from "./utils";
import EventElement, { EventRequiredAttributes } from "./Event";
import DatabaseElement, {
  DatabaseRequiredAttributes,
  databasePreAttributeEdit,
} from "./Database";
import DatabaseViewElement, {
  DatabaseViewRequiredAttributes,
} from "./DatabaseView";
import SurveyElement, {
  SurveyRequiredAttributes,
  surveyPreAttributeEdit,
} from "./Survey";
import BadgeElement, { BadgeRequiredAttributes } from "./Badge";
import SurveyResponseElement, {
  surveyCreateCheckPerms,
  SurveyResponseRequiredAttributes,
} from "./SurveyResponse";

type ElementIcon = (
  props: SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
) => JSX.Element;

const elements: {
  [key in ElementType]?: {
    name: string;
    description: string;
    icon: ElementIcon;
    element: ({ element, edit }: ElementProps) => JSX.Element;
    showInPicker: boolean;
    requiredAtts: RequiredAttribute[];
    elementCreatePermsCheck?: ElementCreateCheckPermsFn;
    preAttributeEditFn?: PreAttributeEditFn;
  };
} = {
  [ElementType.Text]: {
    name: "Text",
    description: "A text element, supports Markdown.",
    icon: PencilIcon,
    element: TextElement,
    showInPicker: true,
    requiredAtts: TextRequiredAttributes,
  },
  [ElementType.Page]: {
    name: "Page",
    description: "Container for other elements.",
    icon: DocumentIcon,
    element: PageElement,
    showInPicker: true,
    requiredAtts: PageRequiredAttributes,
  },
  [ElementType.Event]: {
    name: "Event",
    description: "Scheduled event with location and time.",
    icon: CalendarIcon,
    element: EventElement,
    showInPicker: true,
    requiredAtts: EventRequiredAttributes,
  },
  [ElementType.Badge]: {
    name: "Badge",
    description: "An award for users.",
    icon: CheckBadgeIcon,
    element: BadgeElement,
    showInPicker: true,
    requiredAtts: BadgeRequiredAttributes,
  },
  [ElementType.Database]: {
    name: "Database",
    description: "Stores a list of elements.",
    icon: CircleStackIcon,
    element: DatabaseElement,
    showInPicker: false,
    requiredAtts: DatabaseRequiredAttributes,
    preAttributeEditFn: databasePreAttributeEdit,
  },
  [ElementType.DatabaseView]: {
    name: "Database View",
    description: "A view of a database.",
    icon: TableCellsIcon,
    element: DatabaseViewElement,
    showInPicker: true,
    requiredAtts: DatabaseViewRequiredAttributes,
  },
  [ElementType.Survey]: {
    name: "Survey",
    description: "A survey element, with questions.",
    icon: PresentationChartBarIcon,
    element: SurveyElement,
    requiredAtts: SurveyRequiredAttributes,
    showInPicker: true,
    preAttributeEditFn: surveyPreAttributeEdit,
  },
  [ElementType.SurveyResponse]: {
    name: "Survey Response",
    description: "A response to a survey.",
    icon: PresentationChartBarIcon,
    element: SurveyResponseElement,
    requiredAtts: SurveyResponseRequiredAttributes,
    showInPicker: false,
    elementCreatePermsCheck: surveyCreateCheckPerms,
  },
};

export default elements;
