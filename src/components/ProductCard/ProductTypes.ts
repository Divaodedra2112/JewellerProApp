export interface Product {
  id: number;
  productCode: string;
  productName: string;
  images: string[];
  product: string;
  category: {
    name: string;
  };
  image: any;
  sampleText: string;
  sampleIcon: any;
  isSample?: boolean;
  sampleQuantity?: number;
  measurement?: {
    name: string;
  };
}
