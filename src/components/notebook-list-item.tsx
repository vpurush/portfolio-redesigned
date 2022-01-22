import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardType,
} from "@fluentui/react/lib/DocumentCard";
import React from "react";
import styled from "styled-components";
import { m } from "styled-components-spacing";
import { NotebookType } from "../db/types/note";
import { Link } from "react-router-dom";

const StyledDocumentCard = styled(DocumentCard)`
  display: inline-flex;
`;

const StyledLink = styled(Link)`
  ${m(4)}
  text-decoration: none;
  display: inline-block;
`;

export const NotebookListItem = ({
  name,
  notebookId,
}: Partial<NotebookType> & { notebookId: string }) => {
  return (
    <StyledLink to={`/notebook/${notebookId}`}>
      <StyledDocumentCard aria-label={name} type={DocumentCardType.compact}>
        {/* <DocumentCardPreview previewImages={[previewProps.previewImages[0]]} /> */}
        <DocumentCardDetails>
          <DocumentCardTitle title={name} shouldTruncate />
        </DocumentCardDetails>
      </StyledDocumentCard>
    </StyledLink>
  );
};
