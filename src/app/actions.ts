'use server';

import { z } from 'zod';
import { analyzeAlgorithmImpact } from '@/ai/flows/analyze-algorithm-impact';
import { currentAlgorithm, sampleContent } from '@/lib/data';

const proposeModificationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  description: z.string().min(20, 'Description must be at least 20 characters long.'),
});

export async function handleProposeModification(formData: FormData) {
  // This is a placeholder for saving the proposal.
  // In a real app, you would save this to a database.
  const validatedFields = proposeModificationSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('New Proposal:', validatedFields.data);

  return { success: true };
}

export async function getImpactAnalysis(proposedModification: string) {
  'use server';
  if (!proposedModification || proposedModification.length < 20) {
    return { error: 'Please provide a more detailed modification description (at least 20 characters).' };
  }
  
  try {
    const result = await analyzeAlgorithmImpact({
      currentAlgorithm: currentAlgorithm.description,
      proposedModification,
      sampleContent: JSON.stringify(sampleContent.map(p => p.content), null, 2),
    });
    return { data: result };
  } catch (error) {
    console.error('Error getting impact analysis:', error);
    return { error: 'Failed to analyze impact. Please try again.' };
  }
}

// Placeholder for content submission
export async function handleSubmitPost(formData: FormData) {
  const content = formData.get('content');
  console.log('New Post Submitted:', content);
  return { success: true };
}
