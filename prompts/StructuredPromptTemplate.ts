/**
 * StructuredPromptTemplate
 * 
 * This class represents the structured prompt template along with the list
 * of template variables (i.e. the top-level keys of the provided schema).
 */
export class StructuredPromptTemplate {
  constructor(
    public promptTemplate: string,
    public templateVariables: string[]
  ) {}
} 
