export enum SWAGGER {
	// MAIN
	TITLE = 'TODO PROJECT',
	DESCRIPTION = 'The todo-project API description',
	VERSION = '1.0',
	TAG = 'Main endpoints',
	PATH = 'api',
	// AUTH module
	SIGNIN_SUMMARY = 'Signin by a user',
	SIGNIN_RESPONSE_EXAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
	SIGNIN_RESPONSE_DESCRIPTION = 'Token issued to a user',
	// USER module
	USER_FIRST_NAME_EXAMPLE = 'First name',
	USER_FIRST_NAME_DESCRIPTION = 'First name of a user',
	USER_LAST_NAME_EXAMPLE = 'Last name',
	USER_LAST_NAME_DESCRIPTION = 'Last name of a user',
	USER_EMAIL_EXAMPLE = 'example@gmail.com',
	USER_EMAIL_DESCRIPTION = 'Email of a user',
	USER_PASSWORD_EXAMPLE = '123456',
	USER_PASSWORD_DESCRIPTION = 'Password of a user',
	USER_CREATE = 'Create user',
	USER_GET_BY_EMAIL = 'Get user by email',
	USER_GET_BY_ID = 'Get user by id',
	USER_GET_ALL = 'Get all users',
	USER_NOT_FOUND = 'User not found',
}
