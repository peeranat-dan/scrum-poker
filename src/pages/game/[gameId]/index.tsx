import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh w-full">
      <Button onClick={() => toast("Hello World")}>Click me</Button>
    </div>
  );
}
