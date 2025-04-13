import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => toast("Hello World")}>Click me</Button>
    </div>
  );
}
