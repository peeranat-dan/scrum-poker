import { type CreateSessionInput } from "@/types/schema.types";
import { Loader2 } from "lucide-react";
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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
                <Input placeholder="Planning Poker" {...field} />
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
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Create Session
        </Button>
      </form>
    </Form>
  );
}
