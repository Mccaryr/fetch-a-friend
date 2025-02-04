import {Formik} from "formik";
import * as Yup from "yup";
import {useAuth} from "@/auth/AuthContext.tsx";

const Login = () => {

    const { login } = useAuth();

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        name: Yup.string()
        .required("Name is required")
    })

    const handleSubmit = async (values:any) => {
        login({name: values.name, email: values.email});
    }

    return (
        <div>
            <Formik
                initialValues={{ name: '', email: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values).then(() => {
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
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            aria-label={"name"}
                        />
                        {errors.name && touched.name && errors.name}
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            aria-label={"email"}
                        />
                        {errors.email && touched.email && errors.email}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
export default Login
