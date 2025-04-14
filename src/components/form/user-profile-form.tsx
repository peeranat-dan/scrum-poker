import { type UserProfileInput } from "@/types/schema.types";
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

interface UserProfileFormProps {
  form: UseFormReturn<UserProfileInput>;
  onSubmit: (data: UserProfileInput) => void;
}

export default function UserProfileForm({
  form,
  onSubmit,
}: Readonly<UserProfileFormProps>) {
  const { formState } = form;
  const { isSubmitting } = formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="displayName"
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
          Save
        </Button>
      </form>
    </Form>
  );
}
