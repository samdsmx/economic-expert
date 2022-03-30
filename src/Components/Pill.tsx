import React from "react";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useId } from "@fluentui/react-hooks";
import { mergeStyleSets, Stack } from "@fluentui/react";

interface PillProps {
  id?: string;
  category?: string;
  removeFilter?: (id: string) => void;
}

const Pill: React.FC<PillProps> = ({
  id,
  category,
  removeFilter,
}) => {
  const buttonId = useId("callout-button");

  return (
    <Stack id={buttonId} horizontal className={styles.pillStyle} verticalAlign={"center"} >
      {category}
      <HighlightOffIcon 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFilter(category);
        }}
        style={{ paddingLeft: "5px" }}
      />
    </Stack>
  );
};

const styles = mergeStyleSets({
  pillStyle: {
    background: `rgba(0, 120, 212, 0.6)`,
    borderRadius: `12px`,
    padding: `3px 12px`,
    margin: `8px 8px`,
    cursor: `pointer`,
    color: `white`,
  },
  callout: {
    width: 320,
  },
});

export { Pill };
