export interface ISize {
	mobile: string;
	tablet: string;
	desktop: string;
}

export enum ESize {
	MOBILE = 'mobile',
	TABLET = 'tablet',
	DESKTOP = 'desktop'
}

export const size: ISize = {
	mobile: '768px',
	tablet: '1024px',
	desktop: '1200px'
};

export const device = {
	mobile: `only screen and (max-width: 767px)`,
	tablet: `only screen and (min-width: 768px) and (max-width: 1023px)`,
	desktop: `only screen and (min-width: 1024px)`
};
