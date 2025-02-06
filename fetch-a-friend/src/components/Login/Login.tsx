import {Formik} from "formik";
import * as Yup from "yup";
import {useAuth} from "../../auth/AuthContext.tsx";
import "./Login.scss"
import DogWallpaper from "../../assets/faf-wallpaper.jpg"
import Button from "../Button/Button.tsx";

const Login = () => {
    const { login } = useAuth();

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        name: Yup.string()
        .required("Name is required")
    })

    const submitHandler = async (values:any) => {
        login({name: values.name, email: values.email});
    }

    return (
        <div className={"login-background"}>
        <div className={"form-container"}>
            <h1 style={{margin:0}}>Login To</h1>
            <h1>Fetch A Friend!</h1>
            <Formik
                initialValues={{ name: '', email: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    submitHandler(values).then(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form role="login-form" className={"login-form"} onSubmit={handleSubmit}>
                        <div>
                        <label>Name
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            aria-label={"name"}
                            placeholder={"Enter Name"}
                        />
                        </label>
                            <p style={{color:'white', margin:0}}>{errors.name && touched.name && errors.name}</p>
                        </div>
                        <div>
                        <label>Email
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            aria-label={"email"}
                            placeholder={"Enter Email"}
                        />
                        </label>
                            <p style={{color: 'white', margin:0}}>{errors.email && touched.email && errors.email}</p>
                        </div>
                        <Button type={"submit"} disabled={isSubmitting} text={"Login"} />
                    </form>
                )}
            </Formik>
        </div>
            <div className={"image-container"}><img src={DogWallpaper} alt={"aesthetic dog wallpaper"} /></div>
        </div>
    )
}
export default Login
