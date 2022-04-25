export interface IGalleryService {
    Code: EGalleryCode,
    Name: string,
    Status: boolean,
    Images: IGalleryImage[]
  }

  export interface IGalleryImage {
    PathImage:string,
    RedirectLink:string,
    NameImage:string
  }

export enum EGalleryCode {
    slider_destacados= "SLIDER_DESTACADOS",
    banners_destacados= "BANNERS_DESTACADOS",
    banners_corporativos= "BANNERS_CORPORATIVO",
} 