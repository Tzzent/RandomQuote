import React from "react";
import { BsArrowRight } from 'react-icons/bs';
import '../stylesheets/About.css'

function About({ getQuotes, author, tags, visible }) {
    return (
        <div onClick={() => getQuotes(author)} className={visible ? 'about' : 'about not-visible'}>
            <div className='quote-owner'> <h3 className='author'>{author}</h3>
                <span className='category'>{tags}</span>
            </div>
            <div className='arrow-right'>
                <BsArrowRight />
            </div>
        </div>
    );
}

export default About;