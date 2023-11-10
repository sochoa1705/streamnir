export interface IGalleryService {
  Code: EGalleryCode,
  Name: string,
  Status: boolean,
  Images: IGalleryImage[]
}

export interface IGalleryImage {
  PathImage: string,
  RedirectLink: string,
  NameImage: string
}

export enum EGalleryCode {
	slider_destacados = 'SLIDER_DESTACADOS',
	slider_destacados2 = 'SLIDER_DESTACADOS2',
	banners_destacados = 'BANNERS_DESTACADOS',
	banners_corporativos = 'BANNERS_CORPORATIVO',
	banner_principal = 'BANNER_PRINCIPAL',
	banner_principal_mobile = 'BANNER_PRINCIPAL_MOBILE',
	banner_tus_datos_cp = 'TUS_DATOS',
	banner_events_cp = 'EVENTOS'
}
