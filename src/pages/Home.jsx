import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../ChatAppLogo.png';
import '../styles/Home.css';
import Footer from '../components/Footer';
import Button from '@material-ui/core/Button';
import { cyan } from '@material-ui/core/colors';

function Home() {
    return (
        <div class="container">
            <img src={logo} className="home-logo" alt="The Chat App Logo"/>
            <Button 
                variant="contained" 
                className="btn-home" 
                href="/signup"
                style={{background: cyan[500], color: 'white', margin: '5px', fontWeight: 'bold'}}>
                    Sign Up
            </Button>
            <Button 
                variant="contained" 
                className="btn-home" 
                href="/login"
                style={{background: 'white', color: cyan[500], marginTop: '5px', border: '1px solid #00bcd4', fontWeight: 'bold'}}>
                    Log In
            </Button>
            <div className="home-footer"><Footer /></div>
            <div className="home-footer"><Footer /></div>
        </div>
    )
}

export default Home
