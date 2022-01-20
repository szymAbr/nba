interface Player {
  id: number;
}

interface StatsObject {
  player: {
    [key: string]: Player;
  };
}

export default StatsObject;
