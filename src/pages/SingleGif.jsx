import React, { useEffect, useState } from 'react';
import { GifState } from '../context/Context';
import { useParams } from 'react-router-dom';
import Gif from '../components/Gif';
import { HiMiniChevronUp, HiMiniChevronDown, HiMiniHeart } from 'react-icons/hi2';
import FollowOn from '../components/FollowOn';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import { IoCodeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  WhatsappIcon
} from 'react-share';

const contentType = ["gifs", "stickers", "texts"];

function SingleGif() {
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  const { type, slug } = useParams();
  const { gf, addToFavorites, favorites } = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], { limit: 10 });

    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, [slug]);

  const shareGif = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const embedGif = () => {
    const embedCode = `<iframe src="${gif.url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="${gif.url}">via GIPHY</a></p>`;

    navigator.clipboard.writeText(embedCode).then(() => {
      alert('Embed code copied to clipboard!');
    });

    return (
      <div>
        <input type="text" value={embedCode} readOnly className="embed-code-input" />
        <button onClick={() => setShowEmbedCode(!showEmbedCode)}>
          {showEmbedCode ? 'Hide Embed Code' : 'Show Embed Code'}
        </button>
        {showEmbedCode && <pre>{embedCode}</pre>}
      </div>
    );
  };

  return (
    <div className='grid grid-cols-4 my-10 gap-4'>
      <div className='hidden sm:block'>
        {gif?.user && (
          <>
            <div className='flex gap-1'>
              <img 
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-14'/>
                <div className='px-2'>
                    <div className='font-bold'>{gif?.user?.display_name}</div>
                    <div className='faded-text'> @{gif?.user?.username}</div>
                </div>
            </div>
            {gif?.user?.description && (
              <p className='py-4 whitespace-pre-line'>{readMore ? gif?.user?.description : gif?.user?.description.slice(0,100) + "..."}
                  <div className='flex items-center faded-text cursor-pointer'
                       onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? (
                      <>
                        Read less <HiMiniChevronUp size={20}/>
                      </>
                    ) : (
                      <>
                        Read more <HiMiniChevronDown size={20}/>
                      </>
                    )}
                  </div>
              </p>
            )}
          </>
        )}

        <FollowOn />
        <div className='divider' />

        {gif?.source && (
          <div>
            <span className='faded-text'>Source</span>
            <div className='flex items-center text-sm font-bold gap-1'>
              <HiOutlineExternalLink size={25}/>
              <a href={gif.source} target='_blank' className='turncate'>{gif.source}</a>
            </div>
          </div>
        )}
      </div>

      <div className='col-span-4 sm:col-span-3'>
        <div className='flex gap-6'>
          <div className='w-full sm:w-3/4'>
              <div className='faded-text truncate mb-2'>{gif.title}</div>
              <Gif gif={gif} />

              {/* mobile UI */}
              <div className='flex sm:hidden gap-1'>
              <img 
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-14'/>
                <div className='px-2'>
                    <div className='font-bold'>{gif?.user?.display_name}</div>
                    <div className='faded-text'> @{gif?.user?.username}</div>
                </div>
              </div>

              <button className='ml-auto' onClick={shareGif}>
                <FaPaperPlane size={25}/>
              </button>
          </div>
          
          <div className='hidden sm:flex flex-col gap-5 mt-6'>
            <button 
              onClick={() => addToFavorites(gif.id)}
              className='flex gap-5 items-center font-bold text-lg'>
                  <HiMiniHeart size={30} className={`${favorites.includes(gif.id) ? "text-red-500" : ""}`}/>
                  Favorite
            </button>

            <div className='flex gap-6 items-center font-bold text-lg'>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <RedditShareButton url={window.location.href}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <button onClick={embedGif} className='flex gap-5 items-center font-bold text-lg'>
              <IoCodeSharp size={30}/>
              Embed
            </button>
            
          </div>
        </div>

        <div>
          <span className='font-extrabold'>Related GIFs</span>
          <div className='columns-2 md:columns-3 gap-2'>
            {relatedGifs.slice(1).map((gif) => (
              <Link to={`/${gif.type}s/${gif.slug}`} key={gif.id}>
              <Gif gif={gif} key={gif.id}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGif;
