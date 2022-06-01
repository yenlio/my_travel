import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography, Layout } from 'antd';
import { useDispatch } from "react-redux";
import background from '../../../assets/dulich.jpg'
const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        const styles = {
          header: {
            backgroundImage: `url(${background})`,
            height: '100vh',
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          },

          content: {
            height: '100%',
            width: '100%',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.4)',

          },
          title: {
            display: 'flex', justifyContent: 'center', alignItems: 'center'

          },
          button: {
            backgroundColor: 'rgba(0,255,0)',
            color: 'white',
            opacity: "50%"


          },
          text: {
            color: 'white'
          },
          form: {

          }
        }

        return (
          <div className="app" style={styles.header}>
            <div style={styles.content}>
              

                <form onSubmit={handleSubmit} style={{ width: '500px', }} >
              <h1 style={styles.title}>Login</h1>
                  <Form.Item required>
                    <Input
                      id="email"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Enter your email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </Form.Item>

                  <Form.Item required>
                    <Input
                      id="password"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Enter your passworddđ"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Item>

                  {formErrorMessage && (
                    <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                  )}

                  <Form.Item>
                    <Checkbox id="rememberMe" style={styles.text} onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                    <a className="login-form-forgot" href="/reset_user" style={{ float: 'right', color: 'white' }}>
                      forgot password
                    </a>
                    <div>
                      <Button type="submit" htmlType="submit" className="login-form-button" style={styles.button} onSubmit={handleSubmit}>
                        Log in
                      </Button>
                    </div>
                    <a href="/register" style={styles.text}>or register now!</a>
                  </Form.Item>
                </form>
            

            </div>

          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);











