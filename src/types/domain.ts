interface User {
  id: number;
  nickname: string;
  email: string;
  role: string;
  country: string;
  profileUrl: string;
  provider: string;
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
