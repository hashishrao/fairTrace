'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';
import { handleSubmitPost } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface SubmitPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitPostDialog({ open, onOpenChange }: SubmitPostDialogProps) {
    const { toast } = useToast();

    const handleAction = async (formData: FormData) => {
        const result = await handleSubmitPost(formData);
        if (result.success) {
            toast({ title: "Post Submitted!", description: "Your post is now live in the feed."});
            onOpenChange(false);
        } else {
             toast({ title: "Error", description: "Failed to submit post.", variant: 'destructive'});
        }
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>Share your thoughts with the community.</DialogDescription>
        </DialogHeader>
        <form action={handleAction}>
            <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="content">Your content</Label>
                <Textarea id="content" name="content" placeholder="What's on your mind?" rows={5} required />
            </div>
            </div>
            <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Submit Post</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
