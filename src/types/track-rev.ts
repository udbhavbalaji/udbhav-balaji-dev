import { StringNullableChain } from "lodash";
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
  updateYear: (year: string, field: keyof YearStateType) => void;
}

export type YearStateType = Omit<YearContextType, "updateYear">;

export interface TrackRevLayoutProps {
  children: ReactNode;
  title?: string;
}

export type ProviderPropsType = React.PropsWithChildren;

// export interface ErgastContextType {
//   error: string | null;
//   loading: boolean;
//   toggleLoading: () => void;
//   handleError: (error: string) => void;
//   constructorStandings?: ConstructorStandingsContextType;
//   driverStandings?: DriverStandingsContextType;
// }

export interface ConstructorStandingsContextType {
  fetchData: (year: string) => Promise<ConstructorStandingsItem[]>;
  ConstructorStandings: Record<string, ConstructorStandingsItem[]>;
}

export interface DriverStandingsContextType {
  fetchData: (year: string) => Promise<void>;
  DriverStandings: Record<string, DriverStandingsItem[]>;
}

export interface SeasonScheduleContextType {
  fetchData: (year: string) => Promise<void>;
  SeasonSchedule: Record<string, SeasonScheduleItem[]>;
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

export interface SeasonScheduleItem {
  season: string;
  round: number;
  url: string;
  raceName: string;
  circuitName: string;
  Sessions: {
    FirstPractice: SessionTiming;
    SecondPractice?: SessionTiming;
    ThirdPractice?: SessionTiming;
    Qualifying: SessionTiming;
    SprintQualifying?: SessionTiming;
    SprintRace?: SessionTiming;
    Race: SessionTiming;
  }
}


export interface RawDriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface RawConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface RawRaceEntry {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: SessionTiming;
  SecondPractice?: SessionTiming;
  ThirdPractice?: SessionTiming;
  Qualifying: SessionTiming;
  SprintQualifying?: SessionTiming;
  Sprint?: SessionTiming;
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  }
}

interface SessionTiming {
  date: string;
  time: string;
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
export type RaceTable = { season: string; Races: unknown[] };

// export type StandingsLists = StandingsList[];

export interface StandingsList {
  season: string;
  round: string;
  ConstructorStandings?: RawConstructorStanding[];
  // DriverStandings?: RawDriverStanding[];
}

export interface DropDownProps {
  field: keyof YearStateType;
  options: string[];
  currentValue: string;
  onYearChange: (year: string, field: keyof YearStateType) => void;
}

export interface ConstructorStandingCardItemProps {
  index: number;
  cardData: ConstructorStandingsItem;
}

export interface DriverStandingCardItemProps {
  index: number;
  cardData: DriverStandingsItem;
}

export interface SeasonScheduleCardItemProps {
  index: number;
  cardData: SeasonScheduleItem;
}
