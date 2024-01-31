import { useEffect, useState, useRef } from 'react';
import "./index.css"

type Sentence={
  words: string[],
}

function App() {
  const [data, setData] = useState({ audio: "", text: "" });
  const audioRef = useRef(null);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('');
  const [sentence, setSentence] = useState<Sentence>({words: ["word1","word2"]})

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && audioRef.current) {
        event.preventDefault(); // Prevent the default action of the space key
        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      } else if (event.code === 'KeyR') {
        audioRef.current.currentTime = 0; // Reset audio to the start
        audioRef.current.play();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    fetch('http://localhost:8000/random')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setData(data);
      })
      .catch(error => {
        console.log(error)
      });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    setUserInput(value);
    if (value === data.text) {
      setStatus('Correct!');
    } else if (value.length > 0) {
      setStatus('Wrong!');
    } else {
      setStatus("")
    }
  };

  const handleBlankFill = (event, index) => {
    console.log(event.target.value)
    let newSentence = {...sentence};
    newSentence.words[index] = event.target.value;
    setSentence(newSentence);
  }

  const handleNext = () => {
    fetch('http://localhost:8000/random')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setData(data);
      })
      .catch(error => {
        console.log(error)
      });
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Title</h1>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-2">Text: {data.text}</p>
        <audio className="mb-4" controls autoPlay ref={audioRef} src={data.audio}>
        </audio>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={handlePlay}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Play Audio
          </button>
          <button
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <p>{status}</p>
      </div>
      {
        sentence.words.map((value, index) => (
          <input
            type="text"
            value={value}
            onChange={(event)=>handleBlankFill(event, index)}
            size={value.length}
            className="bg-transparent border-b border-black focus:outline-none focus:border-blue-500 text-center mr-1"
          />
        ))
      }
    </div>
  )
}
export default App