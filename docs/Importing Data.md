# Importing Data


## Getting Started
Ensure that you have followed the HW2 document to create an RDS instance and have connected to it on DataGrip. Download the files Players.csv and Matches.csv and keep them ready to import.  

On a DataGrip console, run the DDL statements in the section below and wait until they are created.

See the section `Importing CSVs into RDS` to import data into the FIFA database.


## DDL Statements

```sql
CREATE DATABASE FIFA;
USE FIFA;
CREATE TABLE Players
(
    PlayerId                int,
    Name                    varchar(25),
    Age                     int,
    Photo                   varchar(64),
    Nationality             varchar(20),
    Flag                    varchar(64),
    OverallRating           int,
    Potential               int,
    Club                    varchar(25),
    ClubLogo                varchar(64),
    Value                   varchar(8),
    Wage                    varchar(8),
    InternationalReputation int,
    Skill                   int,
    JerseyNumber            int,
    ContractValidUntil      varchar(9),
    Height                  varchar(8),
    Weight                  varchar(8),
    NPassing                int,
    NBallControl            int,
    NAdjustedAgility        int,
    NStamina                int,
    NStrength               int,
    NPositioning            int,
    GKPenalties             int,
    GKDiving                int,
    GKHandling              int,
    GKKicking               int,
    GKPositioning           int,
    GKReflexes              int,
    BestPosition            varchar(3),
    BestOverallRating       int,
    ReleaseClause           varchar(8),
    PRIMARY KEY (PlayerId)
);


SELECT *
FROM Players;

CREATE TABLE Matches
(
    MatchId        int,
    Division       varchar(3),
    Date           varchar(10),
    Time           varchar(5),
    HomeTeam       varchar(25),
    AwayTeam       varchar(25),
    FullTimeGoalsH int,
    FullTimeGoalsA int,
    HalfTimeGoalsH int,
    HalfTimeGoalsA int,
    ShotsH         int,
    ShotsA         int,
    ShotsOnTargetH int,
    ShotsOnTargetA int,
    FoulsH         int,
    FoulsA         int,
    CornersH       int,
    CornersA       int,
    YellowCardsH   int,
    YellowCardsA   int,
    RedCardsH      int,
    RedCardsA      int,
    PRIMARY KEY (MatchId)
);
```

## Importing CSVs into RDS

Using the DataGrip import wizard, import Players.csv into the PLayers table and Matches.csv into the Matches table. See the DataGrip handout from HW1 if you want a refresher on how to do this. 

**When importing the files, ensure that the `First row is header` option is checked, or you will run into errors** 
