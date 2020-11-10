import { checkIfEmailValid } from './validity';

test('Check legal Emails:', () => {
    const legalEmails = [
        'email@example.com',
        'firstname.lastname@example.com',
        'email@subdomain.example.com',
        '1234567890@example.com',
        'email@example-one.com',
        '_______@example.com',
        'email@example.name',
        'email@example.museum',
        'email@example.co.jp',
        'firstname-lastname@example.com'
    ];
    const tested = legalEmails.map((el) => checkIfEmailValid(el));
    const failedTestEmails = legalEmails.filter((el, i) => !tested[i]);
    console.log(failedTestEmails);
    const includesIllegal = tested.includes(false);
    expect(includesIllegal).toStrictEqual(false);
});

test('Check illegal Emails:', () => {
    const illegalEmails = [
        'plainaddress',
        '#@%^%#$@#$@#.com',
        '@example.com',
        'Joe Smith <email@example.com>',
        'email.example.com',
        'email@example@example.com',
        '.email@example.com',
        'email.@example.com',
        'email..email@example.com',
        'あいうえお@example.com',
        'email@example.com (Joe Smith)',
        'email@-example.com',
        'email@111.222.333.44444',
        'email@example..com',
        'Abc..123@example.com'
    ];
    const tested = illegalEmails.map((el) => checkIfEmailValid(el));
    const failedTestEmails = illegalEmails.filter((el, i) => tested[i]);
    console.log(failedTestEmails);
    const includesLegal = tested.includes(true);
    expect(includesLegal).toStrictEqual(false);
});
