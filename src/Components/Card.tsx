import React from "react";
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  IDocumentCardPreviewStyles,
  IDocumentCardStyles,
} from "@fluentui/react/lib/DocumentCard";
import { TestImages } from "@fluentui/example-data";
import { ImageFit } from "@fluentui/react/lib/Image";
import {
  HighContrastSelector,
  IButtonStyles,
  IconButton,
  IContextualMenuProps,
  IIconProps,
  Stack,
} from "@fluentui/react";

export function Card({ title, tipo, conceptos, autores, referencias }) {
  const onActionClick = (
    action: string,
    ev: React.SyntheticEvent<HTMLElement>
  ): void => {
    console.log(`You clicked the ${action} action`);
    ev.stopPropagation();
    ev.preventDefault();
  };

  const documentCardActions = [
    {
      iconProps: { iconName: "Share" },
      onClick: onActionClick.bind(this, "share"),
      ariaLabel: "share action",
    },
    {
      iconProps: { iconName: "Pin" },
      onClick: onActionClick.bind(this, "pin"),
      ariaLabel: "pin action",
    },
    {
      iconProps: { iconName: "Ringer" },
      onClick: onActionClick.bind(this, "notifications"),
      ariaLabel: "notifications action",
    },
  ];

  const cardStyles: IDocumentCardStyles = {
    root: { display: "inline-block", marginRight: 20, marginBottom: 20 },
  };

  const cardTitleStyles: IDocumentCardStyles = {
    root: { fontSize: 17, fontWeight: "bold", lineHeight: "normal" },
  };

  const cardSubTitleStyles: IDocumentCardStyles = {
    root: { lineHeight: "normal", height: 'auto', padding: '2px 16px' },
  };

  const cardPreviewStyles: IDocumentCardPreviewStyles = {
    root: "",
    fileListOverflowText: { float: "right" },
    previewIcon: "",
    icon: "",
    fileList: "",
    fileListIcon: "",
    fileListLink: { color: "rgb(0, 120, 212)", textDecoration: "underline" },
  };

  const addIcon: IIconProps = { iconName: "ExploreContent" };

  const customSplitButtonStyles: IButtonStyles = {
    splitButtonMenuButton: {
      backgroundColor: "white",
      width: 28,
      border: "none",
    },
    splitButtonMenuIcon: { fontSize: "7px" },
    splitButtonDivider: {
      backgroundColor: "#c8c8c8",
      width: 1,
      right: 26,
      position: "absolute",
      top: 4,
      bottom: 4,
    },
    splitButtonContainer: {
      height: "fit-content",
      selectors: {
        [HighContrastSelector]: { border: "none" },
      },
    },
  };

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "modificar",
        text: "Modificar",
        iconProps: { iconName: "Edit" },
      },
      {
        key: "pdf",
        text: "Ver en PDF",
        iconProps: { iconName: "Print" },
      },
    ],
  };

  function _alertClicked(): void {}

  return (
    <DocumentCard styles={cardStyles}>
      <Stack verticalFill verticalAlign="space-between">
        <Stack>
          <Stack horizontal horizontalAlign="space-between">
            <DocumentCardTitle
              title={title}
              styles={cardTitleStyles}
              shouldTruncate
            />
            <IconButton
              split
              iconProps={addIcon}
              splitButtonAriaLabel="See 2 options"
              aria-roledescription="split button"
              styles={customSplitButtonStyles}
              menuProps={menuProps}
              ariaLabel="New item"
              onClick={_alertClicked}
            />
          </Stack>
          <DocumentCardTitle
            showAsSecondaryTitle
            title={
              "This is the email content preview which is very very long. The email also has some more content. "
            }
            styles={cardSubTitleStyles}
          />
          <DocumentCardTitle
            showAsSecondaryTitle
            title={conceptos.join(", ")}
            styles={cardSubTitleStyles}
          />
          <DocumentCardPreview
            maxDisplayCount={3}
            getOverflowDocumentCountText={(overflowCount: number) =>
              overflowCount - 2 > 0 && `+${overflowCount - 2} mas`
            }
            previewImages={referencias.concat(["", ""]).map((r: string) => {
              return { name: r, linkProps: { href: r, target: "_blank" } };
            })}
            styles={cardPreviewStyles}
          />
        </Stack>
        <Stack>
          <DocumentCardActivity
            activity={"" + Math.floor(1800 + Math.random() * 220)}
            people={autores.map((a: string) => {
              return { name: a, profileImageSrc: null };
            })}
          />
          <DocumentCardActions
            actions={documentCardActions}
            views={Math.floor(Math.random() * 30)}
          />
        </Stack>
      </Stack>
    </DocumentCard>
  );
}
