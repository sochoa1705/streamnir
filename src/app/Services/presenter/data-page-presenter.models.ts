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
  slider_destacados = "SLIDER_DESTACADOS",
  slider_destacados2 = "SLIDER_DESTACADOS2",
  banners_destacados = "BANNERS_DESTACADOS",
  banners_corporativos = "BANNERS_CORPORATIVO",
  banner_principal = "BANNER_PRINCIPAL",
  banner_principal_mobile = "BANNER_PRINCIPAL_MOBILE",
  banner_cita = "AGENDATUCITA",
  banner_destacados_1 = 'BANNERS_DESTACADOS_1',
  banner_destacados_2 = 'BANNERS_DESTACADOS_2',
  banner_destacados_3 = 'BANNERS_DESTACADOS_3',
  banner_destacados_tablet_1 = 'BANNERS_DESTACADOS_TABLET_1',
  banner_destacados_tablet_2 = 'BANNERS_DESTACADOS_TABLET_2',
  banner_destacados_tablet_3 = 'BANNERS_DESTACADOS_TABLET_3',
  banner_destacados_mobile_1 = 'BANNERS_DESTACADOS_MOBILE_1',
  banner_destacados_mobile_2 = 'BANNERS_DESTACADOS_MOBILE_2',
  banner_destacados_mobile_3 = 'BANNERS_DESTACADOS_MOBILE_3',
	banner_tus_datos_cp = 'TUS_DATOS'
} 