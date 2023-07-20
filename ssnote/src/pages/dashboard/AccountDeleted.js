import React from 'react';
import { Link } from 'react-router-dom';

function AccountDeleted() {
  return (
    <div>
        <p>Your Account Has Been Deleted.</p>

        <Link to='/'>
            Return to Login Page
        </Link>

      
    </div>
  )
}

export default AccountDeleted
