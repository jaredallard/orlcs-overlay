const SOSEvent = {
  data: {
    event: String,
  },
  event: String,
}

/**
 * Player is a Rocket League player
 */
const Player = {
  assists: Number,
  attacker: String,
  boost: Number,
  cartouches: Number,
  demos: Number,
  goals: Number,
  hasCar: Boolean,
  id: String,
  isDead: Boolean,
  isPowersliding: Boolean,
  isSonic: Boolean,
  location: {
    X: Number,
    Y: Number,
    Z: Number,
    pitch: Number,
    roll: Number,
    yaw: Number,
  },
  name: String,
  onGround: Boolean,
  onWall: Boolean,
  primaryID: String,
  saves: Number,
  score: Number,
  shortcut: Number,
  shots: Number,
  speed: Number,
  team: Number,
  touches: Number,
}

const Team = {
  color_primary: String,
  color_secondary: String,
  name: String,
  score: Number,
}

/**
 * Game is the representation of an active game
 */
const Game = {
  arena: String,
  ball: {
    location: {
      X: Number,
      Y: Number,
      Z: Number,
    },
    speed: Number,
    team: Number,
  },
  hasTarget: Boolean,
  hasWinner: Boolean,
  isOT: Boolean,
  isReplay: Boolean,
  target: String,
  teams: [Team],
  time_milliseconds: Number,
  time_seconds: Number,
  winner: String,
}

/**
 * GameStateEvent is an event fired with the current state of a live game
 */
const GameStateEvent = {
  event: String,
  game: Game,
  hasGame: Boolean,
  match_guid: String,
  players: [Player],
}

const types = {
  Player,
  Game,
  Team,
  GameStateEvent,
  SOSEvent,
}
export default types