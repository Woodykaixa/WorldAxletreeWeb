import { Side } from '@/dto/side';
import { Image as CmsImage } from 'react-datocms';
import Link from 'next/link';

export type WikiSwitchProps = {
  sides: Side[];
};

export function WikiSwitch({ sides = [] }: WikiSwitchProps) {
  const visibleSides = sides.filter(side => side.visibility);
  const invisibleSideName = sides.filter(side => !side.visibility).map(s => s.abbr);
  return (
    <div className='flex justify-evenly my-4'>
      {visibleSides.map(side => (
        <Link href={'/wiki/' + side.abbr} key={side.abbr} className='bg-black py-4 px-12 rounded-lg -skew-x-theme'>
          <CmsImage
            data={{
              ...side.logo.responsiveImage,
            }}
            className='skew-x-theme'
          />
        </Link>
      ))}

      {invisibleSideName.map(sideName => (
        <div className='bg-black py-4 px-12 rounded-lg -skew-x-theme' key={sideName}>
          <div className='skew-x-theme h-[120px] w-[120px] flex justify-center items-center'>
            <div className='text-white text-[8rem] select-none'>?</div>
          </div>
        </div>
      ))}
    </div>
  );
}
