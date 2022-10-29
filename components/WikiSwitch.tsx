import { ImplementedSides, WipSides } from '@/util/side';
import Image from 'next/legacy/image';
import Link from 'next/link';

export type WikiSwitchProps = {
  navigation: {
    url: string;
    image: string;
  }[];
};

export function WikiSwitch() {
  return (
    <div className='flex justify-evenly my-4'>
      {ImplementedSides.map(n => (
        <Link href={'/wiki/' + n.nameEnAbbr} key={n.nameEnAbbr}>
          <a className='bg-black py-4 px-12 rounded-lg -skew-x-theme'>
            <Image src={n.icon.x128!} width={120} height={120} alt='' layout='fixed' className='skew-x-theme'></Image>
          </a>
        </Link>
      ))}
      {WipSides.map(side => (
        <div className='bg-black py-4 px-12 rounded-lg -skew-x-theme' key={side.nameEnAbbr}>
          <div className='skew-x-theme h-[120px] w-[120px] flex justify-center items-center'>
            <div className='text-white text-[8rem] select-none'>?</div>
          </div>
        </div>
      ))}
    </div>
  );
}
