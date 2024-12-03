export interface Script {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  path: string;
  show: boolean;
  star: boolean;
  order: number;
}
