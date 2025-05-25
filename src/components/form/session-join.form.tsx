import { type JoinSessionInput } from '@/types/schema.types';
import { Loader2 } from 'lucide-react';
import { type UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface SessionJoinFormProps {
  onSubmit: (data: JoinSessionInput) => void;
  form: UseFormReturn<JoinSessionInput>;
}

export default function SessionJoinForm({ form, onSubmit }: Readonly<SessionJoinFormProps>) {
  const { formState } = form;
  const { isSubmitting } = formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Display Name</FormLabel>
              <FormControl>
                <Input placeholder='Michael Jackson' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
          Join Session
        </Button>
      </form>
    </Form>
  );
}
