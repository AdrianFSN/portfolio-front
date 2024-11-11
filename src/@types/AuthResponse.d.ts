interface AuthData {
  token: string;
}

export default interface AuthResponseInterface {
  state: string;
  message: string;
  data: AuthData;
}
