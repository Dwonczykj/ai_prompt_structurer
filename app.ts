// Importing express and router and initiating the Express application
import express, { Application } from 'express';
import aiPromptTemplatingRouter from './routers/ai_prompt_templating.router';

// Initialize the express application
const app: Application = express();

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Root endpoint for testing if the API is up and running
app.get('/', (req, res) => {
  res.send('AI Prompt Templating API is Running');
});

// Register the Prompt Templating Router under the /ai_prompt_templating base path
app.use('/ai_prompt_templating', aiPromptTemplatingRouter);

// Start the Express server on specified PORT or default to 3000
const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
