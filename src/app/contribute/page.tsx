import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitBranch, BookText, Milestone } from 'lucide-react';

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Contribute to FairTrace</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Help us build a more transparent and community-driven content platform.
            </p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-6 w-6" />
                How to Contribute
              </CardTitle>
              <CardDescription>
                We welcome contributions of all kinds, from code and bug reports to feature suggestions and documentation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our project is open-source and hosted on GitHub. The best way to start contributing is by checking out our repository, looking for open issues, or proposing new features.
              </p>
              <div>
                <Button asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    Visit our GitHub Repository
                  </a>
                </Button>
              </div>
              <h3 className="font-semibold">Getting Started with Development</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Fork the repository and clone it to your local machine.</li>
                <li>Install dependencies using <code>npm install</code>.</li>
                <li>Run the development server with <code>npm run dev</code>.</li>
                <li>Create a new branch for your feature or bug fix.</li>
                <li>Submit a pull request with a clear description of your changes.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookText className="h-6 w-6" />
                Code of Conduct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We are committed to providing a welcoming and inclusive environment for everyone. All contributors are expected to adhere to our Code of Conduct. Please read it before participating.
              </p>
              <Button asChild variant="link" className="px-0">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Read our Code of Conduct
                  </a>
              </Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Milestone className="h-6 w-6" />
                Our Roadmap
              </CardTitle>
              <CardDescription>
                We have big plans for FairTrace! Here's a glimpse of what we're working on.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                 <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Implementing a token-based reward system.</li>
                    <li>Enabling multi-version A/B algorithm testing.</li>
                    <li>Integrating advanced, privacy-preserving login methods.</li>
                    <li>Supporting forks like UnicornX through our open Alpha Signal Hub.</li>
                </ul>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
