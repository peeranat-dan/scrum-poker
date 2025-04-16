import { type SessionInformationInput } from "@/types/schema.types";
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save
        </Button>
      </form>
    </Form>
  );
}
