import React from 'react';

const WordBlank = (props) => {
    if (props.correct) {
        if (props.color) {
            return <li className='list-unstyled red-text'>{props.word}<span> </span></li>
        } else {
            return <li className='list-unstyled'>{props.word}<span> </span></li>
        }
    } else {
        return <li className="list-unstyled">{Array(props.word.length + 1).join('_')}<span> </span></li>
    }
};

export default WordBlank;