const mysql = require('mysql')
const e = require('express')
const config = require('./config.json')

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
})
connection.connect()

// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
  // a GET request to /hello?name=Steve
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
  } else {
    res.send('Hello! Welcome to the FIFA server!')
  }
}

// ********************************************
//                  WARM UP
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
  const colors = ['red', 'blue']
  const jersey_number = Math.floor(Math.random() * 20) + 1
  const name = req.query.name ? req.query.name : 'player'

  if (req.params.choice === 'number') {
    // TODO: TASK 1: inspect for issues and correct
    res.json({ message: `Hello, ${name}!`, jersey_number })
  } else if (req.params.choice === 'color') {
    const lucky_color_index = Math.floor(Math.random() * 2)
    // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random
    res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
  } else {
    // TODO: TASK 3: inspect for issues and correct
    res.json({ message: `Hello, ${name}, we like your jersey!` })
  }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************

// Route 3 (handler)
async function all_matches(req, res) {
  // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
  // We have partially implemented this function for you to
  // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
  // we didn't specify this default value for league, and you could change it if you want!
  // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here...
  const league = req.params.league ? req.params.league : 'D1'
  // use this league encoding in your query to furnish the correct results

  if (req.query.page && !isNaN(req.query.page)) {
    // This is the case where page is defined.
    // The SQL schema has the attribute OverallRating, but modify it to match spec!
    // TODO: query and return results here:
    const start = (req.query.page - 1) * req.query.pagesize
    connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${start}, ${req.query.pagesize}`, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json({ error })
      } else if (results) {
        res.json({ results })
      }
    })
  } else {
    // we have implemented this for you to see how to return results by querying the database
    connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json({ error })
      } else if (results) {
        res.json({ results })
      }
    })
  }
}

// Route 4 (handler)
async function all_players(req, res) {
  // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
  if (req.query.page && !isNaN(req.query.page)) {
    const start = (req.query.page - 1) * req.query.pagesize
    connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value 
        FROM Players
        ORDER BY Name
        LIMIT ${start}, ${req.query.pagesize}`, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json({ error })
      } else if (results) {
        res.json({ results })
      }
    })
  } else {
    connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value 
        FROM Players
        ORDER BY Name`, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json({ error })
      } else if (results) {
        res.json({ results })
      }
    })
  }
}

// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
  // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
  connection.query(
    `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
                           FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals, 
                           HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals,
                           ShotsH AS ShotsHome, ShotsA AS ShotsAway, ShotsOnTargetH AS ShotsOnTargetHome, 
                           ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway,
                           CornersH AS CornersHome, CornersA AS CornersAway, YellowCardsH AS YCHome, 
                           YellowCardsA AS YCAway, RedCardsH as RCHome, RedCardsA AS RCAway
                    FROM Matches
                    WHERE MatchId = ${req.query.id}`,
    (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json({ error })
      } else if (results.length === 0) {
        res.json({ results: [] })
      } else if (results) {
        res.json({ results })
      }
    },
  )
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
  // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
  connection.query(
    `SELECT BestPosition
        FROM Players
        WHERE PlayerId = ${req.query.id}`,
    (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json({ error })
      } else if (results.length === 0) {
        res.json({ results: [] })
      } else if (results) {
        if (results[0].BestPosition === 'GK') {
          connection.query(
            `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, 
                    Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, 
                    JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, 
                    BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking, 
                    GKPositioning, GKReflexes
            FROM Players
            WHERE PlayerId = ${req.query.id}`,
            (error_gk, results_gk, fields_gk) => {
              if (error_gk) {
                console.log(error_gk)
                res.json({ error_gk })
              } else if (results_gk) {
                res.json({ results: results_gk })
              }
            },
          )
        } else {
          connection.query(
            `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, 
                        Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, 
                        JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, 
                        BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility, 
                        NStamina, NStrength, NPositioning
                FROM Players
                WHERE PlayerId = ${req.query.id}`,
            (error_n, results_n, fields_n) => {
              if (error_n) {
                console.log(error_n)
                res.json({ error_n })
              } else if (results_n) {
                res.json({ results: results_n })
              }
            },
          )
        }
      }
    },
  )
}

// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
  // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
  // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
  const { Home, Away, page } = req.query
  let { pagesize } = req.query
  if (!pagesize || Number.isNaN(pagesize)) {
    pagesize = 10
  }
  let start = 0
  let query = `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
                      FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
                FROM Matches
                WHERE HomeTeam LIKE '%${Home}%' AND AwayTeam LIKE '%${Away}%'
                ORDER BY Home, Away`
  if (page && !Number.isNaN(page) && page !== 'null') {
    start = (page - 1) * pagesize
    query += ` LIMIT ${start}, ${pagesize}`
  }
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
}

// Route 8 (handler)
async function search_players(req, res) {
  // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
  // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
  const {
    Name,
    Nationality,
    Club,
    page,
  } = req.query
  let {
    RatingLow, RatingHigh, PotentialLow, PotentialHigh, pagesize,
  } = req.query
  pagesize = pagesize || 10
  RatingLow = RatingLow || 0
  RatingHigh = RatingHigh || 100
  PotentialLow = PotentialLow || 0
  PotentialHigh = PotentialHigh || 100
  let start = 0
  let query = `SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, 
                      Club, Value
                FROM Players
                WHERE Name LIKE '%${Name}%' 
                AND Nationality LIKE '%${Nationality}%'
                AND Club LIKE '%${Club}%'
                AND Potential >= ${PotentialLow}
                AND Potential <= ${PotentialHigh}
                AND OverallRating >= ${RatingLow}
                AND OverallRating <= ${RatingHigh}
                ORDER BY Name`
  if (page && !Number.isNaN(page) && page !== 'null') {
    console.log(page)
    console.log(typeof page)
    console.log(pagesize)
    start = (page - 1) * pagesize
    query += ` LIMIT ${start}, ${pagesize}`
  }
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ error })
    } else if (results.length === 0) {
      res.json({ results: [] })
    } else if (results) {
      res.json({ results })
    }
  })
}

module.exports = {
  hello,
  jersey,
  all_matches,
  all_players,
  match,
  player,
  search_matches,
  search_players,
}
