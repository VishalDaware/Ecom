export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number; 
  discountPercent?: number; 
  ratingValue: number;
  ratingCount: number;
  isHot: boolean;
  colors: string[]; 
  category: string;
  imageUrl: string;
}
// This is a test comment to force a change