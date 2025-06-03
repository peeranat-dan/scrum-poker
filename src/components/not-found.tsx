import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription } from './ui/card';

export default function NotFound() {
  return (
    <div className='bg-background h-sc flex w-full flex-1 items-center justify-center p-6'>
      <Card className='w-full max-w-md text-center'>
        <CardContent className='space-y-4'>
          <h1 className='text-primary mb-4 text-4xl font-bold'>404</h1>
          <CardDescription>Oops! The page you're looking for doesn't exist.</CardDescription>
          <Button asChild>
            <Link to='/' className='w-full'>
              Go Back Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
