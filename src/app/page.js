import Head from 'next/head';
import { redirect, RedirectType } from "next/navigation";

async function myLogin(formData) {
  'use server'
  const email = formData.get('email');
  const password = formData.get('password');
  if (email === "admin@admin.com" && password === "hello123") {
    redirect("/create", RedirectType.replace);
  } else {
    throw new Error(`Invalid Credentials`);
  }
}

function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <Head>
        <title>Patient Vital Monitoring Portal - Login</title>
      </Head>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-500">Patient Vital Monitoring Portal</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
        <form action={myLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-indigo-500 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-indigo-500 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
