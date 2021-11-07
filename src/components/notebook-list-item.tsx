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
  ${m(4)}
  display: inline-flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
