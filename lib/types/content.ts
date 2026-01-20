/**
 * HTTP method types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Pro-tip types
 */
export type ProTipType = 'tip' | 'warning' | 'note';

/**
 * Pro-tip content structure
 */
export interface ProTip {
  type: ProTipType;
  content: string;
}

/**
 * API header structure
 */
export interface ApiHeader {
  key: string;
  value: string;
  required: boolean;
  description?: string;
}

/**
 * API parameter structure
 */
export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
  example?: string;
}

/**
 * API request body field
 */
export interface BodyField {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: any;
}

/**
 * Response example with status code
 */
export interface ResponseExample {
  status: number;
  body: string;
}

/**
 * Language example (curl, python, javascript, go, etc.)
 */
export interface LanguageExample {
  language: string;
  label: string;
  code: string;
}

/**
 * Code examples for each endpoint (dynamic structure)
 */
export interface CodeExamples {
  languages: LanguageExample[];
  responses: ResponseExample[];
}

/**
 * Endpoint metadata
 */
export interface EndpointMetadata {
  method: HttpMethod;
  endpoint: string;
  requiresAuth: boolean;
  rateLimit?: string;
}

/**
 * Section with structured parameters (for custom rendering)
 */
export interface ParameterSection {
  title: string;
  parameters: ApiParameter[];
}

/**
 * Response field explanation
 */
export interface ResponseField {
  path: string;
  type?: string;
  description: string;
  example?: string;
}

/**
 * Section with response field explanations
 */
export interface ResponseFieldsSection {
  title: string;
  fields: ResponseField[];
}

/**
 * Event type for webhooks
 */
export interface EventType {
  event: string;
  description: string;
  trigger: string;
}

/**
 * Section with event types (for webhooks)
 */
export interface EventTypesSection {
  title: string;
  events: EventType[];
}

/**
 * Table column definition
 */
export interface TableColumn {
  header: string;
  key: string;
  width?: string;
}

/**
 * Table row (flexible key-value structure)
 */
export interface TableRow {
  [key: string]: string;
}

/**
 * Section with custom table
 */
export interface TableSection {
  title?: string;
  columns: TableColumn[];
  rows: TableRow[];
}

/**
 * Main content structure for each endpoint
 */
export interface EndpointContent {
  introduction: string;
  parameters: ApiParameter[];
  headers: ApiHeader[];
  body?: BodyField[];
  proTips: ProTip[];
  additionalNotes?: string;
  sections?: Record<string, ParameterSection | ResponseFieldsSection | EventTypesSection | TableSection>;
}

/**
 * SEO metadata for each page
 */
export interface SeoMetadata {
  title: string;
  description: string;
}

/**
 * Complete document content structure
 */
export interface DocContent {
  slug: string;
  title: string;
  description: string;
  category: string;
  metadata: EndpointMetadata;
  content: EndpointContent;
  examples: CodeExamples;
  seo: SeoMetadata;
}

/**
 * Navigation item structure
 */
export interface NavItem {
  title: string;
  slug: string;
  badge?: string;
}

/**
 * Navigation subsection (for nested groups like Examples > Google Maps Scraper)
 */
export interface NavSubsection {
  title: string;
  items: NavItem[];
}

/**
 * Navigation section structure
 */
export interface NavSection {
  title: string;
  items?: NavItem[];
  subsections?: NavSubsection[];
}

/**
 * Complete navigation structure
 */
export interface Navigation {
  sections: NavSection[];
}
