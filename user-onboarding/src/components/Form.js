import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const OnboardingForm = ({ touched, errors, status, isSubmitting }) => {
	const [user, setUser] = useState([]);
	useEffect(() => {
		status && setUser([...user, status]); //if it is defined it will set user status otherwise will do nothing
	}, [status]);

	return (
		<div>
			<h1>User Onboarding Form</h1>
			<div className="contentWrapper">
				<Form className="form">
					<label>
						Name:
						<Field type="text" name="name" placeholder="Name" />
					</label>
					<label>
						Email:
						<Field type="email" name="email" placeholder="Email" />
						{touched.email && errors.email && (
							<p className="errors">{errors.email}</p>
						)}
					</label>
					<label>
						Password:
						<Field type="password" name="password" />
						{touched.password && errors.password && (
							<p className="errors">{errors.password}</p>
						)}
					</label>
					<label>
						Select role:
						<Field name="role" component="select" placeholder="Select Role">
							<option>Select your Role</option>
							<option value="Student">Student</option>
							<option value="Team Lead">Team Lead</option>
							<option value="Section Lead">Section Lead</option>
						</Field>
					</label>
					<label className="checkbox-container">
						<Field type="checkbox" name="tos" className="checkbox" />
						<span>I agree to the Terms of Service.</span>
					</label>
					<button disabled={isSubmitting}>Send</button>
				</Form>

				{user.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
							</tr>
						</thead>
						{user.map(user => {
							return (
								<tbody key={user.id}>
									<tr>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
									</tr>
								</tbody>
							);
						})}
					</table>
				) : null}
			</div>
		</div>
	);
};

const FormikLoginForm = withFormik({
	mapPropsToValues({ name, email, password, role, tos }) {
		return {
			name: name || '',
			email: email || '',
			password: password || '',
			role: role,
			tos: tos || false
		};
	},

	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Email not valid')
			.required('Email is required'),
		password: Yup.string()
			.min(8, 'Password must be 8 characters or longer')
			.required('Password is required')
	}),

	handleSubmit: (values, { resetForm, setStatus, setSubmitting }) => {
		axios
			.post('https://reqres.in/api/users', values)
			.then(res => {
				console.log('res.data', res.data); // Data was created successfully and logs to console
				resetForm();
				setStatus(res.data);
				setSubmitting(false);
			})
			.catch(err => {
				console.log(err); // There was an error creating the data and logs to console
				setSubmitting(false);
			});
	}
})(OnboardingForm);

export default FormikLoginForm;
