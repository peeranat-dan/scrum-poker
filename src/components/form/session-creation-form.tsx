import { type CreateSessionInput } from "@/types/schema.types";
import { type UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

interface SessionCreationFormProps {
  onSubmit: (data: CreateSessionInput) => void;
  form: UseFormReturn<CreateSessionInput>;
}

export default function SessionCreationForm({
  form,
  onSubmit,
}: Readonly<SessionCreationFormProps>) {
  const { formState } = form;
  const { isSubmitting } = formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session's Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="votingSystem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voting System</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a voting system" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fibonacci">Fibonacci</SelectItem>
                  <SelectItem value="t-shirt">T-Shirt</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
