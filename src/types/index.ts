export type Token = Promise<{
  token: string;
}>;

export type DeleteTweetResponse = Promise<{
  message: string;
}>;
