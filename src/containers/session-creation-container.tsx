import SessionCreationForm from "@/components/form/session-creation-form";
import {
  type CreateSessionInput,
  CreateSessionSchema,
} from "@/types/schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SessionCreationContainer() {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      name: "",
      votingSystem: "fibonacci",
    },
  });

  const onSubmit = (data: CreateSessionInput) => {
    console.log(data);
  };

  return <SessionCreationForm form={form} onSubmit={onSubmit} />;
}
