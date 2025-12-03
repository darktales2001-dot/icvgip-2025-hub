import { TopNav } from "./TopNav";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container mx-auto px-4 py-8">
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-foreground md:text-4xl font-serif">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-2 text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </main>
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ICVGIP - Indian Conference on Computer Vision, Graphics and Image Processing
          </p>
        </div>
      </footer>
    </div>
  );
}
