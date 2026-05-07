import { useForm } from 'react-hook-form';
import { sendMessage } from '../services/message.service.js';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend, FiCheckCircle, FiClock } from 'react-icons/fi';

const SOCIALS = [
  { icon: <FiGithub />,   label: 'GitHub',   href: 'https://github.com/Mr-Zenn',                                    color: '#e2e8f0' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jayprakash-sahu-06b501290',         color: '#0a66c2' },
  { icon: <FiMail />,     label: 'Email',    href: 'mailto:jayprakash6231ssb@gmail.com',                            color: '#a78bfa' },
];

const DETAILS = [
  { icon: <FiMail />,    label: 'Email',        value: 'jayprakash6231ssb@gmail.com', href: 'mailto:jayprakash6231ssb@gmail.com' },
  { icon: <FiMapPin />,  label: 'Location',     value: 'India',                       href: null },
  { icon: <FiClock />,   label: 'Response time',value: 'Within 24 hours',             href: null },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await sendMessage(data);
      setSent(true);
      reset();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact-v2 page-section">
      <motion.div {...fadeUp()}>
        <p className="section-eyebrow">Let’s talk</p>
        <h1 className="section-title-v2">Get In <span>Touch</span></h1>
      </motion.div>

      <div className="contact-v2__grid">
        {/* Left info panel */}
        <motion.div className="contact-v2__info" {...fadeUp(0.1)}>
          <p className="contact-v2__tagline">
            Have a project in mind or just want to say hi?
            My inbox is always open — I’ll get back to you promptly.
          </p>

          <div className="contact-v2__details">
            {DETAILS.map(({ icon, label, value, href }) => (
              <div key={label} className="contact-detail">
                <span className="contact-detail__icon">{icon}</span>
                <div className="contact-detail__text">
                  <span className="contact-detail__label">{label}</span>
                  {href
                    ? <a href={href} className="contact-detail__value">{value}</a>
                    : <span className="contact-detail__value">{value}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="contact-v2__socials">
            <p className="contact-v2__socials-label">Find me on</p>
            <div className="contact-v2__social-row">
              {SOCIALS.map(({ icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  style={{ '--social-color': color }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div className="contact-v2__form-wrap" {...fadeUp(0.15)}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheckCircle className="contact-success__icon" />
                <h3 className="contact-success__title">Message Sent!</h3>
                <p className="contact-success__sub">Thanks for reaching out. I’ll get back to you within 24 hours.</p>
                <button className="btn-hero btn-hero--ghost" onClick={() => setSent(false)}>Send Another</button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-v2__form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="contact-v2__row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input placeholder="Your name" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" placeholder="your@email.com" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    placeholder="Tell me about your project or just say hello…"
                    rows={6}
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'At least 10 characters' } })}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn-hero btn-hero--primary contact-v2__submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : <><FiSend /> Send Message</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
