import { Article } from "./article";
export class Tag {
  public _id: string;
  public name: Text;
  public description: Text;
  public articles: Article[];
}
