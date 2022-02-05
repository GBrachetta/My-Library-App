import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = '/api/users/verify-email';

const VerifyEmail = () => {
  const { verificationToken } = useParams();

  const navigate = useNavigate();

  const onVerify = async () => {
    try {
      await axios.get(`${API_URL}/${verificationToken}`);

      toast.success('Email verified. You can now log in');
      navigate('/login');
    } catch (error) {
      // This is not good and it's hardcoding an error badly handled from ../backend/controllers/userController.js
      toast.error('Token invalid or expired. A new token will be sent.');
      // TODO: Resend verification token to user (!?)
      navigate('/login');
    }
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
