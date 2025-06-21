'use server';

/**
 * @fileOverview Analyzes the impact of proposed algorithm modifications on content ranking and diversity.
 *
 * - analyzeAlgorithmImpact - Analyzes the impact of proposed algorithm modifications.
 * - AnalyzeAlgorithmImpactInput - The input type for the analyzeAlgorithmImpact function.
 * - AnalyzeAlgorithmImpactOutput - The return type for the analyzeAlgorithmImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAlgorithmImpactInputSchema = z.object({
  currentAlgorithm: z
    .string()
    .describe('The current content ranking algorithm.'),
  proposedModification: z
    .string()
    .describe('The proposed modification to the algorithm.'),
  sampleContent: z
    .string()
    .describe('A sample of content that the algorithm will rank.'),
});
export type AnalyzeAlgorithmImpactInput = z.infer<
  typeof AnalyzeAlgorithmImpactInputSchema
>;

const AnalyzeAlgorithmImpactOutputSchema = z.object({
  predictedImpact: z
    .string()
    .describe(
      'A detailed analysis of the predicted impact of the proposed modification on content ranking and diversity.'
    ),
  risksAndBenefits: z
    .string()
    .describe(
      'An overview of the potential risks and benefits associated with the proposed modification.'
    ),
});
export type AnalyzeAlgorithmImpactOutput = z.infer<
  typeof AnalyzeAlgorithmImpactOutputSchema
>;

export async function analyzeAlgorithmImpact(
  input: AnalyzeAlgorithmImpactInput
): Promise<AnalyzeAlgorithmImpactOutput> {
  return analyzeAlgorithmImpactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAlgorithmImpactPrompt',
  input: {schema: AnalyzeAlgorithmImpactInputSchema},
  output: {schema: AnalyzeAlgorithmImpactOutputSchema},
  prompt: `You are an expert in content ranking algorithms and their impact on content diversity.
  Analyze the potential impact of the proposed modification on content ranking and diversity, considering the current algorithm and a sample of content.
  
Current Algorithm: {{{currentAlgorithm}}}
Proposed Modification: {{{proposedModification}}}
Sample Content: {{{sampleContent}}}

Provide a detailed analysis of the predicted impact, including potential risks and benefits.
`,
});

const analyzeAlgorithmImpactFlow = ai.defineFlow(
  {
    name: 'analyzeAlgorithmImpactFlow',
    inputSchema: AnalyzeAlgorithmImpactInputSchema,
    outputSchema: AnalyzeAlgorithmImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
