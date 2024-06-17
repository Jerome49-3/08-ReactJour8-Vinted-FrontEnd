import axios from 'axios'
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import Image from '../components/Image'
import avatar from '../assets/images/Avatarme.png'
import { Link, useParams } from 'react-router-dom';

//components
import Hero from '../components/Hero';

const Offer = () => {
  const id = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const url1 = `https://site--backendvintedapp--s4qnmrl7fg46.code.run/offer/${id}`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url1)
        // const response = await axios.get(import.meta.env.URL_API_OFFER);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id])
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
          {data.getOffer.map((article, key = getOffer._id) => {
            console.log('article:', article)
            return (
              <>
                <article key={key}>
                  <div className='boxUser'>
                    <div>
                      <Image src={avatar} alt="avatar" classImg='imgAvatar' />
                    </div>
                    <div>jerome</div>
                  </div>
                  {console.log('article.product_picture:', '\n', article.product_picture, 'article.product_picture:', article.product_picture)}
                  {article.product_image ? (<Image src={article.product_image} />) : (null)}
                  {article.product_pictures ? (<>{article.product_pictures.map((images, key = index) => {
                    console.log('images:', images);
                    return (
                      <>
                        <Image src={images.secure_url} classImg='imgsArticle' />
                      </>
                    )
                  })}</>) : (null)}
                  <div>{article.product_name}</div>
                  <div>{article.product_description}</div>
                </article >
              </>
            )
          })}
        </div>
      </div >
    </>
  );

}

export default Offer