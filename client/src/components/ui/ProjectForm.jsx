import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Spinner from './Spinner.jsx';

const fields = [
  { name: 'title', placeholder: 'Title', required: true },
  { name: 'description', placeholder: 'Description', required: true, textarea: true },
  { name: 'techStack', placeholder: 'Tech Stack (comma separated)' },
  { name: 'category', placeholder: 'Category' },
  { name: 'githubLink', placeholder: 'GitHub Link' },
  { name: 'liveLink', placeholder: 'Live Link' },
  { name: 'image', placeholder: 'Image URL' },
];

const ProjectForm = ({ onSubmit, defaultValues = {}, loading }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  useEffect(() => { reset(defaultValues); }, [JSON.stringify(defaultValues)]);

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      techStack: data.techStack
        ? data.techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };
    onSubmit(payload);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit(handleFormSubmit)}>
      {fields.map(({ name, placeholder, required, textarea }) => (
        <div className="form-group" key={name}>
          {textarea ? (
            <textarea
              placeholder={placeholder}
              rows={3}
              {...register(name, { required: required ? `${placeholder} is required` : false })}
            />
          ) : (
            <input
              placeholder={placeholder}
              {...register(name, { required: required ? `${placeholder} is required` : false })}
            />
          )}
          {errors[name] && <span className="form-error">{errors[name].message}</span>}
        </div>
      ))}
      <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
        {loading ? <Spinner size={16} /> : 'Save Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
