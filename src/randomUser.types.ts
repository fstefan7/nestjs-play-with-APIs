export interface RandomUserAPIResponse {
  results: RandomUser[];
}

export interface RandomUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
  };
}
