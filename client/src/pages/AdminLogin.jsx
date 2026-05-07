import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/auth.service.js';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await loginAdmin(data);
      login(res.data.data.user, res.data.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <section className="page-section page-section--center">
      <div className="auth-card">
        <h2 className="auth-card__title">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="form-error">Email required</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="form-error">Password required</span>}
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn--primary btn--full">Login</button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
