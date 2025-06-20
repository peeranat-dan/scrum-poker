import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useParticipant } from '@/providers/participant';
import { Settings2, Users2 } from 'lucide-react';
import { useState } from 'react';
import { type JSX } from 'react/jsx-runtime';
import AccountSettings from './game-settings/account-settings';
import GeneralSettings from './game-settings/general-settings';
import PlayersSettings from './game-settings/players-settings';

type SettingsModalItem = 'Players' | 'General' | 'Account';

const settingsModalContent: Record<SettingsModalItem, () => JSX.Element> = {
  General: GeneralSettings,
  Players: PlayersSettings,
  Account: AccountSettings,
};

const menus: {
  name: SettingsModalItem;
  icon: React.ComponentType;
  role: ('player' | 'admin' | 'owner')[];
}[] = [
  { name: 'General', icon: Settings2, role: ['owner'] },
  { name: 'Account', icon: Settings2, role: ['player', 'owner'] },
  { name: 'Players', icon: Users2, role: ['owner'] },
];

export default function GameSettingsModal() {
  const { participant } = useParticipant();

  const filteredMenus = participant?.role
    ? menus.filter((item) => item.role.includes(participant.role))
    : [];

  const [selected, setSelected] = useState<SettingsModalItem>(filteredMenus[0]?.name ?? 'General');

  const SettingsModalContent = settingsModalContent[selected];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='icon' variant='secondary'>
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]'>
        <DialogTitle className='sr-only'>Settings</DialogTitle>
        <DialogDescription className='sr-only'>Customize your settings here.</DialogDescription>
        <SidebarProvider className='items-start'>
          <Sidebar collapsible='none' className='hidden md:flex'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className='list-none'>
                    {filteredMenus.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive={selected === item.name}>
                          <button className='cursor-pointer' onClick={() => setSelected(item.name)}>
                            <item.icon />
                            <span>{item.name}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className='flex flex-1 flex-col overflow-hidden h-dvh md:h-[500px]'>
            <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <h2 className='text-lg font-semibold'>Settings</h2>
              </div>
            </header>
            <div className='flex h-full flex-1 flex-col gap-4 overflow-y-auto p-4'>
              <div className='block list-none md:hidden'>
                {filteredMenus.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={selected === item.name}>
                      <button onClick={() => setSelected(item.name)}>
                        <item.icon />
                        <span>{item.name}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
              <Separator className='bg-foreground block md:hidden' />
              <SettingsModalContent />
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
