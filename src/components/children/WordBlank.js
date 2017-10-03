import React from 'react';

const WordBlank = (props) => {
    if (props.correct) {
        return <li className='list-unstyled'>{props.word}</li>
    } else {
        return <li className="list-unstyled">{Array(props.word.length).join('_')}</li>
    }
};

export default WordBlank;