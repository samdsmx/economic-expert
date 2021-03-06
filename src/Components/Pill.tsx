import React from "react";
import { useId } from "@fluentui/react-hooks";
import {
  IButtonStyles,
  IconButton,
  IIconProps,
  Link,
  mergeStyleSets,
  Stack,
} from "@fluentui/react";
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from "@fluentui/react/lib/Persona";
import { isValidHttpUrl } from "./Card";

interface PillProps {
  category?: string;
  type?: string;
  removeFilter?: (id: string) => void;
}

const Pill: React.FC<PillProps> = ({ category, type, removeFilter }) => {
  const buttonId = useId("callout-button");
  const deleteIcon: IIconProps = { iconName: "Delete" };

  const searchURL = (v: string) => {
    let url = v;
    if (!isValidHttpUrl(v)){
      url = `http://google.com/search?q="${v}"`;
    }
    return url;
  }

  const customSplitButtonStyles: IButtonStyles = {
    root: {
      color: "gray",
    },
    iconHovered: {
      color: 'lightgray',
    },
    rootHovered: {
      background: 'none',
    }
  };
  return (
    <React.Fragment>
      <Stack
        id={buttonId}
        horizontal
        className={type === `pill` && styles.pillStyle}
        verticalAlign={"center"}
      >
        {type === "pill" && category}

        {type === "link" && (
          <Link
            role="link"
            title={category}
            target="_blank"
            href={searchURL(category)}
            underline
          >
            {category}
          </Link>
        )}

        {type === "person" && (
          <Persona
            text={category}
            size={PersonaSize.size24}
            presence={PersonaPresence.none}
          />
        )}

        <IconButton
          style={{ color: type === "pill" ? "white" : "gray" }}
          iconProps={deleteIcon}
          styles={customSplitButtonStyles}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFilter(category);
          }}
        />
      </Stack>
    </React.Fragment>
  );
};

const styles = mergeStyleSets({
  pillStyle: {
    background: `rgba(0, 120, 212, 0.6)`,
    borderRadius: `12px`,
    padding: `2px 8px`,
    color: `white`,
  },
});

export { Pill };
