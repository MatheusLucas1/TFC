import { Request, Response } from 'express';
import { IMatch } from '../Interfaces/IMatch';
import TeamService from '../services/Team.services';
import MatchService from '../services/Match.service';
import { ITeam } from '../Interfaces/ITeam';

export default class LeaderboardController {
  private matchService = new MatchService();
  private teamService = new TeamService();

  static countVictoriesHome(matches: IMatch[], teamId: number): number {
    return matches
      .filter(
        (match) => (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals),
      )
      .length;
  }

  static countVictoriesAway(matches: IMatch[], teamId: number): number {
    return matches
      .filter(
        (match) => (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals),
      ).length;
  }

  static countDrawsHome(matches: IMatch[], teamId: number): number {
    return matches
      .filter(
        (match) => ((match.homeTeamId === teamId)
    && match.awayTeamGoals === match.homeTeamGoals),
      ).length;
  }

  static countDrawsAway(matches: IMatch[], teamId: number): number {
    return matches
      .filter(
        (match) => ((match.awayTeamId === teamId)
    && match.awayTeamGoals === match.homeTeamGoals),
      ).length;
  }

  static countGoalsFavorHome(matches: IMatch[], teamId: number): number {
    return matches
      .filter((match) => match.homeTeamId === teamId)
      .reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  }

  static countGoalsFavorAway(matches: IMatch[], teamId: number): number {
    return matches
      .filter((match) => match.awayTeamId === teamId)
      .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  }

  static countGoalsOwnHome(matches: IMatch[], teamId: number): number {
    return matches
      .filter((match) => match.homeTeamId === teamId)
      .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  }

  static countGoalsOwnAway(matches: IMatch[], teamId: number): number {
    return matches
      .filter((match) => match.awayTeamId === teamId)
      .reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  }

  static countScoreBoardHome = (matches: IMatch[], teams: ITeam[]) => teams.map((team) => {
    const teamMatches = matches.filter((match) => match.homeTeamId === team.id);
    const totalVictories = LeaderboardController.countVictoriesHome(teamMatches, team.id);
    const totalDraws = LeaderboardController.countDrawsHome(teamMatches, team.id);
    return {
      name: team.teamName,
      totalPoints: (totalVictories * 3) + totalDraws,
      totalGames: teamMatches.length,
      totalVictories,
      totalDraws: LeaderboardController.countDrawsHome(teamMatches, team.id),
      totalLosses: teamMatches.length - totalVictories - totalDraws,
      goalsFavor: LeaderboardController.countGoalsFavorHome(teamMatches, team.id),
      goalsOwn: LeaderboardController.countGoalsOwnHome(teamMatches, team.id),
      goalsBalance: LeaderboardController.countGoalsFavorHome(teamMatches, team.id)
          - LeaderboardController.countGoalsOwnHome(teamMatches, team.id),
      efficiency: ((((totalVictories * 3) + totalDraws) / (teamMatches.length * 3)) * 100)
        .toFixed(2),
    };
  });

  static countScoreBoardAway = (matches: IMatch[], teams: ITeam[]) => teams.map((team) => {
    const teamMatches = matches.filter((match) => match.awayTeamId === team.id);
    const totalVictories = LeaderboardController.countVictoriesAway(teamMatches, team.id);
    const totalDraws = LeaderboardController.countDrawsAway(teamMatches, team.id);
    return {
      name: team.teamName,
      totalPoints: (totalVictories * 3) + totalDraws,
      totalGames: teamMatches.length,
      totalVictories,
      totalDraws: LeaderboardController.countDrawsAway(teamMatches, team.id),
      totalLosses: teamMatches.length - totalVictories - totalDraws,
      goalsFavor: LeaderboardController.countGoalsFavorAway(teamMatches, team.id),
      goalsOwn: LeaderboardController.countGoalsOwnAway(teamMatches, team.id),
      goalsBalance: LeaderboardController.countGoalsFavorAway(teamMatches, team.id)
          - LeaderboardController.countGoalsOwnAway(teamMatches, team.id),
      efficiency: ((((totalVictories * 3) + totalDraws) / (teamMatches.length * 3)) * 100)
        .toFixed(2),
    };
  });

  async scoreboardHome(req: Request, resp: Response):Promise<Response> {
    const matches = await this.matchService.getFinished();
    const teams = await this.teamService.getAll();
    const result = LeaderboardController.countScoreBoardHome(matches, teams);

    result.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });

    return resp.status(200).json(result);
  }

  async scoreboardAway(req: Request, resp: Response):Promise<Response> {
    const matches = await this.matchService.getFinished();
    const teams = await this.teamService.getAll();
    const result = LeaderboardController.countScoreBoardAway(matches, teams);

    result.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      return 0;
    });

    return resp.status(200).json(result);
  }
}
