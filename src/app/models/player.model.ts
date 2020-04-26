export interface PlayerInfo {
  name: string;
  playerNumber: number;
  color: string;
  bankValue: number;
  stakeValue: number;
  isActive?: boolean;
  hasCards?: boolean;
  uid?: string;
}
