interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

interface Tour {
  id: string;
  title: string;
  address: string;
  first_image: string;
  homepage: string;
  map_x: string;
  map_y: string;
  overview: string;
}

export { User, Tour };
