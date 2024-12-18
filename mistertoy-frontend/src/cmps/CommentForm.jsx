import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export  function CommentForm({onSubmit}) {
  const formik = useFormik({
    initialValues: {
      comment: '',
      rating: 0,
    },
    validationSchema: Yup.object({
      comment: Yup.string().required('Comment is required').min(5, 'Comment must be at least 5 characters long'),
      rating: Yup.number().required('Rating is required').min(1, 'Rating must be at least 1'),
    }),
    onSubmit: (values) => {
      onSubmit({ txt: values.comment, rating: values.rating }) // Call the parent function with form values
      formik.resetForm() // Optionally reset the form after submission
    },
  })

  return (
    <Box
      component="form"
      sx={{display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400}}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h6">Add a Comment</Typography>

      {/* Comment Textarea */}
      <TextField
        id="comment"
        name="comment"
        label="Your Comment"
        multiline
        rows={4}
        variant="outlined"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
      />

      {/* Rating */}
      <Box>
        <Typography component="legend">Rating</Typography>
        <Rating
          id="rating"
          name="rating"
          value={formik.values.rating}
          onChange={(event, newValue) => formik.setFieldValue('rating', newValue)}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Typography color="error" variant="caption">
            {formik.errors.rating}
          </Typography>
        )}
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  )
}
