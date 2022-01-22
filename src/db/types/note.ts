type CommonDBEntryType<T> = T & {
  doc_type: string;
};

export type NoteType = CommonDBEntryType<{
  note: string;
  notebookId: string;
}>;

export type NotebookType = CommonDBEntryType<{
  name: string;
}>;

export type NotebookDBContentType = NotebookType | NoteType;
