'use client';

import { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getImpactAnalysis, handleProposeModification } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import type { AnalyzeAlgorithmImpactOutput } from '@/ai/flows/analyze-algorithm-impact';
import { Lightbulb } from 'lucide-react';
import { getScoringSuggestions } from '@/lib/scoringSuggester';


interface ProposeModificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProposeModificationDialog({ open, onOpenChange }: ProposeModificationDialogProps) {
  const { toast } = useToast();
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeAlgorithmImpactOutput | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [scoringSuggestions, setScoringSuggestions] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleAnalyzeImpact = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);
    const result = await getImpactAnalysis(description);
    if (result.data) {
      setAnalysisResult(result.data);
    } else {
      setAnalysisError(result.error ?? 'An unknown error occurred.');
    }
    setIsAnalyzing(false);
  };

  const handleGetSuggestions = async () => {
    setScoringSuggestions(null);
    setIsSuggesting(true);
    const suggestions = await getScoringSuggestions(description);
    setScoringSuggestions(suggestions);
    setIsSuggesting(false);
  };

  const handleFormAction = async (formData: FormData) => {
    const result = await handleProposeModification(formData);
    if (result.success) {
      toast({ title: 'Proposal Submitted', description: 'Your proposal is now up for community voting.' });
      onOpenChange(false);
      setDescription('');
      setAnalysisResult(null);
    } else if (result.errors) {
      // Handle validation errors from server
      const errorMessages = Object.values(result.errors).flat().join('\n');
      toast({ title: 'Invalid Proposal', description: errorMessages, variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Propose an Algorithm Modification</DialogTitle>
          <DialogDescription>
            Suggest a change to the content ranking algorithm. Your proposal will be voted on by the community.
          </DialogDescription>
        </DialogHeader>
        <form action={handleFormAction} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input id="title" name="title" placeholder="e.g., Boost New Content" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your proposed change, why it's needed, and how it should work."
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4 rounded-lg border p-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">AI Impact Analysis</h3>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleAnalyzeImpact} disabled={isAnalyzing || description.length < 20}>
                  {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Analyze Impact
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">
                Use our AI tool to predict the outcome of your proposed modification before submitting.
            </p>
            {analysisError && <p className="text-sm text-destructive">{analysisError}</p>}
            {analysisResult && (
              <div className="space-y-4 pt-4">
                <Separator/>
                <Card>
                    <CardHeader><CardTitle className="text-base">Predicted Impact</CardTitle></CardHeader>
                    <CardContent><p className="text-sm">{analysisResult.predictedImpact}</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-base">Risks & Benefits</CardTitle></CardHeader>
                    <CardContent><p className="text-sm">{analysisResult.risksAndBenefits}</p></CardContent>
                </Card>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Submit Proposal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
