import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().required("Required!").email("Invalid Email Format"),
  channel: Yup.string().required("Required!"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required!!";
  }
  return error;
};

const YoutubeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  });

  return (
    <div className="parent">
      <div className="lhs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          //   validateOnMount
          //   validateOnChange={false}
          //   validateOnBlur={false}
        >
          {(formik) => {
            console.log(
              "ERROR",
              formik.errors,
              "ISVALID",
              formik.touched,
              "isvalid",
              formik.isValid,
              "dirty",
              formik.dirty
            );
            setFormData(formik.values);
            return (
              <Form>
                <div className="form-control">
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>

                <div className="form-control">
                  <label htmlFor="channel">Channel</label>
                  <Field
                    type="text"
                    id="channel"
                    name="channel"
                    placeholder="Youtube channel name"
                  />
                  <ErrorMessage name="channel" />
                </div>

                <div className="form-control">
                  <label htmlFor="comments">Comments</label>
                  <Field
                    as="textarea"
                    id="comments"
                    name="comments"
                    validate={validateComments}
                  />
                  <ErrorMessage name="comments" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="address">Address</label>
                  <FastField type="text" id="address" name="address">
                    {(props) => {
                      const { field, meta } = props;
                      //   console.log("Field Render");
                      return (
                        <div className="form-control">
                          <input type="text" id="address" {...field} />
                          {meta.touched && meta.error && (
                            <div>{meta.error}</div>
                          )}
                        </div>
                      );
                    }}
                  </FastField>
                </div>

                <div className="form-control">
                  <label htmlFor="facebook">Facebook Profile</label>
                  <Field type="text" id="facebook" name="social.facebook" />
                </div>

                <div className="form-control">
                  <label htmlFor="twitter">Twitter Profile</label>
                  <Field type="text" id="twitter" name="social.twitter" />
                </div>

                <div className="form-control">
                  <label htmlFor="primaryPH">Primary phone number</label>
                  <Field type="text" id="primaryPH" name="phoneNumbers[0]" />
                </div>
                <div className="form-control">
                  <label htmlFor="secondaryPH">Secondary phone number</label>
                  <Field type="text" id="secondaryPH" name="phoneNumbers[1]" />
                </div>

                <div className="form-control">
                  <label>List of phone numbers</label>
                  <FieldArray name="phNumbers">
                    {(fieldArrayProps) => {
                      //   console.log(fieldArrayProps.form.values);
                      const { form, push, remove } = fieldArrayProps;
                      const { values } = form;
                      //   console.log(form.errors);
                      const { phNumbers } = values;
                      return (
                        <div>
                          {phNumbers.map((phno, i) => (
                            <div key={i}>
                              <Field name={`phNumbers[${i}]`} type="text" />
                              {i > 0 && (
                                <button type="button" onClick={() => remove(i)}>
                                  -
                                </button>
                              )}
                              <button type="button" onClick={() => push("")}>
                                +
                              </button>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    formik.validateField("comments");
                  }}
                >
                  Validate comments
                </button>

                <button
                  type="button"
                  onClick={() => {
                    formik.validateForm();
                  }}
                >
                  Validate all
                </button>

                <button
                  type="button"
                  onClick={() => {
                    formik.setFieldTouched("comments");
                  }}
                >
                  Visited comments
                </button>
                <button
                  type="button"
                  onClick={() => {
                    formik.setTouched({
                      name: true,
                      email: true,
                      channel: true,
                      comments: true,
                    });
                  }}
                >
                  Visit all
                </button>
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="rhs">
        <div className="card">
          <h1>CARD</h1>
          <div className="cardProp">
            <div className="cardLabel">NAME :</div>
            <div className="cardValue">{formData.name}</div>
          </div>
          <div className="cardProp">
            <div className="cardLabel">EMAIL :</div>
            <div className="cardValue">{formData.email}</div>
          </div>
          <div className="cardProp">
            <div className="cardLabel">CHANNEL :</div>
            <div className="cardValue">{formData.channel}</div>
          </div>
          <div className="cardProp">
            <div className="cardLabel">COMMENTS :</div>
            <div className="cardValue">{formData.comments}</div>
          </div>
          <div className="cardProp">
            <div className="cardLabel">ADDRESS :</div>
            <div className="cardValue">{formData.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeForm;
