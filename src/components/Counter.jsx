import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

//components
import Loading from './Loading';

const Counter = ({ icon1, icon2, token, id, isEndloading, comment }) => {
  // console.log('token:', token);
  const counters = comment.counter;
  let [counter, setCounter] = useState(counters);
  const [disabledUp, setDisabledUp] = useState(false);
  const [disabledDown, setDisabledDown] = useState(false);
  // const [isLoadingCount, setIsLoadingCount] = useState(true);

  const handleClickCounterUp = async () => {
    // console.log('counter before +1:', counter);
    setCounter(counter = counter + 1);
    // console.log('counter after +1:', counter);
    try {
      // const response = await axios.post(`http://localhost:3000/review/${id}`,
        {
          counter,
        }
      );
      if (response) {
        setDisabledUp(true);
        // console.log('disabledUp:', disabledUp);
      }
      // console.log('response in /review/${id}:', response);
    } catch (error) {
      console.log('error.response', error.response);
    }
  }
  const handleClickCounterDown = async () => {
    setCounter(counter = counter - 1);
    // console.log('counter after -1:', counter);

    try {
      const response = await axios.post(``,
        {
          counter,
        },
      );
      if (response) {
        // console.log('response in /review/${id}:', response);
        setDisabledDown(true);
        // console.log('disabledDown:', disabledDown);
      }
    } catch (error) {
      console.log('error.response', error.response);
    }
  }
  // console.log('icon1 on Counter:', icon1, '\n:', 'icon2 on Counter:', icon2);
  // const { classBoxCount } = props
  return isEndloading ? (<Loading />) : (
    <>
      <div className='boxCounter'>
        <button className={counter === 0 ? 'grey' : counter > 0 ? "green" : null}
          onClick={handleClickCounterUp} disabled={disabledUp}>
          <FontAwesomeIcon icon={icon2} />
        </button>
        <div className={counter === 0 ? "grey" : counter < 0 ? 'red' : 'green'}>
          {counter > 0 ? (
            <>
              <p>+</p>
            </>
          ) : (
            <>
            </>
          )}
          {counter}
        </div>
        <button className={counter === 0 ? 'grey' : counter < 0 ? "red" : null} onClick={handleClickCounterDown} disabled={disabledDown}>
          <FontAwesomeIcon icon={icon1} />
        </button>
      </div>
    </>
  )
}

export default Counter