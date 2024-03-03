import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  url: yup.string().max(2000, 'should be less than 500').url('it is not an URL').required('should not be empty')
})
