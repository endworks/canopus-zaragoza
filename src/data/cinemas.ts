import { CinemaData } from 'src/models/cinema.interface';

export const cinemas: CinemaData = {
  palafox: {
    name: 'Cines Palafox',
    address: 'Paseo de la Independencia, 12, 50004 Zaragoza',
    location: 'Zaragoza',
    source: 'https://www.cinespalafox.com/cartelera-cines-palafox.html'
  },
  aragonia: {
    name: 'Aragonia',
    address: 'Avenida de Juan Pablo II, 43, 50009 Zaragoza',
    location: 'Zaragoza',
    source: 'https://www.cinespalafox.com/cartelera-cines-aragonia.html'
  },
  cervantes: {
    name: 'Sala Cervantes',
    address: 'Calle Marqués de Casa Jiménez, 2, 50004 Zaragoza',
    location: 'Zaragoza',
    source: 'https://www.cinespalafox.com/cartelera-cine-cervantes.html'
  },
  grancasa: {
    name: 'Cinesa Grancasa',
    address: 'Calle de María Zambrano, 35, 50018 Zaragoza',
    location: 'Zaragoza',
    source: 'https://www.cinesa.es/Cines/Horarios/611/50011'
  },
  venecia: {
    name: 'Cinesa Puerto Venecia 3D',
    address: 'Tr.ª Jardines Reales, 7, 50021 Zaragoza',
    location: 'Zaragoza',
    source: 'https://www.cinesa.es/Cines/Horarios/1100/50011'
  }
};
