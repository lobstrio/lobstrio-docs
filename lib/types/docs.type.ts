interface TableColumn {
  header: string;
  key: string;
  width?: string;
  semibold?: boolean;
}

interface TableRow {
  [key: string]: string | React.ReactNode;
}

export interface CustomTableProps {
  title?: string;
  columns: TableColumn[];
  rows: TableRow[];
}
interface EventType {
  event: string;
  description: string;
  trigger: string;
}

export interface EventTypesListProps {
  title: string;
  events: EventType[];
}


interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface ParametersListProps {
  title: string;
  parameters: Parameter[];
}


interface ResponseField {
  path: string;
  type?: string;
  description: string;
  example?: string;
}

export interface ResponseFieldsListProps {
  title: string;
  fields: ResponseField[];
}
