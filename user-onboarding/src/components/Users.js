import React from 'react';

const Users = props => {
	console.log(props);
	return (
		<div className="users-wrapper">
			{props.user.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
					{props.user.map(user => {
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
	);
};

export default Users;
