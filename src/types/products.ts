export interface IProducts {
  productUId: number;
  productCode: string;
  productName: string;
  productDescription: string;
  manufactureCode: string;
  manufactureName: string;
  manufactureDescription: string;
  cartonQty: number;
  available: boolean;
}

export interface IProduct {
  productUId?: number;
  productCode: string;
  productName: string;
  productDescription: string;
  manufactureCode: string;
  manufactureName: string;
  manufactureDescription: string;
  cartonQty: number;
  available: boolean;
}
