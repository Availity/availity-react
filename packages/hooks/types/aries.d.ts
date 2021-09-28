export interface AriesHookBase {
  data: {
    totalCount: number;
    count: number;
    offSet: number;
    links: {
      next: { href: string };
      last: { href: string };
      self: { href: string };
    };
  };
}
