

import React, { useEffect, useState } from 'react';
import { FaSpinner, FaCopy } from 'react-icons/fa';
import exampleImage from '../../assets/slink.svg'; // Replace with the correct path to your image
import { api_client } from '../../axios';

const ShortURLGenerator: React.FC = () => {
  const [link, setLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShortenLink = async () => {
    setLoading(true);
    if(link.length>5){
 // Mock API call to shorten the link
        // const shortLink:any = await api_client.get(`https://shrtco.de/v2/shorten?url=${link}`)
        const shortLink:any =  await api_client.get(
            `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`
          );
        setShortenedLink(shortLink);
        setLink(shortLink);
        setLoading(false);
    }else{
        setLoading(false);
    }
   
  };
  useEffect(()=>{
    if(link==''){
        setShortenedLink('')
    }
  },[link])
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedLink);
    setLink('')
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 rounded-lg max-w-7xl w-full flex justify-evenly">
        <div className="w-1/2 p-4 flex flex-col">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 dark:bg-black dark:border-[blue] border text-blue-500 rounded-full px-3 py-1 text-sm font-semibold mr-2">Easy link shortening</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">RX short URL & QR code generator</h1>
          <p className="text-gray-500 mb-8">A short link allows you to collect so much data about your customers & their behaviors.</p>
          <div className="flex mb-4">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 dark:border-[blue] dark:bg-black rounded-l-lg px-4 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-[blue]"
              placeholder="Paste a link to shorten it"
              disabled={loading}
            />
            {shortenedLink ? (
              <button
                onClick={handleCopy}
                className="bg-[blue] text-white rounded-r-lg px-4 py-2 hover:bg-[blue] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                <FaCopy className="mr-2" /> Copy
              </button>
            ) : (
              <button
                onClick={handleShortenLink}
                className="bg-[blue] text-white rounded-r-lg px-4 py-2 hover:bg-[blue] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Shorten'}
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2 p-4 flex justify-center items-center w-[35%]">
          <img src={exampleImage} alt="Description of the image" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ShortURLGenerator;

