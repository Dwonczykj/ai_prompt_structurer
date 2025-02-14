# AI Prompt Structurer

AI Prompt Structurer is a Node.js and TypeScript application that generates structured prompt templates based on a JSON schema input. By leveraging SOLID design principles, the application is built to be maintainable, extensible, and easily testable.

## Key Features

- **JSON Schema Input:** Accepts a JSON schema (via REST endpoints) to generate prompt templates.
- **Separation of Concerns:** Distinct layers handle request routing, schema validation, prompt creation, and LLM interaction.
- **SOLID Principles:** Each module adheres to SOLID principles:
  - **Single Responsibility:** Each component (e.g., request routing, schema operations, prompt generation, LLM communication) has a clearly defined responsibility.
  - **Open/Closed & Liskov Substitution:** Components are open for extension but closed for modification. Interfaces such as `IStructuredPromptTemplateCreator` and `IAILLMService` allow swapping implementations without affecting dependent modules.
  - **Interface Segregation & Dependency Inversion:** By programming to interfaces, the codebase is decoupled and easier to extend or refactor.
  
## Application Structure

### 1. **Request Handling**
- **Express Router:**  
  The file `routers/ai_prompt_templating.router.ts` defines our API endpoint (`/structure_prompt`). It leverages Express middleware to validate the schema via the `SchemaValidator` utility and then passes it to the prompt generation logic.

### 2. **Schema & Prompt Utilities**
- **SchemaCreator:**  
  Provides utility functions such as `getObjectDepth`, `generateTemplateString`, and `createZodSchema`. These functions help analyze the JSON schema and generate string representations of values.
- **SchemaValidator:**  
  Validates object schemas to ensure only valid inputs are processed.

### 3. **Prompt Generation & LLM Services**
- **Prompt Template Creation:**  
  An interface `IStructuredPromptTemplateCreator` defines how structured prompt templates are created.  
  The implementation `LangChainStructuredPromptTemplateCreator` (located in the `prompts` directory) uses the Langchain library to assemble the prompt based on the JSON schema.
- **LLM Integration:**  
  By defining an interface `IAILLMService`, the system can work with various language model services. The implementation, `OpenAIService`, communicates with OpenAI’s LLM. This design makes it easy to replace components by simply swapping an implementation.

### 4. **Testing**
- **Jest & TS-Mockito:**  
  Unit tests (e.g., in `tests/SchemaCreator.test.ts` and `tests/LangChainStructuredPromptTemplateCreator.test.ts`) are written using Jest. TS-Mockito is used to create mocks of complex services (such as ChatOpenAI or BaseChatModel) ensuring that tests remain isolated, reliable, and fast.

## Benefits of the Design

- **Maintainability:** Clear module boundaries and dependency inversion make the codebase easier to maintain.
- **Extensibility:** New features or components (different LLM providers, additional prompt formatting) can be added with minimal impact on existing components.
- **Testability:** Modular design and dependency injection allow each component to be thoroughly unit tested.
- **Readability:** Leveraging interfaces and well-documented code improves the overall readability and reduces the learning curve for future developers.

## Getting Started

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **Run the Application:**
   ```bash
   yarn debug
   ```

3. **Run Unit Tests:**
   ```bash
   yarn test
   ```

Enjoy creating structured prompts with ease!
