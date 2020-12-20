import { GameStateInterface } from '../../store/game/initialState.interface';

export type Posts = GameStateInterface['posts'];

export interface RandomizeNewTask {
  currentTask: GameStateInterface['currentTask'];
  posts: Posts;
}
