import {Formik, Form, Field} from 'formik'
import {TextField, Button, Box} from '@mui/material'
import * as Yup from 'yup'
import {useNavigate} from 'react-router'

export function LoginForm({onLogin, isSignup}) {
  const navigate = useNavigate()

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    // Fullname is only required for signup
    fullname: isSignup ? Yup.string().required('Full name is required') : Yup.string(),
  })

  const initialValues = {
    username: '',
    password: '',
    fullname: '', // For Signup only
  }

  function handleSubmit(values, {setSubmitting}) {
    onLogin(values) // Pass form values to the parent handler
    setSubmitting(false)
    navigate('/toy')
  }

  return (
    <section className="login-form full main-layout container">
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, errors, touched, isSubmitting, handleChange, handleBlur}) => (
          <Form>
            {/* Username Input */}
            <Box mb={2}>
              <Field
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>

            {/* Password Input */}
            <Box mb={2}>
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>

            {/* Fullname Input (only for Signup) */}
            {isSignup && (
              <Box mb={2}>
                <Field
                  name="fullname"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullname && Boolean(errors.fullname)}
                  helperText={touched.fullname && errors.fullname}
                />
              </Box>
            )}

            {/* Submit and Reset Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSignup ? 'Signup' : 'Login'}
              </Button>
              <Button type="reset" variant="outlined" color="secondary">
                Reset
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </section>
  )
}
