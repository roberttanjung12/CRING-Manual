import { env } from 'process';

const environment = {
  application: {
    author: 'David Rivaldy',
    canonical: 'https://www.davidrivaldy.com',
    description:
      'The ultimate boilerplate for Front End Departments, leveraging the latest features of Next.js to streamline development.',
    keywords:
      'Front End Department, Front End Boilerplate, Next.js Boilerplate, Next.js Features, Front End Development, Web Development Tools, Next.js Template, Front End Framework, Development Boilerplate, Modern Web Development',
    name: 'CRING!',
    publisher: 'SPE',
    robots: 'noindex, nofollow'
  },
  development: {
    email: 'davidrivaldy@gmail.com',
    password: 'administrator'
  },
  redirectPage: '/',
  node: {
    env: env.NODE_ENV ?? 'development'
  }
};

export default environment;
