import React, { useContext } from "react";
import stringifyObject from 'stringify-object';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewStyles,
  IDocumentCardStyles,
} from "@fluentui/react/lib/DocumentCard";
import {
  DirectionalHint,
  HighContrastSelector,
  IButtonStyles,
  IconButton,
  IContextualMenuProps,
  IIconProps,
  Stack,
  TeachingBubble,
} from "@fluentui/react";
import { useBoolean, useId } from '@fluentui/react-hooks';
import { PinsContext } from "../Hooks/PinsContext";
import { InfoPanel } from "./InfoPanel";
import { PageContext } from "../Hooks/PageContext";

export const isValidHttpUrl = (v: string | URL) => {
  let url: URL;
  try {
    url = new URL(v);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export function Card({ item }) {

  const { parsedPinsMap, savePins } = useContext(PinsContext);
  const { selectModel, setPage } = useContext(PageContext);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

  const onClickPinButton = (ev: React.SyntheticEvent<HTMLElement>) => {
    if (parsedPinsMap.get(item.id)) {
      parsedPinsMap.delete(item.id);
    } else {
      parsedPinsMap.set(item.id, true);
    }
    savePins(parsedPinsMap);
    ev.stopPropagation();
    ev.preventDefault();
  };

  const onClickShareButton = (ev: React.SyntheticEvent<HTMLElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      toggleTeachingBubbleVisible();
      return navigator.clipboard.writeText(stringifyObject(item, {
        indent: '  ',
        singleQuotes: false
      }));
    }
    return Promise.reject('The Clipboard API is not available.');
  };

  const documentCardActions = React.useMemo(() => [
    {
      iconProps: { iconName: "Share" },
      onClick: onClickShareButton.bind(this),
      ariaLabel: "share action",
    },
    {
      iconProps: { iconName: parsedPinsMap.get(item.id) ? "Pinned" : "Pin" },
      onClick: onClickPinButton.bind(this),
      ariaLabel: "pin action",
    },
    /*{
      iconProps: { iconName: "Ringer" },
      onClick: onActionClick.bind(this, "notifications"),
      ariaLabel: "notifications action",
    },*/
  ], [parsedPinsMap]);

  const cardStyles: IDocumentCardStyles = {
    root: { display: "inline-block", marginRight: 20, marginBottom: 20 },
  };

  const cardTitleStyles: IDocumentCardStyles = {
    root: { fontSize: 17, fontWeight: "bold", height: 'auto', lineHeight: "normal" },
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
        onClick: () => {
          selectModel(item);
          setPage(`insert`);
        },
        iconProps: { iconName: "Edit" },
      },
      /* {
         key: "pdf",
         text: "Ver en PDF",
         iconProps: { iconName: "Print" },
       },*/
    ],
  };

  const buttonId = useId('targetButton');

  return (
    <DocumentCard styles={cardStyles} id={buttonId}>
      <Stack verticalFill verticalAlign="space-between">
        <Stack>
          <Stack horizontal horizontalAlign="space-between">
            <DocumentCardTitle
              title={item.nombre}
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
              onClick={openPanel}
            />
          </Stack>
          <DocumentCardLocation location={item.tipo + `economia`} styles={{ root: { paddingTop: 0, color: 'rgb(50, 49, 48)', pointerEvents: 'none', cursor: 'default' } }} />
          <DocumentCardTitle
            showAsSecondaryTitle
            title={item.descripcion?.length > 120 ? item.descripcion?.substring(0, 120) + '...' : item.descripcion}
            styles={cardSubTitleStyles}
          />
          <DocumentCardTitle
            showAsSecondaryTitle
            title={item.conceptos?.join(", ")}
            styles={cardSubTitleStyles}
          />
          <DocumentCardPreview
            maxDisplayCount={3}
            getOverflowDocumentCountText={(overflowCount: number) =>
              overflowCount - 2 > 0 && `+${overflowCount - 2} mas`
            }
            previewImages={item.referencias.concat(["", ""]).map((r: string) => {
              let url = r;
              if (!isValidHttpUrl(r)) {
                url = `http://google.com/search?q="${r}"`;
              }
              return { name: r, linkProps: { href: url, target: "_blank" } };
            })}
            styles={cardPreviewStyles}
          />
        </Stack>
        <Stack>
          <DocumentCardActivity
            activity={item.year}
            people={item.autores ?
              item.autores.map((a: string) => {
                return { name: a, profileImageSrc: null }
              }) : []}
          />
          <DocumentCardActions
            actions={documentCardActions}
            views={Math.floor(Math.random() * 30)}
          />
          {teachingBubbleVisible && (
            <TeachingBubble
              calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
              target={`#${buttonId}`}
              isWide={false}
              hasCloseButton={true}
              closeButtonAriaLabel="Close"
              onDismiss={toggleTeachingBubbleVisible}>
                Toda la información de este modelo se ha copiado en el portapapeles, compártelo con Ctrl+V en un área de texto.  
            </TeachingBubble>
          )}
        </Stack>
      </Stack>
      <InfoPanel isOpen={isOpen} dismissPanel={dismissPanel} item={item} />
    </DocumentCard>
  );
}
