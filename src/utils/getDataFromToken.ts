import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  username: string;
  role: string;
  _id: string;
}

export default function decodeToken(token: string) {
  try {
    const decodedToken = jwtDecode<TokenPayload>(token);
    return decodedToken;
  } catch {
    throw new Error("Error decoding token");
  }
}
