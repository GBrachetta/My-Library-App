/* eslint-disable no-console */
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const API_URL = '/api/users/verify-email';

// const VerifyEmail = () => {
//   const { verificationToken } = useParams();

//   const navigate = useNavigate();

//   const onVerify = async () => {
//     try {
//       await axios.get(`${API_URL}/${verificationToken}`);

//       toast.success('Email verified. You can now log in');
//       navigate('/login');
//     } catch (error) {
//       // This is not good and it's hardcoding an error badly handled from ../backend/controllers/userController.js
//       toast.error('Token invalid or expired. A new token will be sent.');
//       // TODO: Resend verification token to user (!?)
//       navigate('/login');
//     }
//   };

//   return (
//     <section>
//       <h1 className="text-6xl border-b-2 pb-2">Verify your email</h1>
//       <p className="my-5">Please click below to verify your email</p>
//       <button type="button" className="btn btn-info" onClick={onVerify}>
//         Verify Email
//       </button>
//     </section>
//   );
// };

// export default VerifyEmail;

// Second attempt
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import { reset, verifyEmail } from '../features/auth/authSlice';

const VerifyEmail = () => {
  const { verificationToken } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message, isVerified } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user && !isVerified) {
      toast.error('Please verify your email');
      dispatch(verifyEmail(verificationToken, user));
    }

    if (isSuccess && isVerified) {
      toast.success('Your email is verified, please log in');
      navigate('/login');
    }

    dispatch(reset());
  }, [
    dispatch,
    isError,
    isVerified,
    message,
    navigate,
    user,
    isSuccess,
    verificationToken,
  ]);

  const onVerify = () => {
    dispatch(verifyEmail(verificationToken));
  };

  if (isLoading) return <Spinner />;

  // eslint-disable-next-line no-unused-vars
  const clickMe = () => {
    const { user, iat, exp } = jwtDecode(verificationToken);

    console.log('⭕️ ~ file: VerifyEmail.jsx ~ line 78 ~ clickMe ~ exp', exp);
    console.log(new Date(exp));
    console.log('⭕️ ~ file: VerifyEmail.jsx ~ line 78 ~ clickMe ~ iat', iat);
    console.log(new Date(iat));
    console.log('⭕️ ~ file: VerifyEmail.jsx ~ line 78 ~ clickMe ~ user', user);
  };

  return (
    <section>
      <h1 className="text-6xl border-b-2 pb-2">Verify your email</h1>
      <p className="my-5">Please click below to verify your email</p>
      <button type="button" className="btn btn-info" onClick={onVerify}>
        Verify Email
      </button>
    </section>
  );
};

export default VerifyEmail;
