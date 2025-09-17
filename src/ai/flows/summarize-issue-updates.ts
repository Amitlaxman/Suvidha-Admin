'use server';

/**
 * @fileOverview Summarizes the updates timeline of an issue for admins.
 *
 * - summarizeIssueUpdates - A function that summarizes the issue updates.
 * - SummarizeIssueUpdatesInput - The input type for the summarizeIssueUpdates function.
 * - SummarizeIssueUpdatesOutput - The return type for the summarizeIssueUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueUpdatesInputSchema = z.object({
  updates: z
    .array(
      z.object({
        date: z.string().describe('The date of the update.'),
        description: z.string().describe('The description of the update.'),
        status: z.string().describe('The status of the update.'),
      })
    )
    .describe('The updates timeline of the issue.'),
});
export type SummarizeIssueUpdatesInput = z.infer<
  typeof SummarizeIssueUpdatesInputSchema
>;

const SummarizeIssueUpdatesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the issue updates.'),
});
export type SummarizeIssueUpdatesOutput = z.infer<
  typeof SummarizeIssueUpdatesOutputSchema
>;

export async function summarizeIssueUpdates(
  input: SummarizeIssueUpdatesInput
): Promise<SummarizeIssueUpdatesOutput> {
  return summarizeIssueUpdatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIssueUpdatesPrompt',
  input: {schema: SummarizeIssueUpdatesInputSchema},
  output: {schema: SummarizeIssueUpdatesOutputSchema},
  prompt: `You are an AI assistant helping to summarize issue update timelines for administrators.

  Given the following updates timeline, provide a concise summary that captures the key events and the overall progression of the issue.
  
  Updates Timeline:
  {{#each updates}}
  - Date: {{date}}, Status: {{status}}, Description: {{description}}
  {{/each}}
  
  Summary:`,
});

const summarizeIssueUpdatesFlow = ai.defineFlow(
  {
    name: 'summarizeIssueUpdatesFlow',
    inputSchema: SummarizeIssueUpdatesInputSchema,
    outputSchema: SummarizeIssueUpdatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
