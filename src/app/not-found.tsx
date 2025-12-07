import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Go to Homepage
          </Link>
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card text-card-foreground font-medium hover:border-primary transition-colors"
          >
            Browse Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
