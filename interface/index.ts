export interface ICategoryItem {
  id: string;
  title?: string | null;
}

export interface IAttributetypes {
  key?: string;
  dataType?: string;
  categoryId?: ICategoryItem['id'];
  // asDefaultTitle?:boolean
}

export interface IMachineItem {
  categoryId?: ICategoryItem['id'];
  title?: string;
  values: Record<string, any>;
  id?:string
}
