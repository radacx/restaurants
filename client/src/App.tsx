import * as React from 'react';
import axios from 'axios';
import './App.css';

import logo from './logo.svg';

type State = Readonly<{
  words: string[];
  newWord: string;
  showWords: boolean;
  isLoading: boolean;
  error?: Error;
}>;

const getAllWords = () =>
  axios.get<string[]>('/words')
    .then(res => res.data);

const insertWordToDb = (word: string) =>
  axios.post('/words/add', { word });

export class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      newWord: '',
      words: [],
      showWords: true,
      isLoading: true,
    };
  };

  componentDidMount() {
    getAllWords()
      .then(words => this.setState({ words, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  _changeNewWord = (e: React.FormEvent<HTMLInputElement>) => this.setState({
    newWord: e.currentTarget.value,
  });

  _submitNewWord = () =>
    insertWordToDb(this.state.newWord)
      .then(() => this.setState(({ newWord, words }) => ({
        newWord: '',
        words: words.concat(newWord),
      })));

  _toggleShowWords = () =>
    this.setState(({ showWords }) => ({
      showWords: !showWords,
    }));

  render() {
    const { showWords, words } = this.state;
    const { length: wordCount } = words;
    const isSingleWord = wordCount === 1;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Just add some random words</h1>
        </header>

        <p className="App-intro">
          There {isSingleWord ? 'is' : 'are'} already {wordCount} {isSingleWord ? 'word' : 'words'}.
        </p>

        New word:
        <input
          value={this.state.newWord}
          onChange={this._changeNewWord}
        />
        <button onClick={this._submitNewWord}>
          Add
        </button>

        <p>
          List of words
        </p>
        <p>
          <button onClick={this._toggleShowWords}>
            {showWords ? 'Collapse' : 'Show'}
          </button>
        </p>
        {showWords && (
          <ol>
            {words.map((word, index) => (
              <li key={index}>
                {word}
              </li>))}
          </ol>
        )}
      </div>
    );
  }
}