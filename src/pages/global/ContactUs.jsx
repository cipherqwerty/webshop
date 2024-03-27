import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button, TextField } from '@mui/material';

export const ContactUs = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm('service_zh40ckh', 'template_5nylj2n', form.current, {
				publicKey: 'cO1a9GPNZOTISpOnv',
			})
			.then(
				() => {
					console.log('SUCCESS!');
				},
				(error) => {
					console.log('FAILED...', error.text);
				}
			);
	};

	return (
		<form ref={form} onSubmit={sendEmail}>
			<br />
			<TextField label='Name' variant='outlined' name='from_name' /> <br />
			<br />
			<TextField
				label='Email'
				type='email'
				variant='outlined'
				name='from_email'
			/>{' '}
			<br />
			<br />
			<TextField label='Message' variant='outlined' name='message' /> <br />
			<br />
			<Button variant='outlined' type='submit'>
				Send
			</Button>
			<br />
		</form>
	);
};
