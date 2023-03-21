import React from 'react';
import ButtonLading from '../Buttons/ButtonLading';
import TheHeader from '../TheHeader';
import LadingImage from '../../assets/images/lading-image.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

const TheHome = () => {
  const router = useRouter();

  return (
    <div className="h-full bg-main md:pl-14 md:pr-14 pt-10 pb-12 pl-5 pr-5">
      <TheHeader />
      <div className="lg:flex justify-between gap-5 items-center mt-28">
        <div>
          <h1 className="font-poppins text-center lg:text-start text-violet-700 text-6xl font-semibold capitalize mb-4">
            TaskBlog
          </h1>
          <p className="font-roboto text-center lg:text-start font-semibold text-white text-xl">
            Comece a organizar suas tarefas de uma maneira prática
          </p>
          <div
            className="mt-12 md:mt-16 text-center lg:text-start"
            onClick={() => router.push('/login')}
          >
            <ButtonLading outline={false} text={'Entrar'} />
          </div>
        </div>
        <div className="max-w-landingImage hidden lg:block">
          <Image src={LadingImage} alt="Landing page image" />
        </div>
      </div>
      <div className="grid place-items-center mt-28 border-solid border-b-2 border-b-white pb-16">
        <div className="border-solid border-t-2 border-t-white w-80" />
        <div>
          <h2 className="font-poppins text-center text-white text-xl mt-8 mb-8 font-semibold">
            Porque usar o taskBlog?
          </h2>
          <ul className="grid gap-4">
            <li className="text-center font-roboto text-base text-gray-400 font-normal">
              1 - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae rem id aliquid numquam tempore.
            </li>
            <li className="text-center font-roboto text-base text-gray-400 font-normal">
              2 - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Ipsum debitis possimus, illum aperiam enim magni?
            </li>
            <li className="text-center font-roboto text-base text-gray-400 font-normal">
              3 - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="font-poppins text-white text-4xl font-semibold capitalize  text-center mt-12">
          TaskBlog
        </h1>
      </div>
    </div>
  );
};

export default TheHome;
