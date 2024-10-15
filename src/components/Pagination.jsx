import { useState, Fragment } from "react";
import Button from "./Button";
import chevronLeft from '../assets/images/left-chevron_8563242.png';
import chevronRight from '../assets/images/right-chevron_8563331.png';
import { v4 as uuidv4 } from 'uuid';

const Pagination = ({ count, items, page, setPage }) => {
  // console.log('count:', count);
  // console.log('page top:', page);
  // initialisation d'un tableau vide
  const pageActive = [];
  // console.log('pageActive:', pageActive);
  //calcul du nombre total de page(count (pages)/ le nombre de jeu afficher par page)
  const TotalPg = Math.ceil(count / items);
  // console.log('TotalPg:', TotalPg);
  //creation d'un tableau de page
  for (let i = 1; i < TotalPg; i++) {
    pageActive.push(i);
  }
  //création des useState
  const [firstNum, setFirstNum] = useState(1);
  // console.log('firstNum:', firstNum);
  const [threePg, setThreePg] = useState(3);
  // console.log('threePg:', threePg);
  const [fivePg, setFivePg] = useState(5);
  // console.log('fivePg:', fivePg);
  // console.log('typeof TotalPg:', typeof TotalPg);
  const [lastEndNum, setLastEndNum] = useState(TotalPg);
  // console.log('lastEndNum', lastEndNum);
  const almostTotalPg = TotalPg - 3;
  // console.log('almostTotalPg:', almostTotalPg);
  const [lastFirstNum, setLastFirstNum] = useState(almostTotalPg);
  // console.log('lastFirstNum:', lastFirstNum);

  // console.log('pageActive after for:', pageActive);
  const previousPage = () => {
    if (page > 1 && page < lastFirstNum) {
      setPage(page - 1);
      setFirstNum(firstNum - 1);
      setThreePg(threePg - 1);
      setFivePg(fivePg - 1);
      setLastFirstNum(lastFirstNum - 1);
      setLastEndNum(lastEndNum - 1);
    }
    else if (page <= 3) {
      setPage(1);
      setFirstNum(1);
      setThreePg(3);
      setFivePg(5);
    }
    else if (page === lastFirstNum || page > lastFirstNum && page < lastEndNum || page === lastEndNum) {
      setPage(page - 1);
      setLastFirstNum(lastFirstNum - 1);
      setLastEndNum(lastFirstNum + 1);
      setFirstNum(1);
      setThreePg(3);
      setFivePg(5);
    }
    else if (page === 1) {
      setFivePg(lastFirstNum);
      setLastEndNum(TotalPg);
    }
  }
  // console.log('Math.ceil(count / items):', Math.ceil(count / items));

  const nextPage = () => {
    if (page < TotalPg) {
      setPage(page + 1);
      setFirstNum(firstNum + 1);
      setThreePg(threePg + 1);
      setFivePg(fivePg + 1);
    }
    else if (page === TotalPg) {
      setPage(TotalPg);
    }
  }



  return (
    <div className="boxPagination">
      <div className="wrapper">
        <div><Button src={chevronLeft} alt='chevron left' handleClick={previousPage} /></div>
        {pageActive.map((pageAct) => {
          // console.log('pageActive:', pageActive);
          return (
            <Fragment key={uuidv4()} >
              {(pageAct >= firstNum && pageAct <= threePg) && <Button buttonText={pageAct} key={pageAct}
                handleClick={() => {
                  setPage(pageAct);
                  setFirstNum(firstNum + 1);
                  setThreePg(threePg + 1);
                  setFivePg(fivePg + 1);
                }} />}

              {(pageAct >= lastFirstNum && pageAct <= lastEndNum) && <Button buttonText={pageAct} key={pageAct} handleClick={() => {
                setPage(pageAct);
              }} />}
              {TotalPg > 6 && <>
                {(pageAct > threePg && pageAct < fivePg) && <div key={pageAct} className="boxPageDisplay">... <div>{page}</div> ...</div>}
              </>}
            </Fragment>
          )
        })}
        <div><Button src={chevronRight} alt='chevron right' handleClick={nextPage} /></div>
      </div>
    </div>
  )
}

export default Pagination