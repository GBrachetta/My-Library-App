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
      navigate('/login');
    }

    if (user && !isVerified) {
      toast.error('Please verify your email');
      dispatch(verifyEmail(verificationToken, user));
    }

    if (isSuccess) {
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
