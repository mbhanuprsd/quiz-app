import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { load_user } from "../actions/auth";
import Unity, { UnityContext } from "react-unity-webgl";

const Home = ({ user, load_user }) => {
    console.log('Home page - ', JSON.stringify(user));

    const unityContext = new UnityContext({
        loaderUrl: "/build/build.loader.js",
        dataUrl: "/build/build.data",
        frameworkUrl: "/build/build.framework.js",
        codeUrl: "/build/build.wasm",
    });

    const guestLinks = () => (
        <div>
            <p>Click the login button</p>
            <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
        </div>
    );

    const authLinks = () => (
        <Unity unityContext={unityContext} style={{ width: '100%', height: '100%' }} />
    );

    return (
        <div className='container'>
            <div className='p-5 mt-5 bg-light rounded-3'>
                <h1 className='display-4'>Hello {user ? user.name : 'Guest'}. Welcome to Quiz App!</h1>
                <p className='lead'>This is a fun game app which challenges your mind!</p>
                <hr className='my-4' />
                {user ? authLinks() : guestLinks()}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { load_user })(Home);
