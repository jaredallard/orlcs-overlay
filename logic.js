/*

Coded by Slumware(#9370)
Please follow me on YouTube and Twitch

*/

const ws = new WebSocket('ws://192.168.1.48:49122');


window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const gameNumber = urlParams.get('gameNum') || 1;
  const bestOfNumber = urlParams.get('bestOf') || 3;

  $('#tournament-game-nunmber').text(gameNumber)
  $('#tournament-best-of').text(bestOfNumber)
}

function orangeResetAll() {
  $('#orange-team-name').text('')
  $("#orange-player-1, #orange-player-2, #orange-player-1").addClass('d-none')
  $('#orange-player-1-p-bar, #orange-player-2-p-bar, #orange-player-3-p-bar').width('0%')
}

function blueResetAll() {
  $('#blue-team-name').text('')
  $("#blue-player-1, #blue-player-2, #blue-player-1").addClass('d-none')
  $('#blue-player-1-p-bar, #blue-player-2-p-bar, #blue-player-3-p-bar').width('0%')
}


function xMath(x) {
  var xCoord = (190 / x)
  return xCoord;
}

function yMath(y) {
  var yCoord = (150 / y)
  return yCoord;
}

var dataSet = [
  [0, 0],
];

ws.onopen = () => {
  //  ws.send('Message From Client')
}

ws.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

function fmtMSS(s) {   // accepts seconds as Number or String. Returns m:ss
  return (s -         // take value s and subtract (will try to convert String to Number)
    (s %= 60) // the new value of s, now holding the remainder of s divided by 60 
    // (will also try to convert String to Number)
  ) / 60 + (    // and divide the resulting Number by 60 
      // (can never result in a fractional value = no need for rounding)
      // to which we concatenate a String (converts the Number to String)
      // who's reference is chosen by the conditional operator:
      9 < s       // if    seconds is larger than 9
        ? ':'       // then  we don't need to prepend a zero
        : ':0'      // else  we do need to prepend a zero
    ) + s;       // and we add Number s to the string (converting it to String as well)
}

ws.onmessage = (e) => {
  const jEvent = JSON.parse(event.data);

  if (jEvent.data.event == "gamestate") {
    const teamData = jEvent.data.game.teams

    if (jEvent.data.game.hasWinner == true) {
      $('#main-ui').addClass('invisible');
      ws.close()
      return
    }

    // Update the "spectating" block
    if (jEvent.data.game.hasTarget) {
      const activePlayerName = jEvent.data.game.target;
      const activePlayer = jEvent.data.players[activePlayerName];

      $("#active-player-name").text(activePlayer.name)

      if (activePlayer.team == 1) {
        $(".active-player-info").removeClass('bg-blue-team');
        $(".active-player-info").addClass('bg-orange-team');
      } else {
        $(".active-player-info").removeClass('bg-orange-team');
        $(".active-player-info").addClass('bg-blue-team');
      }

      $(`#active-player-boost-text`).text(activePlayer.boost)
      $(`#active-player-boost`).width(activePlayer.boost + "%")
      if (activePlayer.boost >= 3) {
        $(`#active-player-boost`).css("color", "white")
      } else {
        $(`#active-player-boost`).css("color", "black")
      }

      $("#active-player").removeClass('invisible');
    } else {
      $("#active-player").addClass('invisible');
    }

    $('#main-ui').removeClass('invisible');

    const gameTime = jEvent.data.game.time_seconds
    $('#timer').text(fmtMSS(gameTime))

    const blueName = _.get(teamData, [0, 'name'])
    const orangeName = _.get(teamData, [1, 'name'])

    if (blueName.length > 1 && orangeName.length > 1) {
      $('#blue-team-name').text(blueName)
      $('#orange-team-name').text(orangeName)
    }


    //score
    var blueScore = _.get(teamData, [0, 'score'])
    var orangeScore = _.get(teamData, [1, 'score'])

    $('#blue-score').text(blueScore)
    $('#orange-score').text(orangeScore)

    //overtime logic
    if (jEvent.data.game.isOT == true) {
      $('#overtime-text').removeClass('d-none')
    } else {
      $('#overtime-text').addClass('d-none')
    }

    const playerList = jEvent.data.players;
    const team0 = _.filter(playerList, {
      'team': 0
    })
    const team1 = _.filter(playerList, {
      'team': 1
    })


    for (const team of [{ color: 'blue', players: team0 }, { color: 'orange', players: team1 }]) {
      if (team.players == undefined) {
        team.color == 'blue' ? blueResetAll() : orangeResetAll()
        continue
      }

      for (let i = 0; i != team.players.length; i++) {
        const teamMember = team.players[i];
        if (teamMember != undefined) {
          $(`#${team.color}-player-${i + 1}`).removeClass('d-none')
          $(`#${team.color}-player-${i + 1}-name`).text(teamMember.name)
          $(`#${team.color}-player-${i + 1}-goals`).text(teamMember.goals)
          $(`#${team.color}-player-${i + 1}-shots`).text(teamMember.shots)
          $(`#${team.color}-player-${i + 1}-saves`).text(teamMember.saves)
          $(`#${team.color}-player-${i + 1}-assists`).text(teamMember.assists)
          $(`#${team.color}-player-${i + 1}-boost`).text(teamMember.boost)
          $(`#${team.color}-player-${i + 1}-p-bar`).width(teamMember.boost + "%")

          if (teamMember.boost >= 3) {
            $(`#${team.color}-player-${i + 1}-boost`).css("color", "white")
          } else {
            $(`#${team.color}-player-${i + 1}-boost`).css("color", "black")
          }
        }
      }
    }

    return
  }

  if (jEvent.data.event == "podium_start" || jEvent.data.event == "match_ended") {
    console.log('match ended / podium')
    $('#main-ui').addClass('invisible');
    blueResetAll()
    orangeResetAll()
  }
}
