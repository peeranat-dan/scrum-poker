import { Icons } from '@/components/icons/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/auth';
import { Loader2 } from 'lucide-react';

// TODO: Rename this container
export default function UserInformationPanel() {
  const { loading: isLoading, signInWithGoogle, user, signOut } = useAuth();

  if (isLoading) {
    return <Loader2 className='text-primary animate-spin' />;
  }

  if (!user) {
    return (
      <Button onClick={signInWithGoogle}>
        <Icons.Google />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='size-9'>
          <AvatarImage src={user.photoURL ?? ''} />
          <AvatarFallback>{user.displayName?.[0] ?? 'E'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
