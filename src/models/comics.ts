export type Image = { path: string; extension: string };

export type Comic = { images: Image[]; title: string; id: number, _id: string };

export type Comics = Comic[];