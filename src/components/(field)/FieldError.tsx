import React, { type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Alert } from '@mui/material';

/**
 * A React component that displays form validation errors from the root level.
 *
 * This component uses React Hook Form's `useFormContext` to access form errors
 * and renders an error alert when root-level errors are present.
 *
 * @returns {React.JSX} A readonly React node containing an error alert if root errors exist,
 *          or undefined if no root errors are present
 *
 * @example
 * ```tsx
 * // Used within a FormProvider context
 * <FormProvider {...methods}>
 *   <form>
 *     <input {...register("email")} />
 *     <FieldError />
 *   </form>
 * </FormProvider>
 * ```
 *
 * @requires The component must be used within a React Hook Form FormProvider context
 * @requires Material-UI Alert component for error display
 */
const FieldError = (): Readonly<ReactNode> => {
  const {
    formState: { errors }
  } = useFormContext();

  return errors?.root && <Alert severity="error">{errors?.root?.message}</Alert>;
};

export default FieldError;
