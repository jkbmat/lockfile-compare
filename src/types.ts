export interface IDependency {
	name?: string,
	version: TVersion,
	dependencies: { [depName: string]: IDependency },
}

export interface IVersioned {
	name: string,
	version: TVersion,
	children: IVersioned[],
}

export enum ECheckResult {
	UNCHANGED = 'UNCHANGED',
	UPGRADED = 'UPGRADED',
	DOWNGRADED = 'DOWNGRADED',
}

type TVersion = string
