import { ResponsiveImageType } from 'react-datocms';

export type Side = {
  abbr: string;
  name: string;
  logo: {
    responsiveImage: ResponsiveImageType;
  };
  introduction: string;
  visibility: boolean;
};
