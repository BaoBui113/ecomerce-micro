type Create = (data: any) => Promise<{}>;
type Get = (id: number) => Promise<{}>;
type Delete = (id: number) => Promise<{}>;
type Update = (id: number, data: any) => Promise<{}>;

export interface CartRepositoryType {
  create: Create;
  get: Get;
  delete: Delete;
  update: Update;
}
