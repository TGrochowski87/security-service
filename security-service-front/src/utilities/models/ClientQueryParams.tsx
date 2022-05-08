export default interface ClientQueryParams {
  responseType: string;
  clientId: string;
  redirectUrl: string;
  scopes: string[];
  state: string;
}
