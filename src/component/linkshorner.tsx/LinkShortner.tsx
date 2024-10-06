

// import React, { useEffect, useState } from 'react';
// import { FaSpinner, FaCopy } from 'react-icons/fa';
// import exampleImage from '../../assets/slink.svg'; // Replace with the correct path to your image
// import { api_client } from '../../axios';

// const ShortURLGenerator: React.FC = () => {
//   const [link, setLink] = useState('');
//   const [shortenedLink, setShortUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleShortenLink = async (e:any) => {
//     e.preventDefault();
//     setLoading(true);
//     if(link.length>5){
 
       
//         try {
//           const response = await api_client.post('http://localhost:5000/shorten', { originalUrl: link });
//           console.log(response.data.shortUrl);
          
//           setShortUrl(`http://localhost:5000/${response.data.shortUrl}`);
//           setLink(`http://localhost:5000/${response.data.shortUrl}`)
//         } catch (err) {
//           console.error('Error shortening URL', err);
     
//       };
//     }else{
//         setLoading(false);
//     }
   
//   };
//   useEffect(()=>{
//     if(link==''){
//       setShortUrl('')
//     }
//   },[link])
  
//   const handleCopy = () => {
//     navigator.clipboard.writeText(shortenedLink);
//     setLink('')
//     alert('Link copied to clipboard!');
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="p-8 rounded-lg max-w-7xl w-full flex justify-evenly">
//         <div className="w-1/2 p-4 flex flex-col">
//           <div className="mb-6">
//             <span className="inline-block bg-blue-100 dark:bg-black dark:border-[blue] border text-blue-500 rounded-full px-3 py-1 text-sm font-semibold mr-2">Easy link shortening</span>
//           </div>
//           <h1 className="text-3xl font-bold mb-4">RX short URL & QR code generator</h1>
//           <p className="text-gray-500 mb-8">A short link allows you to collect so much data about your customers & their behaviors.</p>
//           <div className="flex mb-4">
//             <input
//               type="text"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="border border-gray-300 dark:border-[blue] dark:bg-black rounded-l-lg px-4 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-[blue]"
//               placeholder="Paste a link to shorten it"
//               disabled={loading}
//             />
//             {shortenedLink ? (
//               <button
//                 onClick={handleCopy}
//                 className="bg-[blue] text-white rounded-r-lg px-4 py-2 hover:bg-[blue] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
//               >
//                 <FaCopy className="mr-2" /> Copy
//               </button>
//             ) : (
//               <button
//                 onClick={handleShortenLink}
//                 className="bg-[blue] text-white rounded-r-lg px-4 py-2 hover:bg-[blue] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
//                 disabled={loading}
//               >
//                 {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Shorten'}
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="w-1/2 p-4 flex justify-center items-center w-[35%]">
//           <img src={exampleImage} alt="Description of the image" className="max-w-full h-auto rounded-lg" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShortURLGenerator;

import React, { useEffect, useState } from 'react';
import { FaSpinner, FaCopy } from 'react-icons/fa';
import exampleImage from '../../assets/slink.svg'; // Replace with the correct path to your image
import { api_client } from '../../axios';

// A utility function to validate the URL format
const validateUrl = (url: string) => {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*)$/;
  return regex.test(url);
};

const ShortURLGenerator: React.FC = () => {
  const [link, setLink] = useState('');
  const [shortenedLink, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShortenLink = async (e: any) => {
    e.preventDefault();
    setError(''); // Reset any previous error
    setLoading(true);

    // Basic validation: Check length and if the URL is valid
    if (link.length < 5) {
      setError('URL is too short. Please enter a valid URL.');
      setLoading(false);
      return;
    }

    const validUrlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    if (!validUrlRegex.test(link)) {
      setError('Please enter a valid URL, including http:// or https://');
      setLoading(false);
      return;
    }

    try {
      // Ensure the URL has the proper protocol (http or https)
      let validLink = link;
      if (!link.startsWith('http://') && !link.startsWith('https://')) {
        validLink = `http://${link}`;
      }

      const response = await api_client.post(`${import.meta.env.VITE_API_URL}/shorten`, { originalUrl: validLink });
      const shortUrl = `${import.meta.env.VITE_API_URL}/${response.data.shortUrl}`;
      
      setShortUrl(shortUrl);
      setLink(shortUrl);
      setLoading(false);
    } catch (err) {
      console.error('Error shortening URL', err);
      setError('Failed to shorten the URL. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (link === '') {
      setShortUrl('');
    }
  }, [link]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedLink);
    setShortUrl('')
    setLink('')
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 rounded-lg max-w-7xl w-full flex justify-evenly">
        <div className="w-1/2 p-4 flex flex-col">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 dark:bg-black dark:border-[blue] border text-blue-500 rounded-full px-3 py-1 text-sm font-semibold mr-2">
              Easy link shortening
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">RX short URL & QR code generator</h1>
          <p className="text-gray-500 mb-8">
            A short link allows you to collect so much data about your customers & their behaviors.
          </p>
          <form onSubmit={handleShortenLink} className="flex mb-4">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={`border ${
                error ? 'border-red-500' : 'border-gray-300'
              } dark:border-[blue] dark:bg-black rounded-l-lg px-4 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-[blue]`}
              placeholder="Paste a link to shorten it"
              disabled={loading || shortenedLink.length > 0}
            />
            {shortenedLink ? (
              <button
                type="button"
                onClick={handleCopy}
                className="bg-[blue] text-white rounded-r-lg px-4 py-2 hover:bg-[blue] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                <FaCopy className="mr-2" /> Copy
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[blue] text-white rounded-r-lg px-4 py-2 hover:bg-[blue] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Shorten'}
              </button>
            )}
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {/* {shortenedLink && (
            <div className="mt-4">
              <p className="text-blue-500">Your shortened link:</p>
              <a href={shortenedLink} target="_blank" rel="noopener noreferrer" className="text-[blue] underline">
                {shortenedLink}
              </a>
            </div>
          )} */}
        </div>
        <div className="w-1/2 p-4 flex justify-center items-center w-[35%]">
          <img src={exampleImage} alt="Description of the image" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ShortURLGenerator;
