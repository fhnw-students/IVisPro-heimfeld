const fs = require('fs');
const _ = require('lodash');
const glob = require('glob');
const csv = require('csvtojson');

const AMOUNT_BEST_PLAYERS = 7;
// const MATCHES_QUERY = '+(2014|2015|2016|2017|2018)';
const MATCHES_QUERY = '20??';

async function run() {
  const rankings = await parseRankingCsvFile('tennis_atp-master/atp_rankings_current.csv');
  fs.writeFileSync('src/data/rankings.json', JSON.stringify(rankings), 'utf8');

  const jsonObjectPlayers = await parsePlayersCsvFile('tennis_atp-master/atp_players.csv');
  const players = filterPlayers(rankings, jsonObjectPlayers);
  fs.writeFileSync('src/data/players.json', JSON.stringify(players), 'utf8');

  let matches = [];
  const csvFiles = await readMatchesCsvFile();
  for (let index = 0; index < csvFiles.length; index++) {
    const csvFile = csvFiles[index];
    const jsonObject = await parseMatchesCsvFile(csvFile);
    matches = [...matches, ...jsonObject];
    console.log(csvFile, jsonObject.length);
  }
  matches = filterMatches(players, matches);
  console.log('');
  console.log('rankings', rankings.length);
  console.log('players', players.length);
  console.log('matches', matches.length);
  fs.writeFileSync('src/data/matches.json', JSON.stringify(matches), 'utf8');
}

function filterMatches(players, matches) {
  const parseDate = (value) => new Date(`${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`);
  return matches
    .filter(m => players.some(p => m.winner_id === p.id) && players.some(p => m.loser_id === p.id))
    .sort((a, b) => {
      const dateA = parseDate(b.tourney_date);
      const dateB = parseDate(a.tourney_date);
      const diff = dateA.getTime() - dateB.getTime();
      return diff;
    })
    .map(match => _.pick(match, [
      'tourney_id',
      'tourney_name',
      'surface',
      'draw_size',
      'tourney_level',
      'tourney_date',
      'match_num',
      'score',
      'best_of',
      'round',
      'winner_id',
      'winner_rank',
      'loser_id',
      'loser_rank',
    ]));
}

function filterPlayers(rankings, players) {
  return players.filter(p => rankings.some(r => r.id === p.id));
}

async function readMatchesCsvFile() {
  return new Promise((resolve) => {
    glob(`tennis_atp-master/atp_matches_${MATCHES_QUERY}.csv`, {}, (er, files) => {
      resolve(files);
    });
  });
}

async function parseMatchesCsvFile(csvFilePath) {
  return new Promise((resolve) => {
    csv()
      .fromFile(csvFilePath).then((jsonObj) => {
        resolve(jsonObj);
      });
  });
}

async function parsePlayersCsvFile(csvFilePath) {
  return new Promise((resolve) => {
    csv({
      noheader: true,
      headers: ['id', 'lastname', 'firstname', 'hand', 'birthday', 'nation']
    })
      .fromFile(csvFilePath).then((jsonObj) => {
        resolve(jsonObj);
      });
  });
}

async function parseRankingCsvFile(csvFilePath) {
  return new Promise((resolve) => {
    csv({
      noheader: true,
      headers: ['date', 'rank', 'id', 'points']
    })
      .fromFile(csvFilePath).then((jsonObj) => {
        resolve(jsonObj.splice(0, AMOUNT_BEST_PLAYERS));
      });
  });
}

run();
