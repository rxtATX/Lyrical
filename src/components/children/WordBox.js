import React from 'react';
import WordBlank from './WordBlank'

const WordBox = (props) => {
    const eachWord = props.songLyrics.map((word, index) => {
        if (props.guessWord.indexOf(word) === -1 && props.isGameOver === false) {
            return <WordBlank key={index} word={word} correct={false} />
        } else {
            return <WordBlank key={index} word={word} correct={true} />
        }
    });

    return (
        <ul>
            {eachWord}
        </ul>
    );
};

export default WordBox;