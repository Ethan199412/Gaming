export enum Action {
  Fight = "FIGHT",
  Cooperate = "COOPERATE",
}

export enum Strategy {
  Eagle = "EAGLE",
  Pigeon = "PIGEON",
  Random = "RANDOM",
  TitForTat = "TIT_FOR_TAT",
  NeverForgive = "NEVER_FORGIVE",
  CunningProber = "CUNNING_PROBER",
}

export enum Score {
  BothWin = 3,
  WinOther = 5,
  Loser = 0,
  BothLose = 1,
}
