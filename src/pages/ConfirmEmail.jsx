import axios from "axios";
import { useState } from "react";
import { useUser } from '../context/lib/userFunc';
import { useNavigate } from "react-router-dom";

//components
import Input from '../components/Input';

const ConfirmEmail = () => {
  const [code, setCode] = useState([null, null, null, null, null, null]);
  console.log('code  on /confirmEmail:', code);
  const { saveUser, errorMessage, setErrorMessage } = useUser();
  const navigate = useNavigate();
  const handleChangeInputCode = (e, index) => {
    console.log('e.target.value on handleChangeInputCode:', e.target.value);
    console.log('index on handleChangeInputCode:', index);
    const nbrInput = e.target.value;
    const newArrayInputCode = [...code];
    newArrayInputCode[index] = nbrInput;
    setCode(newArrayInputCode);
    console.log('newArrayInputCode on handleChangeInputCode:', newArrayInputCode);
  };

  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", JSON.stringify(code));
    try {
      const response = await axios.post(`http://localhost:3000/user/confirmEmail/`,
        // const response = await axios.post(`https://site--vintedbackend--s4qnmrl7fg46.code.run/user/confirmEmail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log('response in /confirmEmail:', response);
        console.log('response.data in /confirmEmail:', response.data);
        console.log('response.data.token in /confirmEmail:', response.data.token);
        console.log('response.data.message in /confirmEmail:', response.data.message);
        if (response.data.message) {
          const message = response.data.message;
          alert(message);
        }
        if (response.data.token) {
          const token = response.data.token;
          saveUser(token);
        }
        navigate("/publish");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleConfirmEmail} className="boxFormCenter boxFormInputCode">
        <div className="boxContainerInputCode">
          {code.map((inputCode, index) => {
            console.log('inputCode in ConfirmEmail:', inputCode);
            return (
              <label htmlFor="code" className="boxInputCode" key={index}>
                <input
                  id={`code-${index}`}
                  type="text"
                  value={code[index]}
                  onChange={(e) => handleChangeInputCode(e, index)}
                  className="classInputCode"
                />
              </label>
            )
          })}
        </div>
        <Input type='submit' value='envoyer le code' />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  )
}

export default ConfirmEmail