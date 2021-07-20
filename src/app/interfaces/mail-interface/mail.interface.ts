export interface IMailText {
  to: string | Array<string>,
  from?: string,
  subject: string,
  text: string | Buffer;
  html?: string | Buffer;
}

export interface IMailPlatforme {
  to: string,
  from?: string,
  subject: string,
  template: string,
  text: string | Buffer;
  html?: string | Buffer;
  context?: any,
}
