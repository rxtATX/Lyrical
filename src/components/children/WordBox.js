import React from 'react';
import WordBlank from './WordBlank'

const WordBox = (props) => {
    const eachWord = props.songLyrics.map((word, index) => {
        if (props.guessWord.indexOf(word) === -1 && props.isGameOver === false) {
            return <WordBlank key={index} word={word} correct={false} />
        } else if (props.isGameOver === true && props.guessWord.indexOf(word) === -1) {
            return <WordBlank color="red-text" key={index} word={word} correct={true} />
        } else {
            return <WordBlank key={index} word={word} correct={true} />
        }
    });

    return (
        <div>
            <ul>
                {eachWord}
            </ul>
            <p>Lyrics powered by www.musixmatch.com. This Lyrics is NOT for Commercial use and only 30% of the lyrics are returned.</p>
        </div>
    );
};

export default WordBox;