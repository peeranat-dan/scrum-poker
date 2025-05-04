import { type SessionInformationInput } from '@/types/schema.types';
import { Loader2 } from 'lucide-react';
import { type UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

interface SessionInformationFormProps {
  form: UseFormReturn<SessionInformationInput>;
  onSubmit: (values: SessionInformationInput) => void;
}

export default function SessionInformationForm({
  form,
  onSubmit,
}: Readonly<SessionInformationFormProps>) {
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
              <FormLabel>Session's Name</FormLabel>
              <FormControl>
                <Input placeholder='Planning Poker' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='votingSystem'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voting System</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a voting system' />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                  The voting system cannot be changed once voting begins.
                </FormDescription>
                <SelectContent>
                  <SelectItem value='fibonacci'>Fibonacci</SelectItem>
                  <SelectItem value='t-shirt'>T-Shirt</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting || !form.formState.isDirty}>
          {isSubmitting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
          Save
        </Button>
      </form>
    </Form>
  );
}
