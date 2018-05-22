import { Express } from 'express';
import { cloudant } from "../server";

interface IWordEntity {
  word: string;
}

interface IDb {
  getAllWords: () => Promise<string[]>;
  insertWordToDb: (word: string) => Promise<void>;
}

let db: IDb;

const ensureDbExists = () =>
  new Promise((_resolve) => {
    cloudant.db.list((dbs: string[]) => {
      if (!dbs || dbs.indexOf('words') === -1) {
        cloudant.db.create('words', () => {
          _resolve();
        })
      } else {
        _resolve();
      }
    });
  });

const initDatabaseConnection = () => {
  const wordsDb = cloudant.db.use<IWordEntity>('words');

  return {
    getAllWords: (): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        wordsDb.list((err, body) => {
          if (err) {
            return reject(err);
          }

          if (!body.rows) {
            return resolve([]);
          }

          const ids = body.rows.map(result => result.id);
          const wordPromises: Array<Promise<string>> = ids.map(id => new Promise((res, _) => {
            wordsDb.get(id, (errr, data) => {
              if (errr) {
                return reject(errr);
              }

              return res(data.word);
            });
          }));

          return resolve(Promise.all(wordPromises));
        });
      });
    },
    insertWordToDb: (word: string): Promise<void> => {
      const newDocument: IWordEntity = { word };

      return new Promise((resolve, reject) => {
        wordsDb.insert(newDocument, (err, response) => {
          if (err) {
            reject(err);
          }

          if (!response.ok) {
            throw new Error('Inserting failed');
          }

          resolve();
        });
      });
    },
  };
};

export const wordsRoute = (app: Express) => {
  ensureDbExists()
    .then(() => {
      db = initDatabaseConnection();

      app.get("/words", (req, res) => {
          db.getAllWords()
            .then(words => res.status(200).json(words));
      });

      app.post('/words/add', (req, res) => {
        db.insertWordToDb(req.body.word)
          .then(() => res.status(201).json());
      });
    });
};