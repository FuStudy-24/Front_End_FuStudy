import Link from 'next/link';
import React from 'react';

export default function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <Link href="/login">
        Go to Login Page
      </Link>
    </div>
  );
}
