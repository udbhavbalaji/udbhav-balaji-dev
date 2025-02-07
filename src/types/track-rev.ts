import { ReactNode } from "react";

export interface NavbarItem {
  title: string;
  link: string;
  linkType: "route" | "static";
}

export interface YearContextType {
  constructorStandings: string;
  driverStandings: string;
  seasonSchedule: string;
  updateYear?: (year: string, field: keyof YearStateType) => void;
}

export type YearStateType = Omit<YearContextType, "updateYear">;

export interface TrackRevLayoutProps {
  children: ReactNode;
  title?: string;
}

export type ProviderPropsType = React.PropsWithChildren;

export interface ErgastContextType {
  error: string | null;
  loading: boolean;
  toggleLoading: () => void;
  handleError: (error: string) => void;
  constructorStandings?: ConstructorStandingsContextType;
  driverStandings?: DriverStandingsContextType;
}

export interface ConstructorStandingsContextType {
  fetchData: (year: string) => Promise<void>;
  ConstructorStandings: Record<string, ConstructorStandingsItem[]>;
}

export interface DriverStandingsContextType {
  fetchData: (year: string) => Promise<void>;
  DriverStandings: Record<string, DriverStandingsItem[]>;
}

export interface ConstructorStandingsItem {
  constructorId: string;
  constructorName: string;
  position: number;
  points: number;
  wins: number;
}

export interface DriverStandingsItem {
  driverNumber: number;
  driverName: string;
  position: number;
  points: number;
  wins: number;
  constructorName: string;
  constructorId: string;
}

export interface RawConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface Constructor {
  constructorId: string;
  constructorName: string;
  url: string;
  name: string;
}

export type Categories = "ConstructorStandings" | "DriverStandings";
export type StandingsTable = { season: string; round: string } & Record<
  Categories,
  unknown[]
>;
