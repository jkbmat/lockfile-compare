import {ECheckResult, IVersioned} from './types'
import {breadcrumbsToIndent, breadcrumbsToString} from './utils'
import compareVersions from 'compare-versions'


function check(oldPackage: IVersioned, newPackage: IVersioned): ECheckResult {
	const comparison = compareVersions(oldPackage.version, newPackage.version)
	
	if (comparison < 0) {
		return ECheckResult.UPGRADED
	}
	if (comparison > 0) {
		return ECheckResult.DOWNGRADED
	}
	return ECheckResult.UNCHANGED
}

export function walk(oldPackages: IVersioned[], newPackages: IVersioned[], breadcrumbs: IVersioned[] = []) {
	while (oldPackages.length) {
		const oldPackage = oldPackages.splice(0, 1)[0]
		const newPackageIndex = newPackages.findIndex((pkg) => {
			return pkg.name === oldPackage.name
		})
		
		if (newPackageIndex === -1) {
			logger(oldPackage, 'only exists in OLD')
			
			walk(oldPackage.children, [], [...breadcrumbs, oldPackage])
			
			continue
		}
		
		const newPackage = newPackages.splice(newPackageIndex, 1)[0]
		
		const checkResult = check(oldPackage, newPackage)
		
		switch (checkResult) {
			case ECheckResult.UNCHANGED:
				// logger(oldPackage, 'is unchanged')
				break
			
			case ECheckResult.DOWNGRADED:
				logger(oldPackage, `is DOWNGRADED (${oldPackage.version} -> ${newPackage.version})`)
				break
			
			case ECheckResult.UPGRADED:
				logger(oldPackage, `is UPGRADED (${oldPackage.version} -> ${newPackage.version})`)
				break
		}
		
		walk(oldPackage.children, newPackage.children, [...breadcrumbs, oldPackage])
	}
	
	while (newPackages.length) {
		const newPackage = newPackages.splice(0, 1)[0]
		
		logger(newPackage, 'only exists in NEW')
		
		walk([], newPackage.children, [...breadcrumbs, newPackage])
	}
	
	function logger(pkg: IVersioned, message: string) {
		console.log(`${breadcrumbsToIndent(breadcrumbs)}Package ${breadcrumbsToString([...breadcrumbs, pkg])} ${message}`)
	}
}
