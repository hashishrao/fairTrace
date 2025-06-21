'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { SubmitPostDialog } from './submit-post-dialog';
import { ProposeModificationDialog } from './propose-modification-dialog';
import { FileText, PlusCircle } from 'lucide-react';

export function Header() {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isProposeOpen, setIsProposeOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setIsSubmitOpen(true)}>
              <PlusCircle />
              Submit Post
            </Button>
            <Button onClick={() => setIsProposeOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <FileText />
              Propose Modification
            </Button>
          </div>
        </div>
      </header>
      <SubmitPostDialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen} />
      <ProposeModificationDialog open={isProposeOpen} onOpenChange={setIsProposeOpen} />
    </>
  );
}
