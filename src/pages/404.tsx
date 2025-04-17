import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center bg-background p-6 w-full">
      <Card className="w-full max-w-md text-center">
        <CardContent className="space-y-4">
          <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
          <CardDescription>
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
          <Button onClick={() => navigate("/")} className="w-full">
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
