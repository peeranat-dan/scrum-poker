import { Link } from '@tanstack/react-router';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription } from './ui/card';

export default function NotFound() {
  return (
    <div className="h-sc flex w-full flex-1 items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="space-y-4">
          <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
          <CardDescription>Oops! The page you're looking for doesn't exist.</CardDescription>
          <Button asChild>
            <Link to="/" className="w-full">
              Go Back Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
