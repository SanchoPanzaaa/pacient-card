export interface NavItem {
  id: string;
  title: string;
  icon?: string;
  roles?: [];
  url: string;
}

export const NavigationMain: NavItem[] = [
  { id: '1', title: 'Zoznam pacientov', roles: [], url: '/client-list', icon: 'view_list'},
  { id: '2', title: 'Vytvor kartu pacienta', roles: [], url: '/client-create', icon: 'add'},
  { id: '3', title: 'Logout', roles: [], url: '/login', icon: ''},
]
