import { type JoinSessionInput } from "@/types/schema.types";
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

interface SessionJoinFormProps {
  onSubmit: (data: JoinSessionInput) => void;
  form: UseFormReturn<JoinSessionInput>;
}

export default function SessionJoinForm({
  form,
  onSubmit,
}: Readonly<SessionJoinFormProps>) {
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
              <FormLabel>Your Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Michael Jackson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          Join Session
        </Button>
      </form>
    </Form>
  );
}
