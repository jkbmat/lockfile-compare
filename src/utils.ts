import {IDependency, IVersioned} from './types'
import {readFileSync} from 'fs'


export function breadcrumbsToString(breadcrumbs: IVersioned[]) {
	return breadcrumbs.map((crumb) => crumb.name).join(' -> ')
}

export function breadcrumbsToIndent(breadcrumbs: IVersioned[]) {
	return new Array(breadcrumbs.length + 1).join('\t')
}

export function parseDependency(dependency: IDependency, name: string): IVersioned {
	return {
		name,
		version: dependency.version,
		children: Object.entries(dependency.dependencies || {})
			.sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
			.map(([name, dep]) => parseDependency(dep, name))
	}
}

export function parseFile(path: string): IDependency {
	return JSON.parse(readFileSync(path, 'utf8'))
}
