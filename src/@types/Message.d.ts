export default interface MessageInterface {
  _id: string;
  name: string;
  email: string;
  subject: string[];
  content: string;
  read: boolean;
  answered: boolean;
  opt_in: boolean;
}
