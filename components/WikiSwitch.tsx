import Image from 'next/image';
import Link from 'next/link';

export type WikiSwitchProps = {
  navigation: {
    url: string;
    image: string;
  }[];
};

export function WikiSwitch({ navigation }: WikiSwitchProps) {
  const fakeCount = 5 - navigation.length;

  return (
    <div className='flex justify-evenly my-4'>
      {navigation.slice(0, 5).map(n => (
        <Link href={n.url} key={n.url}>
          <a className='bg-black py-4 px-12 rounded-lg -skew-x-theme'>
            <Image src={n.image} width={120} height={120} alt='' layout='fixed' className='skew-x-theme'></Image>
          </a>
        </Link>
      ))}
      {fakeCount > 0 &&
        '1'
          .repeat(fakeCount)
          .split('')
          .map((_, i) => (
            <div className='bg-black py-4 px-12 rounded-lg -skew-x-theme' key={i}>
              <div className='skew-x-theme h-[120px] w-[120px] flex justify-center items-center'>
                <div className='text-white text-[8rem] select-none'>?</div>
              </div>
            </div>
          ))}
    </div>
  );
}
