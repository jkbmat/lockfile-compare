# lockfile-compare

Compares two lockfiles for version changes.

## Installation

```
npm i
```

## Usage

```
npm start OLD_LOCKFILE NEW_LOCKFILE
```

## Example output

```
...
	Package project -> @babel/plugin-transform-typescript is UPGRADED (7.4.5 -> 7.5.0)
	Package project -> @babel/plugin-transform-unicode-regex is DOWNGRADED (7.4.4 -> 7.4.3)
	Package project -> @babel/runtime is DOWNGRADED (7.4.5 -> 7.4.3)
		Package project -> @babel/runtime -> regenerator-runtime only exists in NEW	
...
```
