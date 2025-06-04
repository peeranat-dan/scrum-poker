import { Icons } from '@/components/icons/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth';

export default function AccountSettings() {
  const { user, linkWithGoogle } = useAuth();

  if (!user) {
    throw new Error('Account is needed!');
  }

  if (user.isAnonymous) {
    return (
      <Button onClick={linkWithGoogle}>
        <Icons.Google />
        Link with Google
      </Button>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <Avatar className='size-12'>
        <AvatarImage src={user.providerData?.[0].photoURL ?? ''} />
        <AvatarFallback>{user.providerData?.[0].displayName?.[0] ?? 'E'}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <p className='font-semibold'>{user.providerData?.[0].displayName}</p>
        <p className='text-muted-foreground'>{user.providerData?.[0].email}</p>
      </div>
    </div>
  );
}
