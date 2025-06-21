import { Header } from '@/components/header';
import { ContentFeed } from '@/components/content-feed';
import { AlgorithmProposals } from '@/components/algorithm-proposals';
import { AlgorithmVersionHistory } from '@/components/algorithm-version-history';
import { posts, proposals, algorithmVersions, currentAlgorithm } from '@/lib/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <AlgorithmVersionHistory versions={algorithmVersions} />
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-6">
            <ContentFeed posts={posts} currentAlgorithmDescription={currentAlgorithm.description} />
          </div>
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-24">
              <AlgorithmProposals proposals={proposals} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
