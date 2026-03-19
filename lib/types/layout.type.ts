import React from 'react';
import { CodeExamples, Navigation, DocContent as DocContentType, DocContent, ProTipType } from './content';


export interface ThreeColumnLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  codeColumn: React.ReactNode;
}

export interface SidebarProps {
  navigation: Navigation;
}

interface HighlightedLanguage {
  language: string;
  label: string;
  code: string;
  html: string;
}

interface HighlightedResponse {
  status: number;
  body: string;
  html: string;
}

export interface CodeColumnProps {
  examples: CodeExamples;
  highlightedCode: {
    languages: HighlightedLanguage[];
    responses: HighlightedResponse[];
  };
}

export interface DocContentProps {
  content: DocContentType;
}

export interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export interface CopyForLLMButtonProps {
  content: DocContent;
}

export interface HighlightedCodeProps {
  code: string;
  language: string;
}

export interface ProTipProps {
  type: ProTipType;
  children: React.ReactNode;
}

export interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}
