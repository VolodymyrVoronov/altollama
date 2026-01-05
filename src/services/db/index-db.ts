import Dexie, { type Table } from "dexie";

import type { ImageItem } from "@/types";

export class MyDatabase extends Dexie {
  images!: Table<ImageItem>;

  constructor() {
    super("alt-text-generator-2-index-db-store");
    this.version(1).stores({
      images: "++id, name, createdAt, image_alt_text, blob, type, file",
    });
  }
}

export const db = new MyDatabase();
