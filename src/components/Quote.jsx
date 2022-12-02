import React from 'react';
import '../stylesheets/Quote.css';
import { BsArrowRight } from 'react-icons/bs';

function Quote({ author, content, tags }) {
    return (
        <div className='container-quote'>
            <p>"{content}"</p>

        </div >
    );
}


export default Quote;