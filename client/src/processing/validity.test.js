import { checkIfEmailValid } from './validity';

test('Check legal Emails:', () => {
	const legalEmails = [
		'email@example.com',
		'firstname.lastname@example.com',
		'email@subdomain.example.com',
		'firstname+lastname@example.com',
		'1234567890@example.com',
		'email@example-one.com',
		'_______@example.com',
		'email@example.name',
		'email@example.museum',
		'email@example.co.jp',
		'firstname-lastname@example.com'
	];
	const tested = legalEmails.map((el) => checkIfEmailValid(el));
	const result = tested.includes(false);
	expect(result).toStrictEqual(false);
});
