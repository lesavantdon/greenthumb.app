import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate("/login"); // use navigate to redirect
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};
export default SignOutButton;