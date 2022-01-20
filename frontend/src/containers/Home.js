import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container'>
        <div className='p-5 mt-5 bg-light rounded-3'>
            <h1 className='display-4'>Welcome to Quiz App!</h1>
            <p className='lead'>This is a fun game app which challenges your mind!</p>
            <hr className='my-4' />
            <p>Click the login button</p>
            <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
        </div>
    </div>
);

export default Home;
