import cubejs from '@cubejs-client/core';

const cubejsApi = cubejs(
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDMwNDI3MTAsImV4cCI6MTcwMzEyOTExMH0.nJF_t1sysATWagqMoo1Yvb4Igdtf7ltrpF51qLnMPB4',
	{ apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

export default cubejsApi;
