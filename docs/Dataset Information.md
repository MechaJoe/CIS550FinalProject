# Dataset Information

## Introduction

## League Encodings
As used in Matches.csv and expected in API routes:

| Name      | Encoding |
| ----------- | ----------- |
| [Bundesliga](https://www.bundesliga.com/en/bundesliga)      | D1       |
| [La Liga](https://www.laliga.com/en-GB)   | SP1        |
| [Ligue 1](https://www.ligue1.com/)   | F1        |
| [Serie A](https://en.wikipedia.org/wiki/Serie_A)   | I1        |
| [Premier League](https://www.premierleague.com/)   | E0 |

The terms 'league' and 'division' have been used interchangeably throughout the dataset - only selected divisions are represented

## Player Position Encodings
15 encodings are used in Players.csv and expected in API routes: 

```
'ST', 'CAM', 'CDM', 'CM', 'CB', 'LB', 'RB', 'RW', 'CF', 'LW', 'LM', 'RWB', 'RM', 'LWB', 'GK'
```
### Goalkeeper
| Position      | Encoding |
| ----------- | ----------- |
| Goalkeeper      | GK       |
|  Striker | ST |
| Center Attack Midfielder    | CAM       |
| Center Defense Midfielder   | CDM        |
| Center Midfielder | CM       |
| Center Back/ Center Full-Back  | CB     |
|  Left Back/ Left Full-Back | LB |
| Right Back/ Right Full-Back  | RB |
|  Right Wing | RW |
| Left Wing  | LW|
| Center Forward      | CF |
| Left Midfielder  | LM |
| Right Wing-Back   | RWB |
|  Right Midfielder  | RM |
|  Left Wing-Back  | LWB |

If you'd like to know more about these positions, [here](https://the18.com/en/soccer-learning/soccer-positions-explained-names-numbers-and-roles) is a good resource.

## Notes

- Some entries will have value(s) = 0 for certain fields. This is fine for the purposes of this HW.
- Abbreviations H = Home and A = Away are used in columns names for Matches
- Goals for a match (unless specified otherwise) refer to goals at full time
- OverallRating in players should be taken as the Rating attribute 
## Sources

[FIFA 21 Official Dataset - Kaggle](https://www.kaggle.com/bryanb/fifa-player-stats-database) by [Aditya](https://www.kaggle.com/adityadesai13)

[European Football Database 2019/2020 - Kaggle](https://www.kaggle.com/adityadesai13/european-football-database-20192020) by [Bryan B](https://www.kaggle.com/bryanb)

