export interface Client {
  id: string;
  name: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string[];
}
export const Clients: Client[] = [
  {
    id: '111111a1',
    name: 'Joe',
    lastName: 'Dou',
  },
  {
    id: '22222w2',
    name: 'Patrick',
    lastName: 'White',
  },
  {
    id: '3333e333',
    name: 'Will',
    lastName: 'Smiht',
  },
];
