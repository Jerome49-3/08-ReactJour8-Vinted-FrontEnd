import Hero from '../components/Hero'
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import Image from '../components/Image'
import avatar from '../assets/images/Avatarme.png'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`)
        const response = await axios.get(import.meta.env.VITE_REACT_APP_URL_LOCALHOST);
        // console.log('response:', response);
        setData(response.data);
        // console.log('data inside useEffect in Home:', data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
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
            // console.log('article:', article);
            return (
              <>
                <Link to={`/offers/${article._id}`} key={key} article={article}>
                  <article>
                    <div className='boxUser'>
                      {article.owner.account.avatar.secure_url ? (
                        <>
                          <Image src={article.owner.account.avatar.secure_url} alt="avatar" classImg='imgAvatar' />
                        </>
                      ) : (<Image src={article.owner.account.avatar} alt="avatar" classImg='imgAvatar' />)}
                      <div>{article.owner.account.username}</div>
                    </div>
                    <div className='boxImgArticle'>
                      {article.product_image ? (<Image src={article.product_image.secure_url} />) : (null)}
                      {article.product_pictures ? (<>{article.product_pictures.map((images, key = index) => {
                        // console.log('images:', images);
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