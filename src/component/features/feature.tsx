import React, { useState } from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { MdOutlineSecurity } from "react-icons/md";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}
const Feature: React.FC<FeatureProps> = ({ icon, title, description, isSelected, onClick }) => {
  const navigator =useNavigate()
  return (
    <div 
      className={`flex flex-col items-center p-4  rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected ? 'border-2 border-[blue] ' : ' border border-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-center">{description}</p>

      <button onClick={()=>navigator('/password')} className='py-1  px-4 rounded-lg mt-5 border border-black dark:border-white dark:text-white  text-black'> <small>Click </small></button>
    </div>
  );
};

const FeatureList: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <MdOutlineSecurity />,
      title: 'Password Creator',
      description: 'Highly secure encryption algorithms and human integrity checks to protect you.',
    },
    {
      icon: <TiWeatherPartlySunny />,
      title: 'Weather',
      description: 'Start accepting your customers\' preferred payment methods and grow your business.',
    },
    {
      icon: <BiSolidMessageSquareError />,
      title: 'About',
      description: 'Start accepting your customers\' preferred payment methods and grow your business.',
    },
  ];

  return (
    <div className=' flex justify-center w-full h-[300px] '>
    <div className="flex justify-center items-center w-3/4 space-x-4 ">
      {features.map((feature, index) => (
        <Feature
          key={index}
          {...feature}
          isSelected={selectedFeature === index}
          onClick={() => {
            setSelectedFeature(index);
           
            }}
        />

      ))}
    </div>
    </div>
  );
};

export default FeatureList;