import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className='bg-background flex w-full flex-1 items-center justify-center p-6'>
      <Card className='w-full max-w-md text-center'>
        <CardContent className='space-y-4'>
          <h1 className='text-primary mb-4 text-4xl font-bold'>404</h1>
          <CardDescription>Oops! The page you're looking for doesn't exist.</CardDescription>
          <Button onClick={() => navigate('/')} className='w-full'>
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
