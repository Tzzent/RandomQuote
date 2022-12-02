import './App.css';
import { BsArrowRepeat, BsArrowRight } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Quote from './components/Quote.jsx';
import About from './components/About.jsx';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [qts, setQts] = useState([]);
  const [btnVisible, setBtnVisible] = useState(true);

  useEffect(() => {
    getQuote()
  }, []);

  const getQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(res => {
        setQuotes(res)
      })
    setBtnVisible(true);
    setQts([]);
  }

  const getQuotes = (author) => {
    setBtnVisible(false);
    fetch(`https://api.quotable.io/quotes?author=${author}`)
      .then(res => res.json())
      .then(data => {
        var n = 0, numero, uno = 0, dos = 0, tres = 0;
        let array = [];
        if (data.count > 3) {
          do {
            numero = Math.floor(Math.random() * data.count);
            if ((numero != uno) && (numero != dos) && (numero != 3)) {
              array[n] = data.results[numero];
              n++;
              if (n == 1) {
                uno = numero;
              }
              if (n == 2) {
                dos = numero;
              }
              if (n == 3) {
                tres = numero;
              }
            }
          } while (n < 3);
          setQts(array)

        } else {
          setQts(data.results);
        }

      })
  }

  function rotateIcon() {
    const btn_random = document.querySelector('.btn-random');
    const btn = document.querySelector('.btn');
    btn.classList.add('btn-repeat')
    btn_random.addEventListener('mouseleave', () => {
      btn.classList.remove('btn-repeat')
    })
  }

  return (
    <div className="App">
      <div className='main'>

        <div className='btn-random' onClick={() => getQuote()} onMouseEnter={() => rotateIcon()}>random <BsArrowRepeat className='btn' /></div>

        <div className='container-quotes'>

          <h1 className={!btnVisible ? 'title-author' : 'title:author not-visible'}>{quotes.author}</h1>
          {
            btnVisible
              ?
              <Quote
                author={quotes.author}
                content={quotes.content} />
              :
              qts.map(q =>
                <Quote
                  key={uuidv4()}
                  author={q.author}
                  content={q.content} />
              )
          }

          <About
            getQuotes={getQuotes}
            visible={btnVisible}
            author={quotes.author}
            tags={quotes.tags} />

        </div>

        <div className='credit'>created by Tzzent - devChallenges.io</div>
      </div>
    </div>
  );
}

export default App;
