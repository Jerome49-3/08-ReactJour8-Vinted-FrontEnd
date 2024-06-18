import axios from 'axios'
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import Image from '../components/Image'
import avatar from '../assets/images/Avatarme.png'
import { Link, useParams } from 'react-router-dom';

//components
import Hero from '../components/Hero';

const Offer = () => {
  let id = useParams();
  id = id.id
  console.log('id1', id)
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('id2', id)
    const fetchData = async () => {
      try {
        const response = await axios.get(`  https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`)
        // const response = await axios.get(import.meta.env.URL_API_OFFER);
        console.log('response:', response);
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
          <article>
            <div className='boxUser'>
              {data.owner.account.avatar && (
                <>
                  <Image src={data.owner.account.avatar.secure_url} alt="avatar" classImg='imgAvatar' />
                </>
              )}
              <div>{data.owner.account.username}</div>
            </div>
            <div className='boxImgArticle'>
              {data.product_image ? (<Image src={data.product_image} />) : (undefined)}
              {data.product_pictures ? (<>{data.product_pictures.map((images, key = index) => {
                console.log('images:', images);
                return (
                  <Image src={images.secure_url} classImg='imgsArticle' key={key} />
                )
              })}</>) : (null)}
            </div>
            <div>{data.product_name}</div>
            <div>{data.product_description}</div>
          </article >
        </div>
      </div >
    </>
  );

}

export default Offer