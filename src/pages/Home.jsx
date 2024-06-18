import Hero from '../components/Hero'
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import Image from '../components/Image'
import avatar from '../assets/images/Avatarme.png'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = (search) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const url1 = `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url1)
        // const response = await axios.get(import.meta.env.URL_API_OFFER);
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [search]);

  console.log('data:', data)
  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <Hero />
      <div className="wrapper">
        <div className="boxArticles">
          {data.offers.map((article, key = article._id) => {
            console.log('article:', article)
            return (
              <>
                <Link to={`/offer/${article._id}`} key={key} article={article}>
                  <article>
                    <div className='boxUser'>
                      {article.owner.account.avatar && (
                        <>
                          <Image src={article.owner.account.avatar.secure_url} alt="avatar" classImg='imgAvatar' />
                        </>
                      )}
                      <div>{article.owner.account.username}</div>
                    </div>
                    {/* {console.log('article.product_picture:', '\n', article.product_picture, 'article.product_picture:', article.product_picture)} */}
                    <div className='boxImgArticle'>
                      {article.product_image ? (<Image src={article.product_image} />) : (undefined)}
                      {article.product_pictures ? (<>{article.product_pictures.map((images, key = index) => {
                        console.log('images:', images);
                        return (
                          <Image src={images.secure_url} classImg='imgsArticle' key={key} />
                        )
                      })}</>) : (null)}
                    </div>
                    <div>{article.product_name}</div>
                    <div>{article.product_description}</div>
                  </article >
                </Link >
              </>
            )
          })}
        </div>
      </div >
    </>
  );
}

export default Home