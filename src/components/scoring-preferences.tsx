'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ScoringPreferencesProps {
  weights: {
    likes: number;
    comments: number;
    recency: number;
  };
  onWeightsChange: (newWeights: { likes: number; comments: number; recency: number }) => void;
}

export function ScoringPreferences({ weights, onWeightsChange }: ScoringPreferencesProps) {
  const handleSliderChange = (factor: keyof typeof weights, value: number[]) => {
    onWeightsChange({
      ...weights,
      [factor]: value[0],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Feed Preferences</CardTitle>
        <CardDescription>Adjust the weights to personalize your content feed.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="likes-slider">Likes</Label>
            <span className="text-sm font-medium">{weights.likes.toFixed(2)}</span>
          </div>
          <Slider
            id="likes-slider"
            min={0}
            max={1}
            step={0.05}
            value={[weights.likes]}
            onValueChange={(value) => handleSliderChange('likes', value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="comments-slider">Comments</Label>
            <span className="text-sm font-medium">{weights.comments.toFixed(2)}</span>
          </div>
          <Slider
            id="comments-slider"
            min={0}
            max={1}
            step={0.05}
            value={[weights.comments]}
            onValueChange={(value) => handleSliderChange('comments', value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="recency-slider">Recency</Label>
            <span className="text-sm font-medium">{weights.recency.toFixed(2)}</span>
          </div>
          <Slider
            id="recency-slider"
            min={0}
            max={1}
            step={0.05}
            value={[weights.recency]}
            onValueChange={(value) => handleSliderChange('recency', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
