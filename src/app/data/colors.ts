export interface Color {
  name: string;
  primary: string;
  secondary: string;
  secondaryText: string;
}
export const Colors: Record<string, Color> = {
  red: {
    name: 'Rojo',
    primary: '#ad2121',
    secondary: '#FAE3E3',
    secondaryText: '#000',
  },
  blue: {
    name: 'Azul',
    primary: '#1e90ff',
    secondary: '#D1E8FF',
    secondaryText: '#000',
  },
  yellow: {
    name: 'Amarillo',
    primary: '#e3bc08',
    secondary: '#FDF1BA',
    secondaryText: '#000',
  },
  purple: {
    name: 'Morado',
    primary: '#673ab7',
    secondary: '#dfcdff',
    secondaryText: '#000',
  },
  green: {
    name: 'Verde',
    primary: '#73b156',
    secondary: '#dcffcc',
    secondaryText: '#000',
  },
};
