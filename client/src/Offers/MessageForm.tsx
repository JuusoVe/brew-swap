import React from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  Formik, FormikHelpers, FormikProps, Form, Field,
} from 'formik';
import { RootState } from '../rootReducer';
import { setShowMessageForm } from '../Display/displaySlice';
import FormTextField from '../SharedComponents/FormTextField';
import { MessageFormValues } from '../type';
import { messageBrewer } from '../User/userSlice';
import TitleBox from '../SharedComponents/TitleBox';

const validationSchema = yup.object().shape({
  contactDetails: yup.string().required('Contact details are required for the brewer to respond to you.').min(6).max(300),
  message: yup.string().required('Required').min(6).max(2000),
});

const MessageForm: React.FC = () => {
  const dispatch = useDispatch();

  const showMessageForm = useSelector(
    (state: RootState) => state.display.showMessageForm,
  );

  const handleMessageButton = () => {
    dispatch(setShowMessageForm(true));
  };

  return (
    showMessageForm
      ? (
        <Container>
          <TitleBox title="Message the brewer" />
          <Formik
            initialValues={{
              contactDetails: '',
              message: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(
              values: MessageFormValues,
              formikHelpers: FormikHelpers<MessageFormValues>,
            ) => {
              dispatch(messageBrewer(values));
              formikHelpers.setSubmitting(false);
            }}
          >
            {(formikProps: FormikProps<MessageFormValues>) => (
              <Form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="contactDetails"
                      label="How can the brewer get back to you?"
                      size="small"
                      component={FormTextField}
                      fullWidth
                      initHelperText="Leave email/phone/link. This info is not stored by the app."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="message"
                      label="Your message to the brewer"
                      size="small"
                      component={FormTextField}
                      fullWidth
                      initHelperText="Your message to the brewer"
                      multiline
                      rows="8"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled={formikProps.isSubmitting}
                      fullWidth
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      )
      : (
        <Button
          onClick={handleMessageButton}
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
        >
          Message the brewer
        </Button>
      )
  );
};

export default MessageForm;
