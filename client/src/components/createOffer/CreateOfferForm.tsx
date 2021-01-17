import React from 'react';
import { Container, Typography, Grid, Button, Box, Radio, RadioGroup, FormControlLabel, FormLabel, Slider } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "./FormTextField";
import LocationField from './LocationField'
import * as yup from "yup";



const CreateOfferForm: React.FC = () => {

  interface FormValues {
    beerName: string;
    description: string;
    packageSize: string;
    location: string;
  }
  
  const validationSchema = yup.object().shape({
    beerName: yup.string().required("A name is required"),
    description: yup.string().required("Required"),
    packageSize: yup.string().required("Pick any package size and specify in description if necessary"),
    locationField: yup.string().required("A valid location is necessary to display the offer on the map")
  });



  return (
    <Container fixed>
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h6"
          style={{ lineHeight: 1.25 }}
        >
          Create an offer
        </Typography>
      </Box>
      <Formik
        initialValues={{
          beerName: "",
          description: "",
          packageSize: "",
          location: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          console.log(values)
          alert(JSON.stringify(values, null, 2));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Field
                  name="beerName"
                  label="What do you call it?"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="This name will be displayed on the map"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="description"
                  label="A few words about your brew"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="Users can filter based on this description"
                  multiline={true}
                  rows="6"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Package size</FormLabel>
                <Field
                  component={RadioGroup}
                  row
                  label="package size" 
                  >
                  <FormControlLabel value="0.33" control={<Radio />} label="0.33" />
                  <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
                  <FormControlLabel value="0.75" control={<Radio />} label="0.75+" />
                </Field>
              <Grid>
                <FormLabel>Amount</FormLabel>

                <Slider
                  defaultValue={2}
                  aria-labelledby="discrete-slider-small-steps"
                  step={1}
                  marks
                  min={1}
                  max={12}
                  valueLabelDisplay="auto"
                />
              </Grid>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="locationField"
                  label="Trade location"
                  component={LocationField}
                  fullWidth
                  initHelperText="Give a default location for the trade. Any public location will do."
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateOfferForm