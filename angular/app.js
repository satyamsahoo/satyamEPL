var myApp = angular.module('app',["ngRoute"]);

//route
myApp.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "angular/view/main.html"
    })
    .when("/details", {
        templateUrl : "angular/view/details.html"
    })
    .when("/summary", {
        templateUrl : "angular/view/summary.html"
    })
    .otherwise({
      redirectTo : "/"
    });
});

//controller
myApp.controller('appController',function($http,$routeParams,$parse){

  var main = this;
  //url for 2015 and 2016
  this.baseUrl2 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.rounds = [];
  this.names = [];
  //team for 2015
  this.team11 =["Bournemouth","Arsenal","Aston Villa","Chelsea","Crystal Palace","Everton","Leicester City","Liverpool","Manchester City","Manchester United",
                "Newcastle United","Norwich","Southampton","Stoke City","Sunderland","Swansea","Tottenham Hotspur","Watford","West Bromwich Albion","West Ham United"];
  //team for 2016
  this.team22 =['Hull City','Leicester City','Burnley','Swansea','Crystal Palace','West Bromwich Albion','Everton','Tottenham Hotspur','Middlesbrough',
              'Stoke City','Southampton','Watford','Manchester City','Sunderland','Arsenal','Liverpool','Chelsea','West Ham United','Bournemouth'];

  this.match = [];
  this.cMatchDetail = "MatchDetail";
  this.sTeamName;
  this.totalscore=0;
  this.totalmatch=0;
  this.checker=0;
  this.totalwin=0;
  this.totalloss=0;
  this.totoldraw=0;

  for(var i=1; i<39; i++){
    this.match.push('Matchday ' + i);
  }


  this.orderProp;

  //function for 2015 json call
  this.loadRounds1 = function(){

    $http({
      method : 'GET',
      url : main.baseUrl1
    }).then(function successCallback(response){

      main.rounds = response.data.rounds;
      main.rounds[0].name= "Matchday 1";
      console.log(main.rounds);
      console.log(main.rounds[0].name);
    }, function errorCallback(response){

    });
  }
  //function for 2016 json call
  this.loadRounds2 = function(){
    $http({
      method : 'GET',
      url : this.baseUrl2
    }).then(function successCallback(response){

      main.rounds = response.data.rounds;
      main.rounds[33].name= "Matchday 34";
      main.rounds[25].name= "Matchday 26";
      main.rounds[27].name= "Matchday 28";
      console.log(main.rounds);
      console.log(main.rounds[0].name);
    }, function errorCallback(response){

    });
  }

  this.matchDetail  = function(event){
    console.log("HI");
    main.cMatchDetail = angular.fromJson(event.currentTarget.id);
    console.log(main.cMatchDetail);
  }

  this.loadSummary = function(year, teamName){
    console.log(year, teamName);
    console.log(main.team1);
    var totalwin = 0;
    var totaldraw = 0;
    var totalloss = 0;
    var matchcount = 0;
    var totalscore = 0;
    if (year == "2015") {

      for (let i in main.rounds){
       for(let j in main.rounds[i].matches){

                if(teamName===main.rounds[i].matches[j].team1.name  ){
                    matchcount +=1;
                    totalscore += main.rounds[i].matches[j].score1;

                    if(main.rounds[i].matches[j].score1>main.rounds[i].matches[j].score2){
                                totalwin +=1;
                    } else if(main.rounds[i].matches[j].score1<main.rounds[i].matches[j].score2){
                        totalloss +=1;
                    } else if(main.rounds[i].matches[j].score1===main.rounds[i].matches[j].score2){
                        totaldraw +=1;
                    }

                } else if(teamName===main.rounds[i].matches[j].team2.name){

                    matchcount +=1;
                    totalscore += main.rounds[i].matches[j].score2;
                    if(main.rounds[i].matches[j].score1<main.rounds[i].matches[j].score2){
                                totalwin +=1;
                    } else if(main.rounds[i].matches[j].score1>main.rounds[i].matches[j].score2){
                        totalloss +=1;
                    } else if(main.rounds[i].matches[j].score1===main.rounds[i].matches[j].score2){
                        totaldraw +=1;
                    }

                }
                  else {

                  }

      }
    }
  }
  else if(year == "2016"){
    for (let i in main.rounds){
     for(let j in main.rounds[i].matches){

              if(teamName===main.rounds[i].matches[j].team1.name  ){
                  matchcount +=1;
                  totalscore += main.rounds[i].matches[j].score1;

                  if(main.rounds[i].matches[j].score1>main.rounds[i].matches[j].score2){
                              totalwin +=1;
                  } else if(main.rounds[i].matches[j].score1<main.rounds[i].matches[j].score2){
                      totalloss +=1;
                  } else if(main.rounds[i].matches[j].score1===main.rounds[i].matches[j].score2){
                      totaldraw +=1;
                  }

              } else if(teamName===main.rounds[i].matches[j].team2.name){

                  matchcount +=1;
                  totalscore += main.rounds[i].matches[j].score2;
                  if(main.rounds[i].matches[j].score1<main.rounds[i].matches[j].score2){
                              totalwin +=1;
                  } else if(main.rounds[i].matches[j].score1>main.rounds[i].matches[j].score2){
                      totalloss +=1;
                  } else if(main.rounds[i].matches[j].score1===main.rounds[i].matches[j].score2){
                      totaldraw +=1;
                  }

              }
                else {

                }

    }
  }
  }

  main.totalscore = totalscore;
  main.totalmatch = matchcount;
  main.totalwin = totalwin;
  main.totalloss = totalloss;
  main.totaldraw = totaldraw;
  console.log(totalscore);
  console.log(matchcount);
  console.log(totalwin);
  console.log(totalloss);
  console.log(totaldraw);

  }




});
