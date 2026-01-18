import React from 'react';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <section className="login-section">
            <div className="auto-container">
                {/* Login Form */}
                <div className="login-form">
                    <h2>Login</h2>
                    {/*Login Form*/}
                    <form method="post" action="#">
                        <div className="form-group">
                            <label>Username or email address *</label>
                            <input type="text" name="username" placeholder="" required />
                        </div>

                        <div className="form-group">
                            <label>Password *</label>
                            <input type="password" name="password" placeholder="" required />
                        </div>

                        <div className="form-group">
                            <input className="theme-btn" type="submit" name="submit-form" value="Log in" />
                        </div>

                        <div className="form-group">
                            <input type="checkbox" name="shipping-option" id="account-option-1" />&nbsp; <label htmlFor="account-option-1">Remember me</label>
                        </div>

                        <div className="form-group pass">
                            <Link href="#" className="psw">Lost your password?</Link>
                        </div>
                    </form>
                </div>
                {/*End Login Form */}
            </div>
        </section>
    );
};

export default LoginForm;
