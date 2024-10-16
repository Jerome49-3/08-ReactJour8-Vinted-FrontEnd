/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CookieConsent from "react-cookie-consent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//components
import Image from '../components/Image'
import Hero from '../components/Hero'
import Loading from '../components/Loading';

//images
import noImg from '../assets/images/no-image.jpg'


const Home = ({ search, faHeart, farHeart }) => {
  // console.log('search in Home:', search);
  const [data, setData] = useState();
  // console.log('data in /Home:', data);
  const [isLoading, setIsLoading] = useState(true);
  // const [imgsNbr, setImgsNbr] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://site--vintedbackend--s4qnmrl7fg46.code.run/offers?title=${search}`);
        // const response = await axios.get(`http/localhost:3000/offers?title=${search}`);
        // console.log('response:', response);
        if (response.data) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetchData();
  }, [search]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <Hero />
      <div className="wrapper">
        <div className="boxArticles">
          {data.map((article, key = article._id) => {
            console.log('article:', article);
            return (
              <>
                <Link to={`/offers/${article._id}`} key={key} article={article} className={article.offer_solded === true && 'hide'}>
                  <article>
                    <div className='boxUser'>
                      {article.owner.account.avatar.secure_url ? (
                        <>
                          <Image src={article.owner.account.avatar.secure_url} alt="avatar" classImg='imgAvatar' />
                        </>
                      ) : (<Image src={article.owner.account.avatar} alt="avatar" classImg='imgAvatar' />)}
                      <h5>{article.owner.account.username}</h5>
                    </div>
                    <div className='boxImgArticle'>
                      {article.product_image ? (<Image src={article.product_image.secure_url} classImg='imgArticle' />) : article.product_pictures ? (<>
                        {article.product_pictures.map((images, index) => {
                          // console.log('images:', images);
                          return (
                            <>
                              {index === 0 ? (<Image src={images.secure_url} classImg='imgArticle' key={index} />) : (null)}
                            </>
                          )
                        })}
                      </>) : (<Image src={noImg} alt='no image' />)}
                    </div>
                    <button className="boxHearth">
                      <FontAwesomeIcon icon={faHeart} className='hide' />
                      <FontAwesomeIcon icon={farHeart} />
                    </button>
                    <div className="footerArticle">
                      <div>{article.product_details[0].MARQUE}</div>
                      <div className='description'>{(article.product_price).toFixed(2)} €</div>
                    </div>
                  </article >
                </Link >
              </>
            )
          })}
        </div>
        <CookieConsent
          location="bottom"
          buttonText="Sure Bro !"
          cookieName="VintedAppCookiesAccept"
          expires={150}
        >
          This website uses cookies only to enhance the user experience and not for advertising purposes.{" "}
        </CookieConsent>
      </div >
    </>
  );
}

export default Home