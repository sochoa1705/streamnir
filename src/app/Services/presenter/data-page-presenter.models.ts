export interface IGalleryService {
    Code: EGalleryCode,
    Name: string,
    Status: boolean,
    Images: IGalleryImage[]
  }

  export interface IGalleryImage {
    PathImage:string,
    RedirectLink:string
  }

export enum EGalleryCode {
    slider_destacados= "SLIDER_DESTACADOS",
    banners_destacados= "BANNERS_DESTACADOS"
} 