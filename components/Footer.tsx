export function Footer() {
  return (
    <div className='bg-black border-t-8 border-solid border-gray-500 py-16 flex justify-center xl:h-96'>
      <div className='flex flex-col xl:flex-row w-2/3 justify-evenly h-fit'>
        <Button text='浏览游戏' />
        <Button text='支持我们' />
        <Button text='问题反馈' />
      </div>
    </div>
  );
}

function Button({ text }: { text: string }) {
  return <button className='bg-gray-500 text-white text-3xl px-8 2xl:px-16 py-8 my-2'>{text}</button>;
}
